import { generateColors } from '../../../utils';

const randomColors = generateColors({
	count: 10,
	excludedColors: ['#487349', '#BD3C45'],
	excludedHueRanges: [
		{
			min: 75,
			max: 165,
		}, //
	],
});
export const sampleData = {
	chartData: {
		x1: 30,
		x2: 30,
		x3: 30,
		x4: 30,
		x5: 30,
		x6: 30,
		x7: 30,
		x8: 30,
		x9: 30,
		x10: 30,
		x11: 30,
		x12: 30,
		x13: 30,
	},
	metaData: {
		controlsApplied: {
			x1: {
				comp: 1,
				count: 3,
			},
			x2: {
				comp: 2,
				count: 6,
			},
			x3: {
				comp: 3,
				count: 9,
			},
		},
		keyData: {
			x1: 'high',
			x2: 'medium',
			x3: 'low',
			x4: 'storage',
			x5: 'IAM',
			x6: 'Key',
			x7: 'Compute',
			x8: 'Logging',
			x9: 'Monitoring',
			x10: 'Governance',
			x11: 'Relational',
			x12: 'Networking',
			x13: 'Donned',
		},
		totalControls: {
			x1: 786,
		},
		totalPercentage: {
			x1: 60,
		},
	},
};

export const iconData = {
	chartData: {
		x1: 30,
		x2: 70,
	},
};

export const iconColor = (data: number) => {
	if (data <= 30) {
		return 'green';
	}
	if (data < 70) {
		return 'yellow';
	}
	return 'red';
};

export const piechartRandomColors = randomColors;
