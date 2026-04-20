import { brandWords } from '#/constants/brand-words'

type MockFolderDefinitionT = {
	id: string
	name: string
	path: string
}

const mockFolderDefinitions: ReadonlyArray<MockFolderDefinitionT> = [
	{
		id: 'folder-drums',
		name: 'Drum Vault',
		path: 'C:/Samples/Drum Vault'
	},
	{
		id: 'folder-melodics',
		name: 'Melodic Cuts',
		path: 'C:/Samples/Melodic Cuts'
	},
	{
		id: 'folder-midnight',
		name: 'Midnight Loops',
		path: 'C:/Samples/Midnight Loops'
	},
	{
		id: 'folder-cinematic',
		name: 'Cinematic Textures',
		path: 'C:/Samples/Cinematic Textures'
	},
	{
		id: 'folder-midi',
		name: 'MIDI Sketches',
		path: 'C:/Samples/MIDI Sketches'
	}
]

const sampleNameSuffixes: ReadonlyArray<string> = ['drift', 'pulse', 'impact', 'texture', 'drop', 'loop', 'phrase', 'stutter', 'glow', 'rush']
const midiNameSuffixes: ReadonlyArray<string> = ['chords', 'lead', 'motif', 'riff', 'arp', 'progression', 'topline', 'phrase']
const sampleTags: ReadonlyArray<string> = ['club', 'cinematic', 'trap', 'house', 'ambient', 'future', 'organic', 'dark']
const midiTags: ReadonlyArray<string> = ['melodic', 'euphoric', 'tense', 'anthemic', 'emotional', 'hypnotic', 'minimal', 'festival']
const musicalKeys: ReadonlyArray<string> = ['C Minor', 'D Minor', 'E Minor', 'F Minor', 'G Minor', 'A Minor', 'Bb Minor', 'C# Minor', 'F# Minor']
const musicalScales: ReadonlyArray<string> = ['Natural Minor', 'Dorian', 'Phrygian', 'Harmonic Minor', 'Melodic Minor']
const sampleFileTypes: ReadonlyArray<FileTypeT> = ['wav', 'mp3']
const midiFileTypes: ReadonlyArray<FileTypeT> = ['mid', 'midi']

const getArrayValue = <ValueT>(values: ReadonlyArray<ValueT>, index: number): ValueT => {
	const arrayIndex = index % values.length
	return values[arrayIndex]
}

const padNumber = (value: number): string => {
	return String(value).padStart(3, '0')
}

const getTimestampFromOffset = (dayOffset: number, minuteOffset: number): string => {
	const dateValue = new Date(Date.UTC(2026, 3, 19, 18, 0, 0, 0))
	dateValue.setUTCDate(dateValue.getUTCDate() - dayOffset)
	dateValue.setUTCMinutes(dateValue.getUTCMinutes() - minuteOffset)
	return dateValue.toISOString()
}

const createTagCollection = (assetIndex: number, isMidiAsset: boolean): string[] => {
	const availableTags = isMidiAsset ? midiTags : sampleTags
	const leadingTag = getArrayValue(availableTags, assetIndex)
	const trailingTag = getArrayValue(brandWords, assetIndex * 3)
	const accentTag = getArrayValue(brandWords, assetIndex * 7 + 2)
	return [leadingTag, trailingTag, accentTag]
}

const createAssetName = (assetIndex: number, isMidiAsset: boolean): string => {
	const leadingWord = getArrayValue(brandWords, assetIndex)
	const trailingWord = getArrayValue(brandWords, assetIndex * 5 + 3)
	const suffixCollection = isMidiAsset ? midiNameSuffixes : sampleNameSuffixes
	const suffixWord = getArrayValue(suffixCollection, assetIndex * 2)
	const sequenceValue = padNumber(assetIndex + 1)
	return `${leadingWord} ${trailingWord} ${suffixWord} ${sequenceValue}`
		.split(' ')
		.map((wordValue) => {
			const firstCharacter = wordValue.charAt(0).toUpperCase()
			const remainingCharacters = wordValue.slice(1)
			return `${firstCharacter}${remainingCharacters}`
		})
		.join(' ')
}

const createBaseEntity = (assetIndex: number): BaseEntityT => {
	const createdAt = getTimestampFromOffset(Math.floor(assetIndex / 3), assetIndex * 13)
	const updatedAt = getTimestampFromOffset(Math.floor(assetIndex / 4), assetIndex * 7)
	return {
		id: `asset-${padNumber(assetIndex + 1)}`,
		createdAt,
		updatedAt
	}
}

const createFileMetadata = (assetIndex: number, assetName: string, isMidiAsset: boolean, folderDefinition: MockFolderDefinitionT): FileMetadataT => {
	const fileType = isMidiAsset ? getArrayValue(midiFileTypes, assetIndex) : getArrayValue(sampleFileTypes, assetIndex)
	const normalizedName = assetName.toLowerCase().replace(/\s+/g, '-')
	const fileName = `${normalizedName}.${fileType}`
	const timeAdded = getTimestampFromOffset(Math.floor(assetIndex / 2), assetIndex * 9)
	const fileSize = isMidiAsset ? 1200 + assetIndex * 12 : 2400000 + assetIndex * 1731
	const lastModifiedAt = getTimestampFromOffset(Math.floor(assetIndex / 5), assetIndex * 5)
	return {
		fileName,
		filePath: `${folderDefinition.path}/${fileName}`,
		fileType,
		fileSize,
		extension: fileType,
		hash: `hash-${padNumber(assetIndex + 1)}`,
		timeAdded,
		lastModifiedAt
	}
}

const createAssetFlags = (assetIndex: number): AssetFlagsT => {
	const isFavorited = assetIndex % 7 === 0
	const isDisliked = assetIndex % 19 === 0
	const isHidden = isDisliked
	const isDuplicate = assetIndex % 23 === 0
	return {
		isFavorited,
		isDisliked,
		isHidden,
		isDuplicate
	}
}

const createAssetUsage = (assetIndex: number, assetFlags: AssetFlagsT): AssetUsageT => {
	const playCount = 4 + (assetIndex % 38)
	const lastPlayedAt = getTimestampFromOffset(Math.floor(assetIndex / 6), assetIndex * 2)
	const copiedAt = getTimestampFromOffset(Math.floor(assetIndex / 8), assetIndex)
	const favoritedAt = assetFlags.isFavorited ? getTimestampFromOffset(Math.floor(assetIndex / 9), assetIndex * 3) : undefined
	const dislikedAt = assetFlags.isDisliked ? getTimestampFromOffset(Math.floor(assetIndex / 10), assetIndex * 4) : undefined
	return {
		playCount,
		lastPlayedAt,
		copiedAt,
		favoritedAt,
		dislikedAt
	}
}

const createSampleAnalysis = (assetIndex: number): SampleAnalysisT => {
	const durationMs = 1800 + (assetIndex % 9) * 7200
	const bpm = 88 + (assetIndex % 16) * 4
	const key = getArrayValue(musicalKeys, assetIndex)
	const playbackKind: SamplePlaybackKindT = assetIndex % 3 === 0 ? 'loop' : 'one-shot'
	return {
		durationMs,
		bpm,
		key,
		playbackKind
	}
}

const createMidiAnalysis = (assetIndex: number): MidiAnalysisT => {
	const durationMs = 6000 + (assetIndex % 7) * 8200
	const primaryKey = getArrayValue(musicalKeys, assetIndex)
	const secondaryKey = getArrayValue(musicalKeys, assetIndex + 2)
	const primaryScale = getArrayValue(musicalScales, assetIndex)
	const secondaryScale = getArrayValue(musicalScales, assetIndex + 1)
	return {
		durationMs,
		keys: [primaryKey, secondaryKey],
		scales: [primaryScale, secondaryScale]
	}
}

const createSampleAsset = (assetIndex: number): SampleAssetT => {
	const folderDefinition = getArrayValue(mockFolderDefinitions, assetIndex)
	const assetName = createAssetName(assetIndex, false)
	const baseEntity = createBaseEntity(assetIndex)
	const fileMetadata = createFileMetadata(assetIndex, assetName, false, folderDefinition)
	const assetFlags = createAssetFlags(assetIndex)
	const assetUsage = createAssetUsage(assetIndex, assetFlags)
	const sampleAnalysis = createSampleAnalysis(assetIndex)
	const indexedAt = getTimestampFromOffset(Math.floor(assetIndex / 4), assetIndex * 6)
	const normalizedName = assetName.toLowerCase()
	const tags = createTagCollection(assetIndex, false)
	const notes = `Layered for late-night arrangements and high-energy transitions.`
	return {
		...baseEntity,
		type: 'sample',
		name: assetName,
		normalizedName,
		folderId: folderDefinition.id,
		tags,
		notes,
		file: fileMetadata,
		flags: assetFlags,
		usage: assetUsage,
		indexedAt,
		analysis: sampleAnalysis
	}
}

const createMidiAsset = (assetIndex: number): MidiAssetT => {
	const folderDefinition = getArrayValue(mockFolderDefinitions, assetIndex + 1)
	const assetName = createAssetName(assetIndex, true)
	const baseEntity = createBaseEntity(assetIndex)
	const fileMetadata = createFileMetadata(assetIndex, assetName, true, folderDefinition)
	const assetFlags = createAssetFlags(assetIndex)
	const assetUsage = createAssetUsage(assetIndex, assetFlags)
	const midiAnalysis = createMidiAnalysis(assetIndex)
	const indexedAt = getTimestampFromOffset(Math.floor(assetIndex / 5), assetIndex * 8)
	const normalizedName = assetName.toLowerCase()
	const tags = createTagCollection(assetIndex, true)
	const notes = `Sketched for quick harmonic iteration and external routing tests.`
	return {
		...baseEntity,
		type: 'midi',
		name: assetName,
		normalizedName,
		folderId: folderDefinition.id,
		tags,
		notes,
		file: fileMetadata,
		flags: assetFlags,
		usage: assetUsage,
		indexedAt,
		analysis: midiAnalysis
	}
}

const createMockAsset = (assetIndex: number): AssetT => {
	const isMidiAsset = assetIndex % 4 === 0
	if (isMidiAsset) return createMidiAsset(assetIndex)
	return createSampleAsset(assetIndex)
}

export const generateMockAssets = (assetCount: number): AssetT[] => {
	const generatedAssets: AssetT[] = []
	for (let assetIndex = 0; assetIndex < assetCount; assetIndex += 1) {
		const generatedAsset = createMockAsset(assetIndex)
		generatedAssets.push(generatedAsset)
	}
	return generatedAssets
}

export const mockBrowseAssets = generateMockAssets(180)
export const mockBrowseFolders = mockFolderDefinitions
