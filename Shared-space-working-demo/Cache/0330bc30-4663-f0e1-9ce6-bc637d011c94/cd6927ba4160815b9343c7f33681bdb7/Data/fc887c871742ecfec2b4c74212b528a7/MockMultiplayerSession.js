"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMultiplayerSession = exports.MockConnectedLensModule = void 0;
const UUID_1 = require("../Utils/UUID");
const MockMultiplayerSessionConfig_1 = require("./MockMultiplayerSessionConfig");
class MockUserInfo {
    constructor() {
        this.bitmojiAvatarId = "";
        this.connectionId = "";
        this.displayName = "";
        this.joinServerTimeMilliseconds = 0;
        this.userId = "";
    }
    getTypeName() {
        return "MockUserInfo";
    }
    isOfType(type) {
        return type === "MockUserInfo";
    }
    isSame(other) {
        return this === other;
    }
}
const EMPTY_MOCK_USER = new MockUserInfo();
class MockConnectedLensModule {
    constructor() {
        this.name = "MockConnectedLensModule";
        this.uniqueIdentifier = (0, UUID_1.createUUID)();
        this.mockSession = null;
    }
    createSession(sessionOptions) {
        this.mockSession = new MockMultiplayerSession(sessionOptions, this.mockSessionOptions);
        this.mockSession.startSessionCreationUsingLatency();
    }
    shareSession() {
        throw new Error("Method not implemented.");
    }
    recordScore() {
        throw new Error("Method not implemented.");
    }
    showLeaderboard() {
        throw new Error("Method not implemented.");
    }
    getTypeName() {
        return "MockConnectedLensModule";
    }
    isOfType(type) {
        return type === "MockConnectedLensModule";
    }
    isSame(other) {
        return this === other;
    }
}
exports.MockConnectedLensModule = MockConnectedLensModule;
class MockRealtimeStoreCreationInfo {
    getTypeName() {
        return "MockRealtimeStoreCreationInfo";
    }
    isOfType(type) {
        return type === "MockRealtimeStoreCreationInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockRealtimeStoreOwnershipUpdateInfo {
    getTypeName() {
        return "MockRealtimeStoreOwnershipUpdateInfo";
    }
    isOfType(type) {
        return type === "MockRealtimeStoreOwnershipUpdateInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockRealtimeStoreUpdateInfo {
    getTypeName() {
        return "MockRealtimeStoreUpdateInfo";
    }
    isOfType(type) {
        return type === "MockRealtimeStoreUpdateInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockRealtimeStoreKeyRemovalInfo {
    getTypeName() {
        return "MockRealtimeStoreKeyRemovalInfo";
    }
    isOfType(type) {
        return type === "MockRealtimeStoreKeyRemovalInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockRealtimeStoreDeleteInfo {
    getTypeName() {
        return "MockRealtimeStoreDeleteInfo";
    }
    isOfType(type) {
        return type === "MockRealtimeStoreDeleteInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockRealtimeStoreEntry {
    constructor(options, timestamp) {
        this._options = null;
        this._creationInfo = null;
        this.store = null;
        this.owner = null;
        this.lastUpdatedTimestamp = null;
        this._options = options;
        this.owner = EMPTY_MOCK_USER;
        if (options.initialStore) {
            // TODO: would be better to shallow copy the store, but it's not easy :(
            this.store = options.initialStore;
        }
        else {
            this.store = GeneralDataStore.create();
        }
        this._creationInfo = new MockRealtimeStoreCreationInfo();
        this._creationInfo.allowOwnershipTakeOver = options.allowOwnershipTakeOver;
        this._creationInfo.sentServerTimeMilliseconds = timestamp;
        this._creationInfo.persistence = options.persistence;
        this._creationInfo.storeId = options.storeId;
        this._creationInfo.ownerInfo = this.owner;
        this.lastUpdatedTimestamp = timestamp;
    }
    getStoreInfo() {
        this._creationInfo.lastUpdatedServerTimestamp = altIfNullOrUndef(this.lastUpdatedTimestamp, this._creationInfo.sentServerTimeMilliseconds);
        this._creationInfo.ownerInfo = this.owner;
        return this._creationInfo;
    }
    setLastUpdatedTimestamp(timestamp) {
        this.lastUpdatedTimestamp = timestamp;
    }
}
class MockStoreHandler {
    constructor(timeStampGetter) {
        this.storeEntries = [];
        this._localUserInfo = null;
        this._getTimeStamp = timeStampGetter;
    }
    setLocalUserInfo(userInfo) {
        this._localUserInfo = userInfo;
    }
    findMatchingStoreEntryIndex(store) {
        return this.storeEntries.findIndex((s) => s.store.isSame(store)) || null;
    }
    findMatchingStoreEntry(store) {
        return this.storeEntries.find((s) => s.store.isSame(store)) || null;
    }
    manualMarkRealtimeStoreUpdated(store, key, overrideTimestamp = null) {
        const entry = this.findMatchingStoreEntry(store);
        if (!assertWithError(Boolean(entry), "Could not find matching store entry")) {
            return;
        }
        this.notifyRealtimeStoreUpdated(entry, key, overrideTimestamp);
    }
    manualMarkRealtimeStoreKeyRemoved(store, key, overrideTimestamp = null) {
        const entry = this.findMatchingStoreEntry(store);
        if (!assertWithError(Boolean(entry), "Could not find matching store entry")) {
            return;
        }
        this.notifyRealtimeStoreKeyRemoved(entry, key, overrideTimestamp);
    }
    getAllStores() {
        return this.storeEntries.map((s) => s.store);
    }
    createRealtimeStore(options, onSuccess, _onError, overrideTimestamp = null) {
        const newStoreEntry = new MockRealtimeStoreEntry(options, this._getTimeStamp());
        this.storeEntries.push(newStoreEntry);
        const shouldStartOwned = options.ownership === RealtimeStoreCreateOptions.Ownership.Owned;
        if (shouldStartOwned) {
            newStoreEntry.owner = this._localUserInfo;
        }
        onSuccess(newStoreEntry.store);
        this.notifyRealtimeStoreCreated(newStoreEntry, overrideTimestamp);
        if (shouldStartOwned) {
            this.notifyUpdateRealtimeStoreOwnership(newStoreEntry, overrideTimestamp);
        }
    }
    deleteRealtimeStore(store, onSuccess, onError, overrideTimestamp = null) {
        const entryIndex = this.findMatchingStoreEntryIndex(store);
        if (!assertWithError(entryIndex !== null, "Could not find matching store entry", onError)) {
            return;
        }
        const entry = this.storeEntries[entryIndex];
        this.storeEntries.splice(entryIndex, 1);
        onSuccess(entry.store);
        this.notifyRealtimeStoreDeleted(entry, overrideTimestamp);
    }
    requestRealtimeStoreOwnership(store, onSuccess, onError, overrideTimestamp = null) {
        const entry = this.findMatchingStoreEntry(store);
        if (!assertWithError(Boolean(entry), "Could not find matching store entry", onError)) {
            return;
        }
        entry.owner = this._localUserInfo;
        onSuccess(entry.store);
        this.notifyUpdateRealtimeStoreOwnership(entry, overrideTimestamp);
    }
    clearOwnership(store, onSuccess, onError, overrideTimestamp = null) {
        const entry = this.findMatchingStoreEntry(store);
        if (!assertWithError(Boolean(entry), "Could not find matching store entry", onError)) {
            return;
        }
        entry.owner = EMPTY_MOCK_USER;
        onSuccess(store);
        this.notifyUpdateRealtimeStoreOwnership(entry, overrideTimestamp);
    }
    getRealtimeStoreInfo(store) {
        const entry = this.findMatchingStoreEntry(store);
        if (!assertWithError(Boolean(entry), "Could not find matching store entry")) {
            return;
        }
        return entry.getStoreInfo();
    }
    notifyRealtimeStoreCreated(storeEntry, timestamp = null) {
        const creationInfo = new MockRealtimeStoreCreationInfo();
        creationInfo.allowOwnershipTakeOver = storeEntry.getStoreInfo().allowOwnershipTakeOver;
        creationInfo.ownerInfo = storeEntry.owner;
        creationInfo.persistence = storeEntry.getStoreInfo().persistence;
        creationInfo.storeId = storeEntry.getStoreInfo().storeId;
        creationInfo.sentServerTimeMilliseconds = this.getTimestampOrDefault(timestamp);
        creationInfo.lastUpdatedServerTimestamp = creationInfo.sentServerTimeMilliseconds;
        this.onRealtimeStoreCreated(storeEntry.store, storeEntry.owner, creationInfo);
    }
    notifyRealtimeStoreDeleted(storeEntry, timestamp = null) {
        const deletionInfo = new MockRealtimeStoreDeleteInfo();
        deletionInfo.deleterInfo = this._localUserInfo;
        deletionInfo.sentServerTimeMilliseconds = this.getTimestampOrDefault(timestamp);
        this.onRealtimeStoreDeleted(storeEntry.store, deletionInfo);
    }
    notifyRealtimeStoreUpdated(storeEntry, key, timestamp = null) {
        const updateInfo = new MockRealtimeStoreUpdateInfo();
        updateInfo.sentServerTimeMilliseconds = this.getTimestampOrDefault(timestamp);
        updateInfo.updaterInfo = this._localUserInfo;
        this.onRealtimeStoreUpdated(storeEntry.store, key, updateInfo);
    }
    notifyRealtimeStoreKeyRemoved(storeEntry, key, timestamp = null) {
        const removalInfo = new MockRealtimeStoreKeyRemovalInfo();
        removalInfo.sentServerTimeMilliseconds = this.getTimestampOrDefault(timestamp);
        removalInfo.removerInfo = this._localUserInfo;
        removalInfo.key = key;
        removalInfo.store = storeEntry.store;
        this.onRealtimeStoreKeyRemoved(removalInfo);
    }
    notifyUpdateRealtimeStoreOwnership(storeEntry, timestamp = null) {
        const updateInfo = new MockRealtimeStoreOwnershipUpdateInfo();
        updateInfo.sentServerTimeMilliseconds = this.getTimestampOrDefault(timestamp);
        this.onRealtimeStoreOwnershipUpdated(storeEntry.store, storeEntry.owner, updateInfo);
    }
    getTimestampOrDefault(timestamp) {
        return nullOrUndef(timestamp) ? this._getTimeStamp() : timestamp;
    }
}
class MockConnectionInfo {
    getTypeName() {
        return "MockConnectionInfo";
    }
    isOfType(type) {
        return type === "MockConnectionInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockHostUpdateInfo {
    getTypeName() {
        return "MockHostUpdateInfo";
    }
    isOfType(type) {
        return type === "MockHostUpdateInfo";
    }
    isSame(other) {
        return this === other;
    }
}
class MockMultiplayerSession {
    constructor(options, testOptions = new MockMultiplayerSessionConfig_1.MockMultiplayerSessionConfig()) {
        this._options = null;
        this._storeHandler = null;
        this._delayHelper = null;
        this.mockLocalUserInfo = null;
        this._options = options;
        this.testOptions = testOptions;
        this._delayHelper = new DelayHelper();
        // Set up realtime store manager
        this._storeHandler = new MockStoreHandler(() => this.getServerTimestamp());
        // Set up realtime store callbacks
        this._storeHandler.onRealtimeStoreCreated = (store, ownerInfo, creationInfo) => {
            if (options.onRealtimeStoreCreated) {
                options.onRealtimeStoreCreated(this, store, ownerInfo, creationInfo);
            }
        };
        this._storeHandler.onRealtimeStoreDeleted = (store, deletionInfo) => {
            if (options.onRealtimeStoreDeleted) {
                options.onRealtimeStoreDeleted(this, store, deletionInfo);
            }
        };
        this._storeHandler.onRealtimeStoreKeyRemoved = (removalInfo) => {
            if (options.onRealtimeStoreKeyRemoved) {
                options.onRealtimeStoreKeyRemoved(this, removalInfo);
            }
        };
        this._storeHandler.onRealtimeStoreOwnershipUpdated = (store, ownerInfo, updateInfo) => {
            if (options.onRealtimeStoreOwnershipUpdated) {
                options.onRealtimeStoreOwnershipUpdated(this, store, ownerInfo, updateInfo);
            }
        };
        this._storeHandler.onRealtimeStoreUpdated = (store, key, updateInfo) => {
            if (options.onRealtimeStoreUpdated) {
                options.onRealtimeStoreUpdated(this, store, key, updateInfo);
            }
        };
    }
    get activeUserCount() {
        return 1;
    }
    get activeUsersInfo() {
        return [this.mockLocalUserInfo];
    }
    get allRealtimeStores() {
        return this._storeHandler.getAllStores();
    }
    startSessionCreationUsingLatency() {
        let isLatencyReady = false;
        let hasStarted = false;
        const refresh = () => {
            if (!hasStarted && isLatencyReady) {
                hasStarted = true;
                this.handleSessionCreation();
            }
        };
        this.latencyHelper(this.testOptions.connectionLatency, () => {
            isLatencyReady = true;
            refresh();
        });
    }
    startConnectionUsingLatency() {
        var _a;
        const needsDisplayName = nullOrUndef((_a = this.testOptions.mockUserInfo) === null || _a === void 0 ? void 0 : _a.displayName);
        let displayName = null;
        let isLatencyReady = false;
        let hasStarted = false;
        const refresh = () => {
            if (!hasStarted && isLatencyReady && (!needsDisplayName || !nullOrUndef(displayName))) {
                hasStarted = true;
                this.handleConnectionStart(displayName);
            }
        };
        this.latencyHelper(this.testOptions.connectionLatency, () => {
            isLatencyReady = true;
            refresh();
        });
        if (needsDisplayName) {
            global.userContextSystem.requestDisplayName((name) => {
                displayName = name;
                refresh();
            });
        }
    }
    handleSessionCreation() {
        this.notifySessionCreation();
        this.startConnectionUsingLatency();
    }
    handleConnectionStart(displayName) {
        // Set up mock local user
        this.mockLocalUserInfo = this.createMockUserInfo(this.testOptions.mockUserInfo, displayName);
        this._storeHandler.setLocalUserInfo(this.mockLocalUserInfo);
        this.notifyOnConnected();
        this.notifyUserJoinedSession();
        this.notifyHostUpdated();
    }
    createMockUserInfo(mockUserConfig, displayName) {
        const userInfo = new MockUserInfo();
        userInfo.connectionId = altIfNullOrUndef(mockUserConfig === null || mockUserConfig === void 0 ? void 0 : mockUserConfig.connectionId, "mock_connection_id_" + Math.floor(MathUtils.randomRange(0, 9999)));
        userInfo.userId = altIfNullOrUndef(mockUserConfig === null || mockUserConfig === void 0 ? void 0 : mockUserConfig.userId, "mock_user_id");
        userInfo.displayName = altIfNullOrUndef(mockUserConfig === null || mockUserConfig === void 0 ? void 0 : mockUserConfig.displayName, displayName);
        userInfo.joinServerTimeMilliseconds = this.getServerTimestamp();
        return userInfo;
    }
    notifySessionCreation() {
        if (this._options.onSessionCreated) {
            this._options.onSessionCreated(this, ConnectedLensSessionOptions.SessionCreationType.MultiplayerReceiver);
        }
    }
    notifyOnConnected() {
        if (this._options.onConnected) {
            const connectionInfo = new MockConnectionInfo();
            connectionInfo.externalUsersInfo = [];
            connectionInfo.hostUserInfo = this.mockLocalUserInfo;
            connectionInfo.localUserInfo = this.mockLocalUserInfo;
            connectionInfo.realtimeStores = [];
            connectionInfo.realtimeStoresCreationInfos = [];
            this._options.onConnected(this, connectionInfo);
        }
    }
    notifyUserJoinedSession() {
        if (this._options.onUserJoinedSession) {
            this._options.onUserJoinedSession(this, this.mockLocalUserInfo);
        }
    }
    notifyHostUpdated() {
        if (this._options.onHostUpdated) {
            const updateInfo = new MockHostUpdateInfo();
            updateInfo.sentServerTimeMilliseconds = this.getServerTimestamp();
            updateInfo.userInfo = this.mockLocalUserInfo;
            this._options.onHostUpdated(this, updateInfo);
        }
    }
    latencyHelper(latencySetting, callback) {
        const initialTimestamp = this.getServerTimestamp();
        const latency = MockMultiplayerSessionConfig_1.LatencySetting.getLatencyValue(latencySetting);
        this._delayHelper.waitAndCall(latency, () => {
            callback(initialTimestamp);
        });
    }
    clearRealtimeStoreOwnership(store, onSuccess, onError) {
        this.latencyHelper(this.testOptions.realtimeStoreLatency, (timestamp) => {
            this._storeHandler.clearOwnership(store, onSuccess, onError, timestamp);
        });
    }
    createRealtimeStore(options, onSuccess, onError) {
        this.latencyHelper(this.testOptions.realtimeStoreLatency, (timestamp) => {
            this._storeHandler.createRealtimeStore(options, onSuccess, onError, timestamp);
        });
    }
    deleteRealtimeStore(store, onSuccess, onError) {
        this.latencyHelper(this.testOptions.realtimeStoreLatency, (timestamp) => {
            this._storeHandler.deleteRealtimeStore(store, onSuccess, onError, timestamp);
        });
    }
    requestRealtimeStoreOwnership(store, onSuccess, onError) {
        this.latencyHelper(this.testOptions.realtimeStoreLatency, (timestamp) => {
            this._storeHandler.requestRealtimeStoreOwnership(store, onSuccess, onError, timestamp);
        });
    }
    getLocalUserId(localUserIdCallback) {
        this.latencyHelper(this.testOptions.localUserInfoLatency, () => {
            localUserIdCallback(this.mockLocalUserInfo.userId);
        });
    }
    getLocalUserInfo(localUserInfoCallback) {
        this.latencyHelper(this.testOptions.localUserInfoLatency, () => {
            localUserInfoCallback(this.mockLocalUserInfo);
        });
    }
    getRealtimeStoreInfo(store) {
        return this._storeHandler.getRealtimeStoreInfo(store);
    }
    getServerTimestamp() {
        return Date.now();
    }
    sendMessage(message) {
        if (this._options.onMessageReceived) {
            this.latencyHelper(this.testOptions.messageLatency, () => {
                this._options.onMessageReceived(this, this.mockLocalUserInfo.userId, message, this.mockLocalUserInfo);
            });
        }
    }
    // Note: timeout is not implemented
    sendMessageWithTimeout(message) {
        this.sendMessage(message);
    }
    manualMarkStoreUpdated(store, key) {
        this._storeHandler.manualMarkRealtimeStoreUpdated(store, key, this.getServerTimestamp());
    }
    manualMarkStoreKeyRemoved(store, key) {
        this._storeHandler.manualMarkRealtimeStoreKeyRemoved(store, key, this.getServerTimestamp());
    }
    deletePersistedValue() {
        throw new Error("Method not implemented.");
    }
    deleteStoredValue() {
        throw new Error("Method not implemented.");
    }
    getAppInstanceId() {
        throw new Error("Method not implemented.");
    }
    getLastUpdatedServerTimestamp() {
        throw new Error("Method not implemented.");
    }
    getMatchId() {
        throw new Error("Method not implemented.");
    }
    getPersistedAsset() {
        throw new Error("Method not implemented.");
    }
    getPersistedValue() {
        throw new Error("Method not implemented.");
    }
    getStoredValue() {
        throw new Error("Method not implemented.");
    }
    isValidTimestamp() {
        throw new Error("Method not implemented.");
    }
    leave() {
        throw new Error("Method not implemented.");
    }
    listPersistedValues() {
        throw new Error("Method not implemented.");
    }
    listStoredValues() {
        throw new Error("Method not implemented.");
    }
    sendMessageBytes() {
        throw new Error("Method not implemented.");
    }
    sendMessageBytesWithTimeout() {
        throw new Error("Method not implemented.");
    }
    sendRPC() {
        throw new Error("Method not implemented.");
    }
    setPersistedAsset() {
        throw new Error("Method not implemented.");
    }
    setPersistedValue() {
        throw new Error("Method not implemented.");
    }
    setStoredValue() {
        throw new Error("Method not implemented.");
    }
    getTypeName() {
        return "MockMultiplayerSession";
    }
    isOfType(type) {
        return type === "MockMultiplayerSession";
    }
    isSame(other) {
        return this === other;
    }
}
exports.MockMultiplayerSession = MockMultiplayerSession;
class DelayHelper {
    constructor() {
        this._script = null;
        this._script = global.scene.createSceneObject("DelayHelper").createComponent("ScriptComponent");
    }
    waitAndCall(delay, callback) {
        if (delay <= 0) {
            callback(null);
        }
        return this.createDelayedEvent(callback, delay, true);
    }
    createDelayedEvent(callback = null, delay = -1, onlyOnce = false) {
        const evt = this._script.createEvent("DelayedCallbackEvent");
        if (callback) {
            if (onlyOnce) {
                evt.bind((e) => {
                    this._script.removeEvent(e);
                    callback(e);
                });
            }
            else {
                evt.bind((e) => callback(e));
            }
        }
        if (delay >= 0) {
            evt.reset(delay);
        }
        return evt;
    }
}
function nullOrUndef(value) {
    return value === null || value === undefined;
}
function altIfNullOrUndef(value, alt) {
    return nullOrUndef(value) ? alt : value;
}
function assertWithError(condition, message, onError) {
    if (condition) {
        return true;
    }
    if (onError) {
        onError(message);
    }
    else {
        print(message);
    }
    return false;
}
//# sourceMappingURL=MockMultiplayerSession.js.map