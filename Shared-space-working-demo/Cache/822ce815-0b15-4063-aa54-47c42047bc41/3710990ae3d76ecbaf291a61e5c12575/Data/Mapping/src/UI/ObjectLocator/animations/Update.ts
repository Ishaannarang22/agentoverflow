type Callback = (time: number, deltaTime: number) => boolean

@component
export class Update extends BaseScriptComponent {
  private static initialized = false
  private static callbacks: Array<Callback> = []

  public static register(callback: Callback): void {
    if (!Update.initialized) {
      global.scene
        .createSceneObject("Update")
        .createComponent(Update.getTypeName())
    }
    this.callbacks.push(callback)
  }

  private static onUpdate(time: number, deltaTime: number) {
    let i = 0
    while (i < Update.callbacks.length) {
      if (
        Update.callbacks[i] &&
        Update.callbacks[i](time, deltaTime) === false
      ) {
        Update.callbacks.splice(i, 1)
      } else {
        i++
      }
    }
  }

  onAwake(): void {
    if (!Update.initialized) {
      this.createEvent("UpdateEvent").bind((event) => this.onUpdate(event))
      Update.initialized = true
    }
  }

  onUpdate(event: UpdateEvent): void {
    Update.onUpdate(getTime(), event.getDeltaTime())
  }
}
