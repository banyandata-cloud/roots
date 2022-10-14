import React, { useState } from 'react';
import { cloneDeep, get } from '../../../utils';
import HierarchyBrowser from './HierarchyBrowser';

export default {
	title: 'ComponentsV2/Hierarchy/Browser',
	component: HierarchyBrowser,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: '',
			},
		},
	},
};

const METADATA = {
	title: 'database',
	id: 'database',
	count: 2,
	list: [
		{
			title: 'test1',
			id: 'schema',
			count: 2,
			list: [
				{
					title: 'first',
					id: 'object',
					count: 10,
					list: [
						{
							title: 'Tables',
							count: 10,
						},
						{
							title: 'Indexes',
							count: 10,
						},
						{
							title: 'Views',
							count: 5,
						},
						{
							title: 'Trigger',
							count: 7,
						},
					],
				},
				{
					title: 'second',
					id: 'object',
					count: 10,
					list: [
						{
							title: 'Tables',
							count: 3,
						},
						{
							title: 'Indexes',
							count: 1,
						},
						{
							title: 'Views',
							count: 2,
						},
						{
							title: 'Trigger',
							count: 1,
						},
					],
				},
			],
		},
		{
			title: 'test2',
			id: 'schema',
			count: 2,
			list: [
				{
					title: 'first',
					id: 'object',
					count: 10,
					list: [
						{
							id: 'tables',
							title: 'Tables',
							count: 10,
							list: [],
						},
						{
							title: 'Indexes',
							count: 10,
						},
						{
							title: 'Views',
							count: 5,
						},
						{
							title: 'Trigger',
							count: 7,
						},
					],
				},
				{
					title: 'second',
					id: 'object',
					count: 10,
					list: [
						{
							title: 'Tables',
							count: 3,
						},
						{
							title: 'Indexes',
							count: 1,
						},
						{
							title: 'Views',
							count: 2,
						},
						{
							title: 'Trigger',
							count: 1,
						},
					],
				},
			],
		},
	],
};

export const Default = (args) => {
	return (
		<div>
			<HierarchyBrowser {...args} />
		</div>
	);
};

Default.args = {
	className: '',
	metadata: METADATA,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};

const getDynamicValues = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				title: 'another one',
				id: 'object',
				count: 10,
				list: [
					{
						title: 'New Tables',
						count: 3,
					},
					{
						title: 'New Indexes',
						count: 1,
					},
					{
						title: 'New Views',
						count: 2,
					},
					{
						title: 'New Trigger',
						count: 1,
					},
				],
			});
		}, 1000);
	});
};

export const Dynamic = (args) => {
	const [state, setState] = useState(cloneDeep(METADATA));

	const handleItemClick = async (item, accessor, open) => {
		if (open && (item.list == null || item.list?.length === 0) && item.id === 'tables') {
			const values = await getDynamicValues();
			const clonedState = cloneDeep(state);
			const accessedItem = get(clonedState, accessor);
			accessedItem.list = [values];
			setState(clonedState);
		}
	};

	return (
		<div>
			<HierarchyBrowser {...args} metadata={state} onItemClick={handleItemClick} />
		</div>
	);
};

Dynamic.args = {
	className: '',
	metadata: METADATA,
};

Dynamic.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};
