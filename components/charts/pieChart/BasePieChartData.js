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

export const sampleStackData = {
	chartData: {
		Configuration: {
			x1: 50,
			x2: 33.33,
			x3: 16.67,
		},
		'IAM and Policy': {
			x1: 36,
			x2: 48,
			x3: 16,
		},
		Network: {
			x1: 66.67,
			x2: 33.33,
			x3: 0,
		},
		'Audit and logging': {
			x1: 100,
			x2: 0,
			x3: 0,
		},
	},
	metaData: {
		keyData: {
			x1: 'Pass',
			x2: 'Fail',
			x3: 'Validate',
		},
		seriesData: {
			Configuration: {
				x1: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '50.00% Pass',
					},
				],
				x2: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '16.67% Fail',
					},
					{
						title: 'Finance',
						cloud: ['Azure'],
						compliance: '16.67% Fail',
					},
				],
				x3: [
					{
						title: 'Finance',
						cloud: ['Azure'],
						compliance: '16.67% Validate',
					},
				],
			},
			'IAM and Policy': {
				x1: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '24.00% Pass',
					},
					{
						title: 'Finance',
						cloud: ['Azure'],
						compliance: '12.00% Pass',
					},
				],
				x2: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '44.00% Fail',
					},
					{
						title: 'Finance',
						cloud: ['Azure'],
						compliance: '4.00% Fail',
					},
				],
				x3: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '12.00% Validate',
					},
					{
						title: 'Finance',
						cloud: ['Azure'],
						compliance: '4.00% Validate',
					},
				],
			},
			Network: {
				x1: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '66.67% Pass',
					},
				],
				x2: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '33.33% Fail',
					},
				],
				x3: [],
			},
			'Audit and logging': {
				x1: [
					{
						title: 'Default',
						cloud: ['AWS'],
						compliance: '100.00% Pass',
					},
				],
				x2: [],
				x3: [],
			},
		},
	},
};

export const sampleV2Data = {
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
