import { ZCollapsible } from '#/components/collapsible'
import { Page } from '#/components/page'
import { ZSelect } from '#/components/select'
import { ZText } from '#/components/text'
import { ZToggleGroup } from '#/components/toggle-group'
import { mockBrowseAssets } from '#/constants/mock-assets'
import { ZInput } from '#/components/input'
import { styled } from '#/modules/tw-styled'
import { FadersHorizontalIcon, PianoKeysIcon, WaveformIcon } from '@phosphor-icons/react'
import { useDatass } from 'datass'
import { AssetRow } from './asset-row'

const sortOptions = [
	{ value: 'timeAdded-desc', label: 'Newest first' },
	{ value: 'name-asc', label: 'Name A–Z' },
	{ value: 'bpm-desc', label: 'Highest BPM' },
	{ value: 'duration-desc', label: 'Longest duration' }
]

const keyOptions = [
	{ value: 'C Minor', label: 'C Minor' },
	{ value: 'D Minor', label: 'D Minor' },
	{ value: 'E Minor', label: 'E Minor' },
	{ value: 'F Minor', label: 'F Minor' },
	{ value: 'G Minor', label: 'G Minor' },
	{ value: 'A Minor', label: 'A Minor' },
	{ value: 'Bb Minor', label: 'Bb Minor' },
	{ value: 'C# Minor', label: 'C# Minor' },
	{ value: 'F# Minor', label: 'F# Minor' }
]

const scaleOptions = [
	{ value: 'Natural Minor', label: 'Natural Minor' },
	{ value: 'Dorian', label: 'Dorian' },
	{ value: 'Phrygian', label: 'Phrygian' },
	{ value: 'Harmonic Minor', label: 'Harmonic Minor' },
	{ value: 'Melodic Minor', label: 'Melodic Minor' }
]

const assetTypeItems = [
	{ value: 'sample', label: 'Samples', icon: <WaveformIcon size={14} /> },
	{ value: 'midi', label: 'MIDI', icon: <PianoKeysIcon size={14} /> }
]

const playbackKindItems = [
	{ value: 'all', label: 'All' },
	{ value: 'one-shot', label: 'One-shot' },
	{ value: 'loop', label: 'Loop' }
]

const BrowseRoot = styled(Page.Root, 'BrowseRoot', 'w-full max-w-4xl gap-6 px-6 py-6 pb-10')

const BrowseHeader = styled.div('BrowseHeader', 'flex items-center justify-between')

const FilterGrid = styled.div('FilterGrid', 'grid grid-cols-2 gap-4')

const FilterTriggerRow = styled.div('FilterTriggerRow', 'flex items-center gap-2 text-sm font-medium')

const ResultsSection = styled.div('ResultsSection', 'flex flex-col gap-0')

const ResultsHeader = styled.div('ResultsHeader', 'flex items-center justify-between pb-3 border-b border-border')

const ResultsCount = styled.span('ResultsCount', 'text-muted-foreground text-sm')

const ResultsList = styled.div('ResultsList', 'flex flex-col')

const PlaybackKindRow = styled.div('PlaybackKindRow', 'flex items-center gap-3 col-span-2')

const PlaybackKindLabel = styled.span('PlaybackKindLabel', 'text-foreground text-sm font-medium')

export const Browse = () => {
	const assetType = useDatass.string('sample')
	const sortValue = useDatass.string('timeAdded-desc')
	const playbackKind = useDatass.string('all')

	const visibleAssets = mockBrowseAssets.slice(0, 40)
	const totalCount = mockBrowseAssets.length
	const isSampleMode = assetType.state === 'sample'

	const filterTrigger = (
		<FilterTriggerRow>
			<FadersHorizontalIcon size={16} />
			<span>Filters</span>
		</FilterTriggerRow>
	)

	return (
		<BrowseRoot>
			<BrowseHeader>
				<ZText.H1>Browse</ZText.H1>
				<ZToggleGroup value={assetType.state} onValueChange={assetType.set} items={assetTypeItems} />
			</BrowseHeader>

			<ZCollapsible trigger={filterTrigger} defaultOpen>
				<FilterGrid>
					<ZInput placeholder='Search by name...' className='col-span-2' />
					<ZSelect label='Key' items={keyOptions} placeholder='Any key' />
					<ZSelect label='Scale' items={scaleOptions} placeholder='Any scale' />
					<ZInput type='number' label='Min BPM' placeholder='e.g. 80' />
					<ZInput type='number' label='Max BPM' placeholder='e.g. 160' />
					{isSampleMode && (
						<PlaybackKindRow>
							<PlaybackKindLabel>Kind</PlaybackKindLabel>
							<ZToggleGroup value={playbackKind.state} onValueChange={playbackKind.set} items={playbackKindItems} />
						</PlaybackKindRow>
					)}
				</FilterGrid>
			</ZCollapsible>

			<ResultsSection>
				<ResultsHeader>
					<ResultsCount>{totalCount} results</ResultsCount>
					<ZSelect items={sortOptions} value={sortValue.state} onValueChange={sortValue.set} />
				</ResultsHeader>
				<ResultsList>
					{visibleAssets.map((asset) => {
						return <AssetRow key={asset.id} asset={asset} />
					})}
				</ResultsList>
			</ResultsSection>
		</BrowseRoot>
	)
}
