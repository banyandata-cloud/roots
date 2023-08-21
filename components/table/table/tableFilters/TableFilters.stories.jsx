import { ThemedContainer } from '../../../helpers';
import TableFilters from './TableFilters';
import { useTableSearch } from './Search';

export default {
	title: 'Components/Table/TableTop/Filters',
	component: TableFilters,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

const FILTERS = [
	{
		id: 'serviceType',
		title: 'Service Type',
		options: ['VPC', 'ABC', 'DEF'],
	},
	{
		id: 'resourceType',
		title: 'Resource Type',
		options: ['XYZ', '123', '456'],
		deps: ['serviceType'],
	},
];

const Template = (args) => {
	const searchOptions = useTableSearch({
		filters: FILTERS,
		onApply: (filters) => {
			alert(`${filters.length} Filter(s) Applied`);
		},
	});
	return (
		<ThemedContainer {...args}>
			<TableFilters {...args} searchOptions={searchOptions} />
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
