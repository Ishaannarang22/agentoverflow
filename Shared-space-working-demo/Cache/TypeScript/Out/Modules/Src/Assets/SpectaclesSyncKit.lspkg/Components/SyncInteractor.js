"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncInteractor = void 0;
var __selfType = requireType("./SyncInteractor");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const BaseInteractor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/BaseInteractor");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
let SyncInteractor = class SyncInteractor extends BaseInteractor_1.default {
    onAwake() {
        super.inputType = Interactor_1.InteractorInputType.Sync;
    }
    /**
     * Because SyncInteractionManager dispatches events to InteractionManager and updates all SyncInteractors, it is not
     * necessary to update state and invoke events during the typical InteractionManager update loop.
     */
    updateState() { }
    /**
     * @inheritdoc
     */
    get startPoint() {
        return this.interactorState.startPoint;
    }
    /**
     * @inheritdoc
     */
    get endPoint() {
        return this.interactorState.endPoint;
    }
    /**
     * @inheritdoc
     */
    get planecastPoint() {
        return this.interactorState.planecastPoint;
    }
    /**
     * @inheritdoc
     */
    get direction() {
        return this.interactorState.direction;
    }
    /**
     * @inheritdoc
     */
    get orientation() {
        return this.interactorState.orientation;
    }
    /**
     * @inheritdoc
     */
    get distanceToTarget() {
        return this.interactorState.distanceToTarget;
    }
    /**
     * @inheritdoc
     */
    get targetHitPosition() {
        return this.interactorState.targetHitPosition;
    }
    /**
     * @inheritdoc
     */
    get targetHitInfo() {
        return this.interactorState.targetHitInfo; // will have to reconstruct this
    }
    /**
     * @inheritdoc
     */
    get maxRaycastDistance() {
        return this.interactorState.maxRaycastDistance;
    }
    /**
     * @inheritdoc
     */
    get activeTargetingMode() {
        return this.interactorState.activeTargetingMode;
    }
    /**
     * @inheritdoc
     */
    get interactionStrength() {
        return this.interactorState.interactionStrength;
    }
    /**
     * @inheritdoc
     */
    isTargeting() {
        return this.interactorState.isTargeting;
    }
    /**
     * @inheritdoc
     */
    isActive() {
        return this.interactorState.isActive;
    }
    /**
     * @inheritdoc
     */
    get inputType() {
        return super.inputType | this.interactorState.inputType;
    }
    /**
     * @inheritdoc
     */
    get currentInteractable() {
        return this.interactorState.currentInteractable;
    }
    /**
     * @inheritdoc
     */
    get previousInteractable() {
        return this.interactorState.previousInteractable;
    }
    /**
     * @inheritdoc
     */
    get currentTrigger() {
        return this.interactorState.currentTrigger;
    }
    /**
     * @inheritdoc
     */
    get previousTrigger() {
        return this.interactorState.previousTrigger;
    }
    /**
     * @inheritdoc
     */
    get currentDragVector() {
        return this.interactorState.currentDragVector;
    }
    /**
     * @inheritdoc
     */
    get previousDragVector() {
        return this.interactorState.previousDragVector;
    }
    /**
     * @inheritdoc
     */
    get planecastDragVector() {
        return this.interactorState.planecastDragVector;
    }
    /**
     * @inheritdoc
     */
    get dragType() {
        return this.interactorState.dragType;
    }
    clearCurrentHitInfo() { }
    /**
     * @inheritdoc
     */
    set drawDebug(debug) { }
    /**
     * @inheritdoc
     */
    get drawDebug() {
        return false;
    }
    __initialize() {
        super.__initialize();
        this.interactorState = {
            startPoint: null,
            endPoint: null,
            planecastPoint: null,
            direction: null,
            orientation: null,
            distanceToTarget: null,
            targetHitPosition: null,
            targetHitInfo: null,
            maxRaycastDistance: 0,
            activeTargetingMode: Interactor_1.TargetingMode.None,
            interactionStrength: null,
            isTargeting: false,
            isActive: false,
            currentInteractable: null,
            previousInteractable: null,
            currentTrigger: Interactor_1.InteractorTriggerType.None,
            previousTrigger: Interactor_1.InteractorTriggerType.None,
            currentDragVector: null,
            previousDragVector: null,
            planecastDragVector: null,
            dragType: null,
            inputType: Interactor_1.InteractorInputType.None
        };
    }
};
exports.SyncInteractor = SyncInteractor;
exports.SyncInteractor = SyncInteractor = __decorate([
    component
    /**
     * The SyncInteractor component is not meant to be manually instantiated by developers.
     * This Interactor is automatically instantiated by SyncInteractionManager when detecting a connection from anothe device.
     * By caching the state of another connection's Interactor at the time of an event, this Interactor returns all the necessary information
     * for an Interactable callback to still function properly.
     * Since SyncInteractionManager handles the dispatching of events from other connections, SyncInteractor should not be processed in InteractionManager.
     */
], SyncInteractor);
//# sourceMappingURL=SyncInteractor.js.map