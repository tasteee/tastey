import { useRef } from 'react'
import { useLocation } from 'wouter'
import { styled } from '#/modules/tw-styled'
import { CaretLeftIcon } from '@phosphor-icons/react/dist/icons/CaretLeft'
import { CaretRightIcon } from '@phosphor-icons/react/dist/icons/CaretRight'

type DocLinkItemT = {
	label: string
	path: string
}

const DOC_LINKS: ReadonlyArray<DocLinkItemT> = [
	{ label: 'Button', path: '/button' },
	{ label: 'Badge', path: '/badge' }
]

const NavRoot = styled.nav('DocsNav', 'fixed flex items-center border-b border-border NavBox backdrop-blur-sm w-full')

const ArrowButton = styled.button('DocsNavArrow', 'flex items-center justify-center w-8 h-8 shrink-0 text-[var(--color-muted)] hover:text-[var(--color-white)] transition-colors duration-150 cursor-pointer')

const LinkTrack = styled.div('DocsNavLinkTrack', 'flex items-center gap-1 overflow-x-auto scroll-smooth px-2 no-scrollbar')

const NavLinkBase = styled.button('DocsNavLink', 'relative shrink-0 px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition-colors duration-150 cursor-pointer whitespace-nowrap')

const ActiveIndicator = styled.span('DocsNavActiveIndicator', 'absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--color-pink)]')

type DocsNavLinkPropsT = {
	item: DocLinkItemT
	isActive: boolean
	onClick: () => void
}

const DocsNavLink = (props: DocsNavLinkPropsT) => {
	const textColor = props.isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-muted)] hover:text-[var(--color-light-gray)]'

	return (
		<NavLinkBase className={textColor} onClick={props.onClick}>
			{props.item.label}
			{props.isActive && <ActiveIndicator />}
		</NavLinkBase>
	)
}

export const DocsNav = () => {
	const trackReference = useRef<HTMLDivElement>(null)
	const [location, navigate] = useLocation()

	const currentIndex = DOC_LINKS.findIndex((link) => {
		return link.path === location
	})

	const resolvedActiveIndex = currentIndex === -1 ? 0 : currentIndex

	const handlePrevious = () => {
		const previousIndex = (resolvedActiveIndex - 1 + DOC_LINKS.length) % DOC_LINKS.length
		const previousLink = DOC_LINKS[previousIndex]
		navigate(previousLink.path)

		const trackElement = trackReference.current
		if (!trackElement) return

		const linkElements = trackElement.querySelectorAll('button')
		const targetElement = linkElements[previousIndex]
		if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
	}

	const handleNext = () => {
		const nextIndex = (resolvedActiveIndex + 1) % DOC_LINKS.length
		const nextLink = DOC_LINKS[nextIndex]
		navigate(nextLink.path)

		const trackElement = trackReference.current
		if (!trackElement) return

		const linkElements = trackElement.querySelectorAll('button')
		const targetElement = linkElements[nextIndex]
		if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
	}

	const handleLinkClick = (linkPath: string) => {
		navigate(linkPath)
	}

	return (
		<NavRoot>
			<ArrowButton onClick={handlePrevious} aria-label='Previous component'>
				<CaretLeftIcon size={16} weight='bold' />
			</ArrowButton>
			<LinkTrack ref={trackReference}>
				{DOC_LINKS.map((link) => {
					const isActive = link.path === location
					return (
						<DocsNavLink
							key={link.path}
							item={link}
							isActive={isActive}
							onClick={() => {
								return handleLinkClick(link.path)
							}}
						/>
					)
				})}
			</LinkTrack>
			<ArrowButton onClick={handleNext} aria-label='Next component'>
				<CaretRightIcon size={16} weight='bold' />
			</ArrowButton>
		</NavRoot>
	)
}
