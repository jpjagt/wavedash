let updateHooks = []
let activated = false
let lastY = null

const update = (y) => updateHooks.forEach(fn => fn(y))

const render = () => {
  const y = window.scrollY

  if (y !== lastY) {
    lastY = y
    update(y)
  }

  if (activated)
    window.requestAnimationFrame(render)
}

export const addOnUpdate = (fn) => updateHooks.push(fn)

export const activate = () => {
  if (!activated) {
    activated = true
    window.requestAnimationFrame(render)
  }
}

export const deactivate = () => {
  if (activated) {
    activated = false
    updateHooks = []
  }
}
