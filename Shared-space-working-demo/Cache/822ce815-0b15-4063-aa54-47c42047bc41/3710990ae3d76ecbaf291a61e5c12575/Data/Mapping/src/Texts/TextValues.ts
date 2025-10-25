import {ITitledText} from "./ITitledText"

export const MAPPING_DONE_P1 = "You’re all set!"

export const MAPPING_DONE_P2 = "Your spaces are aligned!"

export const MAPPING_DONE_CUSTOM_LANDMARK = "You've found the location!"

export const UNSUCCESS_NOTIFICATION_TITLE_P1 = "Couldn’t successfully scan your surroundings"

export const UNSUCCESS_NOTIFICATION_TITLE_P2 = "Couldn’t successfully align your spaces"

export const UNSUCCESS_NOTIFICATION_TITLE_CUSTOM_LANDMARK = "Couldn’t successfully find the location"

export const TUTORIAL_P1: ITitledText = {
  title: "Walk around and look around to scan your area",
  text: "Improve the quality of your map by moving laterally and viewing the same objects from different angles."
}
export const TUTORIAL_P2: ITitledText = {
  title: "Align your spaces",
  text: "Match %P1%’s starting position as close as possible to align your spaces."
}

export const TUTORIAL_P1_TEACHES_P2: ITitledText = {
  title: "Align your spaces",
  text: "Guide others to match your starting position to align your spaces."
}

export const TUTORIAL_CUSTOM_LANDMARK: ITitledText = {
  title: "Find the location",
  text: "Walk and look around the area."
}

export const ALIGN_HINT_P1_TEACHES_P2 = "Show %P2% the group start point"

export const WAITING_FOR_MAPPING = "Wait for %P1% to set things up"

export const TEACHING_TEXT = "Tell %P2% to match this position and view direction"

export const MAPPING_HINTS_P1: ITitledText[] = [
  {
    title: "Ensure surroundings have objects and patterns",
    text: "This helps with better detection."
  },
  {
    title: "Avoid plain, solid-colored walls",
    text: "Detailed environments provide more information."
  },
  {
    title: "Improve lighting",
    text: "Good lighting makes details visible."
  },
  {
    title: "Move steadily",
    text: "Lateral movements improve quality and help avoid missing details."
  }
]

export const MAPPING_HINTS_P2: ITitledText[] = [
  {
    title: "Align your spaces",
    text: "Match %P1%’s starting position as close as possible to align your spaces"
  },
  {
    title: "Move steadily",
    text: "Lateral movements improve quality and help avoid missing details."
  },
  {
    title: "Ensure environment details haven't changed",
    text: "Make sure furniture and objects are in the same place for better detection."
  },
  {
    title: "Ensure lighting conditions haven't changed",
    text: "Consistent lighting makes details visible."
  }
]

export const MAPPING_HINTS_CUSTOM_LANDMARK: ITitledText[] = [
  {
    title: "Walk around and look around",
    text: "Walk around your space. Look up, down, left and right."
  },
  {
    title: "Look at objects and patterns",
    text: "This helps with better detection."
  },
  {
    title: "Improve lighting",
    text: "Good lighting makes details visible."
  },
  {
    title: "Move steadily",
    text: "Movement helps to discover details."
  }
]

export const P1 = "%P1%"

export const P2 = "%P2%"
