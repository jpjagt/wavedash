const getTileElements = () => document.querySelectorAll('.tunnel-tile')

const toggleEnlarged = (elem) => {
  elem.classList.toggle('enlarged')
}

const addTile = (elem) => {
  const { tileOrigin, tileHeight, tileWidth, tileDepth } = elem.dataset

  elem.style.transform = `translateZ(${tileDepth}px)`
  elem.style.width = isNaN(tileWidth) ? tileWidth : `${tileWidth}%`
  elem.style.height = `${tileHeight}%`
  tileOrigin.split(' ').forEach(origin => {
    elem.style[origin] = '0'
  })

  elem.addEventListener('click', () => toggleEnlarged(elem))
}

const removeTile = (elem) => {
  elem.removeEventListener('click', () => toggleEnlarged(elem))	
}

export const addTiles = () => getTileElements().forEach(addTile)
export const removeTiles = () => getTileElements().forEach(removeTile)