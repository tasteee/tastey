import { styled } from '#/modules/tw-styled'

import { ZBadge } from '#/components/badge'
import { getWord } from '#/constants/brand-words'
import { Page } from '#/components/page'

type ZBadgeColorT = 'gray' | 'white' | 'pink' | 'purple' | 'orange' | 'red'

const COLORS: ReadonlyArray<ZBadgeColorT> = ['gray', 'white', 'pink', 'purple', 'orange', 'red']

const colorDescriptions: Record<ZBadgeColorT, string> = {
	gray: 'Default muted — neutral status',
	white: 'Frosted white — general labeling',
	pink: 'Pink tinted — featured or trending',
	purple: 'Purple tinted — premium or special',
	orange: 'Orange tinted — warnings or alerts',
	red: 'Red tinted — errors or destructive'
}

const ColorsStack = styled.div('ColorsStack', 'flex flex-col gap-4')
const ColorCard = styled.div('ColorCard', 'rounded-xl border border-[var(--color-border)] bg-[var(--background-light)] overflow-hidden')
const ColorCardHeader = styled.div('ColorCardHeader', 'flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)]')
const ColorCardTitle = styled.span('ColorCardTitle', 'text-[var(--font-size-sm)] font-semibold text-[var(--color-white)] capitalize tracking-[0.01em]')
const ColorCardMeta = styled.span('ColorCardMeta', 'text-[var(--font-size-xs)] text-[var(--color-muted)]')
const ColorCardBody = styled.div('ColorCardBody', 'px-5 py-5 flex flex-wrap gap-3')

type ColorSectionPropsT = {
	color: ZBadgeColorT
}

const ColorSection = (props: ColorSectionPropsT) => {
	const description = colorDescriptions[props.color]

	return (
		<ColorCard>
			<ColorCardHeader>
				<ColorCardTitle>{props.color}</ColorCardTitle>
				<ColorCardMeta>{description}</ColorCardMeta>
			</ColorCardHeader>
			<ColorCardBody>
				{Array.from({ length: 6 }).map((_, index) => (
					<ZBadge key={index} color={props.color}>
						{getWord()}
					</ZBadge>
				))}
			</ColorCardBody>
		</ColorCard>
	)
}

export const BadgeDocs = () => {
	return (
		<>
			<Page.Header>
				<Page.Title>Badge</Page.Title>
				<Page.Description>All color variants across the design system.</Page.Description>
			</Page.Header>
			<Page.SectionLabel>Variants</Page.SectionLabel>
			<ColorsStack>
				{COLORS.map((color) => (
					<ColorSection key={color} color={color} />
				))}
			</ColorsStack>
		</>
	)
}
