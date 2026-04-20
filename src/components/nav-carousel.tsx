import { type ReactNode, useRef } from 'react'
import { useLocation } from 'wouter'
import { styled } from '#/modules/tw-styled'
import { CaretLeftIcon } from '@phosphor-icons/react/dist/icons/CaretLeft'
import { CaretRightIcon } from '@phosphor-icons/react/dist/icons/CaretRight'

const NavRoot = styled.nav('NavCarousel', 'fixed flex items-center NavCarousel z-49 border-b border-border/50 backdrop-blur-sm w-full h-10')

const ArrowButton = styled.button('NavCarouselArrow', 'flex items-center justify-center w-8 h-8 shrink-0 text-[var(--color-muted)] hover:text-[var(--color-white)] transition-colors duration-150 cursor-pointer')

const LinkTrack = styled.div('NavCarouselTrack', 'flex items-center gap-1 overflow-x-auto scroll-smooth px-2 no-scrollbar')

const NavLinkBase = styled.button('NavCarouselLink', 'relative shrink-0 px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition-colors duration-150 cursor-pointer whitespace-nowrap')

type NavCarouselLinkPropsT = {
	to: string
	isActive: boolean
	children: ReactNode
}

const NavCarouselLink = (props: NavCarouselLinkPropsT) => {
	const locationResult = useLocation()
	const navigate = locationResult[1]

	const handleClick = () => {
		return navigate(props.to)
	}

	const textColor = props.isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-muted)] hover:text-[var(--color-light-gray)]'

	return (
		<NavLinkBase className={textColor} onClick={handleClick}>
			{props.children}
		</NavLinkBase>
	)
}

type NavCarouselPropsT = {
	children: ReactNode
}

const NavCarouselRoot = (props: NavCarouselPropsT) => {
	const trackReference = useRef<HTMLDivElement>(null)

	const handlePrevious = () => {
		const trackElement = trackReference.current
		if (!trackElement) return
		trackElement.scrollBy({ left: -120, behavior: 'smooth' })
	}

	const handleNext = () => {
		const trackElement = trackReference.current
		if (!trackElement) return
		trackElement.scrollBy({ left: 120, behavior: 'smooth' })
	}

	return (
		<NavRoot>
			<ArrowButton onClick={handlePrevious} aria-label='Previous'>
				<CaretLeftIcon size={16} weight='bold' />
			</ArrowButton>
			<LinkTrack ref={trackReference}>{props.children}</LinkTrack>
			<ArrowButton onClick={handleNext} aria-label='Next'>
				<CaretRightIcon size={16} weight='bold' />
			</ArrowButton>
		</NavRoot>
	)
}

export const NavCarousel = Object.assign(NavCarouselRoot, {
	Link: NavCarouselLink
})
