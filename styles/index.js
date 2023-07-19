import { getCSSVariableValue } from '../utils';
import CSS_COLORS from './_colors.exports.scss';

const COLORS = Object.keys(CSS_COLORS ?? {}).reduce((acc, curr) => {
	acc[curr] = getCSSVariableValue(CSS_COLORS[curr]);
	return acc;
}, {});

export { COLORS };
