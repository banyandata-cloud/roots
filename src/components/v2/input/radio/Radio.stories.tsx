import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import Radio from './Radio';
import RadioDoc from './Story/RadioDoc';

const meta: Meta<typeof Radio> = {
	title: 'Components/v2/Input/Radio',
	component: Radio,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: RadioDoc,
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

type Story = StoryObj<typeof Radio>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'inherit',
	color: 'var(--color-text-secondary)',
	borderBottom: '1px solid var(--color-border-secondary)',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const gridStyle = {
	display: 'grid',
	gridTemplateColumns: '120px 1fr 1fr',
	rowGap: '32px',
	columnGap: '48px',
	alignItems: 'flex-start',
};

const labelStyle = {
	fontSize: '14px',
	fontWeight: '500' as const,
	color: 'var(--color-text-tertiary)',
	paddingTop: '2px',
	fontFamily: 'inherit',
};

const InteractiveRadioStory = () => {
	const [checked, setChecked] = useState(false);
	return (
		<Radio
			label={checked ? 'Selected' : 'Unselected - Click on me'}
			checked={checked}
			onChange={() => setChecked(!checked)}
		/>
	);
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Functionalities</p>
				<InteractiveRadioStory />
			</div>

			<div>
				<p style={headingStyle}>All States</p>
				<div style={gridStyle}>
					<span style={labelStyle}>Enable</span>
					<Radio label='Unselected' checked={false} onChange={() => {}} />
					<Radio label='Selected' checked={true} />

					<span style={labelStyle}>Focus</span>
					<span style={labelStyle}>Press Tab to focus a radio</span>
					<span />

					<span style={labelStyle}>Read-only</span>
					<Radio label='Unselected + Read-only' readOnly={true} />
					<Radio label='Selected + Read-only' checked={true} readOnly={true} />

					<span style={labelStyle}>Error</span>
					<Radio
						label='Unselected + error'
						checked={false}
						error='Error message'
						onChange={() => {}}
					/>
					<Radio label='Selected + error' checked={true} error='Error message' />

					<span style={labelStyle}>Warning</span>
					<Radio
						label='Unselected + warning'
						checked={false}
						warning='Warning message'
						onChange={() => {}}
					/>
					<Radio label='Selected + warning' checked={true} warning='Warning message' />

					<span style={labelStyle}>Disabled</span>
					<Radio label='Unselected + Disable' disabled={true} />
					<Radio label='Selected + Disable' checked={true} disabled={true} />
				</div>
			</div>
		</div>
	),
};
