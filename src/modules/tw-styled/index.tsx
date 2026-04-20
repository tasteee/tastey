import React, { createElement, forwardRef, type ComponentType, type ElementType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type StyledNameT = string
type StyledClassesT = string

type IntrinsicTagT = keyof React.JSX.IntrinsicElements
type StyledBaseT = ElementType

type StyledTagComponentT<Tag extends IntrinsicTagT> = ForwardRefExoticComponent<PropsWithoutRef<React.JSX.IntrinsicElements[Tag]> & RefAttributes<ElementRefT<Tag>>>

type StyledWrappedComponentT<Component extends StyledBaseT> = ForwardRefExoticComponent<PropsWithoutRef<React.ComponentPropsWithoutRef<Component>> & RefAttributes<ElementRefT<Component>>>

type ElementRefT<Component extends ElementType> = React.ComponentPropsWithRef<Component> extends { ref?: React.Ref<infer RefType> } ? RefType : never

type StyledTagFactoryT<Tag extends IntrinsicTagT> = {
	(classes: StyledClassesT): StyledTagComponentT<Tag>
	(name: StyledNameT, classes: StyledClassesT): StyledTagComponentT<Tag>
}

type StyledFactoryT = {
	<Component extends StyledBaseT>(component: Component, classes: StyledClassesT): StyledWrappedComponentT<Component>

	<Component extends StyledBaseT>(component: Component, name: StyledNameT, classes: StyledClassesT): StyledWrappedComponentT<Component>
} & {
	[Tag in IntrinsicTagT]: StyledTagFactoryT<Tag>
}

const getBaseDisplayName = (base: StyledBaseT) => {
	if (typeof base === 'string') return base

	const component = base as ComponentType<any>

	if (component.displayName) return component.displayName
	if (component.name) return component.name

	return 'Component'
}

const mergeClassNames = (staticClasses: StyledClassesT, incomingClassName?: string) => {
	return twMerge(staticClasses, incomingClassName)
}

const getDisplayName = (base: StyledBaseT, styledName?: StyledNameT) => {
	if (styledName) return styledName
	if (typeof base === 'string') return `styled.${base}`

	return `styled(${getBaseDisplayName(base)})`
}

const createStyledComponent = <Base extends StyledBaseT>(base: Base, styledName: StyledNameT | undefined, staticClasses: StyledClassesT) => {
	type PropsT = React.ComponentPropsWithoutRef<Base>
	type RefT = ElementRefT<Base>

	const StyledComponent = forwardRef<RefT, PropsT>((props, ref) => {
		const { className, ...restProps } = props as PropsT & { className?: string }

		const mergedClassName = mergeClassNames(staticClasses, className)

		const finalProps = {
			...restProps,
			ref,
			className: mergedClassName,
			...(styledName ? { 'data-styled-name': styledName } : {})
		}

		return createElement(base, finalProps)
	})

	StyledComponent.displayName = getDisplayName(base, styledName)

	return StyledComponent as StyledWrappedComponentT<Base>
}

const createTagFactory = <Tag extends IntrinsicTagT>(tag: Tag): StyledTagFactoryT<Tag> => {
	const factory = (nameOrClasses: StyledNameT | StyledClassesT, optionalClasses?: StyledClassesT) => {
		const hasExplicitName = optionalClasses !== undefined
		const styledName = hasExplicitName ? String(nameOrClasses) : undefined
		const staticClasses = hasExplicitName ? optionalClasses : String(nameOrClasses)

		return createStyledComponent(tag, styledName, staticClasses) as StyledTagComponentT<Tag>
	}

	return factory as StyledTagFactoryT<Tag>
}

const styledBase = (component: StyledBaseT, nameOrClasses: StyledNameT | StyledClassesT, optionalClasses?: StyledClassesT) => {
	const hasExplicitName = optionalClasses !== undefined
	const styledName = hasExplicitName ? String(nameOrClasses) : undefined
	const staticClasses = hasExplicitName ? optionalClasses : String(nameOrClasses)

	return createStyledComponent(component, styledName, staticClasses)
}

const intrinsicTags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'] as const satisfies readonly IntrinsicTagT[]

export const styled = intrinsicTags.reduce((accumulator, tag) => {
	;(accumulator as unknown as Record<string, unknown>)[tag] = createTagFactory(tag)
	return accumulator
}, styledBase as StyledFactoryT)

/*
Usage:

const Row = styled.div('flex items-center gap-2')
const Page = styled.main('Page', 'min-h-screen bg-background text-foreground')
const Title = styled.h1('Title', 'text-2xl font-semibold tracking-tight')

const ButtonBase = ({
	className,
	...props
}: React.ComponentProps<'button'>) => {
	return <button {...props} className={className} />
}

const Button = styled(ButtonBase, 'inline-flex items-center rounded-md px-4 py-2')
const PrimaryButton = styled(Button, 'PrimaryButton', 'bg-white text-black')

Resulting behavior:

- styled.div('...') => displayName = "styled.div"
- styled.div('Foo', '...') => displayName = "Foo", data-styled-name = "Foo"
- styled(Component, '...') => displayName = "styled(ComponentDisplayName)"
- styled(Component, 'Foo', '...') => displayName = "Foo", data-styled-name = "Foo"

Notes:

- Wrapped components must accept and forward className
- Wrapped components should forward unknown props if you want data-styled-name to reach the DOM
- tailwind-merge is used so incoming className can override earlier utilities
*/
