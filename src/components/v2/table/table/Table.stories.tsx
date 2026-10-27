import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HomeIcon, ServerIcon } from '../../icons';
import Badge from '../../badges/Badge';
import { Button } from '../../buttons';
import { ThemedContainer } from '../../helpers';
import { Text } from '../../text';
import TableDoc from './Story/TableDoc';
import Table from './Table';

const meta: Meta<typeof Table> = {
	title: 'Components/v2/Table/Table',
	component: Table,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: TableDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
	},
};

export default meta;

type Story = StoryObj<typeof Table>;

const DefaultStory = () => {
	const onIntersection = (state: boolean) => {
		if (state) console.log('Make API call for next Page APIS', state);
	};
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{
			title: 'Name',
			id: 'name',
			size: 'md' as const,
			flexible: true,
			formatter: (
				value: string,
				index: number | undefined,
				datum: Record<string, unknown>
			) => {
				if (index === 0) return `${value} - Hello`;
				return value;
			},
		},
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
		},
		{
			title: 'Gender',
			id: 'gender',
			html: true,
			size: 'md' as const,
			fallbackValue: 'MS',
			style: { display: 'flex', justifyContent: 'center' },
		},
		{
			title: 'Age',
			id: 'age',
			size: 'md' as const,
			style: { display: 'flex', justifyContent: 'center' },
		},
		{ title: 'Designation', id: 'designation' },
	];
	const tableData = [
		{
			name: 'Ghee',
			gender: '',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore!',
			age: 28,
			designation: 'UI Engineer',
			aColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			andAnotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			state: 'UP',
		},
		{
			name: 'Pradeep Annadurai',
			gender: '<div>AA</div>',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore!',
			age: 24,
			designation: 'UI Engineer',
			aColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			andAnotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			state: 'Tamil Nadu',
		},
		{
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore!',
			age: 23,
			designation: 'UI Engineer',
			aColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			andAnotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			state: 'Delhi',
		},
		...[...Array(13).keys()].map(() => ({
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		})),
	];
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				onIntersection={onIntersection}
				isFloating={false}
				onSort={(a, b) => console.log('SORT', a, b)}
				tableInfo={{
					title: 'Table Title',
					description: 'Lorem ipsum dolor sit amet consectetur.',
				}}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
				dataLabel='items'
				hideColumnLines={false}
			/>
		</ThemedContainer>
	);
};

const TableWithCheckboxesStory = () => {
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{ title: 'Name', id: 'name', size: 'md' as const, flexible: true },
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
		},
		{ title: 'Gender', id: 'gender', size: 'md' as const },
		{ title: 'Age', id: 'age', size: 'md' as const },
		{ title: 'Designation', id: 'designation' },
	];
	const tableData = [
		{
			name: 'Hello',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 28,
			designation: 'UI Engineer',
			state: 'UP',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			name: 'Singh Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Jaidev Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Jaidev Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'JS Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'J Singh Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'J. Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Jaidev',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
	];
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				isFloating={false}
				tableInfo={{
					title: 'Table Title',
					description: 'Lorem ipsum dolor sit amet consectetur.',
				}}
				uniqueKey='name'
				disableCheck={(datum) => datum.name === 'Hello'}
				onCheck={(checkedData) => console.log(checkedData)}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
				emptyPlaceholder={() => <div>Hello Empty</div>}
				dataLabel='items'
			/>
		</ThemedContainer>
	);
};

const WithSortStory = () => {
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{ title: 'Name', id: 'name', size: 'md' as const, flexible: true, sort: true },
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
			sort: true,
		},
		{ title: 'Gender', id: 'gender', size: 'md' as const, sort: true },
		{ title: 'Age', id: 'age', size: 'md' as const, sort: true },
		{ title: 'Designation', id: 'designation', sort: true },
	];
	const tableData = [
		{
			id: 1,
			name: 'Pradeep Annadurai',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 24,
			designation: 'UI Engineer',
		},
		{
			id: 2,
			name: 'Jaidev Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
		},
		{
			id: 3,
			name: 'Singh Bhui',
			gender: 'F',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 28,
			designation: 'UI Engineer',
		},
		{
			id: 4,
			name: 'Aryan Dixit',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 27,
			designation: 'Manager',
		},
		{
			id: 5,
			name: 'Bhui',
			gender: 'F',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
		},
	];
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				isFloating={false}
				tableInfo={{ title: 'Sort Table', description: 'Table with sort on all columns.' }}
				onSort={(id, direction) => console.log('sort', id, direction)}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
				dataLabel='items'
			/>
		</ThemedContainer>
	);
};

const WithFiltersStory = () => {
	const [sea, setSea] = useState('');
	const onIntersection = (state: boolean) => {
		if (state) console.log('Make API call for next Page APIS');
	};
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{
			title: 'Name',
			id: 'name',
			size: 'sm' as const,
			columnFilter: true,
			filterOptions: ['Aryan Dixit'],
		},
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
			columnFilter: true,
			filterOptions: ['Lorem ipsum'],
		},
		{
			title: 'Gender',
			id: 'gender',
			size: 'md' as const,
			columnFilter: true,
			filterOptions: ['M', 'F'],
		},
		{
			title: 'Age',
			id: 'age',
			size: 'md' as const,
			columnFilter: true,
			filterOptions: ['27', '24', '23'],
		},
		{
			title: 'Designation',
			id: 'designation',
			columnFilter: true,
			filterOptions: ['UI Engineer', 'Manager'],
		},
		{ title: 'A Column', id: 'aColumn', size: 'lg' as const, flexible: true },
		{ title: 'Another Column', id: 'anotherColumn', size: 'lg' as const },
		{ title: 'Another One', id: 'anotherOne', size: 'lg' as const },
		{ title: 'And Another One', id: 'andAnotherOne', size: 'lg' as const },
		{ title: 'State', id: 'state', size: 'sm' as const },
	];
	const tableData = Array(10)
		.fill([
			{
				name: 'Aryan Dixit',
				gender: 'M',
				description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
				age: 27,
				designation: 'UI Engineer',
				aColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
				anotherColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
				anotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
				andAnotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
				state: 'UP',
			},
		])
		.flat();
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				filtersCount={4}
				onIntersection={onIntersection}
				tableInfo={{
					title: 'Table Title',
					description: 'Lorem ipsum dolor sit amet consectetur.',
				}}
				searchProps={{
					placeholder: 'Search Employees',
					onSearch: (s) => setSea(s),
					...(sea && { onClear: () => setSea('') }),
				}}
				isFloating={true}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
			/>
		</ThemedContainer>
	);
};

const WithDefaultActiveStory = () => {
	const onIntersection = (state: boolean) => {
		if (state) console.log('Make API call for next Page APIS');
	};
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{ title: 'Name', id: 'name', size: 'sm' as const, flexible: true, sticky: 'left' as const },
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
		},
		{ title: 'Gender', id: 'gender', size: 'md' as const },
		{ title: 'Age', id: 'age', size: 'md' as const },
		{ title: 'Designation', id: 'designation' },
		{ title: 'A Column', id: 'aColumn', size: 'lg' as const, flexible: true },
		{ title: 'Another Column', id: 'anotherColumn', size: 'lg' as const },
		{ title: 'Another One', id: 'anotherOne', size: 'lg' as const },
		{ title: 'And Another One', id: 'andAnotherOne', size: 'lg' as const },
		{ title: 'State', id: 'state', size: 'sm' as const, sticky: 'right' as const },
	];
	const tableData = Array(10)
		.fill(null)
		.map((_, i) => ({
			id: i + 1,
			name: 'Pradeep',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero.',
			age: 27,
			designation: 'UI Engineer',
			aColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherColumn: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			anotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			andAnotherOne: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			state: 'UP',
		}));
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				defaultActiveIndex={0}
				onIntersection={onIntersection}
				isFloating={true}
				tableInfo={{
					title: 'Table Title',
					description: 'Lorem ipsum dolor sit amet consectetur.',
				}}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
				uniqueKey='id'
				onCheck={(rows) => console.log('checked:', rows)}
				defaultCheckedRows={[tableData[0]]}
			/>
		</ThemedContainer>
	);
};

const WithTableHeaderStory = () => {
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{ title: 'Name', id: 'name', size: 'md' as const, flexible: true },
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
		},
		{ title: 'Gender', id: 'gender', size: 'md' as const },
		{ title: 'Age', id: 'age', size: 'md' as const },
		{ title: 'Designation', id: 'designation' },
	];
	const tableData = [
		{
			id: 1,
			name: 'Aryan Dixit',
			gender: 'M',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			age: 27,
			designation: 'UI Engineer',
		},
		{
			id: 2,
			name: 'Pradeep Annadurai',
			gender: 'M',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			age: 24,
			designation: 'UI Engineer',
		},
		{
			id: 3,
			name: 'Jaidev Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
		},
	];
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				onRowClick={onRowClick}
				tableHeader={() => (
					// Figma title row: bold 20/24 title, count tag and the primary action.
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0 1.3125rem 0 1.1875rem',
						}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
							<Text variant='heading-medium' stroke='bold'>
								Cloud
							</Text>
							<Badge label='20 cloud' size='sm' variant='badge' color='red' />
						</div>
						<Button title='Verb+noun' size='md' />
					</div>
				)}
				headerData={headerData}
				tableData={tableData}
				dataLabel='cloud'
			/>
		</ThemedContainer>
	);
};

const WithAllFeaturesStory = () => {
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	const headerData = [
		{ title: 'Name', id: 'name', size: 'md' as const, flexible: true, sort: true },
		{
			title: 'Description',
			id: 'description',
			size: 'lg' as const,
			flexible: true,
			multiLine: true,
		},
		{
			title: 'Gender',
			id: 'gender',
			size: 'md' as const,
			sort: true,
			columnFilter: true,
			filterOptions: ['M', 'F'],
		},
		{
			title: 'Age',
			id: 'age',
			size: 'md' as const,
			sort: true,
			columnFilter: true,
			filterOptions: ['23', '24', '28'],
		},
		{
			title: 'Designation',
			id: 'designation',
			sort: true,
			columnFilter: true,
			filterOptions: ['UI Engineer', 'Manager'],
		},
	];
	const tableData = [
		{
			id: 1,
			name: 'Hello',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 28,
			designation: 'UI Engineer',
			state: 'UP',
		},
		{
			id: 2,
			name: 'Pradeep Annadurai',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
		{
			id: 3,
			name: 'Singh Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
			state: 'Delhi',
		},
		{
			id: 4,
			name: 'Jaidev Bhui',
			gender: 'F',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			id: 5,
			name: 'Jaidev Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
			state: 'Delhi',
		},
		{
			id: 6,
			name: 'Singh',
			gender: 'F',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			id: 7,
			name: 'Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			id: 8,
			name: 'JS Bhui',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
			state: 'Delhi',
		},
		{
			id: 9,
			name: 'J Singh Bhui',
			gender: 'F',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			id: 10,
			name: 'J. Singh',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			id: 11,
			name: 'Jaidev',
			gender: 'M',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			age: 23,
			designation: 'Manager',
			state: 'Delhi',
		},
	];
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				isFloating={true}
				tableInfo={{
					title: 'All Features Table',
					description: 'Table with sort, filter and checkbox combined.',
				}}
				searchProps={{ placeholder: 'Search' }}
				onSort={(id, direction) => console.log('sort', id, direction)}
				uniqueKey='id'
				onCheck={(checkedData) => console.log('checked:', checkedData)}
				disableCheck={(datum) => datum.name === 'Hello'}
				onRowClick={onRowClick}
				headerData={headerData}
				tableData={tableData}
				dataLabel='items'
			/>
		</ThemedContainer>
	);
};

const LoadingStateStory = () => {
	const onIntersection = (state: boolean) => {
		if (state) console.log('Make API call for next Page APIS');
	};
	const onRowClick = (datum: Record<string, unknown>) => {
		console.log(datum);
	};
	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				onIntersection={onIntersection}
				isFloating={true}
				onRowClick={onRowClick}
				tableInfo={{
					title: 'Table Title',
					description: 'Lorem ipsum dolor sit amet consectetur.',
				}}
				headerData={[]}
				tableData={[]}
				loading={true}
			/>
		</ThemedContainer>
	);
};

export const Default: Story = {
	name: 'Default',
	render: () => <DefaultStory />,
};

const NoDataStory = () => (
	<ThemedContainer style={{ height: '100%' }}>
		<Table
			uniqueKey='name'
			headerData={[{ title: 'Name', id: 'name', size: 'md' as const }]}
			tableData={[]}
			emptyDescription="The issues service didn't respond."
			onRetry={() => {}}
		/>
	</ThemedContainer>
);

export const NoData: Story = {
	name: 'No Data',
	render: () => <NoDataStory />,
};

export const TableWithCheckboxes: Story = {
	name: 'Table With Checkboxes',
	render: () => <TableWithCheckboxesStory />,
};

export const WithSort: Story = {
	name: 'With Sort',
	render: () => <WithSortStory />,
};

export const WithFilters: Story = {
	name: 'With Filters',
	render: () => <WithFiltersStory />,
};

export const WithDefaultActive: Story = {
	name: 'With Default Active',
	render: () => <WithDefaultActiveStory />,
};

export const WithTableHeader: Story = {
	name: 'With Table Header',
	render: () => <WithTableHeaderStory />,
};

export const WithAllFeatures: Story = {
	name: 'With All Features',
	render: () => <WithAllFeaturesStory />,
};

export const LoadingState: Story = {
	name: 'Loading State',
	render: () => <LoadingStateStory />,
};

const PaginatedTableStory = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(30);
	const allRows = Array.from({ length: 100 }, (_, index) => ({
		id: index + 1,
		name: `Row ${index + 1}`,
		status: 'Enabled',
	}));
	const headerData = [
		{ id: 'name', title: 'Name', size: 'md' as const },
		{ id: 'status', title: 'Name', size: 'md' as const },
		{ id: 'status2', title: 'Name', size: 'md' as const },
		{ id: 'status3', title: 'Name', size: 'md' as const },
		{ id: 'status4', title: 'Name', size: 'md' as const },
		{ id: 'status5', title: 'Name', size: 'md' as const },
		{ id: 'status6', title: 'Name', size: 'md' as const },
		{ id: 'status7', title: 'Name', size: 'md' as const },
	];
	const tableData = allRows.slice((page - 1) * pageSize, page * pageSize).map((row) => ({
		...row,
		...Object.fromEntries(headerData.slice(1).map(({ id }) => [id, row.status])),
	}));

	return (
		<ThemedContainer style={{ height: '100%' }}>
			<Table
				headerData={headerData}
				tableData={tableData}
				uniqueKey='id'
				onCheck={() => {}}
				dataLabel='items'
				paginationData={{
					page,
					pageSize,
					totalItems: allRows.length,
					onPageChange: setPage,
					onPageSizeChange: (size) => {
						setPage(1);
						setPageSize(size);
					},
				}}
			/>
		</ThemedContainer>
	);
};

export const WithPagination: Story = {
	name: 'With Pagination',
	render: () => <PaginatedTableStory />,
};

export const CompactRows: Story = {
	render: () => (
		<ThemedContainer>
			<Table
				rowHeight='sm'
				headerData={[{ id: 'name', title: 'Name', size: 'md' }]}
				tableData={[{ name: 'Compact row' }]}
			/>
		</ThemedContainer>
	),
};

export const LargeRows: Story = {
	render: () => (
		<ThemedContainer>
			<Table
				rowHeight='lg'
				headerData={[{ id: 'name', title: 'Name', size: 'md' }]}
				tableData={[{ name: 'Large row' }]}
			/>
		</ThemedContainer>
	),
};

const ProjectSummaryTabs = () => {
	const [activeMetric, setActiveMetric] = useState('all');
	const metrics = [
		{
			id: 'all',
			label: 'All Projects',
			value: '48',
			trend: '↗ 12%',
			color: '#12b76a',
		},
		{
			id: 'in-progress',
			label: 'In Progress',
			value: '16',
			trend: '↗ 8%',
			color: '#12b76a',
		},
		{
			id: 'planning',
			label: 'Planning',
			value: '9',
			trend: '↘ 3%',
			color: '#f79009',
		},
		{
			id: 'completed',
			label: 'Completed This Month',
			value: '12',
			trend: '↗ 7%',
			color: '#12b76a',
		},
		{ id: 'at-risk', label: 'At Risk', value: '4', trend: '↘ 2%', color: '#f04438' },
		{ id: 'on-track', label: 'On Track', value: '32', trend: '↗ 5%', color: '#12b76a' },
	];

	return (
		<div
			role='tablist'
			aria-label='Project summary'
			style={{
				display: 'flex',
				overflowX: 'auto',
				borderBottom: '1px solid #e4e7ec',
				background: '#f5f5f5',
			}}
		>
			{metrics.map((metric) => {
				const selected = activeMetric === metric.id;
				return (
					<button
						key={metric.id}
						type='button'
						role='tab'
						aria-selected={selected}
						onClick={() => setActiveMetric(metric.id)}
						style={{
							flex: '1 0 240px',
							minWidth: 220,
							padding: '26px 28px 24px',
							border: 0,
							borderRight: '1px solid #e4e7ec',
							borderBottom: selected ? '4px solid #2e90fa' : '4px solid transparent',
							marginBottom: -1,
							background: selected ? '#fff' : 'transparent',
							color: '#535862',
							font: 'inherit',
							textAlign: 'left',
							cursor: 'pointer',
						}}
					>
						<span
							style={{
								display: 'block',
								marginBottom: 12,
								fontSize: 16,
								whiteSpace: 'nowrap',
							}}
						>
							{metric.label}
						</span>
						<span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
							<strong style={{ fontSize: 32, lineHeight: 1, fontWeight: 600 }}>
								{metric.value}
							</strong>
							<span
								style={{
									padding: '4px 8px',
									border: '1px solid #e4e7ec',
									borderRadius: 8,
									background: '#fff',
									fontSize: 14,
									whiteSpace: 'nowrap',
									boxShadow: '0 1px 2px #1018281a',
								}}
							>
								<span style={{ color: metric.color, fontWeight: 700 }}>
									{metric.trend.split(' ')[0]}
								</span>
								&nbsp;{metric.trend.split(' ')[1]}
							</span>
						</span>
					</button>
				);
			})}
		</div>
	);
};

const TableWithCustomSectionStory = () => (
	<ThemedContainer style={{ height: 580 }}>
		<Table
			tableSection={<ProjectSummaryTabs />}
			headerData={[
				{ id: 'projectId', title: 'Project ID', size: 'md' },
				{ id: 'project', title: 'Project', size: 'lg' },
				{ id: 'owner', title: 'Owner', size: 'md' },
				{ id: 'status', title: 'Status', size: 'md' },
				{ id: 'updated', title: 'Last Updated', size: 'md', flexible: true },
			]}
			tableData={[
				{
					projectId: 'PRJ-2048',
					project: 'Customer Portal Refresh',
					owner: 'Taylor Morgan',
					status: 'In Progress',
					updated: 'Today',
				},
				{
					projectId: 'PRJ-2051',
					project: 'Mobile App Redesign',
					owner: 'Jordan Lee',
					status: 'Planning',
					updated: 'Yesterday',
				},
				{
					projectId: 'PRJ-2057',
					project: 'Analytics Dashboard',
					owner: 'Casey Patel',
					status: 'Completed',
					updated: 'Oct 12, 2026',
				},
			]}
		/>
	</ThemedContainer>
);

export const WithCustomSection: Story = {
	name: 'With Custom Section',
	render: () => <TableWithCustomSectionStory />,
};
