import { getTestId } from '#/helpers/get-test-id'
import React from 'react'

type ZButtonKindT = 'line' | 'ghost' | 'solid'
type ZButtonSizeT = 'medium' | 'small' | 'icon' | 'large'
type ZButtonColorT = 'gray' | 'white' | 'pink' | 'purple' | 'orange' | 'red'

type ZButtonPropsT = GlobalComponentPropsT &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		kind?: ZButtonKindT
		size?: ZButtonSizeT
		color?: ZButtonColorT
		isDisabled?: boolean
	}

const solidColorClasses: Record<ZButtonColorT, string> = {
	white: 'bg-primary text-primary-foreground hover:opacity-90',
	pink: 'bg-pink text-primary-foreground hover:opacity-90',
	purple: 'bg-purple text-primary-foreground hover:opacity-90',
	orange: 'bg-orange text-primary-foreground hover:opacity-90',
	red: 'bg-destructive text-white hover:opacity-90',
	gray: 'bg-secondary text-foreground hover:opacity-90'
}

const lineColorClasses: Record<ZButtonColorT, string> = {
	gray: 'border border-border text-foreground hover:border-foreground/50 hover:bg-foreground/10',
	white: 'border border-primary text-primary hover:border-primary/70 hover:bg-primary/10',
	pink: 'border border-pink text-pink hover:border-pink/70 hover:bg-pink/10',
	purple: 'border border-purple text-purple hover:border-purple/70 hover:bg-purple/10',
	orange: 'border border-orange text-orange hover:border-orange/70 hover:bg-orange/10',
	red: 'border border-destructive text-destructive hover:border-destructive/70 hover:bg-destructive/10'
}

const ghostColorClasses: Record<ZButtonColorT, string> = {
	gray: 'text-foreground hover:opacity-70',
	white: 'text-primary hover:opacity-70',
	pink: 'text-pink hover:opacity-70',
	purple: 'text-purple hover:opacity-70',
	orange: 'text-orange hover:opacity-70',
	red: 'text-destructive hover:opacity-70'
}

const sizeClasses: Record<ZButtonSizeT, string> = {
	large: 'px-6 py-3 h-12 text-base',
	medium: 'px-4 py-2 h-10 text-base',
	small: 'px-4 py-1 h-8 text-sm',
	icon: 'p-0 h-9 w-9'
}

const solidWeightClasses: Record<ZButtonColorT, string> = {
	white: 'font-semibold',
	pink: 'font-semibold',
	purple: 'font-semibold',
	orange: 'font-semibold',
	red: 'font-semibold',
	gray: 'font-medium'
}

const lineWeightClasses: Record<ZButtonColorT, string> = {
	gray: 'font-medium',
	white: 'font-medium',
	pink: 'font-medium',
	purple: 'font-medium',
	orange: 'font-medium',
	red: 'font-medium'
}

const getKindClasses = (kind: ZButtonKindT, color: ZButtonColorT): string => {
	const isLine = kind === 'line'
	const isGhost = kind === 'ghost'
	if (isLine) return `${lineColorClasses[color]} ${lineWeightClasses[color]} transition-colors`
	if (isGhost) return `${ghostColorClasses[color]} font-medium transition-opacity`
	return `${solidColorClasses[color]} ${solidWeightClasses[color]} transition-opacity`
}

const DISABLED_CLASSES = 'opacity-40 cursor-not-allowed pointer-events-none'
const BASE_CLASSES = 'rounded-md inline-flex items-center justify-center gap-2'

export const ZButton = (props: ZButtonPropsT) => {
	const kind = props.kind ?? 'line'
	const size = props.size ?? 'medium'
	const color = props.color ?? 'gray'
	const isDisabled = props.isDisabled ?? false
	const kindClasses = getKindClasses(kind, color)
	const sizeClass = sizeClasses[size]
	const disabledClasses = isDisabled ? DISABLED_CLASSES : ''
	const allClasses = `${BASE_CLASSES} ${kindClasses} ${sizeClass} ${disabledClasses} ${props.className ?? ''}`.trim()
	const testId = getTestId(props, 'ZButton')

	return (
		<button data-testid={testId} className={allClasses} disabled={isDisabled} onClick={props.onClick} type={props.type ?? 'button'}>
			{props.children}
		</button>
	)
}
