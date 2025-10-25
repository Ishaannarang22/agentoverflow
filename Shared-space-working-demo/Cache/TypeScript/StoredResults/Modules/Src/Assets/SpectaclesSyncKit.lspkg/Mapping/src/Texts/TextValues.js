"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2 = exports.P1 = exports.MAPPING_HINTS_CUSTOM_LANDMARK = exports.MAPPING_HINTS_P2 = exports.MAPPING_HINTS_P1 = exports.TEACHING_TEXT = exports.WAITING_FOR_MAPPING = exports.ALIGN_HINT_P1_TEACHES_P2 = exports.TUTORIAL_CUSTOM_LANDMARK = exports.TUTORIAL_P1_TEACHES_P2 = exports.TUTORIAL_P2 = exports.TUTORIAL_P1 = exports.UNSUCCESS_NOTIFICATION_TITLE_CUSTOM_LANDMARK = exports.UNSUCCESS_NOTIFICATION_TITLE_P2 = exports.UNSUCCESS_NOTIFICATION_TITLE_P1 = exports.MAPPING_DONE_CUSTOM_LANDMARK = exports.MAPPING_DONE_P2 = exports.MAPPING_DONE_P1 = void 0;
exports.MAPPING_DONE_P1 = "You’re all set!";
exports.MAPPING_DONE_P2 = "Your spaces are aligned!";
exports.MAPPING_DONE_CUSTOM_LANDMARK = "You've found the location!";
exports.UNSUCCESS_NOTIFICATION_TITLE_P1 = "Couldn’t successfully scan your surroundings";
exports.UNSUCCESS_NOTIFICATION_TITLE_P2 = "Couldn’t successfully align your spaces";
exports.UNSUCCESS_NOTIFICATION_TITLE_CUSTOM_LANDMARK = "Couldn’t successfully find the location";
exports.TUTORIAL_P1 = {
    title: "Walk around and look around to scan your area",
    text: "Improve the quality of your map by moving laterally and viewing the same objects from different angles."
};
exports.TUTORIAL_P2 = {
    title: "Align your spaces",
    text: "Match %P1%’s starting position as close as possible to align your spaces."
};
exports.TUTORIAL_P1_TEACHES_P2 = {
    title: "Align your spaces",
    text: "Guide others to match your starting position to align your spaces."
};
exports.TUTORIAL_CUSTOM_LANDMARK = {
    title: "Find the location",
    text: "Walk and look around the area."
};
exports.ALIGN_HINT_P1_TEACHES_P2 = "Show %P2% the group start point";
exports.WAITING_FOR_MAPPING = "Wait for %P1% to set things up";
exports.TEACHING_TEXT = "Tell %P2% to match this position and view direction";
exports.MAPPING_HINTS_P1 = [
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
];
exports.MAPPING_HINTS_P2 = [
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
];
exports.MAPPING_HINTS_CUSTOM_LANDMARK = [
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
];
exports.P1 = "%P1%";
exports.P2 = "%P2%";
//# sourceMappingURL=TextValues.js.map