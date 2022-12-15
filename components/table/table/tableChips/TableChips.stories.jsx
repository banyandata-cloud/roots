import React from 'react';
import { CalenderIcon, CopyIcon, ServerIcon } from '../../../icons';
import { TableChip } from './TableChip.class';
import TableChips from './TableChips';

export default {
	title: 'Components/Table/TableTop/Chips',
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
			icon: ServerIcon,
			label: 'DB Tech',
			value: 'PgSQL',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: ServerIcon,
			label: 'DB Tech',
			value: 'MySQL',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <CopyIcon {...iconProps} />;
			},
			label: 'Cloud',
			value: 'Google',
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <CalenderIcon {...iconProps} />;
			},
			label: 'Cloud',
			value: 'Amazon',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <CalenderIcon {...iconProps} />;
			},
			label: 'Hidden',
			value: null,
			disabled: true,
		}),
	],
};

Default.parameters = {};

export const HiddenOnNull = Template.bind({});

HiddenOnNull.args = {
	showBack: true,
	chips: Default.args.chips.map((chip) => {
		return {
			...chip,
			value: null,
		};
	}),
};
