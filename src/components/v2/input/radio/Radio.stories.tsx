import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../../helpers';
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
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
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
	color: '#666',
	paddingTop: '2px',
	fontFamily: 'Jakarta, sans-serif',
};

const InteractiveRadioStory = () => {
	const [checked, setChecked] = useState(false);
	return (
		<Radio
			label={checked ? 'Selected' : 'Unselected - Click on me'}
			checked={checked}
			onChange={() => setChecked(!checked)}
			position='left'
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
					<Radio label='Unselected' checked={false} onChange={() => {}} position='left' />
					<Radio label='Selected' checked={true} position='left' />

					<span style={labelStyle}>Focus</span>
					<Radio
						label='Unselected + Focus'
						checked={false}
						focused={true}
						onChange={() => {}}
						position='left'
					/>
					<Radio label='Selected + Focus' checked={true} focused={true} position='left' />

					<span style={labelStyle}>Read-only</span>
					<Radio label='Unselected + Read-only' readOnly={true} position='left' />
					<Radio
						label='Selected + Read-only'
						checked={true}
						readOnly={true}
						position='left'
					/>

					<span style={labelStyle}>Error</span>
					<Radio
						label='Unselected + error'
						checked={false}
						error='Error message'
						onChange={() => {}}
						position='left'
					/>
					<Radio
						label='Selected + error'
						checked={true}
						error='Error message'
						position='left'
					/>

					<span style={labelStyle}>Warning</span>
					<Radio
						label='Unselected + warning'
						checked={false}
						warning='Warning message'
						onChange={() => {}}
						position='left'
					/>
					<Radio
						label='Selected + warning'
						checked={true}
						warning='Warning message'
						position='left'
					/>

					<span style={labelStyle}>Disabled</span>
					<Radio label='Unselected + Disable' disabled={true} position='left' />
					<Radio
						label='Selected + Disable'
						checked={true}
						disabled={true}
						position='left'
					/>
				</div>
			</div>
		</div>
	),
};
