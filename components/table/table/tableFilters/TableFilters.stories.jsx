import React from 'react';
import { ThemedContainer } from '../../../helpers';
import TableFilters from './TableFilters';

export default {
	title: 'Components/Table/TableTop/Filters',
	component: TableFilters,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<ThemedContainer {...args}>
			<TableFilters {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {
	filterValue: {
		applied: 4,
	},
};

Default.parameters = {};
