import React from 'react';
import TableCell from './TableCell';

export default {
	title: 'Components/Table/Cell',
	component: TableCell,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Just extends the Base Cell with the property of text overflow ellipsis',
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				background: '#ccc',
				height: '10rem',
				padding: '1rem',
			}}>
			<TableCell {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	className: '',
	component1: 1,
	component2: 2,
	component3: 3,
};

Default.parameters = {};
