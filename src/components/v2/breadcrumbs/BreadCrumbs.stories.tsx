import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import Breadcrumbs from './Breadcrumbs';
import InteractiveBreadcrumbs from './InteractiveBreadcrumbs';
import BreadcrumbDoc from './Story/BreadcrumbDoc';
import type { BreadcrumbItem } from './types';

const defaultCrumbs: BreadcrumbItem[] = [
	{
		id: 'home',
		label: 'Home',
		onClick: () => console.log('Home clicked'),
	},
	{
		id: 'projects',
		label: 'Projects',
		onClick: () => console.log('Projects clicked'),
		dropdownOptions: [
			{ label: 'Option 1', value: 'option-1', onClick: () => console.log('Option 1') },
			{ label: 'Option 2', value: 'option-2', onClick: () => console.log('Option 2') },
			{ label: 'Option 3', value: 'option-3', onClick: () => console.log('Option 3') },
		],
	},
	{
		id: 'ellipsis',
		label: '...',
		dropdownOptions: [
			{ label: 'Option 1', value: 'option-1', onClick: () => console.log('Option 1') },
			{ label: 'Option 2', value: 'option-2', onClick: () => console.log('Option 2') },
			{ label: 'Option 3', value: 'option-3', onClick: () => console.log('Option 3') },
		],
	},
	{
		id: 'current',
		label: 'Projects',
		onClick: () => console.log('Current clicked'),
	},
];

const SectionHeading = ({ label }: { label: string }) => (
	<p style={{ fontSize: '13px', fontWeight: 600, color: '#444', margin: '0 0 12px 0' }}>
		{label}
	</p>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
		<span style={{ width: '160px', fontSize: '12px', color: '#888', flexShrink: 0 }}>
			{label}
		</span>
		<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>{children}</div>
	</div>
);

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

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Components/v2/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		options: { showToolbar: true },
		docs: {
			page: BreadcrumbDoc,
		},
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

type Story = StoryObj<typeof Breadcrumbs>;

export const Text: Story = {
	name: 'Text',
	render: () => (
		<div style={{ padding: '16px' }}>
			<SectionHeading label='Text' />
			<Row label='Chevron'>
				<Breadcrumbs type='text' separator='chevron' crumbs={defaultCrumbs} />
			</Row>
			<Row label='Slash'>
				<Breadcrumbs type='text' separator='slash' crumbs={defaultCrumbs} />
			</Row>

			<div style={{ marginTop: '32px' }}>
				<SectionHeading label='Text With Line' />
				<Row label='Chevron'>
					<Breadcrumbs type='text-with-line' separator='chevron' crumbs={defaultCrumbs} />
				</Row>
				<Row label='Slash'>
					<Breadcrumbs type='text-with-line' separator='slash' crumbs={defaultCrumbs} />
				</Row>
			</div>
		</div>
	),
};

export const ButtonVariant: Story = {
	name: 'Button',
	render: () => (
		<div style={{ padding: '16px' }}>
			<SectionHeading label='Button' />
			<Row label='Chevron'>
				<Breadcrumbs type='button' separator='chevron' crumbs={defaultCrumbs} />
			</Row>
			<Row label='Slash'>
				<Breadcrumbs type='button' separator='slash' crumbs={defaultCrumbs} />
			</Row>
		</div>
	),
};

export const Interactive: StoryObj<typeof InteractiveBreadcrumbs> = {
	name: 'Interactive Examples',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Interactive - Text</p>
				<InteractiveBreadcrumbs type='text' />
			</div>
			<div>
				<p style={headingStyle}>Interactive - Text With Line</p>
				<InteractiveBreadcrumbs type='text-with-line' />
			</div>
			<div>
				<p style={headingStyle}>Interactive - Button</p>
				<InteractiveBreadcrumbs type='button' />
			</div>
		</div>
	),
};
