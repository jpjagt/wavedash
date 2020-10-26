import lax from '../lax'

const ref = document.querySelector('#reference')

export const activate = () => {
  // const tnlSize = 400
  // const depthOnMobile = 60
  // const initialDepth = (tnlSize - depthOnMobile) + depthOnMobile
  const initialDepth = window.innerWidth > 500 ? 330 : 60

  lax.addTransform("data-lax-translate-z", (style, v) => { style.transform += ` translateZ(${v}px)` })
  lax.addPreset("translateBackwards", function() {
    return {
      "data-lax-translate-z": `0 ${initialDepth}, (document.body.scrollHeight)-vh -4000`
    }
  })

	 lax.addPreset("tunnelHeader", function() {
	   return {
	     "data-lax-translate-x": `0 0, 2vh 300`
	   }
	 })

   lax.addPreset("tunnelEndScreen", function() {
     return {
       "data-lax-opacity": `(document.body.scrollHeight-150)-vh 0, (document.body.scrollHeight)-vh 1`,
       "data-lax-scale": `(document.body.scrollHeight-150)-vh 0.9, (document.body.scrollHeight)-vh 1`
     }
   })

  lax.setup()

  const updateLax = () => {
    lax.update(window.scrollY)
    window.requestAnimationFrame(updateLax)
  }

  window.requestAnimationFrame(updateLax)
}

export const deactivate = () => {
  lax.elements.forEach(elem => lax.removeElement(elem))
}
