type Size = 'l' | 's';

export interface ToggleProps {
	label?: React.ReactNode;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	className?: string;
	disabled?: boolean;
	size?: Size;
	readonly?: boolean;
}
