import { BookIcon, PathIcon } from '@phosphor-icons/react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
import { ZButton } from '#/components/button'

export const NotFoundPage = () => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<PathIcon />
				</EmptyMedia>
				<EmptyTitle>No upcoming meetings</EmptyTitle>
				<EmptyDescription>Create a meeting to get started.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className='flex gap-2'>
					<ZButton size='small'>Go Back</ZButton>
					<ZButton size='small' kind='line'>
						<BookIcon />
						Read Docs
					</ZButton>
				</div>
			</EmptyContent>
		</Empty>
	)
}
