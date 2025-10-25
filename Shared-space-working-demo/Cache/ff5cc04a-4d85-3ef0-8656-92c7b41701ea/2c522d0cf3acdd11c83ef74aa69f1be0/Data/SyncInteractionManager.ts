import {Interactable} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import {InteractionManager} from "SpectaclesInteractionKit.lspkg/Core/InteractionManager/InteractionManager"
import {Interactor, InteractorInputType} from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor"
import {
  DispatchableEventArgs,
  InteractableEventName
} from "SpectaclesInteractionKit.lspkg/Core/Interactor/InteractorEvent"
import {InteractableHitInfo} from "SpectaclesInteractionKit.lspkg/Providers/TargetProvider/TargetProvider"
import {SIK} from "SpectaclesInteractionKit.lspkg/SIK"
import {NetworkIdOptions} from "../Core/NetworkIdTools"
import {NetworkIdType} from "../Core/NetworkIdType"
import {persistenceTypeFromString} from "../Core/PersistenceType"
import {SessionController} from "../Core/SessionController"
import {SyncEntity} from "../Core/SyncEntity"
import {SyncInteractor, SyncInteractorState} from "./SyncInteractor"

export type SyncInteractorEvent = {
  connectionId: string
  eventName: string
  targetId: string
  syncInteractorState: SyncInteractorState
}

// The key for storing interactor events in the realtime datastore.
const SYNC_INTERACTOR_EVENT_KEY = "_SyncInteractorEvent"

const SYNC_LEFT_HAND_INTERACTOR_INDEX = 0
const SYNC_RIGHT_HAND_INTERACTOR_INDEX = 1
const SYNC_MOBILE_INTERACTOR_INDEX = 2
const SYNC_MOUSE_INTERACTOR_INDEX = 3

const INDEX_BY_INTERACTOR_INPUT_TYPE = new Map<InteractorInputType, number>([
  [InteractorInputType.LeftHand, SYNC_LEFT_HAND_INTERACTOR_INDEX],
  [InteractorInputType.RightHand, SYNC_RIGHT_HAND_INTERACTOR_INDEX],
  [InteractorInputType.Mobile, SYNC_MOBILE_INTERACTOR_INDEX],
  [InteractorInputType.Mouse, SYNC_MOUSE_INTERACTOR_INDEX]
])

/**
 * Add this to any SceneObject to automatically synchronize its position, rotation, and/or scale,
 * depending on the settings chosen in the Inspector panel.
 */
@component
export class SyncInteractionManager extends BaseScriptComponent {
  private readonly networkIdType: NetworkIdType = NetworkIdType.Custom
  private readonly customNetworkId: string = "SyncInteractionManager"

  @ui.separator
  private readonly persistenceString: string = "Session"
  private readonly persistence: RealtimeStoreCreateOptions.Persistence = persistenceTypeFromString(
    this.persistenceString
  )

  private interactionManager: InteractionManager = SIK.InteractionManager

  private syncInteractorsByConnectionId: Map<string, SyncInteractor[]> = new Map<string, SyncInteractor[]>()

  private readonly syncEntity = new SyncEntity(
    this,
    undefined,
    false,
    this.persistence,
    new NetworkIdOptions(this.networkIdType, this.customNetworkId)
  )

  constructor() {
    super()

    this.syncEntity.notifyOnReady(this.setupConnectionCallbacks.bind(this))
  }

  private setupConnectionCallbacks(): void {
    this.createEvent("UpdateEvent").bind(this.update.bind(this))

    this.syncEntity.storeCallbacks.onStoreUpdated.add(this.processStoreUpdate.bind(this))
  }

  // Whenever the local InteractionManager dispatches an event, propagate that event to the realtime datastore.
  private update() {
    const dispatchEventsArgs = this.interactionManager.dispatchEventArgs

    const dispatchEventStrings = []
    for (const pendingEvent of dispatchEventsArgs) {
      dispatchEventStrings.push(JSON.stringify(this.serializeEventDispatch(pendingEvent)))
    }

    // Store this frame's events into a string array using the connectionId as key.
    this.syncEntity.currentStore.putStringArray(
      `${SessionController.getInstance().getLocalConnectionId()}${SYNC_INTERACTOR_EVENT_KEY}`,
      dispatchEventStrings
    )
  }

  // Whenever another connection's InteractionManager dispatches an event, process the event strings from the realtime datastore.
  private processStoreUpdate(
    session: MultiplayerSession,
    store: GeneralDataStore,
    key: string,
    info: ConnectedLensModule.RealtimeStoreUpdateInfo
  ) {
    const connectionId = info.updaterInfo.connectionId
    const updatedByLocal = connectionId === SessionController.getInstance().getLocalConnectionId()
    if (key.endsWith(SYNC_INTERACTOR_EVENT_KEY) && !updatedByLocal) {
      // If the event comes from a new connection, create SyncInteractors for that connection.
      const isNewConnection = !this.syncInteractorsByConnectionId.has(connectionId)

      if (isNewConnection) {
        const syncInteractors = []

        for (let i = 0; i < INDEX_BY_INTERACTOR_INPUT_TYPE.size; i++) {
          syncInteractors.push(this.sceneObject.createComponent(SyncInteractor.getTypeName()))
        }

        this.syncInteractorsByConnectionId.set(connectionId, syncInteractors)
      }

      // Retrieve the batched array of stringified events during another user's frame.
      const eventStringArray = store.getStringArray(key)

      // Parse the stringified events into SyncInteractorEvents and dispatch them to the local InteractionManager.
      const parsedEvents = this.parseEventDispatch(eventStringArray)
      this.dispatchSyncInteractorEvents(parsedEvents)
    }
  }

  private dispatchSyncInteractorEvents(events: SyncInteractorEvent[]): void {
    // For each event propagated from a different connection, dispatch an event to the local InteractionManager.
    for (const event of events) {
      const syncInteractors = this.syncInteractorsByConnectionId.get(event.connectionId)
      const inputType = event.syncInteractorState.inputType
      const index = INDEX_BY_INTERACTOR_INPUT_TYPE.get(inputType)

      const syncInteractor = syncInteractors[index]

      const interactable = this.findInteractableById(event.targetId)

      // If the Interactable from a propagated event does not exist in the local instance, ignore the event.
      if (interactable !== null) {
        const dispatchableEventArgs: DispatchableEventArgs = {
          interactor: syncInteractor,
          target: interactable,
          eventName: event.eventName as InteractableEventName,
          connectionId: event.connectionId
        }

        // Set the state of the SyncInteractor so that any callbacks that reference the event Interactor will still function.
        syncInteractor.interactorState = event.syncInteractorState

        this.interactionManager.dispatchEvent(dispatchableEventArgs)
      }
    }
  }

  private serializeEventDispatch(event: DispatchableEventArgs): DispatchableEventArgsSerialized {
    return {
      interactor: serializeInteractor(event.interactor),
      target: serializeInteractable(event.target),
      eventName: event.eventName,
      origin: serializeInteractable(event.origin),
      connectionId: event.connectionId
    }
  }

  private parseEventDispatch(eventStringArray: string[]): SyncInteractorEvent[] {
    const events: SyncInteractorEvent[] = []

    // Parse each individual string into a SyncInteractorEvent.
    for (const eventString of eventStringArray) {
      const parsedJson = JSON.parse(eventString) as DispatchableEventArgsSerialized

      const connectionId = parsedJson.connectionId
      const eventName = parsedJson.eventName
      const targetId = parsedJson.target.id

      const interactorState = parseInteractor(parsedJson.interactor)

      const event: SyncInteractorEvent = {
        connectionId: connectionId,
        eventName: eventName,
        targetId: targetId,
        syncInteractorState: interactorState
      }

      events.push(event)
    }

    return events
  }

  // [SyncInteractable] This function works under the assumption that all Interactables are instantiated in every connection.
  // Further refinement to linking Interactables across connections w/o developer friction will happen on future iterations.
  private findInteractableById(id: string): Interactable | null {
    const interactable = this.interactionManager.getInteractableByInteractableId(id)

    return interactable
  }
}

// The following functions are serialize/parse-related types and functions to help translate a dispatched event
// as SyncKit must use primitive types as the way to communicate via realtime datastore.

type Vec3Serialized = {
  x: number
  y: number
  z: number
} | null

type QuatSerialized = {
  w: number
  x: number
  y: number
  z: number
} | null

type InteractableSerialized = {
  id: string
} | null

type RayCastHitSerialized = {
  position: Vec3Serialized
  distance: number
  normal: Vec3Serialized
  skipRemaining: boolean
  t: number
} | null

type InteractableHitInfoSerialized = {
  interactable: InteractableSerialized
  localHitPosition: Vec3Serialized
  hit: RayCastHitSerialized
  targetMode: number
} | null

type InteractorSerialized = {
  startPoint: Vec3Serialized
  endPoint: Vec3Serialized
  planecastPoint: Vec3Serialized
  direction: Vec3Serialized
  orientation: QuatSerialized
  distanceToTarget: number
  targetHitPosition: Vec3Serialized
  targetHitInfo: InteractableHitInfoSerialized
  maxRaycastDistance: number
  activeTargetingMode: number
  interactionStrength: number
  isTargeting: boolean
  isActive: boolean
  currentInteractable: InteractableSerialized
  previousInteractable: InteractableSerialized
  currentTrigger: number
  previousTrigger: number
  currentDragVector: Vec3Serialized
  previousDragVector: Vec3Serialized
  planecastDragVector: Vec3Serialized
  dragType: number
  inputType: number
}

type DispatchableEventArgsSerialized = {
  interactor: InteractorSerialized
  target: InteractableSerialized
  eventName: string
  origin: InteractableSerialized
  connectionId: string
}

function serializeVec3(vec: vec3 | null): Vec3Serialized {
  if (vec === null) {
    return null
  }

  return {
    x: vec.x,
    y: vec.y,
    z: vec.z
  }
}

function parseVec3(object: Vec3Serialized): vec3 | null {
  if (object === null) {
    return null
  }

  return new vec3(object.x, object.y, object.z)
}

function serializeQuat(quat: quat | null): QuatSerialized {
  if (quat === null) {
    return null
  }

  return {
    w: quat.w,
    x: quat.x,
    y: quat.y,
    z: quat.z
  }
}

function parseQuat(object: QuatSerialized): quat | null {
  if (object === null) {
    return null
  }

  return new quat(object.w, object.x, object.y, object.z)
}

// [SyncInteractable] This function works under the assumption that all Interactables are instantiated in every connection.
// Further refinement to linking Interactables across connections w/o developer friction will happen on future iterations.
function serializeInteractable(interactable: Interactable | null): InteractableSerialized {
  if (interactable === null) {
    return null
  }

  return {
    id: SIK.InteractionManager.getInteractableIdByInteractable(interactable)
  }
}

function parseInteractable(object: InteractableSerialized): Interactable | null {
  if (object === null) {
    return null
  }

  return SIK.InteractionManager.getInteractableByInteractableId(object.id)
}

// Collider and TriangleHit are much harder to mock, so the raycast hit will only include simpler types.
function serializeRaycastHit(hit: RayCastHit | null): RayCastHitSerialized {
  if (hit === null) {
    return null
  }

  return {
    position: serializeVec3(hit.position),
    distance: hit.distance,
    normal: serializeVec3(hit.normal),
    skipRemaining: hit.skipRemaining,
    t: hit.t
  } as RayCastHitSerialized
}

function parseRaycastHit(object: RayCastHitSerialized): RayCastHit | null {
  if (object === null) {
    return null
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
  }
}

function serializeInteractableHitInfo(hitInfo: InteractableHitInfo | null): InteractableHitInfoSerialized {
  if (hitInfo === null) {
    return null
  }

  return {
    interactable: serializeInteractable(hitInfo.interactable),
    localHitPosition: serializeVec3(hitInfo.localHitPosition),
    hit: serializeRaycastHit(hitInfo.hit),
    targetMode: hitInfo.targetMode
  }
}

function parseInteractableHitInfo(object: InteractableHitInfoSerialized): InteractableHitInfo | null {
  if (object === null) {
    return null
  }

  return {
    interactable: parseInteractable(object.interactable),
    localHitPosition: parseVec3(object.localHitPosition),
    hit: parseRaycastHit(object.hit),
    targetMode: object.targetMode
  }
}

function serializeInteractor(interactor: Interactor): InteractorSerialized {
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
  }
}

function parseInteractor(object: InteractorSerialized): SyncInteractorState {
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
  }
}
