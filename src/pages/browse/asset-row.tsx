import { ZBadge } from '#/components/badge'
import { ZButton } from '#/components/button'
import { styled } from '#/modules/tw-styled'
import { DotsThreeIcon, HeartIcon, PlayIcon, PianoKeysIcon, PlusIcon, WaveformIcon } from '@phosphor-icons/react'

type AssetRowPropsT = {
	asset: AssetT
}

const AssetRowRoot = styled.div('AssetRowRoot', 'flex items-center gap-3 py-3 px-2 border-b border-border hover:bg-secondary/40 transition-colors group')

const AssetTypeIcon = styled.div('AssetTypeIcon', 'flex-shrink-0 text-muted-foreground')

const AssetNameColumn = styled.div('AssetNameColumn', 'flex-1 flex flex-col gap-1 min-w-0')

const AssetName = styled.span('AssetName', 'text-primary text-sm font-medium leading-none truncate')

const AssetTagRow = styled.div('AssetTagRow', 'flex items-center gap-1 flex-wrap')

const AssetMetaRow = styled.div('AssetMetaRow', 'flex items-center gap-3 flex-shrink-0')

const AssetMetaItem = styled.span('AssetMetaItem', 'text-muted-foreground text-xs tabular-nums')

const AssetMetaDivider = styled.span('AssetMetaDivider', 'text-border text-xs')

const AssetActions = styled.div('AssetActions', 'flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity')

const formatDuration = (durationMs: number): string => {
	const totalSeconds = Math.floor(durationMs / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	const paddedSeconds = String(seconds).padStart(2, '0')
	return `${minutes}:${paddedSeconds}`
}

export const AssetRow = (props: AssetRowPropsT) => {
	const asset = props.asset
	const isSample = asset.type === 'sample'
	const sampleAsset = isSample ? (asset as SampleAssetT) : null
	const bpm = sampleAsset !== null ? sampleAsset.analysis.bpm : undefined
	const musicalKey = sampleAsset !== null ? sampleAsset.analysis.key : undefined
	const durationMs = sampleAsset !== null ? sampleAsset.analysis.durationMs : undefined
	const playbackKind = sampleAsset !== null ? sampleAsset.analysis.playbackKind : undefined

	const hasBpm = bpm !== undefined
	const hasKey = musicalKey !== undefined
	const hasDuration = durationMs !== undefined && durationMs > 0
	const isLoop = playbackKind === 'loop'
	const isFavorited = asset.flags.isFavorited

	const kindBadgeColor = isLoop ? 'purple' : 'gray'
	const kindLabel = isLoop ? 'loop' : 'one-shot'
	const favoriteButtonColor = isFavorited ? 'pink' : 'gray'
	const heartWeight = isFavorited ? 'fill' : 'regular'

	return (
		<AssetRowRoot>
			<AssetTypeIcon>
				{isSample && <WaveformIcon size={16} />}
				{!isSample && <PianoKeysIcon size={16} />}
			</AssetTypeIcon>

			<ZButton kind='ghost' size='icon' color='gray'>
				<PlayIcon size={15} />
			</ZButton>

			<AssetNameColumn>
				<AssetName>{asset.name}</AssetName>
				<AssetTagRow>
					{asset.tags.map((assetTag) => {
						return (
							<ZBadge key={assetTag} color='gray'>
								{assetTag}
							</ZBadge>
						)
					})}
					{isSample && <ZBadge color={kindBadgeColor}>{kindLabel}</ZBadge>}
				</AssetTagRow>
			</AssetNameColumn>

			<AssetMetaRow>
				{hasBpm && <AssetMetaItem>{bpm} BPM</AssetMetaItem>}
				{hasBpm && hasKey && <AssetMetaDivider>·</AssetMetaDivider>}
				{hasKey && <AssetMetaItem>{musicalKey}</AssetMetaItem>}
				{(hasBpm || hasKey) && hasDuration && <AssetMetaDivider>·</AssetMetaDivider>}
				{hasDuration && <AssetMetaItem>{formatDuration(durationMs!)}</AssetMetaItem>}
			</AssetMetaRow>

			<AssetActions>
				<ZButton kind='ghost' size='icon' color={favoriteButtonColor}>
					<HeartIcon size={15} weight={heartWeight} />
				</ZButton>
				<ZButton kind='ghost' size='icon' color='gray'>
					<PlusIcon size={15} />
				</ZButton>
				<ZButton kind='ghost' size='icon' color='gray'>
					<DotsThreeIcon size={16} />
				</ZButton>
			</AssetActions>
		</AssetRowRoot>
	)
}
