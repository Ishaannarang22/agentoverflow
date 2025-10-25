"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWrapper = void 0;
const SyncKitLogger_1 = require("../Utils/SyncKitLogger");
const TAG = "EventWrapper";
/**
 * Simple implementation of an event class. Add callbacks to be notified when the event is triggered.
 */
class EventWrapper {
    constructor() {
        this.log = new SyncKitLogger_1.SyncKitLogger(TAG);
        this._callbacks = [];
    }
    /**
     * Add a callback function to this event. The callback function will be executed when this event is triggered.
     * @param callback - Callback function to execute
     * @returns The callback passed in, can be used with `remove()`
     */
    add(callback) {
        if (typeof callback === "function") {
            this._callbacks.push(callback);
            return callback;
        }
        else {
            throw "Trying to add invalid callback type to EventWrapper. You must add a function.";
        }
    }
    /**
     * Remove a callback function from this event.
     * @param callback - Callback function to remove
     */
    remove(callback) {
        const ind = this._callbacks.indexOf(callback);
        if (ind > -1) {
            this._callbacks.splice(ind, 1);
        }
        else {
            this.log.e("Trying to remove callback from EventWrapper, but the callback hasn't been added.");
        }
    }
    /**
     * Trigger the event so that all callbacks are executed.
     * All arguments given will be passed to the callbacks.
     * @param args - Arguments to pass to callbacks
     */
    trigger(...args) {
        const callbacks = this._callbacks.slice();
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](...args);
        }
    }
}
exports.EventWrapper = EventWrapper;
// These exports exist for javascript compatibility, and should not be used from typescript code.
;
global.EventWrapper = EventWrapper;
//# sourceMappingURL=EventWrapper.js.map