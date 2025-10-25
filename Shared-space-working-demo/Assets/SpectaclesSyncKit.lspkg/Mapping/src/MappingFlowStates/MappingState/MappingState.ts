import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import StateMachine from "SpectaclesInteractionKit.lspkg/Utils/StateMachine"
import {ColocatedBuildStatus, SessionController} from "../../../../Core/SessionController"
import {SyncKitLogger} from "../../../../Utils/SyncKitLogger"
import {setTimeout} from "../../../../Utils/Timers"
import {MAPPING_HINTS_P1} from "../../Texts/TextValues"
import {ProgressBar} from "../../UI/MappingFlow/ProgressBar/ProgressBar"
import {TextMappingHint} from "../../UI/MappingFlow/TextMappingHint/TextMappingHint"
import {Tutorial} from "../../UI/MappingFlow/Tutorial/Tutorial"
import {TutorialTypeEnum} from "../../UI/MappingFlow/Tutorial/TutorialTypeEnum"
import {ProjectContainer} from "../../Utils/ProjectContainer"
import {delayFrames} from "../../Utils/SharedFunctions"
import {MappingSuccessfulState} from "../MappingSuccessfulState/MappingSuccessfulState"
import {MappingUnsuccessfulState} from "../MappingUnsuccessfulState/MappingUnsuccessfulState"
import {MappingStateInput} from "./MappingStateInput"

// How frequently to checkpoint the map, in seconds
// The first checkpoint is always done immediately, and subsequent checkpoints are done according to this series.
// Calls after the last value in the array will use the last value.
const CHECKPOINT_INTERVALS = [15, 30, 60]

export class MappingState {
  private readonly worldCamera = WorldCameraFinderProvider.getInstance()

  private readonly worldCameraTransform = this.worldCamera.getTransform()

  private readonly tutorial: Tutorial

  private readonly progressBar: ProgressBar

  private readonly textMappingHint: TextMappingHint

  private readonly delayedEvent: DelayedCallbackEvent

  private updateEvent: SceneEvent

  private readonly mappingWaitingTime: number = 30

  private readonly log: SyncKitLogger = new SyncKitLogger(MappingState.name)

  private isFirstTimeMapping = true

  private locationCloudStorageModule

  private mappingSession: MappingSession | null = null

  private script: ScriptComponent

  // The next time that checkpoint can be called
  private nextCheckpointTimeSeconds: number = 0

  // Number of times the checkpoint has been called
  private checkpointCalls = 0

  constructor(
    private readonly input: MappingStateInput,
    private readonly stateMachine: StateMachine,
    private readonly projectContainer: ProjectContainer,
    private onFlowComplete: (mapUploaded: boolean) => void
  ) {
    this.tutorial = new Tutorial(input.tutorialNotificationInput, input.tutorialParametersInput)
    this.progressBar = new ProgressBar(input.mappingProgressInput, input.progressBarParametersInput)
    this.textMappingHint = new TextMappingHint(input.textMappingHintInput, input.textMappingHintTimingsInput)
    this.delayedEvent = input.script.createEvent("DelayedCallbackEvent")
    this.delayedEvent.bind(() => {
      stateMachine.enterState(MappingUnsuccessfulState.name)
    })
    this.script = input.script
  }

  enter(): void {
    this.mappingSession = SessionController.getInstance().getMappingSession()
    this.locationCloudStorageModule = SessionController.getInstance().getLocationCloudStorageModule()
    if (this.isFirstTimeMapping) {
      this.setupBuilding()
      this.tutorial.start(TutorialTypeEnum.TutorialP1)
    }
    this.progressBar.start()
    this.textMappingHint.start(
      MAPPING_HINTS_P1,
      this.tutorial.getDurationByAnimationType(TutorialTypeEnum.TutorialP1) + 3
    )
    this.delayedEvent.reset(this.mappingWaitingTime)
    this.projectContainer.startPointPosition = this.worldCameraTransform.getWorldPosition()
    const back = this.worldCameraTransform.back
    back.y = 0
    this.projectContainer.startPointRotation = quat.lookAt(back, vec3.up())
    this.isFirstTimeMapping = false
  }

  exit(): void {
    this.delayedEvent.cancel()
    this.tutorial.stop()
    this.progressBar.stop()
    this.textMappingHint.stop()
  }

  private setupBuilding() {
    this.startBuilding()

    this.mappingSession.onMapped.add((location) => this.onFinishedMapping(location))
    SessionController.getInstance().notifyOnLocatedAtFound(() => this.onLocatedAtFound())
    this.tryCheckpoint()
  }

  private onFinishedMapping(location: LocationAsset) {
    this.log.i("Mapping finished")
    SessionController.getInstance().setColocatedBuildStatus(ColocatedBuildStatus.Built)
    this.onFlowComplete(true)
    this.uploadMap(location)

    // Always set the local location to the native coordinate frame, since it's faster.
    // The native coordinate frame is the same as the one that is used in the created map.
    SessionController.getInstance().getLocatedAtComponent().location = LocationAsset.getAROrigin()

    // Only enter the successful state if we're mapping, or showing the unsuccessful state.
    // This is to avoid entering the successful state if the user has already mapped.
    if (
      this.stateMachine.currentState.name === MappingUnsuccessfulState.name ||
      this.stateMachine.currentState.name === MappingState.name
    ) {
      this.stateMachine.enterState(MappingSuccessfulState.name)
    }
  }

  private uploadMap(location: LocationAsset) {
    // Upload the map, unless we're using a fake location (e.g. in the editor).
    if (location === LocationAsset.getAROrigin()) {
      this.log.i("Not uploading map, using fake location")
      delayFrames(this.script, 30, () => this.storeLocationSuccess("LocalMap"))
    } else {
      this.log.i(`Storing custom location with id: ${location}`)
      this.locationCloudStorageModule.storeLocation(
        location,
        (locationId: string) => this.storeLocationSuccess(locationId),
        (locationId: string) => this.storeLocationFailure(locationId)
      )
    }
  }

  tryCheckpoint() {
    // We need to check quality because lens studio has a bug in the snapCV implementation
    if (this.mappingSession.quality < 1.0) {
      this.log.i("Not checkpointing, quality too low: " + this.mappingSession.quality)
      setTimeout(
        SessionController.getInstance().script,
        () => {
          this.tryCheckpoint()
        },
        1000
      )
    } else {
      const currentTime = getTime()
      const timeToCheckpoint = this.nextCheckpointTimeSeconds - currentTime

      if (timeToCheckpoint > 0) {
        // We need to wait for the next checkpoint, so set a timer
        this.log.i(`Not checkpointing yet, waiting for ${timeToCheckpoint} seconds`)
        setTimeout(
          SessionController.getInstance().script,
          () => {
            this.tryCheckpoint()
          },
          timeToCheckpoint * 1000
        )
      } else {
        // We can checkpoint immediately
        this.doCheckpoint()
      }
    }
  }

  doCheckpoint() {
    this.log.i("Doing checkpoint")
    this.mappingSession.checkpoint()

    // Calculate when we can call checkpoint again
    const checkpointIndex = Math.min(CHECKPOINT_INTERVALS.length - 1, this.checkpointCalls)
    const timeToCheckpointSeconds = CHECKPOINT_INTERVALS[checkpointIndex]
    this.checkpointCalls++
    this.nextCheckpointTimeSeconds = getTime() + timeToCheckpointSeconds
  }

  storeLocationSuccess(locationId: string): void {
    this.log.i("Stored custom location: " + locationId)

    SessionController.getInstance().setColocatedMapId(locationId)

    this.tryCheckpoint()
  }

  private storeLocationFailure(err: string) {
    this.log.i("[MappingFlow] Failure:" + err.toString())

    if (global.deviceInfoSystem.isEditor()) {
      // Expected to fail in the editor
      this.log.i("[MappingFlow] Failed in the editor")
    }
  }

  private onLocatedAtFound() {
    this.log.i("[MappingFlow] Location Found")
  }

  private startBuilding() {
    SessionController.getInstance().setIsUserMapper(true)
    SessionController.getInstance().setColocatedBuildStatus(ColocatedBuildStatus.Building)
  }
}
