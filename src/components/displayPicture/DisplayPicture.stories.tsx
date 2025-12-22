import type { Meta, StoryObj } from '@storybook/react';
import DisplayPicture from './DisplayPicture';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof DisplayPicture> = {
	title: 'Components/DisplayPicture',
	component: DisplayPicture,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof DisplayPicture>;

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_PROPS = {
	name: 'Pradeep',
	url: 'https://m.media-amazon.com/images/M/MV5BYjg0MjA4OGEtMTc1ZS00ZmJhLTgyYjItMTY4YjI0NjVjNjllXkEyXkFqcGc@._V1_.jpg',
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const SmallDp: Story = {
	name: 'Small Dp',
	args: {
		...DEFAULT_PROPS,
		size: 'sm',
	},
	render: (args) => (
		<div>
			<DisplayPicture {...args} />
		</div>
	),
};

export const MediumDp: Story = {
	name: 'Medium Dp',
	args: {
		...DEFAULT_PROPS,
		size: 'md',
	},
	render: (args) => (
		<div>
			<DisplayPicture {...args} />
		</div>
	),
};
