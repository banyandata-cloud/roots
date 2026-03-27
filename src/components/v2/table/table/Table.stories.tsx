import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HomeIcon } from '../../../../components/icons/Home';
import { ServerIcon } from '../../../../components/icons/Server';
import { Button } from '../../buttons';
import { ThemedContainer } from '../../helpers';
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
				rightActions={({ toggleDrawer }: any) => (
					<Button
						title='Action'
						onClick={() => toggleDrawer({ data: { index: 0, standalone: true } })}
					/>
				)}
				searchProps={{
					placeholder: 'Search Employees',
					onSearch: (s) => setSea(s),
					...(sea && { onClear: () => setSea('') }),
				}}
				tableDrawerProps={() => ({
					tabsConfig: {
						tabs: [
							{
								id: 1,
								leftIcon: {
									Active: (props: any) => <ServerIcon {...props} />,
									InActive: (props: any) => <HomeIcon {...props} />,
								},
							},
							{
								id: 2,
								leftIcon: {
									Active: (props: any) => <ServerIcon {...props} />,
									InActive: (props: any) => <HomeIcon {...props} />,
								},
							},
						],
					},
					standalone: [
						() => (
							<div data-elem='drawer-child'>
								Hello World
								<div data-elem='drawer-child-header'>
									KKKK<div>djkndk</div>
								</div>
								<div data-elem='drawer-child-body'>
									Nondandlk If the elements actually are siblings in the DOM.
								</div>
								<div data-elem='drawer-child-body'>Noss</div>
							</div>
						),
					],
					renderBody: [
						() => (
							<div data-elem='drawer-child'>
								Hello World
								<div data-elem='drawer-child-header'>
									YES dsdsd<div>djkndk</div>
								</div>
								<div data-elem='drawer-child-body'>
									Nondandlk If the elements actually are siblings in the DOM.
								</div>
								<div data-elem='drawer-child-body'>Noss</div>
							</div>
						),
						() => <div>Hello Everyone</div>,
					],
				})}
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
				tableHeader={({ toggleDrawer }) => (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: '17px 20px',
							borderBottom: '1px solid #F5F5F5',
						}}>
						<span>Cloud</span>
						<Button
							title='Verb+noun'
							onClick={() => toggleDrawer?.({ data: { index: 0 } })}
						/>
					</div>
				)}
				headerData={headerData}
				tableData={tableData}
				tableDrawerProps={() => ({
					renderBody: [
						() => (
							<div data-elem='drawer-child'>
								Hello World
								<div data-elem='drawer-child-header'>YES</div>
								<div data-elem='drawer-child-body'>
									Nondandlk If the elements actually are siblings in the DOM.
								</div>
								<div data-elem='drawer-child-body'>Noss</div>
							</div>
						),
						() => <div>Hello Everyone</div>,
					],
				})}
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
