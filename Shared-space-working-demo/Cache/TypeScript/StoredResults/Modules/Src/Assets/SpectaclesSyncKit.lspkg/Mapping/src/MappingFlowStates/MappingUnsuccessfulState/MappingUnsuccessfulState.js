"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingUnsuccessfulState = void 0;
const SessionController_1 = require("../../../../Core/SessionController");
const MappingUnsuccessfulNotification_1 = require("../../UI/MappingUnsuccessful/MappingUnsuccessfulNotification");
const MappingUnsuccessfulTypeEnum_1 = require("./MappingUnsuccessfulTypeEnum");
class MappingUnsuccessfulState {
    constructor(input, stateMachine) {
        this.input = input;
        this.mappingUnsuccessfulNotification = new MappingUnsuccessfulNotification_1.MappingUnsuccessfulNotification(input.mappingUnsuccessfulNotification, stateMachine);
        this.alignUnsuccessfulNotification = new MappingUnsuccessfulNotification_1.MappingUnsuccessfulNotification(input.alignUnsuccessfulNotification, stateMachine);
    }
    enter() {
        if (SessionController_1.SessionController.getInstance().getCustomLandmark() !== null) {
            this.mappingUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum_1.MappingUnsuccessfulTypeEnum.CustomLandmark);
        }
        else if (SessionController_1.SessionController.getInstance().getIsUserMapper()) {
            this.mappingUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum_1.MappingUnsuccessfulTypeEnum.Scan);
        }
        else {
            this.alignUnsuccessfulNotification.start(MappingUnsuccessfulTypeEnum_1.MappingUnsuccessfulTypeEnum.Align);
        }
    }
    exit() {
        this.mappingUnsuccessfulNotification.stop();
        this.alignUnsuccessfulNotification.stop();
    }
}
exports.MappingUnsuccessfulState = MappingUnsuccessfulState;
//# sourceMappingURL=MappingUnsuccessfulState.js.map