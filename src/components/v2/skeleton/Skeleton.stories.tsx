import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import Skeleton from './Skeleton';
import SkeletonDoc from './Story/SkeletonDoc';

const meta: Meta<typeof Skeleton> = {
	title: 'Components/v2/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: SkeletonDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
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

type Story = StoryObj<typeof Skeleton>;

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

const rowStyle = {
	display: 'flex',
	gap: '24px',
	alignItems: 'center',
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Text</p>
				<div style={rowStyle}>
					<Skeleton variant='text' width={300} height={16} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Circle</p>
				<div style={rowStyle}>
					<Skeleton variant='circle' width={48} height={48} />
					<Skeleton variant='circle' width={64} height={64} />
					<Skeleton variant='circle' width={80} height={80} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Rounded</p>
				<div style={rowStyle}>
					<Skeleton variant='rounded' width={200} height={100} />
					<Skeleton variant='rounded' width={300} height={60} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Ellipse</p>
				<div style={rowStyle}>
					<Skeleton variant='ellipse' width={120} height={60} />
					<Skeleton variant='ellipse' width={200} height={80} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Theme - Light</p>
				<div
					style={{
						...rowStyle,
						background: '#f5f5f5',
						padding: '16px',
						borderRadius: '8px',
					}}>
					<Skeleton variant='text' width={300} height={16} theme='light' />
					<Skeleton variant='circle' width={48} height={48} theme='light' />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Theme — Dark</p>
				<div
					style={{
						...rowStyle,
						background: '#1a1a1a',
						padding: '16px',
						borderRadius: '8px',
					}}>
					<Skeleton variant='text' width={300} height={16} theme='dark' />
					<Skeleton variant='circle' width={48} height={48} theme='dark' />
				</div>
			</div>

			<div>
				<p style={headingStyle}>No Animation</p>
				<div style={rowStyle}>
					<Skeleton variant='text' width={300} height={16} noAnimation />
					<Skeleton variant='rounded' width={200} height={60} noAnimation />
				</div>
			</div>
		</div>
	),
};
