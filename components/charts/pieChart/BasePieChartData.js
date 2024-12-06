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
		MySql: {
			x1: 40,
			x2: 60,
		},
		PgSql: {
			x1: 0,
			x2: 100,
		},
		MongoDb: {
			x1: 100,
			x2: 0,
		},
		MsSql: {
			x1: 0,
			x2: 100,
		},
		GCP: {
			x1: 65,
			x2: 35,
		},
		CD1: {
			x1: 30,
			x2: 70,
		},
		CD2: {
			x1: 100,
			x2: 0,
		},
		CD3: {
			x1: 70,
			x2: 30,
		},
		CD4: {
			x1: 20,
			x2: 80,
		},
	},
	metaData: {
		controlsApplied: {
			MySql: {
				x1: 18,
			},
			PgSql: {
				x1: 43,
			},
			Oracle: {
				x1: 46,
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
