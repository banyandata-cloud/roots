import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ThemedContainer } from '../../helpers';
import Dropdown from './Dropdown';
import DropdownItem from './dropdown-item/DropdownItem';

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Input/Dropdown',
	component: Dropdown,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

/* ------------------------------------------------------------------ */
/* Default – Uncontrolled */
/* ------------------------------------------------------------------ */
export const DefaultUncontrolled: Story = {
	args: {
		label: 'Default Dropdown',
		placeholder: 'Select an option',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Dropdown {...args}>
				<DropdownItem title='Option A' value={1} />
				<DropdownItem title='Option B' value={2} />
				<DropdownItem title='Option C' value={3} />
			</Dropdown>
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Default – Controlled */
/* ------------------------------------------------------------------ */
export const DefaultControlled: Story = {
	render: () => {
		const [value, setValue] = useState<number[]>([]);

		return (
			<ThemedContainer theme='light'>
				<Dropdown
					value={value}
					label='Default Dropdown With State'
					placeholder='Select an option'
					highlightOnSelect
					onChange={(_, newValue) => {
						setValue(newValue);
					}}>
					<DropdownItem title='Option A' value={1} />
					<DropdownItem title='Option B' value={2} />
					<DropdownItem title='Option C' value={3} />
				</Dropdown>
			</ThemedContainer>
		);
	},
};

/* ------------------------------------------------------------------ */
/* Multi Select – Controlled */
/* ------------------------------------------------------------------ */
export const MultiSelectControlled: Story = {
	render: () => {
		const [value, setValue] = useState<number[]>([]);
		const [searchValue, setSearchValue] = useState('');
		const options = [...Array(50).keys()];

		const filteredOptions = options.filter((option) => option.toString().includes(searchValue));

		return (
			<ThemedContainer theme='light'>
				<Dropdown
					multi
					value={value}
					label='Multi Select Checkbox Dropdown'
					placeholder='Select an option'
					search={{
						placeholder: 'Search Something',
						value: searchValue,
						onChange: setSearchValue,
					}}
					onChange={(_, newValue) => {
						setValue(newValue);
					}}>
					{filteredOptions.map((option) => (
						<DropdownItem
							key={option}
							title={`Option ${option + 1}`}
							value={option + 1}
							variant='checkbox'
						/>
					))}
				</Dropdown>
			</ThemedContainer>
		);
	},
};

/* ------------------------------------------------------------------ */
/* Multi Select – Uncontrolled */
/* ------------------------------------------------------------------ */
export const MultiSelectUncontrolled: Story = {
	render: () => (
		<ThemedContainer theme='light'>
			<Dropdown
				multi
				label='Uncontrolled Multi Select Checkbox Dropdown'
				placeholder='Select an option'>
				{[...Array(20).keys()].map((option) => (
					<DropdownItem
						key={option}
						title={`Option ${option + 1}`}
						value={option + 1}
						variant='checkbox'
					/>
				))}
			</Dropdown>
		</ThemedContainer>
	),
};
