import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import StateMachine from "SpectaclesInteractionKit.lspkg/Utils/StateMachine"
import {SessionController} from "../../../../Core/SessionController"
import {SyncKitLogger} from "../../../../Utils/SyncKitLogger"
import {MessageTextsEnum} from "../../Texts/MessageTextsEnum"
import {MAPPING_HINTS_CUSTOM_LANDMARK, MAPPING_HINTS_P2} from "../../Texts/TextValues"
import {TextMappingHint} from "../../UI/MappingFlow/TextMappingHint/TextMappingHint"
import {Tutorial} from "../../UI/MappingFlow/Tutorial/Tutorial"
import {TutorialTypeEnum} from "../../UI/MappingFlow/Tutorial/TutorialTypeEnum"
import {ProjectContainer} from "../../Utils/ProjectContainer"
import {MappingCanceledState} from "../MappingCanceledState/MappingCanceledState"
import {MappingSuccessfulState} from "../MappingSuccessfulState/MappingSuccessfulState"
import {MappingUnsuccessfulState} from "../MappingUnsuccessfulState/MappingUnsuccessfulState"
import {JoiningStateInput} from "./JoiningStateInput"

export class JoiningState {
  private readonly worldCamera = WorldCameraFinderProvider.getInstance()

  private readonly worldCameraTransform = this.worldCamera.getTransform()

  private readonly tutorial: Tutorial

  private readonly textMappingHint: TextMappingHint

  private readonly delayedEvent: DelayedCallbackEvent

  private readonly mappingWaitingTime: number = 30

  private readonly log: SyncKitLogger = new SyncKitLogger(JoiningState.name)

  private locatedAtComponent: LocatedAtComponent

  private isFirstTimeMapping = true

  constructor(
    private readonly input: JoiningStateInput,
    private readonly stateMachine: StateMachine,
    private readonly projectContainer: ProjectContainer,
    private onFlowComplete: (mapUploaded: boolean) => void
  ) {
    this.tutorial = new Tutorial(input.tutorialNotificationInput, input.tutorialParametersInput)
    this.textMappingHint = new TextMappingHint(input.textMappingHintInput, input.textMappingHintTimingsInput)
    input.spinner.enabled = false
    this.delayedEvent = input.script.createEvent("DelayedCallbackEvent")
    this.delayedEvent.bind(() => {
      stateMachine.enterState(MappingUnsuccessfulState.name)
    })
  }

  enter(): void {
    if (this.isFirstTimeMapping) {
      if (SessionController.getInstance().getCustomLandmark() !== null) {
        this.log.i(`Joining custom landmark`)

        this.tutorial.start(TutorialTypeEnum.TutorialCustomLandmark)

        this.textMappingHint.start(
          MAPPING_HINTS_CUSTOM_LANDMARK,
          this.tutorial.getDurationByAnimationType(TutorialTypeEnum.TutorialCustomLandmark) + 3
        )
      } else {
        this.log.i(`Joining mapped area`)

        this.tutorial.start(TutorialTypeEnum.TutorialP2)

        this.textMappingHint.start(
          MAPPING_HINTS_P2,
          this.tutorial.getDurationByAnimationType(TutorialTypeEnum.TutorialP2) + 3
        )

        // When using a mapped area, we may need to wait to retrieve the location id
        SessionController.getInstance().notifyOnLocationId(() => {
          if (this.stateMachine.currentState.name === MappingCanceledState.name) {
            return
          }
          const locationId = SessionController.getInstance().getColocatedMapId()

          this.log.i(`Retrieving custom location (${locationId}`)
          const retrieveLocation = (locationId: string) =>
            global.deviceInfoSystem.isEditor()
              ? this.retrieveLocationInEditor(locationId)
              : this.retrieveLocationOnDevice(locationId)

          retrieveLocation(locationId)
            .then((location: LocationAsset) => {
              this.log.i(`Setting location to ${locationId}`)
              this.log.i(`Location unique id: ${location.uniqueIdentifier}`)
              this.locatedAtComponent.location = location
            })
            .catch((error: Error) => {
              this.log.i(`Failed to retrieve location ${locationId}: ${error}`)
            })
        })
      }

      this.input.spinner.enabled = true
      this.locatedAtComponent = SessionController.getInstance().getLocatedAtComponent()
      this.isFirstTimeMapping = false
      this.delayedEvent.reset(this.mappingWaitingTime)

      // This should happen last, as it may immediately exit the state, resetting things that were
      // started above
      SessionController.getInstance().notifyOnLocatedAtFound(() => {
        this.onLocatedAtFound()
      })

      if (global.deviceInfoSystem.isEditor()) {
        this.log.i(`Simulating location found`)
        this.onLocatedAtFound()
      }
    }
  }

  onLocatedAtFound(): void {
    if (this.stateMachine.currentState.name === MappingCanceledState.name) {
      return
    }
    this.onFlowComplete(false)
    this.projectContainer.startPointPosition = this.worldCameraTransform.getWorldPosition()
    const back = this.worldCameraTransform.back
    back.y = 0
    this.projectContainer.startPointRotation = quat.lookAt(back, vec3.up())
    SessionController.getInstance().getSession().sendMessage(MessageTextsEnum.USER_ALIGNED)
    this.stateMachine.enterState(MappingSuccessfulState.name)
  }

  exit(): void {
    this.delayedEvent.cancel()
    this.tutorial.stop()
    this.textMappingHint.stop()
    this.input.spinner.enabled = false
  }

  private async retrieveLocationInEditor(locationId: string) {
    // asset upload not implemented, so download would fail
    this.log.i(`Retrieving custom location [simulator] (${locationId})`)

    return LocationAsset.getAROrigin()
  }

  private retrieveLocationOnDevice(locationId: string): Promise<LocationAsset> {
    this.log.i(`Retrieving custom location (${locationId})`)

    return new Promise<LocationAsset>((resolve, reject) => {
      SessionController.getInstance()
        .getLocationCloudStorageModule()
        .retrieveLocation(
          locationId,
          (location: LocationAsset) => {
            resolve(location)
          },
          (error: string) => {
            reject(new Error(error))
          }
        )
    })
  }
}
