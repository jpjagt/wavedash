import lax from './lax'

window.lax = lax
const processTile = (elem) => {
  const { tileOrigin, tileHeight, tileWidth, tileDepth } = elem.dataset

  elem.style.transform = `translateZ(${tileDepth}px)`
  elem.style.width = `${tileWidth}%`
  elem.style.height = `${tileHeight}%`
  tileOrigin.split(' ').forEach(origin => {
    elem.style[origin] = '0'
  })
}

const ref = document.querySelector('#reference')

export const activateTunnel = () => {
  const initialDepth = Math.min(window.innerHeight, window.innerWidth) * 0.8

  lax.addTransform("data-lax-translate-z", (style, v) => { style.transform += ` translateZ(${v}px)` })
  lax.addPreset("translateBackwards", function() {
    return {
      "data-lax-translate-z": `0 ${initialDepth}, (-document.body.scrollHeight) -4000`
    }
  })

  lax.setup() // init

  const updateLax = () => {
    lax.update(window.scrollY)
    window.requestAnimationFrame(updateLax)
  }

  window.requestAnimationFrame(updateLax)

  document.querySelectorAll('.tunnel-tile').forEach(elem => processTile(elem))
}
