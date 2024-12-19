export const sampleData = {
	chartData: {
		MySql: {
			x1: 80,
			x2: 20,
		},
		PgSql: {
			x1: 30,
			x2: 70,
		},
		Oracle: {
			x1: 50,
			x2: 50,
		},
		MongoDb: {
			x1: 70,
			x2: 30,
		},
		MsSql: {
			x1: 20,
			x2: 80,
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
			x1: 80,
			x2: 20,
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
