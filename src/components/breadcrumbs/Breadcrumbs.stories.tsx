import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import { ServerIcon } from '../icons';
import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Components/Breadcrumbs',
	component: Breadcrumbs,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

// --------------------------------------------------
// Shared wrapper
// --------------------------------------------------
const withTheme = (StoryFn: any) => (
	<ThemedContainer theme='light'>
		<StoryFn />
	</ThemedContainer>
);

// --------------------------------------------------
// Default Breadcrumbs
// --------------------------------------------------
export const DefaultBreadcrumbs: Story = {
	args: {
		theme: 'light',
		homeTitle: 'Title of the Home',
		crumbs: [
			{
				title: 'section-1',
				value: 'test',
				path: 'section-1',
				icon: null,
			},
			{
				title: 'section-2',
				value: 'test2',
				path: 'section-2',
				icon: null,
			},
		],
	},
	decorators: [withTheme],
};

// --------------------------------------------------
// Collapsed Breadcrumbs
// --------------------------------------------------
export const CollapsedBreadcrumbs: Story = {
	args: {
		theme: 'light',
		homeTitle: 'Title of the Home',
		crumbs: [
			{ title: 'section-1', value: 'test', path: 'section-1', icon: null },
			{ title: 'section-2', value: 'test', path: 'section-2', icon: null },
			{ title: 'section-3', value: 'test', path: 'section-3', icon: null },
			{
				title: 'section-4',
				value: 'test',
				path: 'section-4',
				navigate: () => console.log('CLICKED NOW 4'),
				icon: null,
			},
			{
				title: 'section-5',
				value: 'test',
				isDisabled: true,
				path: 'section-5',
				navigate: () => console.log('CLICKED NOW 5'),
				icon: null,
			},
			{ title: 'final-section', value: 'test', path: 'final-section', icon: null },
		],
	},
	decorators: [withTheme],
};

// --------------------------------------------------
// Breadcrumbs with Icon
// --------------------------------------------------
export const BreadcrumbsWithIcon: Story = {
	args: {
		theme: 'light',
		homeTitle: 'Title of the Home',
		crumbs: [
			{
				title: 'section-1',
				value: 'test',
				path: 'section-1',
				icon: <ServerIcon />,
			},
			{
				title: 'section-2',
				value: 'test',
				path: 'section-2',
				icon: <ServerIcon />,
			},
			{
				title: 'section-3',
				value: 'test',
				path: 'section-3',
				icon: <ServerIcon />,
			},
		],
	},
	decorators: [withTheme],
};
