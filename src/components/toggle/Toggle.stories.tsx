import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../helpers';
import { ClockIcon } from '../icons';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
	title: 'Components/Toggle',
	component: Toggle,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<ThemedContainer theme='light'>{children}</ThemedContainer>
);

/* ------------------------------------------------------------------ */
/* Stories */
/* ------------------------------------------------------------------ */

export const DefaultToggle: Story = {
	name: 'Default Toggle',
	args: {
		options: [
			{ value: 'First', title: 'First' },
			{ value: 'Second', title: 'Second' },
			{ value: 'Third', title: 'Third' },
			{ value: 'Fourth', title: 'Fourthojojojjo' },
		],
		smooth: true,
		v2: true,
		theme: 'light',
	},
	render: (args) => (
		<Wrapper>
			<Toggle {...args} />
		</Wrapper>
	),
};

export const DefaultToggleSecondary: Story = {
	name: 'Default Toggle - Secondary',
	args: {
		options: [
			{ value: 'First', title: 'First' },
			{ value: 'Second', title: 'Second' },
			{ value: 'Third', title: 'Third' },
			{ value: 'Fourth', title: 'Fourthojojojjo' },
		],
		smooth: true,
		v2: true,
		secondary: true,
		theme: 'light',
	},
	render: (args) => (
		<Wrapper>
			<Toggle {...args} />
		</Wrapper>
	),
};

export const IconToggle: Story = {
	name: 'Icon Toggle',
	args: {
		name: 'ICON',
		options: [
			{ value: 'pgsql', title: <ClockIcon width='2rem' height='2rem' /> },
			{ value: 'mysql', title: <ClockIcon width='2rem' height='2rem' /> },
			{ value: 'oracle', title: <ClockIcon width='2rem' height='2rem' /> },
			{ value: 'mongodb', title: <ClockIcon width='2rem' height='2rem' /> },
			{ value: 'mssql', title: <ClockIcon width='2rem' height='2rem' /> },
		],
		v2: true,
		defaultValue: 'oracle',
		theme: 'light',
	},
	render: (args) => (
		<Wrapper>
			<Toggle {...args} />
		</Wrapper>
	),
};

export const MultiToggle: Story = {
	name: 'Multi Toggle',
	render: () => {
		const options = [
			{ value: 'pgsql', title: 'PGSQL' },
			{ value: 'mysql', title: 'MYSQL' },
			{ value: 'oracle', title: 'ORACLE' },
			{ value: 'mongodb', title: 'MONGODB' },
			{ value: 'mssql', title: 'MSSQL' },
		];

		const [selectedToggle, setSelectedToggle] = useState<string[]>([
			'oracle',
			'mysql',
			'pgsql',
		]);

		return (
			<Wrapper>
				<Toggle
					options={options}
					theme='light'
					multi
					v2
					value={selectedToggle}
					onChange={setSelectedToggle}
				/>
			</Wrapper>
		);
	},
};

export const LoadingState: Story = {
	name: 'Loading State',
	args: {
		options: [
			{ value: 'First', title: 'First' },
			{ value: 'Second', title: 'Second' },
			{ value: 'Third', title: 'Third' },
			{ value: 'Fourth', title: 'Fourth' },
		],
		loading: true,
		v2: true,
		theme: 'light',
	},
	render: (args) => (
		<Wrapper>
			<Toggle {...args} />
		</Wrapper>
	),
};
