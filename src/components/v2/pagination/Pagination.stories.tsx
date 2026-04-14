import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import { Pagination, usePagination } from './Pagination';
import PaginationDoc from './Story/PaginationDoc';

const meta: Meta<typeof Pagination> = {
	title: 'Components/v2/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: PaginationDoc,
		},
		layout: 'padded',
		options: { showToolbar: true },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const ControlledPagination = ({
	totalPages,
	currentPage,
	step,
	totalData,
	dataLabel,
	loading,
	floating,
}: {
	totalPages: number;
	currentPage: number;
	step: number;
	totalData?: number;
	dataLabel?: string;
	loading?: boolean;
	floating?: boolean;
}) => {
	const [paginationState, paginationDispatch] = usePagination({
		totalPages,
		currentPage,
		step,
		totalData: totalData ?? null,
	});

	return (
		<Pagination
			floating={floating}
			loading={loading}
			dataLabel={dataLabel}
			paginationState={paginationState}
			paginationDispatch={paginationDispatch}
		/>
	);
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Default</p>
				<ControlledPagination totalPages={10} currentPage={1} step={30} />
			</div>

			<div>
				<p style={headingStyle}>With Data Count</p>
				<ControlledPagination
					totalPages={100}
					currentPage={1}
					step={30}
					totalData={3000}
					dataLabel='items'
				/>
			</div>

			<div>
				<p style={headingStyle}>Loading State</p>
				<ControlledPagination
					totalPages={100}
					currentPage={1}
					step={30}
					totalData={3000}
					dataLabel='items'
					loading={true}
				/>
			</div>

			<div>
				<p style={headingStyle}>Floating</p>
				<ControlledPagination
					totalPages={10}
					currentPage={1}
					step={10}
					totalData={100}
					dataLabel='rows'
					floating={true}
				/>
			</div>

			<div>
				<p style={headingStyle}>Single Page (Disabled)</p>
				<ControlledPagination
					totalPages={1}
					currentPage={1}
					step={30}
					totalData={15}
					dataLabel='rows'
				/>
			</div>

			<div>
				<p style={headingStyle}>Large Dataset</p>
				<ControlledPagination
					totalPages={40000}
					currentPage={100}
					step={30}
					totalData={800000}
					dataLabel='records'
				/>
			</div>
		</div>
	),
};
