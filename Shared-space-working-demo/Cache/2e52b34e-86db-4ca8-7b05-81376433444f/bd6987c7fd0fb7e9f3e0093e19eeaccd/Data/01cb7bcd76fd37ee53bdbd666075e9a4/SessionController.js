"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = exports.ColocatedBuildStatus = exports.StoreInfo = void 0;
const Singleton_1 = require("SpectaclesInteractionKit.lspkg/Decorators/Singleton");
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
const SyncKitLogger_1 = require("../Utils/SyncKitLogger");
const EventWrapper_1 = require("./EventWrapper");
const MockMultiplayerSession_1 = require("./MockMultiplayerSession");
const MockMultiplayerSessionConfig_1 = require("./MockMultiplayerSessionConfig");
const NetworkUtils_1 = require("./NetworkUtils");
var State;
(function (State) {
    State[State["NotInitialized"] = 0] = "NotInitialized";
    State[State["Initialized"] = 1] = "Initialized";
    State[State["Ready"] = 2] = "Ready";
    State[State["WaitingForInvite"] = 3] = "WaitingForInvite";
})(State || (State = {}));
class StoreInfo {
    constructor(store, ownerInfo, creationInfo) {
        this.store = store;
        this.ownerInfo = ownerInfo;
        this.creationInfo = creationInfo;
    }
}
exports.StoreInfo = StoreInfo;
const SESSION_STORE_ID = "__session";
const COLOCATED_BUILD_STATUS_KEY = "_colocated_build_status";
const COLOCATED_MAP_ID = "_colocated_map_id";
const TAG = "SessionController";
var ColocatedBuildStatus;
(function (ColocatedBuildStatus) {
    ColocatedBuildStatus["None"] = "none";
    ColocatedBuildStatus["Building"] = "building";
    ColocatedBuildStatus["Built"] = "built";
})(ColocatedBuildStatus || (exports.ColocatedBuildStatus = ColocatedBuildStatus = {}));
let SessionController = class SessionController {
    constructor() {
        this.log = new SyncKitLogger_1.SyncKitLogger(TAG);
        this.isConfigured = false;
        this.script = null;
        this.shouldInitialize = false;
        this.connectedLensModuleToUse = null;
        this.locationCloudStorageModule = null;
        this.skipUiInStudio = null;
        this.isColocated = null;
        this.locatedAtComponent = null;
        this.landmarksVisual3d = null;
        this.customLandmark = null;
        this.worldCamera = WorldCameraFinderProvider_1.default.getInstance();
        this.deviceTrackingComponent = this.worldCamera.getComponent().getSceneObject().getComponent("Component.DeviceTracking");
        this.eventFlowState = {
            inviteSent: false,
            connected: false,
            shared: false,
            // Session Store
            isWaitingForSessionStore: false,
            // Colocated
            isColocatedSetupStarted: false,
            isColocatedSetupFinished: false
        };
        this._state = State.NotInitialized;
        this._session = null;
        this._mappingSession = null;
        this._users = [];
        this._userIdLookup = new Map();
        this._connectionIdLookup = new Map();
        this._sessionCreationType = null;
        this._localUserId = null;
        this._localConnectionId = null;
        this._localDisplayName = null;
        this._localUserInfo = null;
        this._hostUserId = null;
        this._hostConnectionId = null;
        this._hostDisplayName = null;
        this._hostUserInfo = null;
        this._storeInfos = [];
        this._storeLookup = new Map();
        this._requireSessionStore = null;
        this._isReady = false;
        this._hasSentReady = false;
        this._hasSentMapExists = false;
        this._hasSentColocatedMapId = false;
        this._isLocatedAtFound = false;
        this._isSingleplayer = false;
        this._isUserMapper = false;
        this.onReady = new EventWrapper_1.EventWrapper();
        this.onStartColocated = new EventWrapper_1.EventWrapper();
        this.onMapExists = new EventWrapper_1.EventWrapper();
        this.onLocationId = new EventWrapper_1.EventWrapper();
        this.onSessionCreated = new EventWrapper_1.EventWrapper();
        this.onSessionShared = new EventWrapper_1.EventWrapper();
        this.onConnected = new EventWrapper_1.EventWrapper();
        this.onDisconnected = new EventWrapper_1.EventWrapper();
        this.onMessageReceived = new EventWrapper_1.EventWrapper();
        this.onUserJoinedSession = new EventWrapper_1.EventWrapper();
        this.onUserLeftSession = new EventWrapper_1.EventWrapper();
        this.onHostUpdated = new EventWrapper_1.EventWrapper();
        this.onError = new EventWrapper_1.EventWrapper();
        this.onConnectionFailed = new EventWrapper_1.EventWrapper();
        this.onRealtimeStoreCreated = new EventWrapper_1.EventWrapper();
        this.onRealtimeStoreUpdated = new EventWrapper_1.EventWrapper();
        this.onRealtimeStoreDeleted = new EventWrapper_1.EventWrapper();
        this.onRealtimeStoreKeyRemoved = new EventWrapper_1.EventWrapper();
        this.onRealtimeStoreOwnershipUpdated = new EventWrapper_1.EventWrapper();
        this.onLocatedAtFound = new EventWrapper_1.EventWrapper();
        this.callbacks = {
            onReady: this.onReady,
            onStartColocated: this.onStartColocated,
            onMapExists: this.onMapExists,
            onLocationId: this.onLocationId,
            onSessionCreated: this.onSessionCreated,
            onSessionShared: this.onSessionShared,
            onConnected: this.onConnected,
            onDisconnected: this.onDisconnected,
            onMessageReceived: this.onMessageReceived,
            onUserJoinedSession: this.onUserJoinedSession,
            onUserLeftSession: this.onUserLeftSession,
            onHostUpdated: this.onHostUpdated,
            onError: this.onError,
            onConnectionFailed: this.onConnectionFailed,
            onRealtimeStoreCreated: this.onRealtimeStoreCreated,
            onRealtimeStoreUpdated: this.onRealtimeStoreUpdated,
            onRealtimeStoreDeleted: this.onRealtimeStoreDeleted,
            onRealtimeStoreKeyRemoved: this.onRealtimeStoreKeyRemoved,
            onRealtimeStoreOwnershipUpdated: this.onRealtimeStoreOwnershipUpdated,
            onLocatedAtFound: this.onLocatedAtFound
        };
    }
    configure(script, connectedLensModule, locationCloudStorageModule, skipUiInStudio, isColocated, locatedAtComponent, landmarksVisual3d) {
        this.script = script;
        this.connectedLensModuleToUse = connectedLensModule;
        this.locationCloudStorageModule = locationCloudStorageModule;
        this.skipUiInStudio = skipUiInStudio;
        this.isColocated = isColocated;
        this.locatedAtComponent = locatedAtComponent;
        this.landmarksVisual3d = landmarksVisual3d;
        this.customLandmark = this.locatedAtComponent.location;
        this._requireSessionStore = this.isColocated;
        this.isConfigured = true;
        const mappingOptions = LocatedAtComponent.createMappingOptions();
        mappingOptions.locationCloudStorageModule = this.locationCloudStorageModule;
        mappingOptions.location = LocationAsset.getAROrigin();
        if (locatedAtComponent !== null) {
            locatedAtComponent.onFound.add(() => {
                this._isLocatedAtFound = true;
                this.onLocatedAtFound.trigger();
            });
        }
        this._mappingSession = LocatedAtComponent.createMappingSession(mappingOptions);
        this._checkInitialization();
    }
    createSessionOptions() {
        const options = ConnectedLensSessionOptions.create();
        options.onSessionCreated = (session, creationType) => this._onSessionCreated(session, creationType);
        options.onConnected = (session, connectionInfo) => this._onConnected(session, connectionInfo);
        options.onDisconnected = (session, disconnectInfo) => this._onDisconnected(session, disconnectInfo);
        options.onMessageReceived = (session, userId, message, senderInfo) => this._onMessageReceived(session, userId, message, senderInfo);
        options.onUserJoinedSession = (session, userInfo) => this._onUserJoinedSession(session, userInfo);
        options.onUserLeftSession = (session, userInfo) => this._onUserLeftSession(session, userInfo);
        options.onHostUpdated = (session, removalInfo) => this._onHostUpdated(session, removalInfo);
        options.onError = (session, code, description) => this._onError(session, code, description);
        options.onRealtimeStoreCreated = (session, store, ownerInfo, creationInfo) => this._onRealtimeStoreCreated(session, store, ownerInfo, creationInfo);
        options.onRealtimeStoreUpdated = (session, store, key, updateInfo) => this._onRealtimeStoreUpdated(session, store, key, updateInfo);
        options.onRealtimeStoreDeleted = (session, store, deleteInfo) => this._onRealtimeStoreDeleted(session, store, deleteInfo);
        options.onRealtimeStoreOwnershipUpdated = (session, store, owner, ownershipUpdateInfo) => this._onRealtimeStoreOwnershipUpdated(session, store, owner, ownershipUpdateInfo);
        options.onRealtimeStoreKeyRemoved = (session, removalInfo) => this._onRealtimeStoreKeyRemoved(session, removalInfo);
        options.hostManagementEnabled = true;
        return options;
    }
    createSession() {
        this.log.i("Creating session");
        const options = this.createSessionOptions();
        this.connectedLensModuleToUse.createSession(options);
    }
    /**
     * Handles the session creation event.
     * @param session - The multiplayer session.
     * @param creationType - The session creation type.
     */
    _onSessionCreated(session, creationType) {
        this.log.i(`Session Created: ${creationType}`);
        this._session = session;
        this._sessionCreationType = creationType;
        // We can't pass the mock object to an actual Lens Studio type.
        if (!(session instanceof MockMultiplayerSession_1.MockMultiplayerSession)) {
            this.locationCloudStorageModule.session = session;
        }
        this.onSessionCreated.trigger(session, creationType);
    }
    /**
     * Handles the session shared event.
     * @param session - The multiplayer session.
     */
    _onSessionShared(session) {
        this.log.i("Session Shared");
        this._session = session;
        this.eventFlowState.shared = true;
        this.onSessionShared.trigger(session);
        this._checkIfReady();
    }
    /**
     * Handles the connected event.
     * @param session - The multiplayer session.
     * @param connectionInfo - The connection information.
     */
    _onConnected(session, connectionInfo) {
        this.log.i("Connected to session");
        this._session = session;
        this._users = [];
        this._userIdLookup = new Map();
        this._connectionIdLookup = new Map();
        this._localUserInfo = connectionInfo.localUserInfo;
        this._localDisplayName = this._localUserInfo.displayName;
        this._localUserId = this._localUserInfo.userId;
        this._localConnectionId = this._localUserInfo.connectionId;
        this._hostUserInfo = connectionInfo.hostUserInfo;
        this._hostDisplayName = this._hostUserInfo.displayName;
        this._hostUserId = this._hostUserInfo.userId;
        this._hostConnectionId = this._hostUserInfo.connectionId;
        // Track local user
        this._trackUser(connectionInfo.localUserInfo);
        // Track other users
        const otherUsers = connectionInfo.externalUsersInfo;
        for (let i = 0; i < otherUsers.length; i++) {
            this._trackUser(otherUsers[i]);
        }
        // Track existing stores
        const stores = connectionInfo.realtimeStores;
        const creationInfos = connectionInfo.realtimeStoresCreationInfos;
        for (let j = 0; j < creationInfos.length; j++) {
            this._trackStore(stores[j], creationInfos[j].ownerInfo, creationInfos[j]);
        }
        this.eventFlowState.connected = true;
        this.onConnected.trigger(this._session, connectionInfo);
        this._checkIfReady();
    }
    /**
     * Handles the disconnected event.
     * @param session - The multiplayer session.
     * @param disconnectInfo - The disconnect information.
     */
    _onDisconnected(session, disconnectInfo) {
        this.log.d("disconnected from session: " + disconnectInfo);
        this.onDisconnected.trigger(session, disconnectInfo);
    }
    /**
     * Handles the message received event.
     * @param session - The multiplayer session.
     * @param userId - The user ID.
     * @param message - The message content.
     * @param senderInfo - Information about the sender.
     */
    _onMessageReceived(session, userId, message, senderInfo) {
        this.onMessageReceived.trigger(session, userId, message, senderInfo);
    }
    /**
     * Handles the error event.
     * @param session - The multiplayer session.
     * @param code - The error code.
     * @param description - The error description.
     */
    _onError(session, code, description) {
        this._state = State.NotInitialized;
        this.log.e("Error: " + code + " - " + description);
        this.onError.trigger(session, code, description);
        if (this._session === null) {
            this.onConnectionFailed.trigger();
        }
    }
    /**
     * Tracks a store.
     * @param store - The data store.
     * @param ownerInfo - Information about the owner.
     * @param creationInfo - Information about the store creation.
     */
    _trackStore(store, ownerInfo, creationInfo) {
        const storeId = (0, NetworkUtils_1.getNetworkIdFromStore)(store);
        this.log.d(`Tracking store: ${storeId}`);
        if (storeId !== null && storeId !== undefined && storeId !== "") {
            if (!(storeId in this._storeLookup)) {
                const storeInfo = new StoreInfo(store, ownerInfo, creationInfo);
                this._storeLookup[storeId] = storeInfo;
                this._storeInfos.push(storeInfo);
            }
        }
    }
    /**
     * Untracks a store.
     * @param store - The data store.
     */
    _untrackStore(store) {
        const storeId = (0, NetworkUtils_1.getNetworkIdFromStore)(store);
        this.log.d(`Untracking store: ${storeId}`);
        if (storeId !== null && storeId !== undefined && storeId !== "") {
            delete this._storeLookup[storeId];
            this._storeInfos = this._storeInfos.filter((storeInfo) => {
                return storeId != (0, NetworkUtils_1.getNetworkIdFromStore)(storeInfo.store);
            });
        }
    }
    /**
     * Gets the tracked stores.
     * @returns The tracked stores.
     */
    getTrackedStores() {
        return this._storeInfos;
    }
    /**
     * Handles the realtime store created event.
     * @param session - The multiplayer session.
     * @param store - The data store.
     * @param ownerInfo - Information about the owner.
     * @param creationInfo - Information about the store creation.
     */
    _onRealtimeStoreCreated(session, store, ownerInfo, creationInfo) {
        this.log.d("_onRealtimeStoreCreated " + ownerInfo.displayName);
        this._trackStore(store, ownerInfo, creationInfo);
        this.onRealtimeStoreCreated.trigger(session, store, ownerInfo, creationInfo);
    }
    /**
     * Handles the realtime store updated event.
     * @param session - The multiplayer session.
     * @param store - The data store.
     * @param key - The key that was updated.
     * @param updateInfo - Information about the update.
     */
    _onRealtimeStoreUpdated(session, store, key, updateInfo) {
        this.onRealtimeStoreUpdated.trigger(session, store, key, updateInfo);
        if (!this._hasSentMapExists && this.getColocatedBuildStatus() === ColocatedBuildStatus.Built) {
            this._hasSentMapExists = true;
            this.onMapExists.trigger();
        }
        if (!this._hasSentColocatedMapId && this.getColocatedMapId() !== null && this.getColocatedMapId() !== "") {
            this.log.d("onLocationId: " + this.getColocatedMapId());
            this._hasSentColocatedMapId = true;
            this.onLocationId.trigger();
        }
    }
    /**
     * Handles the realtime store deleted event.
     * @param session - The multiplayer session.
     * @param store - The data store.
     * @param deleteInfo - Information about the deletion.
     */
    _onRealtimeStoreDeleted(session, store, deleteInfo) {
        this._untrackStore(store);
        this.onRealtimeStoreDeleted.trigger(session, store, deleteInfo);
    }
    /**
     * Handles the realtime store key removed event.
     * @param session - The multiplayer session.
     * @param removalInfo - Information about the key removal.
     */
    _onRealtimeStoreKeyRemoved(session, removalInfo) {
        const store = removalInfo.store;
        this.onRealtimeStoreKeyRemoved.trigger(session, store, removalInfo);
    }
    /**
     * Handles the realtime store ownership updated event.
     * @param session - The multiplayer session.
     * @param store - The data store.
     * @param owner - Information about the new owner.
     * @param ownershipUpdateInfo - Information about the ownership update.
     */
    _onRealtimeStoreOwnershipUpdated(session, store, owner, ownershipUpdateInfo) {
        this._trackStore(store, owner);
        this.onRealtimeStoreOwnershipUpdated.trigger(session, store, owner, ownershipUpdateInfo);
    }
    /**
     * Helper function to add a UserInfo to a list of UserInfo, only if the list doesn't contain a user with
     * matching connectionId. Returns true if the user was added to the list.
     * @param userList - The list of UserInfo.
     * @param newUser - The new user to add.
     * @returns True if the user was added to the list.
     */
    _addMissingUserToListByConnectionId(userList, newUser) {
        if (newUser === null ||
            newUser === undefined ||
            newUser.connectionId === null ||
            newUser.connectionId === undefined) {
            return false;
        }
        const newConnectionId = newUser.connectionId;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].connectionId === newConnectionId) {
                return false;
            }
        }
        userList.push(newUser);
        return true;
    }
    /**
     * Tracks a user.
     * @param userInfo - Information about the user.
     * @returns True if the user was newly added.
     */
    _trackUser(userInfo) {
        let newUserJoined = false;
        if (!(userInfo.connectionId in this._connectionIdLookup)) {
            this._connectionIdLookup[userInfo.connectionId] = userInfo;
            newUserJoined = true;
        }
        let userList = this._userIdLookup[userInfo.userId];
        if (!userList) {
            userList = [userInfo];
            this._userIdLookup[userInfo.userId] = userList;
            newUserJoined = true;
        }
        else {
            newUserJoined = this._addMissingUserToListByConnectionId(userList, userInfo) || newUserJoined;
        }
        newUserJoined = this._addMissingUserToListByConnectionId(this._users, userInfo) || newUserJoined;
        return newUserJoined;
    }
    /**
     * Helper function to remove all instances of UserInfo with matching connectionId from a list.
     * Returns the list with users removed.
     * @param userList - The list of UserInfo.
     * @param userInfo - Information about the user to remove.
     * @returns The list with users removed.
     */
    _removeUserFromListByConnectionId(userList, userInfo) {
        if (userInfo === null ||
            userInfo === undefined ||
            userInfo.connectionId === null ||
            userInfo.connectionId === undefined) {
            return userList;
        }
        const connectionId = userInfo.connectionId;
        return userList.filter((u) => {
            return u.connectionId !== connectionId;
        });
    }
    /**
     * Untracks a user.
     * @param userInfo - Information about the user.
     */
    _untrackUser(userInfo) {
        const connectionId = userInfo.connectionId;
        delete this._connectionIdLookup[connectionId];
        const userList = this._userIdLookup[userInfo.userId];
        if (userList) {
            this._userIdLookup[userInfo.userId] = this._removeUserFromListByConnectionId(userList, userInfo);
        }
        this._users = this._removeUserFromListByConnectionId(this._users, userInfo);
    }
    /**
     * Handles the user joined session event.
     * @param session - The multiplayer session.
     * @param userInfo - Information about the user.
     */
    _onUserJoinedSession(session, userInfo) {
        if (this._trackUser(userInfo)) {
            this.log.d("user joined session: " + userInfo.displayName);
            this.onUserJoinedSession.trigger(session, userInfo);
        }
        else {
            this.log.d("skipping duplicate user: " + userInfo.displayName);
        }
    }
    /**
     * Handles the user left session event.
     * @param session - The multiplayer session.
     * @param userInfo - Information about the user.
     */
    _onUserLeftSession(session, userInfo) {
        this._untrackUser(userInfo);
        this.onUserLeftSession.trigger(session, userInfo);
    }
    /**
     * Handles the host updated event.
     * @param session - The multiplayer session.
     * @param removalInfo - Information about the host update.
     */
    _onHostUpdated(session, removalInfo) {
        this._hostUserInfo = removalInfo.userInfo;
        this._hostDisplayName = this._hostUserInfo.displayName;
        this._hostUserId = this._hostUserInfo.userId;
        this._hostConnectionId = this._hostUserInfo.connectionId;
        this.onHostUpdated.trigger(session, removalInfo);
    }
    // Session Store
    /**
     * Returns the shared session store (if exists) or null. Useful for needed session info like colocated build status.
     * @returns The shared session store or null.
     */
    getSessionStore() {
        if (!this._sessionStore) {
            const sessionInfo = this.getStoreInfoById(SESSION_STORE_ID);
            if (sessionInfo) {
                this._sessionStore = sessionInfo.store;
            }
        }
        return this._sessionStore;
    }
    _createSessionStore() {
        const storeOpts = RealtimeStoreCreateOptions.create();
        storeOpts.persistence = RealtimeStoreCreateOptions.Persistence.Persist;
        const startingStore = GeneralDataStore.create();
        // Set network ID
        (0, NetworkUtils_1.putNetworkIdToStore)(startingStore, SESSION_STORE_ID);
        // Set colocated build status
        startingStore.putString(COLOCATED_BUILD_STATUS_KEY, ColocatedBuildStatus.None);
        storeOpts.initialStore = startingStore;
        this.log.d("creating the session store");
        this.createStore(storeOpts, (store) => {
            this.log.d("created session store");
            this._sessionStore = store;
            this._checkIfReady();
        }, (message) => {
            this.log.e("error creating shared store: " + message);
        });
    }
    _waitAndCreateSessionStore() {
        this._waitUntilTrue(() => {
            return this.getSessionStore() !== null && this.getSessionStore() !== undefined;
        }, () => {
            this.log.d("found session store");
            this._checkIfReady();
        }, 
        // Timeout
        0.1, () => this._createSessionStore());
    }
    // Colocated Flow
    /**
     * Start setting up Colocated flow.
     */
    _startColocated() {
        this.log.d("startColocated()");
        if (!this.locationCloudStorageModule) {
            throw "Location Cloud Storage Module must be set!";
        }
        if (!this.eventFlowState.isColocatedSetupStarted) {
            this.onStartColocated.trigger();
        }
        this.eventFlowState.isColocatedSetupStarted = true;
    }
    /**
     * Get the build status from the shared session store.
     * @returns The colocated build status.
     */
    getColocatedBuildStatus() {
        const sessionStore = this.getSessionStore();
        return sessionStore ? sessionStore.getString(COLOCATED_BUILD_STATUS_KEY) : null;
    }
    /**
     * Write the build status to the shared session store.
     * @param status - The colocated build status.
     */
    setColocatedBuildStatus(status) {
        this.getSessionStore().putString(COLOCATED_BUILD_STATUS_KEY, status);
    }
    /**
     * Get the id of the colocated map.
     * @returns The colocated map id.
     */
    getColocatedMapId() {
        const sessionStore = this.getSessionStore();
        return sessionStore ? sessionStore.getString(COLOCATED_MAP_ID) : null;
    }
    /**
     * Write the id of the colocated map.
     * @param value - The map id.
     */
    setColocatedMapId(value) {
        this.getSessionStore().putString(COLOCATED_MAP_ID, value);
    }
    // General flow
    /**
     * Checks the current status of all required systems and runs through the steps needed to finish setup.
     */
    _checkIfReady() {
        // We need a session to continue
        if (!this._session) {
            return;
        }
        // We need local user info to continue
        if (!this._localUserId) {
            return;
        }
        // We need to be connected to the session to continue
        if (!this.eventFlowState.connected) {
            return;
        }
        // If we require SessionStore, wait for SessionStore to be setup before continuing
        if (this._requireSessionStore && !this.getSessionStore()) {
            // Start setting up SessionStore if we haven't already
            if (!this.eventFlowState.isWaitingForSessionStore) {
                this.eventFlowState.isWaitingForSessionStore = true;
                this._waitAndCreateSessionStore();
            }
            return;
        }
        // If we are in colocated flow, we need colocated setup to be finished before continuing
        if (this.isColocated && !this._isSingleplayer) {
            if (!this.eventFlowState.isColocatedSetupFinished) {
                if (!this.eventFlowState.isColocatedSetupStarted) {
                    this._startColocated();
                    this._checkIfReady();
                    return;
                }
                return;
            }
        }
        this.log.d("session is now ready, triggering ready events");
        this._state = State.Ready;
        // Mark as ready and send all onReady events if we haven't already
        if (!this._hasSentReady) {
            this._isReady = true;
            this._hasSentReady = true;
            if (!isNull(global.behaviorSystem)) {
                ;
                global.behaviorSystem.sendCustomTrigger("session_ready");
            }
            // Introduce a delay before triggering onReady to allow the world camera to reset its position
            const delayEvent = this.script.createEvent("DelayedCallbackEvent");
            delayEvent.bind(() => {
                this.onReady.trigger();
            });
            delayEvent.reset(0.23);
        }
    }
    // Start setup
    init() {
        this.shouldInitialize = true;
        this._checkInitialization();
    }
    _checkInitialization() {
        if (this.isConfigured && this.shouldInitialize && this._state === State.NotInitialized) {
            this.doInit();
        }
    }
    doInit() {
        this._state = State.Initialized;
        this.createSession();
    }
    /**
     * Returns the current {@link MultiplayerSession}. Returns null if the session doesn't exist yet.
     * @returns The current multiplayer session or null.
     */
    getSession() {
        return this._session;
    }
    /**
     * Returns the LocationCloudStorageModule.
     * @returns The LocationCloudStorageModule.
     */
    getLocationCloudStorageModule() {
        return this.locationCloudStorageModule;
    }
    /**
     * Returns the current {@link MappingSession}. Returns null if the session doesn't exist yet.
     * @returns The current mapping session or null.
     */
    getMappingSession() {
        return this._mappingSession;
    }
    /**
     * Returns the located at component.
     * @returns The located at component.
     */
    getLocatedAtComponent() {
        return this.locatedAtComponent;
    }
    /**
     * Get the 3D mesh of the mapped environment.
     * @returns The 3D mesh of the mapped environment.
     */
    getLandmarksVisual3d() {
        return this.landmarksVisual3d;
    }
    /**
     * Returns the colocated tracking component.
     * @returns The colocated tracking component.
     */
    getDeviceTrackingComponent() {
        return this.deviceTrackingComponent;
    }
    /**
     * Returns the current state.
     * @returns The current state.
     */
    getState() {
        return this._state;
    }
    /**
     * Returns the session creation type.
     * @returns The session creation type.
     */
    getSessionCreationType() {
        return this._sessionCreationType;
    }
    /**
     * Returns the local user id, or null.
     * @returns The local user id or null.
     */
    getLocalUserId() {
        return this._localUserId;
    }
    /**
     * Returns the local connection id, or null.
     * @returns The local connection id or null.
     */
    getLocalConnectionId() {
        return this._localConnectionId;
    }
    /**
     * Returns the local display name, or null.
     * @returns The local display name or null.
     */
    getLocalUserName() {
        return this._localDisplayName;
    }
    /**
     * Returns the local user info, or null.
     * @returns The local user info or null.
     */
    getLocalUserInfo() {
        return this._localUserInfo;
    }
    /**
     * Returns true if the passed in `userInfo` matches the local userId. Note that this is separate from connectionId.
     * @param userInfo - The user info to check.
     * @returns True if the user info matches the local userId.
     */
    isSameUserAsLocal(userInfo) {
        return this._localUserInfo && this._localUserId === userInfo.userId;
    }
    /**
     * Returns true if the passed in `userInfo` matches the local user and connection.
     * @param userInfo - The user info to check.
     * @returns True if the user info matches the local user and connection.
     */
    isLocalUserConnection(userInfo) {
        return this._localUserInfo && userInfo && this._localConnectionId === userInfo.connectionId;
    }
    /**
     * Returns the host user id, or null.
     * @returns The host user id or null.
     */
    getHostUserId() {
        return this._hostUserId;
    }
    /**
     * Returns the host connection id, or null.
     * @returns The host connection id or null.
     */
    getHostConnectionId() {
        return this._hostConnectionId;
    }
    /**
     * Returns the host display name, or null.
     * @returns The host display name or null.
     */
    getHostUserName() {
        return this._hostDisplayName;
    }
    /**
     * Returns the host user info, or null.
     * @returns The host user info or null.
     */
    getHostUserInfo() {
        return this._hostUserInfo;
    }
    /**
     * Returns true if the passed in `userInfo` matches the host userId. Note that this is separate from connectionId.
     * @param userInfo - The user info to check.
     * @returns True if the user info matches the host userId.
     */
    isSameUserAsHost(userInfo) {
        return this._hostUserInfo && this._hostUserId === userInfo.userId;
    }
    /**
     * Returns true if the passed in `userInfo` matches the host user and connection.
     * @param userInfo - The user info to check.
     * @returns True if the user info matches the host user and connection.
     */
    isHostUserConnection(userInfo) {
        return this._hostUserInfo && userInfo && this._hostConnectionId === userInfo.connectionId;
    }
    /**
     * Returns true if the local user is the host, or null if the session doesn't exist yet.
     * @returns True if the local user is the host, or null if the session doesn't exist yet.
     */
    isHost() {
        if (!this.eventFlowState.connected) {
            return null;
        }
        else {
            return this.isHostUserConnection(this._localUserInfo);
        }
    }
    /**
     * Returns true if the session is singleplayer.
     * @returns Whether the session is singleplayer.
     */
    isSingleplayer() {
        return this._isSingleplayer;
    }
    /**
     * Returns the list of current user connections.
     * @returns The list of current user connections.
     */
    getUsers() {
        return this._users;
    }
    /**
     * Returns the user info with matching id, or null.
     * @deprecated Use {@link getUserByConnectionId | getUserByConnectionId} or {@link getUsersByUserId | getUsersByUserId}
     * @param userId - The user id.
     * @returns The user info with matching id, or null.
     */
    getUserById(userId) {
        const users = this.getUsersByUserId(userId);
        if (users.length > 0) {
            return users[0];
        }
        return null;
    }
    /**
     * Returns the user info with matching connection id, or null.
     * @param connectionId - The connection id.
     * @returns The user info with matching connection id, or null.
     */
    getUserByConnectionId(connectionId) {
        return this._connectionIdLookup[connectionId] || null;
    }
    /**
     * Returns the list of users with matching user id.
     * @param userId - The user id.
     * @returns The list of users with matching user id.
     */
    getUsersByUserId(userId) {
        return this._userIdLookup[userId] || [];
    }
    /**
     * Returns true if the session has been shared.
     * @returns True if the session has been shared.
     */
    getIsSessionShared() {
        return this.eventFlowState.shared;
    }
    /**
     * Returns StoreInfo for the store with matching id.
     * @param networkId - The network id.
     * @returns StoreInfo for the store with matching id.
     */
    getStoreInfoById(networkId) {
        var _a;
        return (_a = this._storeLookup[networkId]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Create a RealtimeStore.
     * @param storeOptions - The store options.
     * @param onSuccess - Callback for success.
     * @param onError - Callback for error.
     */
    createStore(storeOptions, onSuccess, onError) {
        this._session.createRealtimeStore(storeOptions, onSuccess || (() => { }), onError ||
            ((message) => {
                this.log.e(message);
                throw Error(message);
            }));
    }
    /**
     * Returns a unix timestamp in seconds of the current time according to the server.
     * Useful for synchronizing time-based game events across devices.
     * -1 will be returned if session is not connected to the server.
     * @returns The unix timestamp in seconds of the current time according to the server.
     */
    getServerTimeInSeconds() {
        if (this._session) {
            return this._session.getServerTimestamp() * 0.001;
        }
        return null;
    }
    /**
     * Share an Invite to the session.
     */
    shareInvite() {
        if (!this._session) {
            throw Error("Unable to share invite: session is not created!");
        }
        if (!this.connectedLensModuleToUse) {
            throw Error("Unable to share invite: connected lens module not set!");
        }
        if (this._state != State.Ready && this._state != State.WaitingForInvite) {
            throw Error("Unable to share invite: session controller is not ready!");
        }
        this.eventFlowState.connected = false;
        this.eventFlowState.shared = false;
        this.connectedLensModuleToUse.shareSession(ConnectedLensModule.SessionShareType.Invitation, this._onSessionShared);
    }
    /**
     * Returns true if we're ready to start the colocated tracking flow.
     * @returns True if we're ready to start the colocated tracking flow.
     */
    getOnStartColocated() {
        return this.eventFlowState.isColocatedSetupStarted;
    }
    /**
     * Executes `onColocatedStart` immediately if the Session should start the colocated tracking flow,
     * or will execute it later when the flow should start. Returns a completer function, which should be called
     * when colocation is complete.
     * @param onStartColocated - Callback for starting colocation.
     * @returns Callback for completing colocation.
     */
    notifyOnStartColocated(onStartColocated) {
        if (this.getOnStartColocated()) {
            onStartColocated();
        }
        else {
            this.onStartColocated.add(onStartColocated);
        }
        return /*function onColocatedComplete*/ () => {
            this.eventFlowState.isColocatedSetupFinished = true;
            this._checkIfReady();
        };
    }
    /**
     * Returns true if the session has finished setting up and the lens experience is ready to start.
     * @returns True if the session has finished setting up and the lens experience is ready to start.
     */
    getIsReady() {
        return this._isReady;
    }
    /**
     * Executes `onReady` immediately if the Session is ready, or will execute it later when the Session becomes ready.
     * @param onReady - Callback for when the session is ready.
     */
    notifyOnReady(onReady) {
        if (this.getIsReady()) {
            onReady();
        }
        else {
            this.onReady.add(onReady);
        }
    }
    /**
     * Returns true if the map exists.
     * @returns True if the map exists.
     */
    getMapExists() {
        return ((this.locatedAtComponent !== null &&
            this.locatedAtComponent !== undefined &&
            this.locatedAtComponent.location !== null) ||
            this.getColocatedBuildStatus() === ColocatedBuildStatus.Built);
    }
    /**
     * Executes `onMapExists` immediately if the map exists.
     * @param onMapExists - Callback for when the map exists.
     */
    notifyOnMapExists(onMapExists) {
        if (this.getMapExists()) {
            onMapExists();
        }
        else {
            this.onMapExists.add(onMapExists);
        }
    }
    /**
     * Executes `onLocationId` immediately if the locationId is found.
     * @param onLocationId - Callback for when the locationId is found.
     */
    notifyOnLocationId(onLocationId) {
        if (this.getColocatedMapId()) {
            onLocationId();
        }
        else {
            this.onLocationId.add(onLocationId);
        }
    }
    /**
     * Executes `onLocatedAtFound` immediately if the locatedAtComponent is found, or will execute it later when the component is found.
     * @param onLocatedAtFound - Callback for when the locatedAtComponent is found.
     */
    notifyOnLocatedAtFound(onLocatedAtFound) {
        if (this._isLocatedAtFound) {
            onLocatedAtFound();
        }
        else {
            this.onLocatedAtFound.add(onLocatedAtFound);
        }
    }
    /**
     * Returns true if skipUiInStudio checkbox is selected.
     * @returns True if skipUiInStudio checkbox is selected.
     */
    getSkipUiInStudio() {
        return this.skipUiInStudio;
    }
    /**
     * Returns the custom landmark being using, or null if not set.
     * @returns The custom landmark being using, or null if not set.
     */
    getCustomLandmark() {
        return this.customLandmark;
    }
    /**
     * Prepares SessionController to use a Mocked version of Connected Lenses.
     * Make sure to call this before calling init().
     * @param options - The mock session options.
     */
    prepareOfflineMode(options) {
        if (this._state !== State.NotInitialized) {
            this.log.e("Can't switch to offline after already initializing!");
            return;
        }
        const mockModule = new MockMultiplayerSession_1.MockConnectedLensModule();
        options = options || MockMultiplayerSessionConfig_1.MockMultiplayerSessionConfig.createWithOneFrameLatency();
        mockModule.mockSessionOptions = options;
        this.connectedLensModuleToUse = mockModule;
        this._isSingleplayer = true;
    }
    /**
     * Checks if the current user is the one who performed the mapping.
     * @returns True if the current user is the one who performed the mapping.
     */
    getIsUserMapper() {
        return this._isUserMapper;
    }
    /**
     * Sets whether the current user is designated as the one who performed the mapping.
     * @param isUserMapper - Whether the current user is the one who performed the mapping.
     */
    setIsUserMapper(isUserMapper) {
        this._isUserMapper = isUserMapper;
    }
    /**
     * Waits until a condition is true, then executes a callback.
     * @param condition - The condition to check.
     * @param callback - The callback to execute when the condition is true.
     * @param timeOutSeconds - The timeout in seconds.
     * @param onTimeout - The callback to execute if the timeout is reached.
     */
    _waitUntilTrue(condition, callback, timeOutSeconds, onTimeout) {
        const startTime = getTime();
        const evt = this.script.createEvent("UpdateEvent");
        evt.bind(() => {
            if (condition()) {
                this.script.removeEvent(evt);
                callback();
            }
            else if (timeOutSeconds !== undefined && timeOutSeconds !== null) {
                if (startTime + timeOutSeconds <= getTime()) {
                    this.script.removeEvent(evt);
                    if (onTimeout) {
                        onTimeout();
                    }
                }
            }
        });
    }
};
exports.SessionController = SessionController;
exports.SessionController = SessionController = __decorate([
    Singleton_1.Singleton
], SessionController);
// These exports exist for javascript compatibility, and should not be used from typescript code.
;
global.sessionController = SessionController.getInstance();
//# sourceMappingURL=SessionController.js.map