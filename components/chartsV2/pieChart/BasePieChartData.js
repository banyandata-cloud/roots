export const sampleData = {
	chartData: {
		x1: 30,
		x2: 25,
		x3: 45,
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
		},
		totalControls: {
			x1: 786,
		},
	},
};

export const iconData = {
	chartData: {
		x1: 30,
		x2: 70,
	},
};

export const iconColor = (data) => {
	if (data <= 30) {
		return 'green';
	}
	if (data < 70) {
		return 'yellow';
	}
	return 'red';
};
