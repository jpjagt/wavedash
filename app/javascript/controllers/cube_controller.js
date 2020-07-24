import { Controller } from "stimulus"

import { createCubeKeyframes } from '../cubemath'
import { createElementFromHTML } from '../utils'

const animationDuration = 1400

export default class extends Controller {
  static targets = [ 'cubeContainer', 'frontSide' ]

  connect () {
    if (false && process.env.NODE_ENV === 'development') {
      if (!window.keyFramesCreated) {
        createCubeKeyframes()
        window.keyFramesCreated = true
      }
    }
  }

  onRender (event) {
    if (window.previousFrontSide) {
      this.transitionToNewContent(window.previousFrontSide, window.previousBackground)

      window.previousFrontSide = null
    }
  }

  onBeforeVisit (event) {
    window.previousBackground = this.getCubeBackground().outerHTML.toString()
    window.previousFrontSide = this.getFrontSide().innerHTML.toString()
  }

  getCubeContainer = () => document.querySelector('#cube-container')
  getFrontSide = () => document.querySelector('#cube .front .side-inner')
  getCubeBackground = () => document.querySelector('#cube-container .cube-bg')

  transitionToNewContent (oldContent, oldBackground) {
    const frontSide = this.getFrontSide()
    if (frontSide) {
      const content = frontSide.innerHTML
      frontSide.innerHTML = oldContent
      setTimeout(() => {
        this.rotate()
        this.transitionBackground(oldBackground)
      }, 10)

      setTimeout(() => {
        frontSide.innerHTML = content
      }, animationDuration / 2)
    }
  }

  transitionBackground (oldBackground) {
    const bgElem = createElementFromHTML(oldBackground)
    this.getCubeContainer().appendChild(bgElem)
    bgElem.classList.add('disappearing')
  }

  rotate () {
    const container = this.getCubeContainer()
    container.classList.add('rotating')
    setTimeout(() => {
      container.classList.remove('rotating')
    }, animationDuration)
  }
}
