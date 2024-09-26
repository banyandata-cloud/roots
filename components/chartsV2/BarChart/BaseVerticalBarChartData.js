export const sampleData = {
	chartData: {
		MySql: {
			x1: 39,
		},
		PgSql: {
			x1: 39.53,
		},
		Oracle: {
			x1: 46.53,
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

export const sampleStackData = {
	chartData: {
		Authentication: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},

			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
		},

		Setting: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
		},
		'High Availability': {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
		},
		Audit: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
		},
		Authorization: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
		},
		Patches: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
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

export const transformToStack = (sampleStackDataTemp) => {
	const initStack = {
		x1: 0,
		x2: 0,
		x3: 0,
		x4: 0,
		x5: 0,
		x6: 0,
	};

	const finalData = {};

	Object.keys(sampleStackDataTemp.chartData).forEach((cd) => {
		let dbIndex = 1;
		const listStack = {
			...initStack,
		};
		Object.keys(sampleStackDataTemp.chartData[cd]).forEach((db) => {
			Object.values(sampleStackDataTemp.chartData[cd][db]).forEach((coord) => {
				listStack[`x${dbIndex}`] = coord;
				dbIndex++;
			});
			finalData[cd] = listStack;
		});
	});

	return {
		...sampleStackDataTemp,
		chartData: finalData,
	};
};

export const stackData = transformToStack(sampleStackData);
