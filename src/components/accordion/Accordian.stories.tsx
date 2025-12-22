import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Accordion from './Accordion';
import ThemedContainer from '../helpers/themedContainer/ThemedContainer';
import { PlusIcon } from '../icons';

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		options: { showToolbar: true },
	},
};
export default meta;

type Story = StoryObj<typeof Accordion>;

/* ---------------- Default ---------------- */

export const Default: Story = {
	args: {
		title: 'Click to Expand',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		defaultOpen: false,
	},
	render: (args) => (
		<ThemedContainer>
			{[...Array(4).keys()].map((key) => (
				<Accordion key={key} {...args} />
			))}
		</ThemedContainer>
	),
};

/* ---------------- Nested ---------------- */

export const Nested: Story = {
	render: () => (
		<ThemedContainer>
			<Accordion title='Parent' description='This is the parent description'>
				<Accordion title='Child' description='This is the child description' />
			</Accordion>
		</ThemedContainer>
	),
};

/* ---------------- Custom Icon ---------------- */

export const CustomIcon: Story = {
	args: {
		title: 'Click to Expand',
		description: 'Accordion with custom icons',
		leftComponent: PlusIcon,
		rightComponent: PlusIcon,
	},
	render: (args) => (
		<ThemedContainer>
			<Accordion {...args} />
		</ThemedContainer>
	),
};

/* ---------------- Controlled ---------------- */

export const Controlled: Story = {
	render: () => {
		const [open, setOpen] = useState<number | null>(null);

		return (
			<ThemedContainer>
				{[...Array(4).keys()].map((key) => (
					<Accordion
						key={key}
						open={key === open}
						onToggle={(active) => setOpen(active ? null : key)}
						title={`Item ${key + 1}`}
						description={`This is the description for Item ${key + 1}`}
					/>
				))}
			</ThemedContainer>
		);
	},
};

/* ---------------- Loading ---------------- */

export const Loading: Story = {
	args: {
		title: 'Loading Accordion',
		description: 'This accordion is loading',
		loading: true,
	},
	render: (args) => (
		<ThemedContainer>
			<Accordion {...args} />
		</ThemedContainer>
	),
};
