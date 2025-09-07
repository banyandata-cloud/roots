export interface RangeSliderProps {
	min: number;
	max: number;
	step?: number;
	disabled?: boolean | undefined;
	label?: string | undefined;
	node1: number;
	node2: number;
	percent?: boolean | undefined;
	onChange?: (values: { min: number; max: number }) => void;
	className?: string | undefined;
}
