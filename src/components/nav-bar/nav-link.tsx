import { useLocation } from 'wouter'

type NavLinkPropsT = {
	label: string
	isActive?: boolean
	path: string
}

const baseClasses = 'px-4 py-2 text-sm transition-colors rounded-md font-medium'
const activeClasses = baseClasses + ' text-primary'
const inactiveClasses = baseClasses + ' text-muted-foreground hover:text-foreground'

export const NavLink = (props: NavLinkPropsT) => {
	const classes = props.isActive ? activeClasses : inactiveClasses
	const [, navigate] = useLocation()

	const handleClick = () => {
		navigate(props.path)
	}

	return (
		<button onClick={handleClick} className={classes}>
			{props.label}
		</button>
	)
}
