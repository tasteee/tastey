export const brandWords = ['dark', 'volatile', 'emotional', 'wolf', 'neon', 'midnight', 'velvet', 'static', 'echo', 'ghost', 'pulse', 'fragile', 'electric', 'hollow', 'burn', 'flicker', 'obsidian', 'smoke', 'lonely', 'restless', 'raw', 'haunted', 'fever', 'crash', 'glitch', 'bleed', 'shiver', 'fury', 'shadow', 'chrome', 'synthetic', 'siren', 'void', 'ache', 'drift', 'fracture', 'lucid', 'poison', 'velcro', 'savage', 'faded', 'desire', 'signal', 'paradox', 'feral', 'mirror', 'riot', 'ashes', 'magnetic', 'blur', 'distortion', 'scar', 'haze', 'nocturnal', 'pulsewave', 'vandal', 'frozen', 'collapse', 'ignite', 'staticwave', 'eclipse', 'drown', 'arcane', 'wildfire', 'reverb', 'cruel', 'silk', 'broken', 'hyper', 'phantom', 'venom', 'gravity', 'storm', 'crimson', 'twilight', 'spiral', 'dreamstate', 'reckless', 'tension', 'flickerlight', 'shattered', 'obsess', 'afterglow', 'bleak', 'resonance', 'thrash', 'lowlight', 'catacomb', 'dissonance', 'overdrive', 'fractured', 'runaway', 'spectrum', 'weightless', 'decay', 'undercurrent', 'hunger']

export const getBrandWord = () => {
	const randomIndex = Math.floor(Math.random() * brandWords.length)
	return brandWords[randomIndex]
}

export const getWord = () => {
	const brandWord = getBrandWord()
	const firstLetter = brandWord.charAt(0).toUpperCase()
	const restOfWord = brandWord.slice(1)
	return `${firstLetter}${restOfWord}`
}
