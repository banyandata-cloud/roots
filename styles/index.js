import { getCSSVariableValue } from '../utils';
import CSS_COLORS from './_colors.exports.module.scss';

const COLORS = Object.keys(CSS_COLORS).reduce((acc, curr) => {
	if (curr?.includes('theme')) {
		acc[curr] = CSS_COLORS[curr];
		return acc;
	}
	acc[curr] = getCSSVariableValue(CSS_COLORS[curr]);
	return acc;
}, {});

export { COLORS };
