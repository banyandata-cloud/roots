import React from 'react';
import { Server, Copy, Arrow } from '../../icons';
import { usePagination } from '../../pagination';
import { TableColumn } from '../BaseTable.class';
import Table from './Table';
import { TableChip } from './tableChips';

export default {
	title: 'ComponentsV2/Table/Table',
	component: Table,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	const [paginationState, paginationDispatch] = usePagination({
		totalPages: 20,
		currentPage: 1,
	});

	return (
		<div
			style={{
				background: '#777777',
				padding: '1rem',
				display: 'flex',
				height: '100%',
			}}>
			<Table
				{...args}
				paginationData={{
					paginationState,
					paginationDispatch,
				}}
			/>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'lg',
			flexible: true,
		}),
		new TableColumn({
			title: 'Description',
			id: 'description',
			size: 'lg',
			flexible: true,
			multiLine: true,
		}),
		new TableColumn({
			title: 'Gender',
			id: 'gender',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Age',
			id: 'age',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Designation',
			id: 'designation',
		}),
		new TableColumn({
			title: 'State',
			id: 'state',
			size: 'sm',
		}),
	],
	tableData: [
		{
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		...[...Array(20).keys()].fill({
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',

			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		}),
	],
};

Default.parameters = {};

export const WithChips = Template.bind({});

WithChips.args = {
	...Default.args,
	chipsData: {
		showBack: true,
		chips: [
			new TableChip({
				key: 'something',
				icon: Arrow,
				label: 'DB Tech',
				value: 'PgSQL',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: Arrow,
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
					return <Server {...iconProps} />;
				},
				label: 'Cloud',
				value: 'Amazon',
				disabled: true,
			}),
		],
	},
};

export const WithFilters = Template.bind({});

WithFilters.args = {
	...Default.args,
	filtersData: {
		filterValue: {
			applied: 4,
		},
	},
};

export const WithChipsAndFilters = Template.bind({});

WithChipsAndFilters.args = {
	...WithChips.args,
	...WithFilters.args,
};
