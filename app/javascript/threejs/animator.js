export default (properties, rerender) => {
  let update = () => rerender()
  if (properties.update) {
    update = (anim) => {
      properties.update(anim)
      rerender()
    }
  }

  return {
    ...properties,
    update
  }
}
