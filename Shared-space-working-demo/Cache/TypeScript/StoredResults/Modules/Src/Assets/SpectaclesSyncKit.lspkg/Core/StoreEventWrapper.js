"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreEventWrapper = void 0;
const EventWrapper_1 = require("./EventWrapper");
const NetworkUtils_1 = require("./NetworkUtils");
const SessionController_1 = require("./SessionController");
class StoreEventWrapper {
    /**
     * Initializes a new instance of the `StoreEventWrapper` class.
     * @param networkId - The network ID.
     */
    constructor(networkId) {
        this.networkId = networkId;
        this._cleanups = [];
        this.idFilter = this.makeNetworkIdFilter(networkId);
        this.onStoreCreated = this.wrapStoreEventWithFilter(SessionController_1.SessionController.getInstance().onRealtimeStoreCreated, this.idFilter, this._cleanups);
        this.onStoreUpdated = this.wrapStoreEventWithFilter(SessionController_1.SessionController.getInstance().onRealtimeStoreUpdated, this.idFilter, this._cleanups);
        this.onStoreOwnershipUpdated = this.wrapStoreEventWithFilter(SessionController_1.SessionController.getInstance().onRealtimeStoreOwnershipUpdated, this.idFilter, this._cleanups);
        this.onStoreDeleted = this.wrapStoreEventWithFilter(SessionController_1.SessionController.getInstance().onRealtimeStoreDeleted, this.idFilter, this._cleanups);
        this.onStoreKeyRemoved = this.wrapStoreEventWithFilter(SessionController_1.SessionController.getInstance().onRealtimeStoreKeyRemoved, this.idFilter, this._cleanups);
    }
    cleanup() {
        for (let i = 0; i < this._cleanups.length; i++) {
            this._cleanups[i]();
        }
        this._cleanups = [];
    }
    /**
     * Wraps a store event with a filter function.
     * @param event - The event to wrap.
     * @param filterFunc - The filter function.
     * @param cleanupFuncs - Optional array of cleanup functions.
     * @returns The wrapped event.
     */
    wrapStoreEventWithFilter(event, filterFunc, cleanupFuncs) {
        const evt = new EventWrapper_1.EventWrapper();
        const callback = (...args) => {
            if (filterFunc(args[1])) {
                evt.trigger(...args);
            }
        };
        event.add(callback);
        if (cleanupFuncs) {
            cleanupFuncs.push(() => {
                event.remove(callback);
            });
        }
        return evt;
    }
    /**
     * Creates a network ID filter function.
     * @param networkId - The network ID.
     * @returns The filter function.
     */
    makeNetworkIdFilter(networkId) {
        return (store) => {
            return (0, NetworkUtils_1.getNetworkIdFromStore)(store) === networkId;
        };
    }
}
exports.StoreEventWrapper = StoreEventWrapper;
//# sourceMappingURL=StoreEventWrapper.js.map