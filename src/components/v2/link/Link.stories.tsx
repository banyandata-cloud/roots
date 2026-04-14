import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { Link } from './index';
import LinkDoc from './Story/LinkDoc';

const meta: Meta<typeof Link> = {
	title: 'Components/v2/Link',
	component: Link,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: LinkDoc,
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

type Story = StoryObj<typeof Link>;

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
	gap: '48px',
	alignItems: 'center',
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Default Link</p>
				<div style={rowStyle}>
					<Link href='https://www.example.com' target='_self'>
						Default Link
					</Link>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Sizes</p>
				<div style={rowStyle}>
					<Link href='https://www.example.com' size='sm'>
						Small Link
					</Link>
					<Link href='https://www.example.com' size='md'>
						Medium Link
					</Link>
					<Link href='https://www.example.com' size='lg'>
						Large Link
					</Link>
				</div>
			</div>

			<div>
				<p style={headingStyle}>With Icons</p>
				<div style={rowStyle}>
					<Link href='https://www.example.com' target='_self' withIcon>
						Link with Icon
					</Link>
					<Link href='https://www.example.com' target='_self' size='lg' withIcon>
						Large Link with Icon
					</Link>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Disabled State</p>
				<div style={rowStyle}>
					<Link href='https://www.example.com' disabled>
						Disabled Link
					</Link>
					<Link href='https://www.example.com' disabled withIcon>
						Disabled Link with Icon
					</Link>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Target Variants</p>
				<div style={rowStyle}>
					<Link href='https://www.example.com' target='_self'>
						Open in Same Tab (_self)
					</Link>
					<Link href='https://www.example.com' target='_blank'>
						Open in New Tab (_blank)
					</Link>
				</div>
			</div>
		</div>
	),
};
