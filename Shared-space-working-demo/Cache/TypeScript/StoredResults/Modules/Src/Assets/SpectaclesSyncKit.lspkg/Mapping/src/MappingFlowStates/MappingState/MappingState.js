"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingState = void 0;
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
const SessionController_1 = require("../../../../Core/SessionController");
const SyncKitLogger_1 = require("../../../../Utils/SyncKitLogger");
const Timers_1 = require("../../../../Utils/Timers");
const TextValues_1 = require("../../Texts/TextValues");
const ProgressBar_1 = require("../../UI/MappingFlow/ProgressBar/ProgressBar");
const TextMappingHint_1 = require("../../UI/MappingFlow/TextMappingHint/TextMappingHint");
const Tutorial_1 = require("../../UI/MappingFlow/Tutorial/Tutorial");
const TutorialTypeEnum_1 = require("../../UI/MappingFlow/Tutorial/TutorialTypeEnum");
const SharedFunctions_1 = require("../../Utils/SharedFunctions");
const MappingSuccessfulState_1 = require("../MappingSuccessfulState/MappingSuccessfulState");
const MappingUnsuccessfulState_1 = require("../MappingUnsuccessfulState/MappingUnsuccessfulState");
// How frequently to checkpoint the map, in seconds
// The first checkpoint is always done immediately, and subsequent checkpoints are done according to this series.
// Calls after the last value in the array will use the last value.
const CHECKPOINT_INTERVALS = [15, 30, 60];
class MappingState {
    constructor(input, stateMachine, projectContainer, onFlowComplete) {
        this.input = input;
        this.stateMachine = stateMachine;
        this.projectContainer = projectContainer;
        this.onFlowComplete = onFlowComplete;
        this.worldCamera = WorldCameraFinderProvider_1.default.getInstance();
        this.worldCameraTransform = this.worldCamera.getTransform();
        this.mappingWaitingTime = 30;
        this.log = new SyncKitLogger_1.SyncKitLogger(MappingState.name);
        this.isFirstTimeMapping = true;
        this.mappingSession = null;
        // The next time that checkpoint can be called
        this.nextCheckpointTimeSeconds = 0;
        // Number of times the checkpoint has been called
        this.checkpointCalls = 0;
        this.tutorial = new Tutorial_1.Tutorial(input.tutorialNotificationInput, input.tutorialParametersInput);
        this.progressBar = new ProgressBar_1.ProgressBar(input.mappingProgressInput, input.progressBarParametersInput);
        this.textMappingHint = new TextMappingHint_1.TextMappingHint(input.textMappingHintInput, input.textMappingHintTimingsInput);
        this.delayedEvent = input.script.createEvent("DelayedCallbackEvent");
        this.delayedEvent.bind(() => {
            stateMachine.enterState(MappingUnsuccessfulState_1.MappingUnsuccessfulState.name);
        });
        this.script = input.script;
    }
    enter() {
        this.mappingSession = SessionController_1.SessionController.getInstance().getMappingSession();
        this.locationCloudStorageModule = SessionController_1.SessionController.getInstance().getLocationCloudStorageModule();
        if (this.isFirstTimeMapping) {
            this.setupBuilding();
            this.tutorial.start(TutorialTypeEnum_1.TutorialTypeEnum.TutorialP1);
        }
        this.progressBar.start();
        this.textMappingHint.start(TextValues_1.MAPPING_HINTS_P1, this.tutorial.getDurationByAnimationType(TutorialTypeEnum_1.TutorialTypeEnum.TutorialP1) + 3);
        this.delayedEvent.reset(this.mappingWaitingTime);
        this.projectContainer.startPointPosition = this.worldCameraTransform.getWorldPosition();
        const back = this.worldCameraTransform.back;
        back.y = 0;
        this.projectContainer.startPointRotation = quat.lookAt(back, vec3.up());
        this.isFirstTimeMapping = false;
    }
    exit() {
        this.delayedEvent.cancel();
        this.tutorial.stop();
        this.progressBar.stop();
        this.textMappingHint.stop();
    }
    setupBuilding() {
        this.startBuilding();
        this.mappingSession.onMapped.add((location) => this.onFinishedMapping(location));
        SessionController_1.SessionController.getInstance().notifyOnLocatedAtFound(() => this.onLocatedAtFound());
        this.tryCheckpoint();
    }
    onFinishedMapping(location) {
        this.log.i("Mapping finished");
        SessionController_1.SessionController.getInstance().setColocatedBuildStatus(SessionController_1.ColocatedBuildStatus.Built);
        this.onFlowComplete(true);
        this.uploadMap(location);
        // Always set the local location to the native coordinate frame, since it's faster.
        // The native coordinate frame is the same as the one that is used in the created map.
        SessionController_1.SessionController.getInstance().getLocatedAtComponent().location = LocationAsset.getAROrigin();
        // Only enter the successful state if we're mapping, or showing the unsuccessful state.
        // This is to avoid entering the successful state if the user has already mapped.
        if (this.stateMachine.currentState.name === MappingUnsuccessfulState_1.MappingUnsuccessfulState.name ||
            this.stateMachine.currentState.name === MappingState.name) {
            this.stateMachine.enterState(MappingSuccessfulState_1.MappingSuccessfulState.name);
        }
    }
    uploadMap(location) {
        // Upload the map, unless we're using a fake location (e.g. in the editor).
        if (location === LocationAsset.getAROrigin()) {
            this.log.i("Not uploading map, using fake location");
            (0, SharedFunctions_1.delayFrames)(this.script, 30, () => this.storeLocationSuccess("LocalMap"));
        }
        else {
            this.log.i(`Storing custom location with id: ${location}`);
            this.locationCloudStorageModule.storeLocation(location, (locationId) => this.storeLocationSuccess(locationId), (locationId) => this.storeLocationFailure(locationId));
        }
    }
    tryCheckpoint() {
        // We need to check quality because lens studio has a bug in the snapCV implementation
        if (this.mappingSession.quality < 1.0) {
            this.log.i("Not checkpointing, quality too low: " + this.mappingSession.quality);
            (0, Timers_1.setTimeout)(SessionController_1.SessionController.getInstance().script, () => {
                this.tryCheckpoint();
            }, 1000);
        }
        else {
            const currentTime = getTime();
            const timeToCheckpoint = this.nextCheckpointTimeSeconds - currentTime;
            if (timeToCheckpoint > 0) {
                // We need to wait for the next checkpoint, so set a timer
                this.log.i(`Not checkpointing yet, waiting for ${timeToCheckpoint} seconds`);
                (0, Timers_1.setTimeout)(SessionController_1.SessionController.getInstance().script, () => {
                    this.tryCheckpoint();
                }, timeToCheckpoint * 1000);
            }
            else {
                // We can checkpoint immediately
                this.doCheckpoint();
            }
        }
    }
    doCheckpoint() {
        this.log.i("Doing checkpoint");
        this.mappingSession.checkpoint();
        // Calculate when we can call checkpoint again
        const checkpointIndex = Math.min(CHECKPOINT_INTERVALS.length - 1, this.checkpointCalls);
        const timeToCheckpointSeconds = CHECKPOINT_INTERVALS[checkpointIndex];
        this.checkpointCalls++;
        this.nextCheckpointTimeSeconds = getTime() + timeToCheckpointSeconds;
    }
    storeLocationSuccess(locationId) {
        this.log.i("Stored custom location: " + locationId);
        SessionController_1.SessionController.getInstance().setColocatedMapId(locationId);
        this.tryCheckpoint();
    }
    storeLocationFailure(err) {
        this.log.i("[MappingFlow] Failure:" + err.toString());
        if (global.deviceInfoSystem.isEditor()) {
            // Expected to fail in the editor
            this.log.i("[MappingFlow] Failed in the editor");
        }
    }
    onLocatedAtFound() {
        this.log.i("[MappingFlow] Location Found");
    }
    startBuilding() {
        SessionController_1.SessionController.getInstance().setIsUserMapper(true);
        SessionController_1.SessionController.getInstance().setColocatedBuildStatus(SessionController_1.ColocatedBuildStatus.Building);
    }
}
exports.MappingState = MappingState;
//# sourceMappingURL=MappingState.js.map