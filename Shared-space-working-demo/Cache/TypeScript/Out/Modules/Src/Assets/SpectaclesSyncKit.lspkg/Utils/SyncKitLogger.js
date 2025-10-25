"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncKitLogger = void 0;
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const SyncKitLogLevelProvider_1 = require("./SyncKitLogLevelProvider");
/**
 * Logger for Spectacles Sync Kit.
 */
class SyncKitLogger extends NativeLogger_1.default {
    constructor(tag) {
        super(tag, SyncKitLogLevelProvider_1.default.getInstance());
    }
}
exports.SyncKitLogger = SyncKitLogger;
//# sourceMappingURL=SyncKitLogger.js.map