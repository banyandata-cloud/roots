import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../../helpers';
import ToggleDoc from './Story/ToggleDoc';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
	title: 'Components/v2/Input/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: ToggleDoc,
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

type Story = StoryObj<typeof Toggle>;

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
	flexDirection: 'row' as const,
	gap: '64px',
	alignItems: 'center',
	flexWrap: 'nowrap' as const,
};

export const AllVariants: Story = {
	name: 'All Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Default Sizes</p>
				<div style={rowStyle}>
					<Toggle label='Size S' />
					<Toggle label='Size L' size='l' />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Default Checked</p>
				<div style={rowStyle}>
					<Toggle label='Toggle' size='l' defaultChecked={true} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Disabled State</p>
				<div style={rowStyle}>
					<Toggle label='Disabled' disabled={true} size='l' />
					<Toggle label='Checked' disabled={true} size='l' defaultChecked={true} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>Readonly State</p>
				<div style={rowStyle}>
					<Toggle label='Readonly' readonly={true} size='l' />
					<Toggle label='Checked' readonly={true} size='l' defaultChecked={true} />
				</div>
			</div>
		</div>
	),
};
