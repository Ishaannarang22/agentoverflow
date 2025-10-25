import {Tween, update as tweenEngineUpdate} from "./tween"
import {Update} from "./Update"

type UnknownProps = unknown

export class TweenFactory {
  private static tweenEngineInitialized = false
  static create<T extends UnknownProps>(
    from: T,
    to: T,
    duration: number,
  ): Tween<T> {
    if (!TweenFactory.tweenEngineInitialized) {
      Update.register((time) => {
        tweenEngineUpdate(time)
        return true
      })
      TweenFactory.tweenEngineInitialized = true
    }

    return new Tween(from).to(to, duration).start(getTime())
  }
}
