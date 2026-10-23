import type { SingleTimeMode } from '../../types';

export interface TimeModeSwitchProps {
	value: SingleTimeMode;
	onChange: (mode: SingleTimeMode) => void;
	disabled?: boolean | undefined;
}
