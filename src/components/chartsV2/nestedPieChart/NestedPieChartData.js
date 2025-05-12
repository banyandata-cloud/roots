export const sampleData = {
	chartData: {
		MySql: {
			x1: 80,
		},
		PgSql: {
			x1: 20,
		},
		Oracle: {
			x1: 50,
		},
		MongoDb: {
			x1: 70,
		},
	},
	metaData: {
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
