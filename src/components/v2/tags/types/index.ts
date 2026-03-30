import type { IndicatorType } from '../assets/Indicator/types/index';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps {
	label?: string | undefined;
	size?: TagSize | undefined;
	closable?: boolean | undefined;
	checkbox?: boolean | undefined;
	indicator?: boolean | undefined;
	indicatorType?: IndicatorType | undefined;
	count?: number | undefined;
	checkboxIndicator?: boolean | undefined;
	checkboxIndicatorClosable?: boolean | undefined;
	checkboxIndicatorCount?: boolean | undefined;
	onlyCount?: boolean | undefined;
	checkboxCloser?: boolean | undefined;
	checkboxCount?: boolean | undefined;
	logo?: boolean | undefined;
	checkboxLogo?: boolean | undefined;
	checkboxLogoClosable?: boolean | undefined;
	checkboxLogoCount?: boolean | undefined;
	textField?: boolean | undefined;
	inputValue?: string | undefined;
	onInputChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
	defaultInputValue?: string | undefined;
	inputPlaceholder?: string | undefined;
	onInputClear?: () => void | undefined;
}
