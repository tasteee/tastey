import { Page } from '#/components/page'
import { Switch, Route, useLocation } from 'wouter'
import { ButtonDocs } from './button'
import { BadgeDocs } from './badge'
import { NavCarousel } from '#/components/nav-carousel'

export const DocsPage = () => {
	useLocation()

	return (
		<>
			<NavCarousel>
				<NavCarousel.Link to='/button' isActive={window.location.pathname.endsWith('/button')}>
					Button
				</NavCarousel.Link>
				<NavCarousel.Link to='/badge' isActive={window.location.pathname.endsWith('/badge')}>
					Badge
				</NavCarousel.Link>
				{/* add more links here for other components */}
			</NavCarousel>
			<Page.Root>
				<Switch>
					<Route path='/button' component={ButtonDocs} />
					{/* add more routes here for other components */}
					<Route path='/badge' component={BadgeDocs} />
				</Switch>
			</Page.Root>
		</>
	)
}
