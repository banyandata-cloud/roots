import type { ChangeEvent } from 'react';

export interface SliderProps {
	disabled?: boolean;
	value?: number;
	onChange?: (
		event: ChangeEvent<HTMLInputElement> | null,
		value: number | { min: number; max: number }
	) => void;
	min: number;
	max: number;
	step?: number;
	range?: boolean;
	label?: string;
	node1?: number;
	node2?: number;
	percent?: boolean;
}
