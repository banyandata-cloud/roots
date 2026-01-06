import type { Meta, StoryObj } from '@storybook/react';
import { epochToFormattedDate } from '../../utils';
import DisplayPicture from '../displayPicture/DisplayPicture';
import { ThemedContainer } from '../helpers';
import Text from '../text/Text';
import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
	title: 'Components/Stepper',
	component: Stepper,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/* -----------------------------
 * Shared wrapper
 * ---------------------------- */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemedContainer theme='light'>{children}</ThemedContainer>
);

/* -----------------------------
 * Default
 * ---------------------------- */
export const Default: Story = {
	args: {
		steps: [
			{ title: 'Step A', description: null, active: false, completion: 1, error: false },
			{
				title: 'Step B',
				description: 'Some Description',
				active: true,
				completion: 0.75,
				error: false,
			},
			{ title: 'Step C', description: null, active: true, completion: 0, error: false },
			{
				title: 'This step has a very very long title',
				description: null,
				active: false,
				completion: 0,
				error: true,
			},
			{
				title: 'Step E',
				description:
					'Just another description which is a very very very long text to show the component in a situtation where the text is just too much!',
				active: false,
				completion: 0,
				error: false,
			},
		],
	},
	render: (args) => (
		<Wrapper>
			<Stepper {...args} />
		</Wrapper>
	),
};

/* -----------------------------
 * Vertical
 * ---------------------------- */
export const Vertical: Story = {
	args: {
		...Default.args,
		orientation: 'vertical',
	},
	render: Default.render,
};

/* -----------------------------
 * Active
 * ---------------------------- */
export const Active: Story = {
	args: {
		steps: [
			{ title: 'Step A', description: null, active: true, completion: 0, error: false },
			{
				title: 'Step B',
				description: 'With Description',
				active: true,
				completion: 0,
				error: false,
			},
		],
	},
	render: Default.render,
};

/* -----------------------------
 * Completed
 * ---------------------------- */
export const Completed: Story = {
	args: {
		steps: [
			{ title: 'Step A', description: null, active: false, completion: 1, error: false },
			{
				title: 'Step B',
				description: 'With Description',
				active: false,
				completion: 1,
				error: false,
			},
		],
	},
	render: Default.render,
};

/* -----------------------------
 * Error
 * ---------------------------- */
export const Error: Story = {
	args: {
		steps: [
			{ title: 'Step A', description: null, active: true, completion: 0, error: true },
			{
				title: 'Step B',
				description: 'With Description',
				active: true,
				completion: 0,
				error: true,
			},
		],
	},
	render: Default.render,
};

/* -----------------------------
 * Custom
 * ---------------------------- */
export const Custom: Story = {
	render: () => {
		const COMMENTS = [
			{ user: 'Alok', comment: null, timestamp: Date.now() },
			{
				user: 'Jaidev',
				comment: 'Hi Team, I am working on this ticket, will be back with the update.',
				timestamp: Date.now(),
			},
			{
				user: 'Pradeep',
				comment: 'Schema creation request processed successfully. Attaching document.',
				timestamp: Date.now(),
			},
		];

		return (
			<Wrapper>
				<Stepper
					orientation='vertical'
					steps={COMMENTS.map((comment) => ({
						title: comment.user,
						renderIcon: () => <DisplayPicture name={comment.user} />,
						renderTitle: () => (
							<Text>
								{comment.user} – {epochToFormattedDate(comment.timestamp, 'date')}
							</Text>
						),
						renderDescription: () => <Text>{comment.comment}</Text>,
					}))}
				/>
			</Wrapper>
		);
	},
};

/* -----------------------------
 * Disabled
 * ---------------------------- */
export const Disabled: Story = {
	args: {
		steps: [
			{ title: 'Step A', description: null, active: false, completion: 0, error: false },
			{
				title: 'Step B',
				description: 'With Description',
				active: false,
				completion: 0,
				error: false,
			},
		],
	},
	render: Default.render,
};
