import * as tunnel from './tunnel'
import {
	addTiles,
	removeTiles
} from './tiles'

export const activateTunnel = () => {
	tunnel.activate()
	addTiles()
}

export const deactivateTunnel = () => {
	tunnel.deactivate()
	removeTiles()
}