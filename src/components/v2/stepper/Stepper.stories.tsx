import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import StepperDoc from '../stepper/Story/StepperDocs';
import Stepper from './Stepper';
import StepperInteractive from './StepperInteractive';
import type { Step } from './types';

const meta: Meta<typeof Stepper> = {
	title: 'Components/v2/Stepper',
	component: Stepper,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: StepperDoc,
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

type Story = StoryObj<typeof Stepper>;

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

/**
 * Mock Data
 */
const horizontalIconSteps: Step[] = [
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'completed',
	},
	{ label: 'Your details', description: 'Please provide your name and email', status: 'current' },
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'incomplete',
	},
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'incomplete',
	},
];

const horizontalNumberSteps: Step[] = [
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'completed',
		step: 1,
	},
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'current',
		step: 2,
	},
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'incomplete',
		step: 3,
	},
	{
		label: 'Your details',
		description: 'Please provide your name and email',
		status: 'incomplete',
		step: 4,
	},
];

const verticalSteps = (status: 'incomplete' | 'current' | 'completed'): Step[] => [
	{ label: 'Your details', description: 'Please provide your name and email', status },
];

const verticalNumberSteps = (status: 'incomplete' | 'current' | 'completed'): Step[] => [
	{ label: 'Your details', description: 'Please provide your name and email', status, step: 1 },
];

/**
 * Stories
 */
export const SmallSize: Story = {
	name: 'SM - Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Icon - Horizontal (SM)</p>
				<Stepper
					size='sm'
					variant='icon'
					orientation='horizontal'
					steps={horizontalIconSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Number - Horizontal (SM)</p>
				<Stepper
					size='sm'
					variant='noIcon'
					orientation='horizontal'
					steps={horizontalNumberSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Progress Bar - Horizontal (SM)</p>
				<Stepper
					size='sm'
					variant='progressBar'
					orientation='horizontal'
					steps={horizontalIconSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Icon - Vertical (SM Variants)</p>
				<div style={{ display: 'flex', gap: '40px' }}>
					<Stepper
						size='sm'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('incomplete')}
					/>
					<Stepper
						size='sm'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('current')}
					/>
					<Stepper
						size='sm'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('completed')}
					/>
				</div>
			</div>
			<div>
				<p style={headingStyle}>Number - Vertical (SM Variants)</p>
				<div style={{ display: 'flex', gap: '40px' }}>
					<Stepper
						size='sm'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('incomplete')}
					/>
					<Stepper
						size='sm'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('current')}
					/>
					<Stepper
						size='sm'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('completed')}
					/>
				</div>
			</div>
		</div>
	),
};

export const MediumSize: Story = {
	name: 'MD - Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Icon - Horizontal (MD)</p>
				<Stepper
					size='md'
					variant='icon'
					orientation='horizontal'
					steps={horizontalIconSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Number - Horizontal (MD)</p>
				<Stepper
					size='md'
					variant='noIcon'
					orientation='horizontal'
					steps={horizontalNumberSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Progress Bar - Horizontal (MD)</p>
				<Stepper
					size='md'
					variant='progressBar'
					orientation='horizontal'
					steps={horizontalIconSteps}
				/>
			</div>
			<div>
				<p style={headingStyle}>Icon - Vertical (MD Variants)</p>
				<div style={{ display: 'flex', gap: '40px' }}>
					<Stepper
						size='md'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('incomplete')}
					/>
					<Stepper
						size='md'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('current')}
					/>
					<Stepper
						size='md'
						variant='icon'
						orientation='vertical'
						steps={verticalSteps('completed')}
					/>
				</div>
			</div>
			<div>
				<p style={headingStyle}>Number - Vertical (MD Variants)</p>
				<div style={{ display: 'flex', gap: '40px' }}>
					<Stepper
						size='md'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('incomplete')}
					/>
					<Stepper
						size='md'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('current')}
					/>
					<Stepper
						size='md'
						variant='noIcon'
						orientation='vertical'
						steps={verticalNumberSteps('completed')}
					/>
				</div>
			</div>
		</div>
	),
};

export const Interactive: StoryObj<typeof StepperInteractive> = {
	name: 'Interactive Examples',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Interactive - Icon (SM)</p>
				<StepperInteractive
					size='sm'
					variant='icon'
					orientation='horizontal'
					steps={horizontalIconSteps.map((s, i) =>
						i === 0 ? { ...s, status: 'current' } : { ...s, status: 'incomplete' }
					)}
				/>
			</div>
			<div>
				<p style={headingStyle}>Interactive - Number (SM)</p>
				<StepperInteractive
					size='sm'
					variant='noIcon'
					orientation='horizontal'
					steps={horizontalNumberSteps.map((s, i) =>
						i === 0 ? { ...s, status: 'current' } : { ...s, status: 'incomplete' }
					)}
				/>
			</div>
			<div>
				<p style={headingStyle}>Interactive - Progress Bar (SM)</p>
				<StepperInteractive
					size='sm'
					variant='progressBar'
					orientation='horizontal'
					steps={horizontalIconSteps.map((s, i) =>
						i === 0 ? { ...s, status: 'current' } : { ...s, status: 'incomplete' }
					)}
				/>
			</div>
		</div>
	),
};
