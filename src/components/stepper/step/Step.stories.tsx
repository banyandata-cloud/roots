import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import Step from './Step';

const meta: Meta<typeof Step> = {
	title: 'Components/Stepper/Step',
	component: Step,
	parameters: {
		options: {
			showToolbar: true,
		},
		docs: {
			description: {
				component: `
The **Step** component is used within the **Stepper** component to represent
an individual step within a linear sequence.

It supports:
- Active and completed states
- Error indication
- Custom icons, titles, and descriptions
- Horizontal and vertical orientations
`,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Step>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
	args: {
		title: null,
		description: null,
		active: false,
		completion: 1,
		error: false,
		index: 0,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Step {...args} />
		</ThemedContainer>
	),
};
