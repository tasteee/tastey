import { styled } from '#/modules/tw-styled'

type InputPropsT = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
}

const InputRoot = styled.div('InputRoot', 'flex flex-col gap-2 w-full')

const InputLabel = styled.label('InputLabel', 'text-foreground text-sm font-medium')

const InputField = styled.input('InputField', 'w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-white focus:outline-none transition-colors')

export const ZInput = (props: InputPropsT) => {
	const hasLabel = props.label !== undefined

	return (
		<InputRoot>
			{hasLabel && <InputLabel>{props.label}</InputLabel>}
			<InputField type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} onBlur={props.onBlur} onFocus={props.onFocus} disabled={props.disabled} readOnly={props.readOnly} name={props.name} id={props.id} autoComplete={props.autoComplete} className={props.className} />
		</InputRoot>
	)
}
