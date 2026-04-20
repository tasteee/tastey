import '#/styles/global.css'
import '#/styles/app.css'
import '#/styles/z-layout.css'

import { NavBar } from './components/nav-bar'
import { styled } from './modules/tw-styled'
import { SettingsDialog } from './components/settings-dialog'
import { Route, Router, Switch } from 'wouter'
import { DocsPage } from './pages/docs'
import { NotFoundPage } from './pages/not-found'
import { Browse } from './pages/browse'

const AppBox = styled.div('AppBox', 'relative flex-1 flex pt-16')

export const App = () => {
	return (
		<>
			<NavBar />
			<AppBox id='App'>
				<main className='flex-1 flex overflow-y-scroll'>
					<Router>
						<Switch>
							<Route path='/browse*' component={Browse} />
							<Route path='/lists*'>
								<h1>Lists Page</h1>
							</Route>
							<Route nest path='/docs*'>
								<DocsPage />
							</Route>
							<Route>
								<NotFoundPage />
							</Route>
						</Switch>
					</Router>
				</main>
			</AppBox>
			<SettingsDialog />
		</>
	)
}
