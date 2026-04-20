import { styled } from '#/modules/tw-styled'
import { ZText } from '#/components/text'

const PageRoot = styled.div('PageRoot', 'flex flex-col gap-8 p-4 pt-16 w-full max-w-4xl mx-auto')
const PageHeader = styled.div('PageHeader', 'flex flex-col gap-1 pb-5 border-b border-border')

const PageTitle = styled(ZText.H1, 'PageTitle', '')
const PageDescription = styled(ZText.Body, 'PageDescription', '')
const SectionLabel = styled(ZText.SectionLabel, 'SectionLabel', '')

export const Page = {
	Root: PageRoot,
	Header: PageHeader,
	Title: PageTitle,
	Description: PageDescription,
	SectionLabel: SectionLabel
}
