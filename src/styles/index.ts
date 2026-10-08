import { getCSSVariableValue } from '../utils';
import CSS_COLORS from './_colors.exports.module.scss';
// Design-system color tokens (design-system/*.json -> tokens.build) — the one place
// this should be imported; components use bare var(--color-*) or tokens.$color-* instead.
import './tokens/_root-colors.scss';

type CssColorsType = Record<string, string>;

type ColorsType = Record<string, string>;

const COLORS: ColorsType = Object.keys(CSS_COLORS).reduce<ColorsType>((acc, curr) => {
	if (curr.includes('theme')) {
		acc[curr] = (CSS_COLORS as CssColorsType)[curr] ?? '';
		return acc;
	}
	acc[curr] = getCSSVariableValue((CSS_COLORS as CssColorsType)[curr]);
	return acc;
}, {});

export { COLORS };
