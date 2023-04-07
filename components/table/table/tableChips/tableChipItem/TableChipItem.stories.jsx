import { useState } from 'react';
import { inputHelper } from '../../../../../utils';
import { ThemedContainer } from '../../../../helpers';
import { ServerIcon } from '../../../../icons';
import TableChipItem from './TableChipItem';

export default {
	title: 'Components/Table/TableTop/Chips/Chip',
	component: TableChipItem,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	const [value, setValue] = useState(null);

	return (
		<ThemedContainer {...args}>
			<TableChipItem
				{...args}
				inputValue={value}
				onSearch={(event) => {
					const { fieldValue } = inputHelper(event);
					setValue(fieldValue);
				}}
			/>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {
	key: 'something',
	icon: ServerIcon,
	label: 'DB Tech',
	value: 'PgSQL',
	search: true,
};
