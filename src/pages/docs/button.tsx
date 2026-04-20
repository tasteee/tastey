import { styled } from '#/modules/tw-styled'

import { ZButton } from '#/components/button'
import { PenNibIcon } from '@phosphor-icons/react/dist/icons/PenNib'
import { getWord } from '#/constants/brand-words'
import { Page } from '#/components/page'

type ZButtonColorT = 'white' | 'pink' | 'orange' | 'purple' | 'gray' | 'red'
type ZButtonSizeT = 'small' | 'medium' | 'large' | 'icon'
type ZButtonKindT = 'solid' | 'line' | 'ghost'

const COLORS: ReadonlyArray<ZButtonColorT> = ['white', 'pink', 'orange', 'purple', 'gray', 'red']
const SIZES: ReadonlyArray<ZButtonSizeT> = ['small', 'medium', 'large', 'icon']
const KINDS: ReadonlyArray<ZButtonKindT> = ['solid', 'line', 'ghost']

const kindDescriptions: Record<ZButtonKindT, string> = {
	solid: 'Filled background — primary actions',
	line: 'Outlined border — secondary actions',
	ghost: 'No border or fill — tertiary actions'
}

const KindsStack = styled.div('KindsStack', 'flex flex-col gap-4')
const KindCard = styled.div('KindCard', 'rounded-xl border border-[var(--color-border)] bg-[var(--background-light)] overflow-hidden')
const KindCardHeader = styled.div('KindCardHeader', 'flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)]')
const KindCardTitle = styled.span('KindCardTitle', 'text-[var(--font-size-sm)] font-semibold text-[var(--color-white)] capitalize tracking-[0.01em]')
const KindCardMeta = styled.span('KindCardMeta', 'text-[var(--font-size-xs)] text-[var(--color-muted)]')
const KindCardBody = styled.div('KindCardBody', 'px-5 py-4 flex flex-col gap-4')
const MatrixSizeHeaderRow = styled.div('MatrixSizeHeaderRow', 'grid grid-cols-[3.75rem_1fr_1fr_1fr_1fr] items-center gap-2 mb-1 pb-2 border-b border-[var(--color-border)]')
const MatrixSizeLabel = styled.span('MatrixSizeLabel', 'text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-[0.08em] text-center opacity-60')
const MatrixRow = styled.div('MatrixRow', 'grid grid-cols-[3.75rem_1fr_1fr_1fr_1fr] items-center gap-2')
const MatrixColorLabel = styled.span('MatrixColorLabel', 'text-[10px] font-mono text-[var(--color-muted)] capitalize tracking-[0.03em]')
const MatrixCell = styled.div('MatrixCell', 'flex justify-center items-center')

type KindSectionPropsT = {
	kind: ZButtonKindT
}

const KindSection = (props: KindSectionPropsT) => {
	const description = kindDescriptions[props.kind]

	return (
		<KindCard>
			<KindCardHeader>
				<KindCardTitle>{props.kind}</KindCardTitle>
				<KindCardMeta>{description}</KindCardMeta>
			</KindCardHeader>
			<KindCardBody>
				<MatrixSizeHeaderRow>
					<span />
					{SIZES.map((size) => (
						<MatrixSizeLabel key={size}>{size}</MatrixSizeLabel>
					))}
				</MatrixSizeHeaderRow>
				{COLORS.map((color) => (
					<MatrixRow key={color}>
						<MatrixColorLabel>{color}</MatrixColorLabel>
						{SIZES.map((size) => (
							<MatrixCell key={size}>
								<ZButton kind={props.kind} color={color} size={size}>
									{size === 'icon' ? <PenNibIcon /> : getWord()}
								</ZButton>
							</MatrixCell>
						))}
					</MatrixRow>
				))}
			</KindCardBody>
		</KindCard>
	)
}

export const ButtonDocs = () => {
	console.log('Rendering ButtonDocs')
	return (
		<>
			<Page.Header>
				<Page.Title>Button</Page.Title>
				<Page.Description>All color, size, and kind variants across the design system.</Page.Description>
			</Page.Header>
			<Page.SectionLabel>Variants</Page.SectionLabel>
			<KindsStack>
				{KINDS.map((kind) => (
					<KindSection key={kind} kind={kind} />
				))}
			</KindsStack>
		</>
	)
}
