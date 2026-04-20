import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type TextVariantPropsT = {
	color?: string
	shade?: string
	size?: string
	weight?: string | number
	isItalic?: boolean
	isUnderline?: boolean
	isStrike?: boolean
	isUpper?: boolean
	isLower?: boolean
}

const textVariantPropKeys: ReadonlyArray<keyof TextVariantPropsT> = ['color', 'shade', 'size', 'weight', 'isItalic', 'isUnderline', 'isStrike', 'isUpper', 'isLower']

const resolveTextColor = (color: string, shade: string | undefined): string => {
	const hasShade = shade !== undefined
	if (hasShade) return `var(--color-${color}-${shade})`
	return `var(--${color})`
}

const buildTextStyle = (props: TextVariantPropsT, existingStyle: React.CSSProperties | undefined): React.CSSProperties => {
	const style = Object.assign({}, existingStyle)

	const hasColor = props.color !== undefined
	if (hasColor) style.color = resolveTextColor(props.color!, props.shade)

	const hasSize = props.size !== undefined
	if (hasSize) style.fontSize = props.size

	const hasWeight = props.weight !== undefined
	if (hasWeight) style.fontWeight = props.weight

	return style
}

const buildTextClassName = (baseClasses: string, props: TextVariantPropsT, incomingClassName: string | undefined): string => {
	const modifiers: string[] = []

	if (props.isItalic) modifiers.push('italic')
	if (props.isUnderline) modifiers.push('underline')
	if (props.isStrike) modifiers.push('line-through')
	if (props.isUpper) modifiers.push('uppercase')
	if (props.isLower) modifiers.push('lowercase')

	return twMerge(baseClasses, modifiers.join(' '), incomingClassName)
}

const stripTextVariantProps = (props: Record<string, unknown>): Record<string, unknown> => {
	const nativeProps = Object.assign({}, props)
	textVariantPropKeys.forEach((key) => {
		delete nativeProps[key]
	})
	return nativeProps
}

type TagT = keyof React.JSX.IntrinsicElements

const createTextVariant = <Tag extends TagT>(tag: Tag, displayName: string, baseClasses: string) => {
	type NativePropsT = React.ComponentPropsWithoutRef<Tag>
	type PropsT = NativePropsT & TextVariantPropsT

	const Component = forwardRef<Element, PropsT>((props, ref) => {
		const resolvedClassName = buildTextClassName(baseClasses, props, props.className as string | undefined)
		const resolvedStyle = buildTextStyle(props, props.style as React.CSSProperties | undefined)
		const nativeProps = stripTextVariantProps(props as Record<string, unknown>)

		return React.createElement(tag, Object.assign({}, nativeProps, { ref, className: resolvedClassName, style: resolvedStyle }))
	})

	Component.displayName = displayName

	return Component
}

const Display = createTextVariant('h1', 'TextDisplay', 'text-[4.5rem] font-bold leading-[0.9]')
const H1 = createTextVariant('h1', 'TextH1', 'text-5xl font-bold leading-none')
const H2 = createTextVariant('h2', 'TextH2', 'text-4xl font-semibold leading-[1.1]')
const H3 = createTextVariant('h3', 'TextH3', 'text-2xl font-semibold leading-[1.2]')
const H4 = createTextVariant('h4', 'TextH4', 'text-xl font-medium leading-[1.3]')
const Body = createTextVariant('p', 'TextBody', 'text-base font-normal leading-relaxed')
const Small = createTextVariant('p', 'TextSmall', 'text-sm font-normal leading-[1.5]')
const Caption = createTextVariant('span', 'TextCaption', 'text-xs font-medium leading-[1.4]')
const SectionLabel = createTextVariant('span', 'TextSectionLabel', 'text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground')

export const ZText = {
	Display,
	H1,
	H2,
	H3,
	H4,
	Body,
	Small,
	Caption,
	SectionLabel
}
