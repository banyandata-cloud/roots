import React from 'react';
import Pagination, { usePagination } from './Pagination';
import styles from './Pagination.module.css';

export default {
	title: 'Components/Pagination',
	component: Pagination,
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
		<div className={styles['pagination-test']}>
			<Pagination
				{...args}
				{...{
					paginationState,
					paginationDispatch,
				}}
			/>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	data: ['data1', 'data2', 'data3'],
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/8yLM3htSky4T8kPkamuxXn/Final-Layout---Ver.-05-(Copy)?node-id=5806%3A67551',
	},
};
