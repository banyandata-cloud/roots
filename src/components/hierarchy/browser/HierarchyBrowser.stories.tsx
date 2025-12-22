import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { SortIcon } from '../../icons/Sort';
import HierarchyBrowser from './HierarchyBrowser';

const meta: Meta<typeof HierarchyBrowser> = {
	title: 'Components/Hierarchy/Browser',
	component: HierarchyBrowser,

	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],

	parameters: {
		options: { showToolbar: true },

		docs: {
			description: {
				component: `
A versatile component designed to display hierarchical data structures in a
browser-like interface. It allows users to navigate and interact with nested
hierarchical items efficiently.
        `,
			},
		},
	},

	argTypes: {
		className: {
			description: 'Additional CSS class names for the component',
			control: 'text',
		},
		metadata: {
			description: 'Hierarchical data to be displayed',
			control: false,
		},
		onItemClick: {
			description: 'Callback triggered when an item is clicked',
			action: 'itemClicked',
		},
		onItemDoubleClick: {
			description: 'Callback triggered when an item is double-clicked',
			action: 'itemDoubleClicked',
		},
		borderSize: {
			description: 'Border thickness of the hierarchy browser',
			control: { type: 'number' },
			defaultValue: 4,
		},
		minWidth: {
			description: 'Minimum width of the browser',
			control: { type: 'number' },
			defaultValue: 220,
		},
		maxWidth: {
			description: 'Maximum width of the browser',
			control: { type: 'number' },
		},
		resizable: {
			description: 'Enable resizing of the browser',
			control: 'boolean',
			defaultValue: false,
		},
		title: {
			description: 'Title displayed at the top of the browser',
			control: 'text',
			defaultValue: 'Browser',
		},
	},
};

export default meta;
type Story = StoryObj<typeof HierarchyBrowser>;

export const Default: Story = {
	args: {
		defaultOpenLevel: 1,

		setItemProps: (data) => ({
			title: data.title,
			count: data.count,
			leftComponent: <SortIcon />,
			rightComponent: data.count,
		}),

		metadata: [
			{
				id: 'instance',
				title: 'bdopcfl',
				list: [
					{
						id: 'databaseList',
						title: 'Database',
						count: 5,
						list: [
							{
								id: 'database',
								title: 'APITST',
								list: [
									{
										id: 'schemasList',
										title: 'Schemas',
										count: 1,
										list: [
											{
												id: 'schema',
												title: 'public',
												list: [
													{
														id: 'object_type',
														title: 'Tables',
														count: 11,
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
};
