import {SessionController} from "../../../../Core/SessionController"
import {P1, WAITING_FOR_MAPPING} from "../../Texts/TextValues"
import {WaitingForMappingStateInput} from "./WaitingForMappingStateInput"

export class WaitingForMappingState {
  constructor(private readonly input: WaitingForMappingStateInput) {
    input.root.enabled = false
  }

  enter(): void {
    this.input.waitingText.text = WAITING_FOR_MAPPING.replace(
      P1,
      SessionController.getInstance().getHostUserName(),
    )
    this.input.root.enabled = true
  }

  exit(): void {
    this.input.root.enabled = false
  }
}
