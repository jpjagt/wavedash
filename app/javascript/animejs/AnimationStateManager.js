import anime from 'animejs'

class AnimationStateManager {
  constructor(base, animations) {
    this.index = 0
    this.base = base
    this.animations = animations
    this.prevIndex = -1
  }

  getIndex = () => {
    // because we're updating the index early
    return this.prevIndex
  }

  play = () => {
    const properties = {
      ...this.base,
      ...this.animations[this.index],
    }

    if (properties.beforeBegin) properties.beforeBegin()
    anime(properties)
  }

  updateIndex = (n) => {
    this.prevIndex = this.index
    this.index = (this.index + n) % this.animations.length
  }

  next = () => {
    this.play()
    this.updateIndex(1)
  }

  prev = () => {
    this.play()
    this.updateIndex(-1)
  }
}

export default AnimationStateManager
