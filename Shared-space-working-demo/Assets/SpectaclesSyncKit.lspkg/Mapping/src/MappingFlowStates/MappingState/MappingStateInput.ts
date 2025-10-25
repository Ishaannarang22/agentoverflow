import {ProgressBarInput} from "../../UI/MappingFlow/ProgressBar/ProgressBarInput"
import {ProgressBarParametersInput} from "../../UI/MappingFlow/ProgressBar/ProgressBarParametersInput"
import {TextMappingHintInput} from "../../UI/MappingFlow/TextMappingHint/TextMappingHintInput"
import {TextMappingHintParametersInput} from "../../UI/MappingFlow/TextMappingHint/TextMappingHintParametersInput"
import {TutorialInput} from "../../UI/MappingFlow/Tutorial/TutorialInput"
import {TutorialParametersInput} from "../../UI/MappingFlow/Tutorial/TutorialParametersInput"

@component
export class MappingStateInput extends BaseScriptComponent {
  script: ScriptComponent

  @input
  readonly tutorialNotificationInput: TutorialInput

  @input
  readonly mappingProgressInput: ProgressBarInput

  @input
  readonly progressBarParametersInput: ProgressBarParametersInput

  @input
  readonly textMappingHintInput: TextMappingHintInput

  @input
  readonly textMappingHintTimingsInput: TextMappingHintParametersInput

  @input
  readonly tutorialParametersInput: TutorialParametersInput
}
