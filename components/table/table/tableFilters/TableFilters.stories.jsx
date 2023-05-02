import { ThemedContainer } from '../../../helpers';
import TableFilters from './TableFilters';
import { useTableSearch } from './Search';
import { CloudIcons } from '../../../icons';

export default {
	title: 'Components/Table/TableTop/Filters',
	component: TableFilters,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const FILTERS = [
	{
		id: 'serviceType',
		title: 'Service Type',
		icon: CloudIcons.AWS,
		options: ['VPC', 'ABC', 'DEF'],
	},
	{
		id: 'resourceType',
		title: 'Resource Type',
		icon: CloudIcons.GCP,
		options: ['XYZ', '123', '456'],
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
