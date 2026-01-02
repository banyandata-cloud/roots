import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import HierarchyItem from './HierarchyItem';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof HierarchyItem> = {
	title: 'Components/Hierarchy/Item',
	component: HierarchyItem,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof HierarchyItem>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const DefaultHierarchyItem: Story = {
	name: 'Default Hierarchy Item',
	args: {
		title: 'Click to Expand',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<HierarchyItem {...args} />
		</ThemedContainer>
	),
};
