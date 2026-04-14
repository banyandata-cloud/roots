import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import { Checkbox } from './index';
import CheckboxDoc from './Story/CheckboxDoc';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/v2/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: CheckboxDoc,
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

type Story = StoryObj<typeof Checkbox>;

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
	fontFamily: 'Jakarta, sans-serif',
	color: '#666',
	paddingTop: '2px',
};

const InteractiveCheckboxStory = () => {
	const [checked, setChecked] = useState(false);
	return (
		<Checkbox
			label={checked ? 'Checked - Click on me' : 'Unchecked - Click on me'}
			checked={checked}
			onChange={(e) => setChecked(e.target.checked)}
		/>
	);
};

const IndeterminateCheckboxStory = () => {
	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(true);
	return (
		<Checkbox
			label='Indeterminate - Click on me'
			checked={checked}
			indeterminate={indeterminate}
			onChange={(e) => {
				setChecked(e.target.checked);
				setIndeterminate(false);
			}}
		/>
	);
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Functionalities</p>
				<InteractiveCheckboxStory />
			</div>

			<div>
				<p style={headingStyle}>Indeterminate State</p>
				<IndeterminateCheckboxStory />
			</div>

			<div>
				<p style={headingStyle}>All States</p>
				<div style={gridStyle}>
					<span style={labelStyle}>Default</span>
					<Checkbox label='Unchecked' checked={false} onChange={() => {}} />
					<Checkbox label='Checked' checked={true} onChange={() => {}} />

					<span style={labelStyle}>Read-only</span>
					<Checkbox label='Unchecked' checked={false} readOnly />
					<Checkbox label='Checked' checked={true} readOnly />

					<span style={labelStyle}>Disabled</span>
					<Checkbox label='Unchecked' checked={false} disabled />
					<Checkbox label='Checked' checked={true} disabled />

					<span style={labelStyle}>Error</span>
					<Checkbox
						label='Unchecked'
						checked={false}
						error
						errorMessage='Error message'
						onChange={() => {}}
					/>
					<Checkbox
						label='Checked'
						checked={true}
						error
						errorMessage='Error message'
						onChange={() => {}}
					/>

					<span style={labelStyle}>Warning</span>
					<Checkbox
						label='Unchecked'
						checked={false}
						warning
						errorMessage='Warning message'
						onChange={() => {}}
					/>
					<Checkbox
						label='Checked'
						checked={true}
						warning
						errorMessage='Warning message'
						onChange={() => {}}
					/>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Sizes</p>
				<div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
					<Checkbox label='Small' size='sm' checked={true} onChange={() => {}} />
					<Checkbox label='Medium' size='md' checked={true} onChange={() => {}} />
					<Checkbox label='Large' size='lg' checked={true} onChange={() => {}} />
					<Checkbox label='X-Large' size='xlg' checked={true} onChange={() => {}} />
				</div>
			</div>

			<div>
				<p style={headingStyle}>With Sub Label</p>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<Checkbox
						label='Main Label'
						subLabel='This is a sub label'
						checked={false}
						onChange={() => {}}
					/>
					<Checkbox
						label='Main Label'
						subLabel='This is a sub label'
						checked={true}
						onChange={() => {}}
					/>
				</div>
			</div>
		</div>
	),
};
