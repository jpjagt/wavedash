import * as tunnel from './tunnel'
import {
	addTiles,
	removeTiles
} from './tiles'

export const activateTunnel = (bgHex, edgeHex) => {
	tunnel.activate(bgHex, edgeHex)
	addTiles()
}

export const deactivateTunnel = () => {
	tunnel.deactivate()
	removeTiles()
}
