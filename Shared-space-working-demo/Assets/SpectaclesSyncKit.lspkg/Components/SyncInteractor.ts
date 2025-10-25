import {Interactable} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import BaseInteractor from "SpectaclesInteractionKit.lspkg/Core/Interactor/BaseInteractor"
import {
  DragType,
  InteractorInputType,
  InteractorTriggerType,
  TargetingMode
} from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor"
import {InteractableHitInfo} from "SpectaclesInteractionKit.lspkg/Providers/TargetProvider/TargetProvider"

// This type is used to store the state of another connection's Interactor at the time of sending an event across the realtime datastore.
export type SyncInteractorState = {
  startPoint: vec3 | null
  endPoint: vec3 | null
  planecastPoint: vec3 | null
  direction: vec3 | null
  orientation: quat | null
  distanceToTarget: number | null
  targetHitPosition: vec3 | null
  targetHitInfo: InteractableHitInfo | null
  maxRaycastDistance: number
  activeTargetingMode: TargetingMode
  interactionStrength: number | null
  isTargeting: boolean
  isActive: boolean
  currentInteractable: Interactable | null
  previousInteractable: Interactable | null
  currentTrigger: InteractorTriggerType
  previousTrigger: InteractorTriggerType
  currentDragVector: vec3 | null
  previousDragVector: vec3 | null
  planecastDragVector: vec3 | null
  dragType: DragType | null
  inputType: InteractorInputType
}

@component
/**
 * The SyncInteractor component is not meant to be manually instantiated by developers.
 * This Interactor is automatically instantiated by SyncInteractionManager when detecting a connection from anothe device.
 * By caching the state of another connection's Interactor at the time of an event, this Interactor returns all the necessary information
 * for an Interactable callback to still function properly.
 * Since SyncInteractionManager handles the dispatching of events from other connections, SyncInteractor should not be processed in InteractionManager.
 */
export class SyncInteractor extends BaseInteractor {
  interactorState: SyncInteractorState = {
    startPoint: null,
    endPoint: null,
    planecastPoint: null,
    direction: null,
    orientation: null,
    distanceToTarget: null,
    targetHitPosition: null,
    targetHitInfo: null,
    maxRaycastDistance: 0,
    activeTargetingMode: TargetingMode.None,
    interactionStrength: null,
    isTargeting: false,
    isActive: false,
    currentInteractable: null,
    previousInteractable: null,
    currentTrigger: InteractorTriggerType.None,
    previousTrigger: InteractorTriggerType.None,
    currentDragVector: null,
    previousDragVector: null,
    planecastDragVector: null,
    dragType: null,
    inputType: InteractorInputType.None
  }

  onAwake() {
    super.inputType = InteractorInputType.Sync
  }

  /**
   * Because SyncInteractionManager dispatches events to InteractionManager and updates all SyncInteractors, it is not
   * necessary to update state and invoke events during the typical InteractionManager update loop.
   */
  updateState(): void {}

  /**
   * @inheritdoc
   */
  get startPoint(): vec3 | null {
    return this.interactorState.startPoint
  }

  /**
   * @inheritdoc
   */
  get endPoint(): vec3 | null {
    return this.interactorState.endPoint
  }

  /**
   * @inheritdoc
   */
  override get planecastPoint(): vec3 | null {
    return this.interactorState.planecastPoint
  }

  /**
   * @inheritdoc
   */
  get direction(): vec3 | null {
    return this.interactorState.direction
  }

  /**
   * @inheritdoc
   */
  get orientation(): quat | null {
    return this.interactorState.orientation
  }

  /**
   * @inheritdoc
   */
  get distanceToTarget(): number | null {
    return this.interactorState.distanceToTarget
  }

  /**
   * @inheritdoc
   */
  get targetHitPosition(): vec3 | null {
    return this.interactorState.targetHitPosition
  }

  /**
   * @inheritdoc
   */
  get targetHitInfo(): InteractableHitInfo | null {
    return this.interactorState.targetHitInfo // will have to reconstruct this
  }

  /**
   * @inheritdoc
   */
  get maxRaycastDistance(): number {
    return this.interactorState.maxRaycastDistance
  }

  /**
   * @inheritdoc
   */
  get activeTargetingMode(): TargetingMode {
    return this.interactorState.activeTargetingMode
  }

  /**
   * @inheritdoc
   */
  get interactionStrength(): number | null {
    return this.interactorState.interactionStrength
  }

  /**
   * @inheritdoc
   */
  isTargeting(): boolean {
    return this.interactorState.isTargeting
  }

  /**
   * @inheritdoc
   */
  isActive(): boolean {
    return this.interactorState.isActive
  }

  /**
   * @inheritdoc
   */
  override get inputType(): InteractorInputType {
    return super.inputType | this.interactorState.inputType
  }

  /**
   * @inheritdoc
   */
  override get currentInteractable(): Interactable | null {
    return this.interactorState.currentInteractable
  }

  /**
   * @inheritdoc
   */
  override get previousInteractable(): Interactable | null {
    return this.interactorState.previousInteractable
  }

  /**
   * @inheritdoc
   */
  override get currentTrigger(): InteractorTriggerType {
    return this.interactorState.currentTrigger
  }

  /**
   * @inheritdoc
   */
  override get previousTrigger(): InteractorTriggerType {
    return this.interactorState.previousTrigger
  }

  /**
   * @inheritdoc
   */
  override get currentDragVector(): vec3 | null {
    return this.interactorState.currentDragVector
  }

  /**
   * @inheritdoc
   */
  override get previousDragVector(): vec3 | null {
    return this.interactorState.previousDragVector
  }

  /**
   * @inheritdoc
   */
  override get planecastDragVector(): vec3 | null {
    return this.interactorState.planecastDragVector
  }

  /**
   * @inheritdoc
   */
  override get dragType(): DragType | null {
    return this.interactorState.dragType
  }

  protected clearCurrentHitInfo(): void {}

  /**
   * @inheritdoc
   */
  set drawDebug(debug: boolean) {}

  /**
   * @inheritdoc
   */
  get drawDebug(): boolean {
    return false
  }
}
