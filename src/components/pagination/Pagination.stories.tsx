import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import { Pagination, usePagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
	title: 'Components/Pagination',
	component: Pagination,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/**
 * -----------------------------
 * Default Pagination
 * -----------------------------
 */
export const DefaultPagination: Story = {
	name: 'Default Pagination',
	render: () => {
		const [paginationState, paginationDispatch] = usePagination({
			totalPages: 40000,
			currentPage: 100,
			totalData: 800000,
		});

		const dataLabel = 'items';

		return (
			<ThemedContainer theme='light'>
				<Pagination
					loading={false}
					dataLabel={dataLabel}
					paginationState={paginationState}
					paginationDispatch={paginationDispatch}
				/>
			</ThemedContainer>
		);
	},
};
