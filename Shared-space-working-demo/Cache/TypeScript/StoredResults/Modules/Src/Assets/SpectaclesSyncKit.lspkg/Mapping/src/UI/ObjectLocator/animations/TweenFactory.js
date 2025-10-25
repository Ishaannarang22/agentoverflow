"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweenFactory = void 0;
const tween_1 = require("./tween");
const Update_1 = require("./Update");
class TweenFactory {
    static create(from, to, duration) {
        if (!TweenFactory.tweenEngineInitialized) {
            Update_1.Update.register((time) => {
                (0, tween_1.update)(time);
                return true;
            });
            TweenFactory.tweenEngineInitialized = true;
        }
        return new tween_1.Tween(from).to(to, duration).start(getTime());
    }
}
exports.TweenFactory = TweenFactory;
TweenFactory.tweenEngineInitialized = false;
//# sourceMappingURL=TweenFactory.js.map