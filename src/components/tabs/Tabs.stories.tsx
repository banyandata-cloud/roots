import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ThemedContainer } from '../helpers';
import { CaretIcon, HomeIcon } from '../icons';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/* ---------------------------------- */
/* Base render with internal state     */
/* ---------------------------------- */

const TabsWithState = (args: any) => {
	const [selectedTab, setSelectedTab] = useState('');

	return (
		<ThemedContainer {...args}>
			<Tabs {...args} selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
				<div style={{ fontSize: '0.875rem' }}>You have selected {selectedTab}</div>
				<div style={{ fontSize: '0.875rem' }}>You have selected {selectedTab}</div>
				<div style={{ fontSize: '0.875rem' }}>You have selected {selectedTab}</div>
			</Tabs>
		</ThemedContainer>
	);
};

/* ---------------------------------- */
/* Stories                             */
/* ---------------------------------- */

export const Default: Story = {
	args: {
		tabs: [
			{ id: '1', title: 'Space Patrol' },
			{ id: '2', title: 'Mystic Force' },
		],
		theme: 'light',
	},
	render: TabsWithState,
};

export const Vertical: Story = {
	args: {
		tabs: [
			{ id: '1', leftIcon: HomeIcon },
			{ id: '2', leftIcon: HomeIcon },
		],
		theme: 'light',
		direction: 'vertical',
	},
	render: TabsWithState,
};

export const WithOnlyLeftIcon: Story = {
	args: {
		tabs: [
			{
				id: '1',
				title: 'Tab1',
				leftIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '2',
				title: 'Tab2',
				leftIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '3',
				title: 'Tab3',
				leftIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '4',
				title: 'Tab4',
				leftIcon: (props: any) => <CaretIcon {...props} />,
			},
		],
		theme: 'light',
	},
	render: TabsWithState,
};

export const WithRightIcon: Story = {
	args: {
		tabs: [
			{
				id: '1',
				title: 'Tab1',
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '2',
				title: 'Tab2',
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '3',
				title: 'Tab3',
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '4',
				title: 'Tab4',
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
		],
		theme: 'light',
	},
	render: TabsWithState,
};

export const WithBothSideIcon: Story = {
	args: {
		tabs: [
			{
				id: '1',
				title: 'Tab1',
				leftIcon: (props: any) => <CaretIcon {...props} />,
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '2',
				title: 'Tab2',
				leftIcon: (props: any) => <CaretIcon {...props} />,
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '3',
				title: 'Tab3',
				leftIcon: (props: any) => <CaretIcon {...props} />,
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
			{
				id: '4',
				title: 'Tab4',
				leftIcon: (props: any) => <CaretIcon {...props} />,
				rightIcon: (props: any) => <CaretIcon {...props} />,
			},
		],
		theme: 'light',
	},
	render: TabsWithState,
};

export const WithDropdownItems: Story = {
	args: {
		tabs: [
			{ id: '1', title: 'Tab1' },
			{ id: '2', title: 'Tab2' },
			{ id: '3', title: 'Tab3' },
			{
				id: '4',
				title: 'Options',
				dropdown: true,
				dropdownItems: [
					{ id: '4', title: 'Option 1 Big Title' },
					{ id: '5', title: 'Option 2' },
					{ id: '6', title: 'Option 3' },
				],
			},
		],
		theme: 'light',
	},
	render: TabsWithState,
};
