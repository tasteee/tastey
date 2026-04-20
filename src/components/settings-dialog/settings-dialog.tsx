import React from 'react'
import { FolderSimpleIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { XIcon } from 'lucide-react'
import { styled } from '#/modules/tw-styled'
import { $settings } from '#/stores/settings'
import { Dialog, DialogPopup, DialogTitle } from '#/components/ui/dialog'
import { useDatass } from 'datass'
import { ZButton } from '#/components/button'

const SettingsDialogLayout = styled.div('SettingsDialogLayout', 'flex flex-1 min-h-0 overflow-hidden rounded-[inherit]')
const SettingsDialogSidebar = styled.aside('SettingsDialogSidebar', 'w-[13rem] shrink-0 [border-right:1px_solid_var(--border)] p-[var(--space-lg)] flex flex-col gap-[var(--space-md)]')
const SettingsDialogSidebarHeading = styled.span('SettingsDialogSidebarHeading', 'text-[var(--font-size-xs)] [font-weight:var(--font-weight-semibold)] text-[var(--muted-foreground)] uppercase tracking-[var(--tracking-wide)] px-[var(--space-md)]')
const SettingsDialogNav = styled.nav('SettingsDialogNav', 'flex flex-col gap-[2px]')
const SettingsDialogNavItem = styled.button('SettingsDialogNavItem', 'flex items-center px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius)] text-[var(--font-size-sm)] [font-weight:var(--font-weight-regular)] text-[var(--muted-foreground)] cursor-pointer bg-transparent border-0 text-left w-full [transition:color_var(--duration-fast)_var(--easing-standard)] hover:text-[var(--white)]')
const SettingsDialogBody = styled.div('SettingsDialogBody', 'flex-1 min-w-0 flex flex-col overflow-hidden')
const SettingsDialogBodyHeader = styled.div('SettingsDialogBodyHeader', 'flex items-center justify-between p-[var(--space-lg)] pb-[var(--space-md)] [border-bottom:1px_solid_var(--border)] shrink-0')
const SettingsDialogBodyTitle = styled.h2('SettingsDialogBodyTitle', 'text-[var(--font-size-h4)] [font-weight:var(--font-weight-semibold)] text-[var(--foreground)] leading-[var(--line-height-h4)]')
const SettingsDialogBodyContent = styled.div('SettingsDialogBodyContent', 'flex-1 overflow-y-auto p-[var(--space-lg)] flex flex-col gap-[var(--space-lg)]')
const SettingsDialogSectionDescription = styled.p('SettingsDialogSectionDescription', 'text-[var(--font-size-sm)] text-[var(--muted-foreground)] leading-[var(--line-height-small)]')
const SettingsDialogFolderList = styled.div('SettingsDialogFolderList', 'flex flex-col gap-[var(--space-xs)]')
const SettingsDialogFolderItem = styled.div('SettingsDialogFolderItem', 'flex items-center gap-[var(--space-sm)] px-[var(--space-md)] py-[var(--space-sm)] rounded-[var(--radius)] bg-[var(--muted)] [border:1px_solid_var(--border)]')
const SettingsDialogFolderPath = styled.span('SettingsDialogFolderPath', 'flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--font-size-sm)] font-mono text-[var(--foreground)]')
const SettingsDialogAddFolder = styled.div('SettingsDialogAddFolder', 'flex gap-[var(--space-sm)] items-center')
const SettingsDialogInput = styled.input('SettingsDialogInput', 'flex-1 h-8 px-[var(--space-md)] rounded-[var(--radius)] [border:1px_solid_var(--input)] bg-[var(--input)] text-[var(--foreground)] text-[var(--font-size-sm)] outline-none [transition:border-color_var(--duration-fast)_var(--easing-standard)] focus:[border-color:var(--ring)] focus:[box-shadow:0_0_0_2px_color-mix(in_srgb,var(--ring)_20%,transparent)] placeholder:text-[var(--muted-foreground)]')

export const SettingsDialog = () => {
	$settings.isOpen.use()
	$settings.folders.use()

	const activeSection = useDatass.string('library')
	const newFolderPath = useDatass.string('')

	const handleOpenChange = (open: boolean) => {
		$settings.isOpen.set(open)
	}

	const handleAddFolder = () => {
		const trimmedPath = newFolderPath.state.trim()
		const isEmpty = trimmedPath.length === 0
		if (isEmpty) return

		const currentFolders = $settings.folders.state as string[]
		const isAlreadyAdded = currentFolders.includes(trimmedPath)
		if (isAlreadyAdded) return

		$settings.folders.set.append(trimmedPath as never)
		newFolderPath.set('')
	}

	const handleRemoveFolder = (folderPath: string) => {
		$settings.folders.set.by((draft: string[]) => {
			const folderIndex = draft.indexOf(folderPath)
			const isFolderFound = folderIndex > -1
			if (isFolderFound) draft.splice(folderIndex, 1)
		})
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		newFolderPath.set(event.target.value)
	}

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const isEnterKey = event.key === 'Enter'
		if (isEnterKey) handleAddFolder()
	}

	const handleClose = () => {
		$settings.isOpen.set(false)
	}

	const handleLibraryNavClick = () => {
		activeSection.set('library')
	}

	const handlePreferencesNavClick = () => {
		activeSection.set('preferences')
	}

	const folders = $settings.folders.state as string[]
	const hasFolders = folders.length > 0
	const isLibraryActive = activeSection.state === 'library'
	const isPreferencesActive = activeSection.state === 'preferences'
	const libraryNavClassName = isLibraryActive ? 'text-[var(--white)] [font-weight:var(--font-weight-medium)]' : ''
	const preferencesNavClassName = isPreferencesActive ? 'text-[var(--white)] [font-weight:var(--font-weight-medium)]' : ''

	return (
		<Dialog open={$settings.isOpen.state} onOpenChange={handleOpenChange}>
			<DialogPopup className='max-w-176 h-120' showCloseButton={false}>
				<DialogTitle className='sr-only'>Settings</DialogTitle>
				<SettingsDialogLayout>
					<SettingsDialogSidebar>
						<SettingsDialogSidebarHeading>Settings</SettingsDialogSidebarHeading>
						<SettingsDialogNav>
							<SettingsDialogNavItem className={libraryNavClassName} onClick={handleLibraryNavClick}>
								Library
							</SettingsDialogNavItem>
							<SettingsDialogNavItem className={preferencesNavClassName} onClick={handlePreferencesNavClick}>
								Preferences
							</SettingsDialogNavItem>
						</SettingsDialogNav>
					</SettingsDialogSidebar>
					<SettingsDialogBody>
						<SettingsDialogBodyHeader>
							<SettingsDialogBodyTitle>{isLibraryActive ? 'Library' : 'Preferences'}</SettingsDialogBodyTitle>
							<ZButton kind='ghost' size='icon' onClick={handleClose} aria-label='Close settings'>
								<XIcon />
							</ZButton>
						</SettingsDialogBodyHeader>
						<SettingsDialogBodyContent>
							{isPreferencesActive && <SettingsDialogSectionDescription>Customize the application behavior and appearance.</SettingsDialogSectionDescription>}
							{isLibraryActive && <SettingsDialogSectionDescription>Add folders on your computer to scan for music files.</SettingsDialogSectionDescription>}
							{isLibraryActive && hasFolders && (
								<SettingsDialogFolderList>
									{folders.map((folderPath) => {
										const handleRemoveClick = () => {
											handleRemoveFolder(folderPath)
										}

										return (
											<SettingsDialogFolderItem key={folderPath}>
												<FolderSimpleIcon className='shrink-0 text-muted-foreground' size={16} />
												<SettingsDialogFolderPath>{folderPath}</SettingsDialogFolderPath>
												<ZButton kind='ghost' size='icon' onClick={handleRemoveClick} aria-label='Remove folder'>
													<TrashIcon />
												</ZButton>
											</SettingsDialogFolderItem>
										)
									})}
								</SettingsDialogFolderList>
							)}
							{isLibraryActive && (
								<SettingsDialogAddFolder>
									<SettingsDialogInput type='text' placeholder='Paste or type a folder path...' value={newFolderPath.state} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
									<ZButton size='small' onClick={handleAddFolder}>
										<PlusIcon />
										Add Folder
									</ZButton>
								</SettingsDialogAddFolder>
							)}
						</SettingsDialogBodyContent>
					</SettingsDialogBody>
				</SettingsDialogLayout>
			</DialogPopup>
		</Dialog>
	)
}
