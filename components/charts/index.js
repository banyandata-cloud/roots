export * from './verticalBarChart';
export * from './horizontalBarChart';
export * from './pieChart';
export * from './regionChart';
export * from './heatMapChart';
export * from './areaChart';
export * from './nestedPieChart';

const Cloud_Security_posture = {
	chartData: {
		overallScore: {
			x1: 75,
		},
		complianceScore: {
			x1: 75,
			x2: 25,
		},
	},
	metaData: {
		keyData: {
			x1: 'Pass 75%',
			x2: 'Fail 25%',
		},
		totalScore: 100,
	},
};
// seriesOption : [
// animationDuration: 3000,
// animation: false,
//     {
//         label: {
//             show: true,
//             position: 'center',
//         },
//     }
// ]
// legend: {
//     show: true,
//     top: 'top',
//     orient: 'vertical',
// },
// seriesData: {
//     chartData: sampleData?.chartData?.overallScore,
//     // Don't give metaData else it'll pick up the same name series
// },
// seriesData: {
//     chartData: sampleData?.chartData?.complianceScore,
//     metaData: sampleData?.metaData,
// },

const Database_Security_Posture = {
	chartData: {
		overallScore: {
			x1: 70,
		},
		complianceScore: {
			x1: 70,
			x2: 25,
			x3: 5,
		},
	},
	metaData: {
		keyData: {
			x1: 'Pass 70%',
			x2: 'Fail 25%',
			x3: 'Unvalidated 5%',
		},
		totalScore: 100,
	},
};

Resource_Count_Progress = {
	chartData: {
		x1: 234,
		x2: 243,
		x3: 641,
		x4: 554,
	},
	metaData: {
		keyData: {
			x1: 'S. Type1',
			x2: 'S. Type2',
			x3: 'S. Type3',
			x4: 'S. Type4',
		},
		applicableCount: 12345,
		totalCount: 13128,
	},
};

Database_Instance_Count = {
	chartData: {
		x1: 234,
		x2: 243,
		x3: 641,
		x4: 554,
	},
	metaData: {
		keyData: {
			x1: 'MySQL',
			x2: 'PgSQL',
			x3: 'OCI',
			x4: 'Mongo',
		},
		totalInstances: 284,
	},
};

Cloud_Audit_Logs = {
	chartData: {
		legend1: [7, 4, 8, 9, 7, 10, 6, 12, 9],
		legend2: [7, 4, 8, 9, 7, 10, 6, 12, 9],
	},
	metaData: {
		logCountChange: 2345,
		xAxisData: [K02, K03, K04, K05, K06, K07, K08, K09, K10],
	},
};

Database_Audit_Logs = {
	chartData: {
		legend1: [11, 8, 12, 13, 11, 14, 10, 16, 13],
		legend2: [7, 4, 8, 9, 7, 10, 6, 12, 9],
	},
	metaData: {
		logCountChange: 2345,
		xAxisData: [K02, K03, K04, K05, K06, K07, K08, K09, K10],
	},
};

Cloud_Security_History_Line = {
	chartData: {
		Compliance: [11, 8, 12, 13, 11, 14, 10, 16],
	},
	metaData: {
		xAxisData: [Jan1, Jan5, Jan9, Jan13, Jan17, Jan21, Jan25, Jan29],
	},
};
Cloud_Security_History_Bar = {
	data: {
		chartData: {
			'Jan 1': {
				x1: 20,
				x2: 20,
				x3: 20,
			},
			'Jan 2': {
				x1: 15,
				x2: 15,
				x3: 15,
			},
			'Jan 3': {
				x1: 19,
				x2: 19,
				x3: 19,
			},
			'Jan 4': {
				x1: 10,
				x2: 10,
				x3: 10,
			},
			'Jan 5': {
				x1: 25,
				x2: 25,
				x3: 25,
			},
			'Jan 6': {
				x1: 5,
				x2: 5,
				x3: 5,
			},
		},
		metaData: {
			keyData: {
				x1: 'compliant',
				x2: 'nonCompliant',
				x3: 'validate',
			},
			totalControls: {
				'Jan 1': 80,
				'Jan 2': 60,
				'Jan 3': 86,
				'Jan 4': 40,
				'Jan 5': 100,
				'Jan 6': 20,
			},
		},
	},
};

Cloud_Security_Score_By_regulatory_standard_Line = {
	chartData: {
		GDPR: [11, 8, 12, 13, 11, 14, 10, 16],
		ISO: [7, 4, 8, 9, 7, 10, 6, 12],
		HIPPA: [17, 3, 5, 8, 3, 13, 16, 2],
		PCI: [4, 11, 4, 1, 8, 9, 11, 3],
		SOC: [18, 2, 4, 13, 5, 11, 3, 19],
		CIS: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	metaData: {
		xAxisData: [Jan1, Jan5, Jan9, Jan13, Jan17, Jan21, Jan25, Jan29],
	},
};

Non_Compliant_Control_By_Control_domain = {
	data: {
		chartData: {
			'Jan 1': {
				x1: 20,
				x2: 20,
				x3: 20,
				x4: 20,
				x5: 20,
				x6: 20,
			},
			'Jan 2': {
				x1: 15,
				x2: 15,
				x3: 15,
				x4: 15,
				x5: 15,
				x6: 15,
			},
			'Jan 3': {
				x1: 19,
				x2: 19,
				x3: 19,
				x4: 19,
				x5: 19,
				x6: 19,
			},
			'Jan 4': {
				x1: 10,
				x2: 10,
				x3: 10,
				x4: 10,
				x5: 10,
				x6: 10,
			},
			'Jan 5': {
				x1: 25,
				x2: 25,
				x3: 25,
				x4: 25,
				x5: 25,
				x6: 25,
			},
			'Jan 6': {
				x1: 5,
				x2: 5,
				x3: 5,
				x4: 5,
				x5: 5,
				x6: 5,
			},
		},
		metaData: {
			keyData: {
				x1: 'Cloud Databases',
				x4: 'Logging & Monitoring',
				x5: 'Networking',
				x6: 'Storage',
			},
			totalControls: {
				'Jan 1': 80,
				'Jan 2': 60,
				'Jan 3': 86,
				'Jan 4': 40,
				'Jan 5': 100,
				'Jan 6': 20,
			},
		},
	},
};
Non_Compliant_Control_By_Service_Type = {
	data: {
		chartData: {
			'Jan 1': {
				x1: 20,
				x2: 20,
				x3: 20,
				x4: 20,
				x5: 20,
				x6: 20,
			},
			'Jan 2': {
				x1: 15,
				x2: 15,
				x3: 15,
				x4: 15,
				x5: 15,
				x6: 15,
			},
			'Jan 3': {
				x1: 19,
				x2: 19,
				x3: 19,
				x4: 19,
				x5: 19,
				x6: 19,
			},
			'Jan 4': {
				x1: 10,
				x2: 10,
				x3: 10,
				x4: 10,
				x5: 10,
				x6: 10,
			},
			'Jan 5': {
				x1: 25,
				x2: 25,
				x3: 25,
				x4: 25,
				x5: 25,
				x6: 25,
			},
			'Jan 6': {
				x1: 5,
				x2: 5,
				x3: 5,
				x4: 5,
				x5: 5,
				x6: 5,
			},
		},
		metaData: {
			keyData: {
				x1: 'RDS',
				x4: 'Key Management Service',
				x5: 'IAM',
				x6: 'Cloud Trail',
			},
			totalControls: {
				'Jan 1': 80,
				'Jan 2': 60,
				'Jan 3': 86,
				'Jan 4': 40,
				'Jan 5': 100,
				'Jan 6': 20,
			},
		},
	},
};

Monitered_Accounts = {
	chartData: {
		Accounts: [11, 8, 12, 13, 11, 14, 10, 16],
	},
	metaData: {
		xAxisData: [Jan1, Jan5, Jan9, Jan13, Jan17, Jan21, Jan25, Jan29],
	},
};
Monitered_Resource_Type = {
	chartData: {
		Resources: [11, 8, 12, 13, 11, 14, 10, 16],
	},
	metaData: {
		xAxisData: [Jan1, Jan5, Jan9, Jan13, Jan17, Jan21, Jan25, Jan29],
	},
};
Audit_Logs_generation_by_resource = {
	chartData: {
		Logs: [11, 8, 12, 13, 11, 14, 10, 16],
	},
	metaData: {
		xAxisData: [Jan1, Jan5, Jan9, Jan13, Jan17, Jan21, Jan25, Jan29],
	},
};
