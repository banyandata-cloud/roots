import { useState } from 'react';
import { inputHelper } from '../../../../../utils';
import { ThemedContainer } from '../../../../helpers';
// import { ServerIcon } from '../../../../icons';
import TableChipItem from './TableChipItem';

export default {
	title: 'Components/Table/TableTop/Chips/Chip',
	component: TableChipItem,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

const Template = (args) => {
	const [label, setLabel] = useState(null);
	const [value, setValue] = useState(null);

	return (
		<ThemedContainer {...args}>
			<TableChipItem
				{...args}
				label={label}
				value={value}
				onSearch={(event) => {
					const { fieldValue, dataset } = inputHelper(event);
					const { search } = dataset;
					if (search === 'label') {
						setLabel(fieldValue);
					} else if (search === 'value') {
						setValue(fieldValue);
					}
				}}
			/>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {
	key: 'something',
	// icon: ServerIcon,
	search: true,
	labelSearch: true,
	valueSearch: true,
	autocompleteOptions: {
		render: ({ value }) => {
			return value;
		},
	},
};
