import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import animate, {CancelFunction} from "SpectaclesInteractionKit.lspkg/Utils/animate"
import {lerp} from "SpectaclesInteractionKit.lspkg/Utils/mathUtils"

export const getPasses = (object: SceneObject): Pass[] | null => {
  const meshComponent = object.getComponents("Component.RenderMeshVisual")
  const imageComponent = object.getComponents("Component.Image")
  if (meshComponent.length > 0) {
    const mesh = <RenderMeshVisual>object.getComponent("Component.RenderMeshVisual")
    const res: Pass[] = []
    for (let i = 0; i < mesh.getMaterialsCount(); ++i) {
      res.push(mesh.getMaterial(i).mainPass)
    }
    return res
  } else if (imageComponent.length > 0) {
    const image = <Image>object.getComponent("Component.Image")
    return [image.mainMaterial.mainPass]
  }
  return null
}

export const setAlpha = (object: SceneObject, alpha: number): void => {
  const pass = getPasses(object)
  if (pass) {
    pass.forEach((value) => {
      const baseColor: vec4 = value.baseColor
      if (baseColor) {
        baseColor.a = alpha
        value.baseColor = baseColor
      }
    })
  } else if (object.getComponents("Component.Text").length > 0) {
    const text = <Text>object.getComponent("Component.Text")
    const baseColor: vec4 = text.textFill.color
    baseColor.a = alpha
    text.textFill.color = baseColor
    if (text.outlineSettings.enabled) {
      text.outlineSettings.fill.color = baseColor
    }
  }

  for (let i = 0; i < object.getChildrenCount(); ++i) {
    const child = object.getChild(i)
    setAlpha(child, alpha)
  }
}

export function delayFrames(script: ScriptComponent, framesCount: number, callback: () => void): void {
  let counter = 0

  if (framesCount === counter) {
    if (callback) callback()
    return
  }
  script.createEvent("UpdateEvent").bind((eventData) => {
    if (++counter >= framesCount) {
      if (callback) callback()
      eventData.enabled = false
    }
  })
}

export function animateToAlpha(
  target: SceneObject,
  from: number,
  to: number,
  duration: number,
  onComplete: () => void = () => {}
): CancelFunction {
  return animate({
    update: (t: number) => {
      const currentAlpha = lerp(from, to, t)
      setAlpha(target, currentAlpha)
    },
    start: 0,
    end: 1,
    duration: duration,
    ended: onComplete
  })
}

export function setObjectInTheWorldOnDistance(object: SceneObject, distance: number, shouldCountY = false): void {
  const transform = object.getTransform()
  const worldCamera = WorldCameraFinderProvider.getInstance()
  const head = worldCamera.getTransform().getWorldPosition()
  const back = worldCamera.getTransform().back
  if (!shouldCountY) {
    back.y = 0
  }
  const pos = back.normalize().uniformScale(distance)
  transform.setWorldPosition(head.add(pos))
  transform.setWorldRotation(quat.lookAt(pos.uniformScale(-1), vec3.up()))
}
