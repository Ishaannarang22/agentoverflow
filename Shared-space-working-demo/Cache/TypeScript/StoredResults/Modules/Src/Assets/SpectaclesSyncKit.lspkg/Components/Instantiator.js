"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instantiator = exports.InstantiationOptions = void 0;
var __selfType = requireType("./Instantiator");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const NetworkRootInfo_1 = require("../Core/NetworkRootInfo");
const NetworkUtils_1 = require("../Core/NetworkUtils");
const PersistenceType_1 = require("../Core/PersistenceType");
const SessionController_1 = require("../Core/SessionController");
const SyncEntity_1 = require("../Core/SyncEntity");
const Helpers_1 = require("../Utils/Helpers");
const SyncKitLogger_1 = require("../Utils/SyncKitLogger");
class InstantiationOptions {
    constructor(optionDic) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.onSuccess = (_a = optionDic === null || optionDic === void 0 ? void 0 : optionDic.onSuccess) !== null && _a !== void 0 ? _a : null;
        this.persistence = (_b = optionDic === null || optionDic === void 0 ? void 0 : optionDic.persistence) !== null && _b !== void 0 ? _b : null;
        this.claimOwnership = (_c = optionDic === null || optionDic === void 0 ? void 0 : optionDic.claimOwnership) !== null && _c !== void 0 ? _c : null;
        this.worldPosition = (_d = optionDic === null || optionDic === void 0 ? void 0 : optionDic.worldPosition) !== null && _d !== void 0 ? _d : null;
        this.worldRotation = (_e = optionDic === null || optionDic === void 0 ? void 0 : optionDic.worldRotation) !== null && _e !== void 0 ? _e : null;
        this.worldScale = (_f = optionDic === null || optionDic === void 0 ? void 0 : optionDic.worldScale) !== null && _f !== void 0 ? _f : null;
        this.localPosition = (_g = optionDic === null || optionDic === void 0 ? void 0 : optionDic.localPosition) !== null && _g !== void 0 ? _g : null;
        this.localRotation = (_h = optionDic === null || optionDic === void 0 ? void 0 : optionDic.localRotation) !== null && _h !== void 0 ? _h : null;
        this.localScale = (_j = optionDic === null || optionDic === void 0 ? void 0 : optionDic.localScale) !== null && _j !== void 0 ? _j : null;
        this.onError = (_k = optionDic === null || optionDic === void 0 ? void 0 : optionDic.onError) !== null && _k !== void 0 ? _k : null;
        this.overrideNetworkId = (_l = optionDic === null || optionDic === void 0 ? void 0 : optionDic.overrideNetworkId) !== null && _l !== void 0 ? _l : null;
        this.customDataStore = (_m = optionDic === null || optionDic === void 0 ? void 0 : optionDic.customDataStore) !== null && _m !== void 0 ? _m : null;
    }
}
exports.InstantiationOptions = InstantiationOptions;
const SPAWNER_ID_KEY = "_spawner_id";
const PREFAB_ID_KEY = "_prefab_name";
const START_POS_KEY = "_init_pos";
const START_ROT_KEY = "_init_rot";
const START_SCALE_KEY = "_init_scale";
const TAG = "Instantiator";
/**
 * Used to instantiate prefabs across the network.
 * Prefabs must be added to the prefabs list or autoInstantiate list in order to be instantiated.
 */
let Instantiator = class Instantiator extends BaseScriptComponent {
    onAwake() {
        SessionController_1.SessionController.getInstance().notifyOnReady(() => this.onReady());
        SessionController_1.SessionController.getInstance().onRealtimeStoreCreated.add((session, datastore, userInfo) => this.onRealtimeStoreCreated(session, datastore, userInfo));
        this.createEvent("OnEnableEvent").bind(() => this.spawnInitialInstancesOnReady());
    }
    /**
     * Generates a unique network ID for the prefab.
     * @param prefab - The prefab to generate the ID for.
     * @param options - The instantiation options.
     * @returns The generated network ID.
     */
    generatePrefabId(prefab, options) {
        if (!(0, Helpers_1.isNullOrUndefined)(options) &&
            !(0, Helpers_1.isNullOrUndefined)(options === null || options === void 0 ? void 0 : options.overrideNetworkId)) {
            return options.overrideNetworkId;
        }
        else {
            return (prefab.name +
                "_" +
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15));
        }
    }
    /**
     * Finds a prefab by its name.
     * @param prefabName - The name of the prefab.
     * @returns The found prefab, or null if not found.
     */
    findPrefabByName(prefabName) {
        for (let i = 0; i < this.prefabs.length; i++) {
            if (this.prefabs[i].name === prefabName) {
                return this.prefabs[i];
            }
        }
        for (let i = 0; i < this.autoInstantiatePrefabs.length; i++) {
            if (this.autoInstantiatePrefabs[i].name === prefabName) {
                return this.autoInstantiatePrefabs[i];
            }
        }
        return null;
    }
    /**
     * Instantiates a new prefab.
     * @param networkId - The network ID of the prefab.
     * @param prefab - The prefab to instantiate.
     * @param options - The instantiation options.
     */
    instantiateNewPrefab(networkId, prefab, options) {
        options = options || {};
        this.log.d("instantiate new prefab with id " + networkId);
        const prefabName = prefab.name;
        const rootObj = global.scene.createSceneObject("holder:" + networkId);
        const parentObj = this.spawnAsChildren && (this.spawnUnderParent || this.getSceneObject());
        if (parentObj) {
            rootObj.setParent(parentObj);
        }
        const initialData = options.customDataStore || GeneralDataStore.create();
        (0, NetworkUtils_1.putNetworkIdToStore)(initialData, networkId);
        (0, NetworkUtils_1.putNetworkTypeToStore)(initialData, "prefab");
        initialData.putString(PREFAB_ID_KEY, prefabName);
        this.setSpawnerIdOnStore(initialData, this.syncEntity.networkId);
        if (options.worldPosition) {
            rootObj.getTransform().setWorldPosition(options.worldPosition);
            initialData.putVec3(START_POS_KEY, rootObj.getTransform().getLocalPosition());
        }
        if (options.worldRotation) {
            rootObj.getTransform().setWorldRotation(options.worldRotation);
            initialData.putQuat(START_ROT_KEY, rootObj.getTransform().getLocalRotation());
        }
        if (options.worldScale) {
            rootObj.getTransform().setWorldScale(options.worldScale);
            initialData.putVec3(START_SCALE_KEY, rootObj.getTransform().getLocalScale());
        }
        if (options.localPosition) {
            rootObj.getTransform().setLocalPosition(options.localPosition);
            initialData.putVec3(START_POS_KEY, rootObj.getTransform().getLocalPosition());
        }
        if (options.localRotation) {
            rootObj.getTransform().setLocalRotation(options.localRotation);
            initialData.putQuat(START_ROT_KEY, rootObj.getTransform().getLocalRotation());
        }
        if (options.localScale) {
            rootObj.getTransform().setLocalScale(options.localScale);
            initialData.putVec3(START_SCALE_KEY, rootObj.getTransform().getLocalScale());
        }
        let shouldIOwn = false;
        const persistence = (0, NetworkUtils_1.getPersistenceFromValue)(options.persistence);
        const storeOptions = RealtimeStoreCreateOptions.create();
        storeOptions.initialStore = initialData;
        storeOptions.persistence = persistence;
        storeOptions.ownership = RealtimeStoreCreateOptions.Ownership.Unowned;
        if (options.claimOwnership || this.spawnerOwnsObject) {
            shouldIOwn = true;
            storeOptions.ownership = RealtimeStoreCreateOptions.Ownership.Owned;
        }
        this.spawningInstances[networkId] = rootObj;
        SessionController_1.SessionController.getInstance()
            .getSession()
            .createRealtimeStore(storeOptions, (store) => {
            this.log.d("created prefab and got store callback");
            let ownerInfo = null;
            if (shouldIOwn) {
                ownerInfo = SessionController_1.SessionController.getInstance().getLocalUserInfo();
            }
            const networkRoot = new NetworkRootInfo_1.NetworkRootInfo(rootObj, networkId, store, true, ownerInfo, persistence);
            delete this.spawningInstances[networkId];
            this.spawnedInstances[networkId] = networkRoot;
            prefab.instantiate(rootObj);
            networkRoot.finishSetup();
            if (options.onSuccess) {
                options.onSuccess(networkRoot);
            }
        }, (string) => options.onError(string));
    }
    /**
     * Instantiates a prefab from a data store.
     * @param store - The data store containing the prefab information.
     * @param ownerInfo - Information about the owner.
     * @returns The instantiated NetworkRootInfo.
     */
    instantiatePrefabFromStore(store, ownerInfo) {
        const networkId = (0, NetworkUtils_1.getNetworkIdFromStore)(store);
        const prefabName = store.getString(PREFAB_ID_KEY);
        this.log.d("instantiate prefab from store: " + prefabName + " " + networkId);
        const rootObj = global.scene.createSceneObject("holder:" + networkId);
        if (this.spawnAsChildren) {
            const parentObj = this.spawnUnderParent || this.getSceneObject();
            rootObj.setParent(parentObj);
        }
        if (store.has(START_POS_KEY)) {
            rootObj.getTransform().setLocalPosition(store.getVec3(START_POS_KEY));
        }
        if (store.has(START_ROT_KEY)) {
            rootObj.getTransform().setLocalRotation(store.getQuat(START_ROT_KEY));
        }
        if (store.has(START_SCALE_KEY)) {
            rootObj.getTransform().setLocalScale(store.getVec3(START_SCALE_KEY));
        }
        const networkRoot = new NetworkRootInfo_1.NetworkRootInfo(rootObj, networkId, store, false, ownerInfo);
        const prefab = this.findPrefabByName(prefabName);
        if (!isNull(prefab)) {
            this.spawnedInstances[networkId] = networkRoot;
            prefab.instantiate(rootObj);
            networkRoot.finishSetup();
            return networkRoot;
        }
        else {
            throw ("Could not find prefab with matching name: " +
                prefabName +
                ". Make sure it's added to the Instantiator's prefab list!");
        }
    }
    /**
     * Gets the spawner ID from a data store.
     * @param store - The data store.
     * @returns The spawner ID.
     */
    getSpawnerIdFromStore(store) {
        return store.getString(SPAWNER_ID_KEY);
    }
    /**
     * Sets the spawner ID on a data store.
     * @param store - The data store.
     * @param id - The spawner ID.
     */
    setSpawnerIdOnStore(store, id) {
        store.putString(SPAWNER_ID_KEY, id);
    }
    /**
     * Handles the creation of a realtime store.
     * @param _session - The multiplayer session.
     * @param store - The data store.
     * @param ownerInfo - Information about the owner.
     */
    onRealtimeStoreCreated(_session, store, ownerInfo) {
        this.trySpawnFromStore(store, ownerInfo);
    }
    spawnInitialInstancesOnReady() {
        this.syncEntity.notifyOnReady(() => this.spawnInitialInstances());
    }
    spawnInitialInstances() {
        const sessionController = SessionController_1.SessionController.getInstance();
        sessionController.getTrackedStores().forEach((storeInfo) => {
            this.trySpawnFromStore(storeInfo.store, storeInfo.ownerInfo);
        });
    }
    /**
     * Tries to spawn a prefab from a data store.
     * @param store - The data store.
     * @param ownerInfo - Information about the owner.
     */
    trySpawnFromStore(store, ownerInfo) {
        const networkType = (0, NetworkUtils_1.getNetworkTypeFromStore)(store);
        const spawnerId = this.getSpawnerIdFromStore(store);
        if (networkType === "prefab" && spawnerId === this.syncEntity.networkId) {
            const networkId = (0, NetworkUtils_1.getNetworkIdFromStore)(store);
            if (!(networkId in this.spawnedInstances) &&
                !(networkId in this.spawningInstances)) {
                this.instantiatePrefabFromStore(store, ownerInfo);
            }
        }
    }
    onReady() {
        if (this.autoInstantiate) {
            const settings = new InstantiationOptions({
                persistence: this.persistence,
                claimOwnership: this.autoInstantiateOwnership ===
                    RealtimeStoreCreateOptions.Ownership.Owned,
            });
            for (let i = 0; i < this.autoInstantiatePrefabs.length; i++) {
                this.instantiate(this.autoInstantiatePrefabs[i], settings);
            }
        }
        this.spawnInitialInstances();
    }
    /**
     * Instantiates a prefab across the network. The prefab must be included in the "Prefabs" list of the Instantiator's inspector.
     * @param prefab - Prefab to instantiate. Make sure it's included in the "Prefabs" list!
     * @param options - Optional settings for the instantiated object.
     * @param onSuccess - Callback that executes when instantiation is complete. Overrides the `onSuccess` callback in `options` if specified.
     */
    instantiate(prefab, options, onSuccess) {
        var _a;
        if (!(0, Helpers_1.isNullOrUndefined)(onSuccess)) {
            const optionsWithSuccess = options || {};
            optionsWithSuccess.onSuccess = (_a = optionsWithSuccess.onSuccess) !== null && _a !== void 0 ? _a : onSuccess;
        }
        const instantiationOptions = options || {
            onSuccess: onSuccess,
        };
        const networkId = this.generatePrefabId(prefab, options);
        if (!(0, Helpers_1.isNullOrUndefined)(instantiationOptions) &&
            !(0, Helpers_1.isNullOrUndefined)(instantiationOptions === null || instantiationOptions === void 0 ? void 0 : instantiationOptions.overrideNetworkId) &&
            networkId in this.spawnedInstances) {
            this.log.d("using existing prefab already spawned");
            if (instantiationOptions.onSuccess) {
                instantiationOptions.onSuccess(this.spawnedInstances[networkId]);
            }
        }
        else {
            this.instantiateNewPrefab(networkId, prefab, instantiationOptions);
        }
    }
    /**
     * @deprecated Use instantiate() instead
     * @param prefab - The prefab to instantiate.
     * @param onSuccess - Callback that executes when instantiation is complete.
     * @param persistence - The persistence setting for the instantiated object.
     * @param claimOwnership - Whether to claim ownership of the instantiated object.
     * @param worldPosition - The world position of the instantiated object.
     * @param worldRotation - The world rotation of the instantiated object.
     * @param worldScale - The world scale of the instantiated object.
     */
    doInstantiate(prefab, onSuccess, persistence, claimOwnership, worldPosition, worldRotation, worldScale) {
        const options = {
            onSuccess: onSuccess,
            persistence: persistence,
            claimOwnership: claimOwnership,
            worldPosition: worldPosition,
            worldRotation: worldRotation,
            worldScale: worldScale,
        };
        this.instantiate(prefab, options);
    }
    /**
     * Checks if the instantiator is ready.
     * @returns `true` if the instantiator is ready, otherwise `false`.
     */
    isReady() {
        return this.syncEntity.isSetupFinished;
    }
    /**
     * Registers a callback to be called when the instantiator is ready.
     * @param onReady - The callback to register.
     */
    notifyOnReady(onReady) {
        this.syncEntity.notifyOnReady(onReady);
    }
    __initialize() {
        super.__initialize();
        this.persistence = (0, PersistenceType_1.persistenceTypeFromString)(this.persistenceString);
        this.autoInstantiateOwnership = this.autoInstantiateOwnershipString === "Owned"
            ? RealtimeStoreCreateOptions.Ownership.Owned
            : RealtimeStoreCreateOptions.Ownership.Unowned;
        this.spawnedInstances = new Map();
        this.spawningInstances = new Map();
        this.syncEntity = new SyncEntity_1.SyncEntity(this);
        this.log = new SyncKitLogger_1.SyncKitLogger(TAG);
    }
};
exports.Instantiator = Instantiator;
exports.Instantiator = Instantiator = __decorate([
    component
], Instantiator);
// These exports exist for javascript compatibility, and should not be used from typescript code.
;
global.InstantiationOptions = InstantiationOptions;
//# sourceMappingURL=Instantiator.js.map