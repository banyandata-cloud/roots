export interface RadioProps {
	label?: React.ReactNode | undefined;
	checked?: boolean | undefined;
	defaultChecked?: boolean | undefined;
	onChange?: ((event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void) | undefined;
	className?: string | undefined;
	disabled?: boolean | undefined;
	readOnly?: boolean | undefined;
	error?: string | undefined;
	warning?: string | undefined;
	name?: string | undefined;
	value?: string | undefined;
	id?: string | undefined;
}
