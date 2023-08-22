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
