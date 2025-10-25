import {Interactable} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import {InteractionConfigurationProvider} from "SpectaclesInteractionKit.lspkg/Providers/InteractionConfigurationProvider/InteractionConfigurationProvider"
import animate, {CancelFunction} from "SpectaclesInteractionKit.lspkg/Utils/animate"
import {lerp} from "SpectaclesInteractionKit.lspkg/Utils/mathUtils"
import StateMachine from "SpectaclesInteractionKit.lspkg/Utils/StateMachine"
import {SessionController} from "../../../../Core/SessionController"
import {JoiningState} from "../../MappingFlowStates/JoiningState/JoiningState"
import {MappingState} from "../../MappingFlowStates/MappingState/MappingState"
import {MappingUnsuccessfulTypeEnum} from "../../MappingFlowStates/MappingUnsuccessfulState/MappingUnsuccessfulTypeEnum"
import {
  MAPPING_HINTS_CUSTOM_LANDMARK,
  MAPPING_HINTS_P1,
  MAPPING_HINTS_P2,
  UNSUCCESS_NOTIFICATION_TITLE_CUSTOM_LANDMARK,
  UNSUCCESS_NOTIFICATION_TITLE_P1,
  UNSUCCESS_NOTIFICATION_TITLE_P2
} from "../../Texts/TextValues"
import {setAlpha, setObjectInTheWorldOnDistance} from "../../Utils/SharedFunctions"
import {MappingUnsuccessfulNotificationInput} from "./MappingUnsuccessfulNotificationInput"

export class MappingUnsuccessfulNotification {
  private readonly rootTransform: Transform

  private readonly tilePass: Pass

  private readonly keepLookingButtonPass: Pass

  private readonly appearNotificationDuration: number = 0.3

  private interactionConfigurationProvider: InteractionConfigurationProvider =
    InteractionConfigurationProvider.getInstance()

  private readonly keepLookingButtonInteractable: Interactable

  private alphaTweenCancelFunction: CancelFunction

  constructor(
    private readonly input: MappingUnsuccessfulNotificationInput,
    stateMachine: StateMachine
  ) {
    this.rootTransform = input.root.getTransform()
    this.tilePass = input.tile.mainMaterial.mainPass
    this.keepLookingButtonPass = input.keepLookingButtonMesh.mainMaterial.mainPass

    this.setNotificationAlpha(0)

    this.keepLookingButtonInteractable = input.keepLookingInteractable
    input.keepLookingButton.onButtonPinched.add(() => {
      if (SessionController.getInstance().getIsUserMapper()) {
        stateMachine.enterState(MappingState.name)
      } else {
        stateMachine.enterState(JoiningState.name)
      }
    })
    this.keepLookingButtonInteractable.enabled = false
    input.root.enabled = false
  }

  start(type: MappingUnsuccessfulTypeEnum): void {
    this.input.root.enabled = true
    setObjectInTheWorldOnDistance(this.input.root, this.input.distance)
    this.initNotificationUI(type)
    this.alphaTweenCancelFunction = this.animateNotificationToAlpha(0, 1, this.appearNotificationDuration, () => {
      this.keepLookingButtonInteractable.enabled = true
    })
  }

  stop(): void {
    this.input.root.enabled = false
    this.alphaTweenCancelFunction?.()
    this.keepLookingButtonInteractable.enabled = false
    this.setNotificationAlpha(0)
  }

  private initNotificationUI(type: MappingUnsuccessfulTypeEnum): void {
    switch (type) {
      case MappingUnsuccessfulTypeEnum.Scan:
        this.input.titleText.text = UNSUCCESS_NOTIFICATION_TITLE_P1
        for (let i = 0; i < MAPPING_HINTS_P1.length; ++i) {
          this.input.hintsTitle[i].text = MAPPING_HINTS_P1[i].title
          this.input.hintsText[i].text = MAPPING_HINTS_P1[i].text
        }
        break
      case MappingUnsuccessfulTypeEnum.Align:
        this.input.titleText.text = UNSUCCESS_NOTIFICATION_TITLE_P2
        for (let i = 0; i < MAPPING_HINTS_P2.length; ++i) {
          this.input.hintsTitle[i].text = MAPPING_HINTS_P2[i].title
          this.input.hintsText[i].text = MAPPING_HINTS_P2[i].text
        }
        break
      case MappingUnsuccessfulTypeEnum.CustomLandmark:
        this.input.titleText.text = UNSUCCESS_NOTIFICATION_TITLE_CUSTOM_LANDMARK
        for (let i = 0; i < MAPPING_HINTS_CUSTOM_LANDMARK.length; ++i) {
          this.input.hintsTitle[i].text = MAPPING_HINTS_CUSTOM_LANDMARK[i].title
          this.input.hintsText[i].text = MAPPING_HINTS_CUSTOM_LANDMARK[i].text
        }
        break
      default:
        throw new Error("Unknown MappingUnsuccessfulTypeEnum")
    }
  }

  private animateNotificationToAlpha(
    from: number,
    to: number,
    duration: number,
    onComplete: () => void = () => {}
  ): CancelFunction {
    return animate({
      update: (t: number) => {
        const currentAlpha = lerp(from, to, t)
        this.setNotificationAlpha(currentAlpha)
      },
      start: 0,
      end: 1,
      duration: duration,
      ended: onComplete
    })
  }

  private setNotificationAlpha(value: number) {
    setAlpha(this.input.root, value)
    this.tilePass.notification_tile_opacity = value
    this.keepLookingButtonPass.alpha = value
  }
}
