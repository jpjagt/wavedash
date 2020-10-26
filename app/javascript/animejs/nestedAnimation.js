import _get from 'lodash/get'
import _set from 'lodash/set'

const nestedAnimation = (target, properties, animations) => {
  const targets = {}

  const init = () => {
    Object.keys(animations).forEach((property) => {
      targets[property] = _get(target, property, 0)
    })
  }

  // need to populate targets with keys
  init()

  const update = (anim) => {
    anim.animations.forEach((animation) => {
      _set(target, animation.property, animation.currentValue)
    })
  }

  return {
    ...properties,
    ...animations,
    targets,
    update,
    /*     begin: init, */
    beforeBegin: init, // careful with coupling to ASM
  }
}

export default nestedAnimation
