import { getTestId } from '#/helpers/get-test-id'
import React from 'react'

type ZBadgeColorT = 'gray' | 'white' | 'pink' | 'purple' | 'orange' | 'red'

type ZBadgePropsT = GlobalComponentPropsT & {
	color?: ZBadgeColorT
	onClick?: () => void
}

const BASE_CLASSES = 'px-2 py-1 rounded text-xs uppercase tracking-wide select-none'

const colorClasses: Record<ZBadgeColorT, string> = {
	gray: 'font-medium text-muted-foreground border border-border',
	white: 'font-semibold bg-foreground/50 text-white',
	pink: 'font-semibold bg-pink/15 text-pink',
	purple: 'font-semibold bg-purple/15 text-purple',
	orange: 'font-semibold bg-orange/15 text-orange',
	red: 'font-semibold bg-destructive/15 text-destructive'
}

const INTERACTIVE_CLASSES = 'cursor-pointer transition-opacity hover:opacity-70'

export const ZBadge = (props: ZBadgePropsT) => {
	const color = props.color ?? 'gray'
	const colorClass = colorClasses[color]
	const isInteractive = props.onClick !== undefined
	const interactiveClass = isInteractive ? INTERACTIVE_CLASSES : ''
	const allClasses = `${BASE_CLASSES} ${colorClass} ${interactiveClass} ${props.className ?? ''}`.trim()
	const testId = getTestId(props, 'ZBadge')

	return (
		<span data-testid={testId} className={allClasses} onClick={props.onClick}>
			{props.children}
		</span>
	)
}
