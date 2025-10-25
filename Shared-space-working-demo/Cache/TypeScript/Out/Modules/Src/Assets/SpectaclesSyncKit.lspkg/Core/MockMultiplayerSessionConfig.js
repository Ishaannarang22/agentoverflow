"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMultiplayerSessionConfig = exports.LatencySetting = exports.MockUserConfig = void 0;
class MockUserConfig {
    constructor() {
        this.connectionId = "";
        this.displayName = "";
        this.userId = "";
    }
}
exports.MockUserConfig = MockUserConfig;
exports.LatencySetting = {
    None: 0,
    OneFrame: 0.0000001,
    RandomLowLatency: [0.1, 0.25],
    ConsistentLowLatency: 0.05,
    RandomHighLatency: [0.75, 1.0],
    ConsistentHighLatency: 0.5,
    getLatencyValue(setting) {
        if (typeof setting === "number") {
            return setting;
        }
        if (Array.isArray(setting)) {
            return MathUtils.lerp(setting[0], setting[1], Math.random());
        }
        return exports.LatencySetting.None;
    },
};
class MockMultiplayerSessionConfig {
    constructor() {
        this.connectionLatency = exports.LatencySetting.OneFrame;
        this.realtimeStoreLatency = exports.LatencySetting.OneFrame;
        this.messageLatency = exports.LatencySetting.OneFrame;
        this.localUserInfoLatency = exports.LatencySetting.OneFrame;
    }
    static createWithAllSetting(setting) {
        const ret = new MockMultiplayerSessionConfig();
        ret.connectionLatency = setting;
        ret.localUserInfoLatency = setting;
        ret.messageLatency = setting;
        ret.realtimeStoreLatency = setting;
        return ret;
    }
    static createWithNoLatency() {
        return this.createWithAllSetting(exports.LatencySetting.None);
    }
    static createWithOneFrameLatency() {
        return this.createWithAllSetting(exports.LatencySetting.OneFrame);
    }
    static createWithSimulatedLowLatency() {
        return this.createWithAllSetting(exports.LatencySetting.RandomLowLatency);
    }
    static createWithSimulatedHighLatency() {
        return this.createWithAllSetting(exports.LatencySetting.RandomHighLatency);
    }
}
exports.MockMultiplayerSessionConfig = MockMultiplayerSessionConfig;
//# sourceMappingURL=MockMultiplayerSessionConfig.js.map