import { datass } from 'datass'

const theme = datass.string('dark')
const folders = datass.array([])
const isOpen = datass.boolean(false)

export const $settings = {
	folders,
	theme,
	isOpen
}
