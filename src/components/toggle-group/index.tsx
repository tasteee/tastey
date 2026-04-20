import { getTestId } from '#/helpers/get-test-id'
import { styled } from '#/modules/tw-styled'
import React from 'react'

type ZToggleGroupItemT = {
	value: string
	label: string
	icon?: React.ReactNode
}

type ZToggleGroupPropsT = GlobalComponentPropsT & {
	value: string
	onValueChange: (value: string) => void
	items: ZToggleGroupItemT[]
}

const ToggleGroupRoot = styled.div('ToggleGroupRoot', 'flex items-center bg-secondary border border-border rounded-md p-0.5 gap-0.5')

const ToggleGroupItemButton = styled.button('ToggleGroupItemButton', 'inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded cursor-pointer select-none transition-colors')

const ACTIVE_ITEM_CLASSES = 'bg-card text-primary font-medium'
const INACTIVE_ITEM_CLASSES = 'text-muted-foreground hover:text-foreground font-normal'

export const ZToggleGroup = (props: ZToggleGroupPropsT) => {
	const testId = getTestId(props, 'ZToggleGroup')

	return (
		<ToggleGroupRoot data-testid={testId} className={props.className}>
			{props.items.map((groupItem) => {
				const isSelected = groupItem.value === props.value
				const stateClasses = isSelected ? ACTIVE_ITEM_CLASSES : INACTIVE_ITEM_CLASSES
				const hasIcon = groupItem.icon !== undefined
				const handleClick = () => props.onValueChange(groupItem.value)

				return (
					<ToggleGroupItemButton key={groupItem.value} className={stateClasses} onClick={handleClick} type='button'>
						{hasIcon && groupItem.icon}
						{groupItem.label}
					</ToggleGroupItemButton>
				)
			})}
		</ToggleGroupRoot>
	)
}
