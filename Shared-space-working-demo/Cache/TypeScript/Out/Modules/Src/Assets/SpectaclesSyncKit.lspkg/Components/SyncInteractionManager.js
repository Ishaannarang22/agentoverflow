"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncInteractionManager = void 0;
var __selfType = requireType("./SyncInteractionManager");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const NetworkIdTools_1 = require("../Core/NetworkIdTools");
const NetworkIdType_1 = require("../Core/NetworkIdType");
const PersistenceType_1 = require("../Core/PersistenceType");
const SessionController_1 = require("../Core/SessionController");
const SyncEntity_1 = require("../Core/SyncEntity");
const SyncInteractor_1 = require("./SyncInteractor");
// The key for storing interactor events in the realtime datastore.
const SYNC_INTERACTOR_EVENT_KEY = "_SyncInteractorEvent";
const SYNC_LEFT_HAND_INTERACTOR_INDEX = 0;
const SYNC_RIGHT_HAND_INTERACTOR_INDEX = 1;
const SYNC_MOBILE_INTERACTOR_INDEX = 2;
const SYNC_MOUSE_INTERACTOR_INDEX = 3;
const INDEX_BY_INTERACTOR_INPUT_TYPE = new Map([
    [Interactor_1.InteractorInputType.LeftHand, SYNC_LEFT_HAND_INTERACTOR_INDEX],
    [Interactor_1.InteractorInputType.RightHand, SYNC_RIGHT_HAND_INTERACTOR_INDEX],
    [Interactor_1.InteractorInputType.Mobile, SYNC_MOBILE_INTERACTOR_INDEX],
    [Interactor_1.InteractorInputType.Mouse, SYNC_MOUSE_INTERACTOR_INDEX]
]);
/**
 * Add this to any SceneObject to automatically synchronize its position, rotation, and/or scale,
 * depending on the settings chosen in the Inspector panel.
 */
let SyncInteractionManager = class SyncInteractionManager extends BaseScriptComponent {
    setupConnectionCallbacks() {
        this.createEvent("UpdateEvent").bind(this.update.bind(this));
        this.syncEntity.storeCallbacks.onStoreUpdated.add(this.processStoreUpdate.bind(this));
    }
    // Whenever the local InteractionManager dispatches an event, propagate that event to the realtime datastore.
    update() {
        const dispatchEventsArgs = this.interactionManager.dispatchEventArgs;
        const dispatchEventStrings = [];
        for (const pendingEvent of dispatchEventsArgs) {
            dispatchEventStrings.push(JSON.stringify(this.serializeEventDispatch(pendingEvent)));
        }
        // Store this frame's events into a string array using the connectionId as key.
        this.syncEntity.currentStore.putStringArray(`${SessionController_1.SessionController.getInstance().getLocalConnectionId()}${SYNC_INTERACTOR_EVENT_KEY}`, dispatchEventStrings);
    }
    // Whenever another connection's InteractionManager dispatches an event, process the event strings from the realtime datastore.
    processStoreUpdate(session, store, key, info) {
        const connectionId = info.updaterInfo.connectionId;
        const updatedByLocal = connectionId === SessionController_1.SessionController.getInstance().getLocalConnectionId();
        if (key.endsWith(SYNC_INTERACTOR_EVENT_KEY) && !updatedByLocal) {
            // If the event comes from a new connection, create SyncInteractors for that connection.
            const isNewConnection = !this.syncInteractorsByConnectionId.has(connectionId);
            if (isNewConnection) {
                const syncInteractors = [];
                for (let i = 0; i < INDEX_BY_INTERACTOR_INPUT_TYPE.size; i++) {
                    syncInteractors.push(this.sceneObject.createComponent(SyncInteractor_1.SyncInteractor.getTypeName()));
                }
                this.syncInteractorsByConnectionId.set(connectionId, syncInteractors);
            }
            // Retrieve the batched array of stringified events during another user's frame.
            const eventStringArray = store.getStringArray(key);
            // Parse the stringified events into SyncInteractorEvents and dispatch them to the local InteractionManager.
            const parsedEvents = this.parseEventDispatch(eventStringArray);
            this.dispatchSyncInteractorEvents(parsedEvents);
        }
    }
    dispatchSyncInteractorEvents(events) {
        // For each event propagated from a different connection, dispatch an event to the local InteractionManager.
        for (const event of events) {
            const syncInteractors = this.syncInteractorsByConnectionId.get(event.connectionId);
            const inputType = event.syncInteractorState.inputType;
            const index = INDEX_BY_INTERACTOR_INPUT_TYPE.get(inputType);
            const syncInteractor = syncInteractors[index];
            const interactable = this.findInteractableById(event.targetId);
            // If the Interactable from a propagated event does not exist in the local instance, ignore the event.
            if (interactable !== null) {
                const dispatchableEventArgs = {
                    interactor: syncInteractor,
                    target: interactable,
                    eventName: event.eventName,
                    connectionId: event.connectionId
                };
                // Set the state of the SyncInteractor so that any callbacks that reference the event Interactor will still function.
                syncInteractor.interactorState = event.syncInteractorState;
                this.interactionManager.dispatchEvent(dispatchableEventArgs);
            }
        }
    }
    serializeEventDispatch(event) {
        return {
            interactor: serializeInteractor(event.interactor),
            target: serializeInteractable(event.target),
            eventName: event.eventName,
            origin: serializeInteractable(event.origin),
            connectionId: event.connectionId
        };
    }
    parseEventDispatch(eventStringArray) {
        const events = [];
        // Parse each individual string into a SyncInteractorEvent.
        for (const eventString of eventStringArray) {
            const parsedJson = JSON.parse(eventString);
            const connectionId = parsedJson.connectionId;
            const eventName = parsedJson.eventName;
            const targetId = parsedJson.target.id;
            const interactorState = parseInteractor(parsedJson.interactor);
            const event = {
                connectionId: connectionId,
                eventName: eventName,
                targetId: targetId,
                syncInteractorState: interactorState
            };
            events.push(event);
        }
        return events;
    }
    // [SyncInteractable] This function works under the assumption that all Interactables are instantiated in every connection.
    // Further refinement to linking Interactables across connections w/o developer friction will happen on future iterations.
    findInteractableById(id) {
        const interactable = this.interactionManager.getInteractableByInteractableId(id);
        return interactable;
    }
    __initialize() {
        super.__initialize();
        this.networkIdType = NetworkIdType_1.NetworkIdType.Custom;
        this.customNetworkId = "SyncInteractionManager";
        this.persistenceString = "Session";
        this.persistence = (0, PersistenceType_1.persistenceTypeFromString)(this.persistenceString);
        this.interactionManager = SIK_1.SIK.InteractionManager;
        this.syncInteractorsByConnectionId = new Map();
        this.syncEntity = new SyncEntity_1.SyncEntity(this, undefined, false, this.persistence, new NetworkIdTools_1.NetworkIdOptions(this.networkIdType, this.customNetworkId));
        this.syncEntity.notifyOnReady(this.setupConnectionCallbacks.bind(this));
    }
};
exports.SyncInteractionManager = SyncInteractionManager;
exports.SyncInteractionManager = SyncInteractionManager = __decorate([
    component
], SyncInteractionManager);
function serializeVec3(vec) {
    if (vec === null) {
        return null;
    }
    return {
        x: vec.x,
        y: vec.y,
        z: vec.z
    };
}
function parseVec3(object) {
    if (object === null) {
        return null;
    }
    return new vec3(object.x, object.y, object.z);
}
function serializeQuat(quat) {
    if (quat === null) {
        return null;
    }
    return {
        w: quat.w,
        x: quat.x,
        y: quat.y,
        z: quat.z
    };
}
function parseQuat(object) {
    if (object === null) {
        return null;
    }
    return new quat(object.w, object.x, object.y, object.z);
}
// [SyncInteractable] This function works under the assumption that all Interactables are instantiated in every connection.
// Further refinement to linking Interactables across connections w/o developer friction will happen on future iterations.
function serializeInteractable(interactable) {
    if (interactable === null) {
        return null;
    }
    return {
        id: SIK_1.SIK.InteractionManager.getInteractableIdByInteractable(interactable)
    };
}
function parseInteractable(object) {
    if (object === null) {
        return null;
    }
    return SIK_1.SIK.InteractionManager.getInteractableByInteractableId(object.id);
}
// Collider and TriangleHit are much harder to mock, so the raycast hit will only include simpler types.
function serializeRaycastHit(hit) {
    if (hit === null) {
        return null;
    }
    return {
        position: serializeVec3(hit.position),
        distance: hit.distance,
        normal: serializeVec3(hit.normal),
        skipRemaining: hit.skipRemaining,
        t: hit.t
    };
}
function parseRaycastHit(object) {
    if (object === null) {
        return null;
    }
    return {
        position: parseVec3(object.position),
        distance: object.distance,
        collider: null,
        normal: parseVec3(object.normal),
        skipRemaining: object.skipRemaining,
        t: object.t,
        triangle: null,
        getTypeName: null,
        isOfType: null,
        isSame: null
    };
}
function serializeInteractableHitInfo(hitInfo) {
    if (hitInfo === null) {
        return null;
    }
    return {
        interactable: serializeInteractable(hitInfo.interactable),
        localHitPosition: serializeVec3(hitInfo.localHitPosition),
        hit: serializeRaycastHit(hitInfo.hit),
        targetMode: hitInfo.targetMode
    };
}
function parseInteractableHitInfo(object) {
    if (object === null) {
        return null;
    }
    return {
        interactable: parseInteractable(object.interactable),
        localHitPosition: parseVec3(object.localHitPosition),
        hit: parseRaycastHit(object.hit),
        targetMode: object.targetMode
    };
}
function serializeInteractor(interactor) {
    return {
        startPoint: serializeVec3(interactor.startPoint),
        endPoint: serializeVec3(interactor.endPoint),
        planecastPoint: serializeVec3(interactor.planecastPoint),
        direction: serializeVec3(interactor.direction),
        orientation: serializeQuat(interactor.orientation),
        distanceToTarget: interactor.distanceToTarget,
        targetHitPosition: serializeVec3(interactor.targetHitPosition),
        targetHitInfo: serializeInteractableHitInfo(interactor.targetHitInfo),
        maxRaycastDistance: interactor.maxRaycastDistance,
        activeTargetingMode: interactor.activeTargetingMode,
        interactionStrength: interactor.interactionStrength,
        isTargeting: interactor.isTargeting(),
        isActive: interactor.isActive(),
        currentInteractable: serializeInteractable(interactor.currentInteractable),
        previousInteractable: serializeInteractable(interactor.previousInteractable),
        currentTrigger: interactor.currentTrigger,
        previousTrigger: interactor.previousTrigger,
        currentDragVector: serializeVec3(interactor.currentDragVector),
        previousDragVector: serializeVec3(interactor.previousDragVector),
        planecastDragVector: serializeVec3(interactor.planecastDragVector),
        dragType: interactor.dragType,
        inputType: interactor.inputType
    };
}
function parseInteractor(object) {
    return {
        startPoint: parseVec3(object.startPoint),
        endPoint: parseVec3(object.endPoint),
        planecastPoint: parseVec3(object.planecastPoint),
        direction: parseVec3(object.direction),
        orientation: parseQuat(object.orientation),
        distanceToTarget: object.distanceToTarget,
        targetHitPosition: parseVec3(object.targetHitPosition),
        targetHitInfo: parseInteractableHitInfo(object.targetHitInfo),
        maxRaycastDistance: object.maxRaycastDistance,
        activeTargetingMode: object.activeTargetingMode,
        interactionStrength: object.interactionStrength,
        isTargeting: object.isTargeting,
        isActive: object.isActive,
        currentInteractable: parseInteractable(object.currentInteractable),
        previousInteractable: parseInteractable(object.previousInteractable),
        currentTrigger: object.currentTrigger,
        previousTrigger: object.previousTrigger,
        currentDragVector: parseVec3(object.currentDragVector),
        previousDragVector: parseVec3(object.previousDragVector),
        planecastDragVector: parseVec3(object.planecastDragVector),
        dragType: object.dragType,
        inputType: object.inputType
    };
}
//# sourceMappingURL=SyncInteractionManager.js.map