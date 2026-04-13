import type { Meta, StoryObj } from '@storybook/react';
import InlineLoaderDoc from '../inlineLoader/Story/InlineLoaderDoc';
import { InlineLoader } from './InlineLoader';

const meta: Meta<typeof InlineLoader> = {
	title: 'Components/v2/InlineLoader',
	component: InlineLoader,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: true },
		docs: {
			page: InlineLoaderDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof InlineLoader>;

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
	background: '#f9f9f9',
	borderRadius: '4px',
};

const headingStyle: React.CSSProperties = {
	fontSize: '14px',
	fontWeight: 600,
	color: '#333',
	margin: '0 0 4px 0',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
};

const sectionStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
};

export const Variants: Story = {
	name: 'Variants',
	render: () => (
		<div style={wrapperStyle}>
			{/* Loading */}
			<div style={sectionStyle}>
				<p style={headingStyle}>Loading</p>
				<InlineLoader status='loading' />
				<InlineLoader status='loading' text='Logging' />
			</div>

			{/* Success */}
			<div style={sectionStyle}>
				<p style={headingStyle}>Success</p>
				<InlineLoader status='success' />
				<InlineLoader status='success' text='Finished' />
			</div>

			{/* Error */}
			<div style={sectionStyle}>
				<p style={headingStyle}>Error</p>
				<InlineLoader status='error' />
				<InlineLoader status='error' text='Error' />
			</div>
		</div>
	),
};
