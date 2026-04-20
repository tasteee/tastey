export const getTestId = (props: any, tid: string = '') => {
	if (props['data-testid']) return props['data-testid'] + ' ' + tid
	if (props.tid) return props.tid + ' ' + tid
	return tid
}
