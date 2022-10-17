import React from 'react';
import { Calender, Copy, Server } from '../../../icons';
import { TableChip } from './TableChip.class';
import TableChips from './TableChips';

export default {
	title: 'ComponentsV2/Table/TableTop/Chips',
	component: TableChips,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div>
			<TableChips {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	showBack: true,
	chips: [
		new TableChip({
			key: 'something',
			icon: Server,
			label: 'DB Tech',
			value: 'PgSQL',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: Server,
			label: 'DB Tech',
			value: 'MySQL',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <Copy {...iconProps} />;
			},
			label: 'Cloud',
			value: 'Google',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <Calender {...iconProps} />;
			},
			label: 'Cloud',
			value: 'Amazon',
			disabled: true,
		}),
	],
};

Default.parameters = {};
