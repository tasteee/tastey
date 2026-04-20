import { NavLink } from './nav-link'
import { GearSixIcon } from '@phosphor-icons/react'
import { styled } from '#/modules/tw-styled'
import { Button } from '#/components/ui/button'
import { $settings } from '#/stores/settings'

const LeftBox = styled.div('LeftBox', 'flex items-center gap-3')
const RightBox = styled.div('RightBox', 'flex items-center gap-2')
const MiddleBox = styled.div('MiddleBox', 'hidden md:flex items-center gap-1')
const NavBox = styled.div('NavBox', 'NavBox fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm')
const InnerNavBox = styled.div('InnerNavBox', 'max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16')
const LogoBox = styled.span('LogoBox', 'text-primary font-bold tracking-tight text-lg')

export const NavBar = () => {
	const handleSettingsClick = () => {
		$settings.isOpen.set(true)
	}

	return (
		<NavBox>
			<InnerNavBox>
				<LeftBox>
					<LogoBox>tastey</LogoBox>
				</LeftBox>
				<MiddleBox>
					<NavLink label='Browse' path='/browse' isActive />
					<NavLink label='Lists' path='/lists' />
					<NavLink label='Docs' path='/docs' />
				</MiddleBox>
				<RightBox>
					<Button variant='ghost' size='icon' onClick={handleSettingsClick} aria-label='Settings' className='hover:bg-transparent hover:text-white text-muted-foreground'>
						<GearSixIcon size={20} />
					</Button>
				</RightBox>
			</InnerNavBox>
		</NavBox>
	)
}

// what if we do something like this to give the links a border bottom when active
// like tabs kinda, and each NAvLink received a color prop, so when it was active
// it would have that color border on the bottom
// ;<div class='flex gap-1 mb-6 border-b border-border'>
// 	<button class='px-4 py-3 text-sm font-medium transition-colors relative text-primary'>
// 		Primary<div class='absolute bottom-0 left-0 right-0 h-0.5 bg-<color>'></div>
// 	</button>
// 	<button class='px-4 py-3 text-sm font-medium transition-colors relative text-muted-foreground hover:text-foreground'>Secondary</button>
// 	<button class='px-4 py-3 text-sm font-medium transition-colors relative text-muted-foreground hover:text-foreground'>Tertiary</button>
// </div>
