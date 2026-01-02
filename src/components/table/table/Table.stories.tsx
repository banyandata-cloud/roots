import type { Meta, StoryObj } from '@storybook/react';

import { ThemedContainer } from '../../helpers';
import { HomeIcon } from '../../icons';
import { usePagination } from '../../pagination';
import Table from './Table';

const meta: Meta<typeof Table> = {
	title: 'Components/Table/Table',
	component: Table,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Table>;

/* ---------------------------------- */
/* Default Table                       */
/* ---------------------------------- */

export const Default: Story = {
	render: () => {
		const onIntersection = (state: boolean) => {
			if (state) {
				console.log('Load next page');
			}
		};

		const headerData = [
			{ title: 'Name', id: 'name', size: 'md', flexible: true, sort: true },
			{
				title: 'Description',
				id: 'description',
				size: 'lg',
				flexible: true,
				multiLine: true,
				sort: true,
			},
			{
				title: 'Gender',
				id: 'gender',
				size: 'sm',
				sort: true,
				style: { display: 'flex', justifyContent: 'center' },
			},
			{
				title: 'Age',
				id: 'age',
				size: 'sm',
				sort: true,
				style: { display: 'flex', justifyContent: 'center' },
			},
			{ title: 'Designation', id: 'designation' },
		];

		const tableData = [
			{
				name: 'Ghee',
				gender: '',
				description: 'Lorem ipsum dolor sit amet...',
				age: 28,
				designation: 'UI Engineer',
				state: 'UP',
			},
			{
				name: 'Pradeep Annadurai',
				gender: 'M',
				description: 'Lorem ipsum dolor sit amet...',
				age: 24,
				designation: 'UI Engineer',
				state: 'Tamil Nadu',
			},
		];

		const [paginationState, paginationDispatch] = usePagination({
			totalPages: 20,
			currentPage: 1,
		});

		return (
			<ThemedContainer style={{ height: '100%' }}>
				<Table
					onIntersection={onIntersection}
					tableInfo={{
						title: 'Table Title',
						description: 'Lorem ipsum dolor sit amet consectetur.',
					}}
					searchProps={{
						icon: () => <HomeIcon />,
					}}
					headerData={headerData}
					tableData={tableData}
					dataLabel='items'
					paginationData={{
						paginationState,
						paginationDispatch,
					}}
				/>
			</ThemedContainer>
		);
	},
};

/* ---------------------------------- */
/* Table With Checkboxes               */
/* ---------------------------------- */

export const WithCheckboxes: Story = {
	render: () => {
		const headerData = [
			{ title: 'Name', id: 'name', size: 'md', flexible: true },
			{ title: 'Description', id: 'description', size: 'lg', flexible: true },
			{ title: 'Gender', id: 'gender', size: 'sm' },
			{ title: 'Age', id: 'age', size: 'sm' },
			{ title: 'Designation', id: 'designation' },
		];

		const tableData = [
			{
				name: 'Hello',
				gender: 'M',
				description: 'Lorem ipsum...',
				age: 28,
				designation: 'UI Engineer',
			},
			{
				name: 'Pradeep',
				gender: 'M',
				description: 'Lorem ipsum...',
				age: 24,
				designation: 'UI Engineer',
			},
		];

		const [paginationState, paginationDispatch] = usePagination({
			totalPages: 10,
			currentPage: 1,
		});

		return (
			<ThemedContainer style={{ height: '100%' }}>
				<Table
					uniqueKey='name'
					disableCheck={(datum) => datum.name === 'Hello'}
					onCheck={(checked) => console.log(checked)}
					headerData={headerData}
					tableData={tableData}
					paginationData={{
						paginationState,
						paginationDispatch,
					}}
				/>
			</ThemedContainer>
		);
	},
};

/* ---------------------------------- */
/* Loading State                       */
/* ---------------------------------- */

export const Loading: Story = {
	render: () => {
		const [paginationState, paginationDispatch] = usePagination({
			totalPages: 5,
			currentPage: 1,
		});

		return (
			<ThemedContainer style={{ height: '100%' }}>
				<Table
					loading
					tableData={[]}
					paginationData={{
						paginationState,
						paginationDispatch,
					}}
				/>
			</ThemedContainer>
		);
	},
};
