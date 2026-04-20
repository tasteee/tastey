import React from 'react'
import curry from 'just-curry-it'

const createStyled = <TagT extends keyof React.JSX.IntrinsicElements>(
	tag: TagT,
	baseClassName: string,
	componentName: string
) => {
	return (props: React.JSX.IntrinsicElements[TagT]) => {
		const existingClassName = props.className
		const combinedClassName = existingClassName ? `${baseClassName} ${existingClassName}` : baseClassName
		return React.createElement(tag, { ...props, className: combinedClassName, 'data-styled': componentName })
	}
}

const styledDiv = curry(createStyled)('div')

export { createStyled, styledDiv }
