export const NumberValueFormatter = (params: any) => {
	return (params.value as number)?.toFixed(2)
}
