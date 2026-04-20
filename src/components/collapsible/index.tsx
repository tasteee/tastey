import { Collapsible } from '@base-ui/react/collapsible'
import { CaretDown } from '@phosphor-icons/react'
import { getTestId } from '#/helpers/get-test-id'
import { styled } from '#/modules/tw-styled'
import React from 'react'

type ZCollapsiblePropsT = GlobalComponentPropsT & {
	trigger: React.ReactNode
	children: React.ReactNode
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

const CollapsibleRoot = styled(Collapsible.Root, 'CollapsibleRoot', 'border border-border rounded-lg overflow-hidden')

const CollapsibleTrigger = styled(Collapsible.Trigger, 'CollapsibleTrigger', 'w-full flex items-center justify-between px-4 py-3 text-foreground hover:text-primary transition-colors cursor-pointer outline-none')

const CollapsiblePanel = styled(Collapsible.Panel, 'CollapsiblePanel', 'overflow-hidden transition-[height] data-[ending-style]:h-0 data-[starting-style]:h-0')

const CollapsibleContent = styled.div('CollapsibleContent', 'px-4 py-4 border-t border-border')

const CollapsibleTriggerIcon = styled.span('CollapsibleTriggerIcon', 'text-muted-foreground transition-transform data-[panel-open]:rotate-180')

export const ZCollapsible = (props: ZCollapsiblePropsT) => {
	const testId = getTestId(props, 'ZCollapsible')

	return (
		<CollapsibleRoot defaultOpen={props.defaultOpen} open={props.open} onOpenChange={props.onOpenChange} data-testid={testId} className={props.className}>
			<CollapsibleTrigger>
				{props.trigger}
				<CollapsibleTriggerIcon>
					<CaretDown size={16} />
				</CollapsibleTriggerIcon>
			</CollapsibleTrigger>
			<CollapsiblePanel>
				<CollapsibleContent>{props.children}</CollapsibleContent>
			</CollapsiblePanel>
		</CollapsibleRoot>
	)
}
