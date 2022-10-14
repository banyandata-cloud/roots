import React from 'react';
import TableFilters from './TableFilters';

export default {
	title: 'ComponentsV2/Table/TableTop/Filters',
	component: TableFilters,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div>
			<TableFilters {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	filterValue: {
		applied: 4,
	},
};

Default.parameters = {};
