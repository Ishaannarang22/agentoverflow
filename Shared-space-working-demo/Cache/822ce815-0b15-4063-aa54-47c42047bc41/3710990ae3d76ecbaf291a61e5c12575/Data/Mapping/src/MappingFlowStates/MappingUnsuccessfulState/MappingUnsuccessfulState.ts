import StateMachine from "SpectaclesInteractionKit.lspkg/Utils/StateMachine"
import {SessionController} from "../../../../Core/SessionController"
import {MappingUnsuccessfulNotification} from "../../UI/MappingUnsuccessful/MappingUnsuccessfulNotification"
import {MappingUnsuccessfulStateInput} from "./MappingUnsuccessfulStateInput"
import {MappingUnsuccessfulTypeEnum} from "./MappingUnsuccessfulTypeEnum"

export class MappingUnsuccessfulState {
  private mappingUnsuccessfulNotification: MappingUnsuccessfulNotification

  private alignUnsuccessfulNotification: MappingUnsuccessfulNotification

  constructor(
    private readonly input: MappingUnsuccessfulStateInput,
    stateMachine: StateMachine
  ) {
    this.mappingUnsuccessfulNotification = new MappingUnsuccessfulNotification(
      input.mappingUnsuccessfulNotification,
      stateMachine
    )
    this.alignUnsuccessfulNotification = new MappingUnsuccessfulNotification(
      input.alignUnsuccessfulNotification,
      stateMachine
    )
  }

  enter(): void {
    if (SessionController.getInstance().getCustomLandmark() !== null) {
      this.mappingUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum.CustomLandmark)
    } else if (SessionController.getInstance().getIsUserMapper()) {
      this.mappingUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum.Scan)
    } else {
      this.alignUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum.Align)
    }
  }

  exit(): void {
    this.mappingUnsuccessfulNotification.stop()
    this.alignUnsuccessfulNotification.stop()
  }
}
