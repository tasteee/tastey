import { CaretUpDown, Check } from '@phosphor-icons/react'
import { Select } from '@base-ui/react/select'
import { styled } from '#/modules/tw-styled'

type ZSelectItemT = {
	label: string
	value: string
}

type ZSelectPropsT = {
	label?: string
	placeholder?: string
	items: ZSelectItemT[]
	value?: string
	defaultValue?: string
	onValueChange?: (value: string | null) => void
	disabled?: boolean
	name?: string
	id?: string
	className?: string
}

const SelectRoot = styled.div('SelectRoot', 'flex flex-col gap-2 w-full')

const SelectLabel = styled(Select.Label, 'SelectLabel', 'text-foreground text-sm font-medium')

const SelectTrigger = styled(Select.Trigger, 'SelectTrigger', 'w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors inline-flex items-center justify-between gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed data-[popup-open]:border-primary')

const SelectValue = styled(Select.Value, 'SelectValue', 'flex-1 text-left text-base')

const SelectIcon = styled(Select.Icon, 'SelectIcon', 'text-muted-foreground flex-shrink-0')

const SelectPositioner = styled(Select.Positioner, 'SelectPositioner', 'z-50')

const SelectPopup = styled(Select.Popup, 'SelectPopup', 'bg-card border border-border rounded-md overflow-hidden shadow-none py-1 min-w-[var(--anchor-width)] origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0')

const SelectList = styled(Select.List, 'SelectList', 'max-h-64 overflow-y-auto')

const SelectScrollUpArrow = styled(Select.ScrollUpArrow, 'SelectScrollUpArrow', 'flex items-center justify-center py-1 text-muted-foreground cursor-default')

const SelectScrollDownArrow = styled(Select.ScrollDownArrow, 'SelectScrollDownArrow', 'flex items-center justify-center py-1 text-muted-foreground cursor-default')

const SelectItem = styled(Select.Item, 'SelectItem', 'flex items-center gap-2 px-4 py-2.5 text-sm text-foreground cursor-pointer transition-colors hover:bg-secondary hover:text-primary data-[highlighted]:bg-secondary data-[highlighted]:text-primary data-[selected]:text-primary select-none outline-none')

const SelectItemIndicator = styled(Select.ItemIndicator, 'SelectItemIndicator', 'text-pink flex-shrink-0')

const SelectItemText = styled(Select.ItemText, 'SelectItemText', 'flex-1')

export const ZSelect = (props: ZSelectPropsT) => {
	const hasLabel = props.label !== undefined

	return (
		<SelectRoot className={props.className}>
			<Select.Root value={props.value} defaultValue={props.defaultValue} onValueChange={props?.onValueChange} name={props.name} disabled={props.disabled}>
				{hasLabel && <SelectLabel>{props.label}</SelectLabel>}
				<SelectTrigger id={props.id}>
					<SelectValue placeholder={props.placeholder ?? 'Select an option'} />
					<SelectIcon>
						<CaretUpDown size={16} />
					</SelectIcon>
				</SelectTrigger>
				<Select.Portal>
					<SelectPositioner sideOffset={6} align='start'>
						<SelectPopup>
							<SelectScrollUpArrow>
								<CaretUpDown size={12} />
							</SelectScrollUpArrow>
							<SelectList>
								{props.items.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										<SelectItemIndicator>
											<Check size={12} weight='bold' />
										</SelectItemIndicator>
										<SelectItemText>{item.label}</SelectItemText>
									</SelectItem>
								))}
							</SelectList>
							<SelectScrollDownArrow>
								<CaretUpDown size={12} />
							</SelectScrollDownArrow>
						</SelectPopup>
					</SelectPositioner>
				</Select.Portal>
			</Select.Root>
		</SelectRoot>
	)
}
