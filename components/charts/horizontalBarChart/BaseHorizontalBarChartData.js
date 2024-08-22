/* eslint-disable no-restricted-syntax */
export const sampleData = {
	chartData: {
		'Audit, Logging and Monitering': {
			x1: 40,
			x2: 60,
			x3: 0,
		},
		Settings: {
			x1: 20,
			x2: 10,
			x3: 70,
		},
		Authorization: {
			x1: 20,
			x2: 40,
			x3: 40,
		},
		Authentication: {
			x1: 40,
			x2: 60,
			x3: 0,
		},
		'Patches and Plugins': {
			x1: 20,
			x2: 0,
			x3: 80,
		},
		'High Availability': {
			x1: 30,
			x2: 0,
			x3: 70,
		},
	},
	metaData: {
		controlsApplied: {
			'Audit, Logging and Monitering': {
				x1: 40,
			},
			Settings: {
				x1: 20,
			},
			Authorization: {
				x1: 20,
			},
			Authentication: {
				x1: 40,
			},
			'Patches and Plugins': {
				x1: 20,
			},
			'High Availability': {
				x1: 30,
			},
		},
		keyData: {
			x1: 'compliant',
			x2: 'nonCompliant',
			x3: 'validate',
		},
		totalControls: {
			x1: 61,
		},
	},
};

export const sampleV2Data = {
	chartData: {
		'Audit, Logging and Monitering': {
			x1: 100,
		},
		Settings: {
			x1: 50,
		},
		Authorization: {
			x1: 65,
		},
		Authentication: {
			x1: 30,
		},
		'Patches and Plugins': {
			x1: 45,
		},
		'High Availability': {
			x1: 25,
		},
	},
};

export const formatData = (chartDataObj) => {
	const { chartData } = chartDataObj;

	const maxX1 = Math.max(
		...Object.values(chartData).map((item) => {
			return item.x1;
		})
	);

	const formattedChartData = Object.fromEntries(
		Object.entries(chartData).map(([key, value]) => {
			return [
				key,
				{
					x1: value.x1,
					x2: maxX1 - value.x1,
				},
			];
		})
	);

	return {
		chartData: formattedChartData,
	};
};

export const sampleData2 = {
	chartData: {
		'Audit, Logging and Monitering': {
			x1: 40,
		},
	},
	metaData: {
		controlsApplied: {
			'Audit, Logging and Monitering': {
				x1: 40,
			},
		},
		keyData: {
			x1: 'compliant',
		},
		totalControls: {
			x1: 61,
		},
	},
};

export const onBarClick = (params) => {
	alert(`Click Event on ${params.name}`);
};
