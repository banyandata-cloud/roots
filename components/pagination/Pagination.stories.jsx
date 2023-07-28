import React from 'react';
import { ThemedContainer } from '../helpers';
import { Pagination, usePagination } from './Pagination';

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
		<ThemedContainer>
			<Pagination
				{...args}
				{...{
					paginationState,
					paginationDispatch,
				}}
			/>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
Default.args = {
	loading: false,
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/8yLM3htSky4T8kPkamuxXn/Final-Layout---Ver.-05-(Copy)?node-id=5806%3A67551',
	},
};
