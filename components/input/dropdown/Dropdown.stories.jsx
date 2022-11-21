import React from 'react';

import Dropdown from './Dropdown';
import DropdownItem from './dropdown-item/DropdownItem';

export default {
	title: 'Components/Input/Dropdown',
	component: Dropdown,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: 'A drop-down menu is a menu that offers a list of options.',
			},
		},
	},
};

export const Default = (args) => {
	return (
		<div>
			<Dropdown {...args}>
				<DropdownItem title='Option A' value={1} />
				<DropdownItem title='Option B' value={2} />
				<DropdownItem title='Option C' value={3} />
			</Dropdown>
		</div>
	);
};

Default.args = {
	label: 'Default Dropdown',
	placeholder: 'Select an option',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};

export const MultiCheckDropdown = (args) => {
	return (
		<div>
			<Dropdown {...args}>
				<DropdownItem title='J' value={1} variant='checkbox' />
				<DropdownItem title='K' value={2} variant='checkbox' />
				<DropdownItem title='L' value={3} variant='checkbox' />
			</Dropdown>
		</div>
	);
};

MultiCheckDropdown.args = {
	label: 'Multi Select Checkbox Dropdown',
	placeholder: 'Select an option',
};

export const RadioDropdown = (args) => {
	return (
		<div>
			<Dropdown {...args}>
				<DropdownItem title='Option A' value={1} variant='radio' />
				<DropdownItem title='Option B' value={2} variant='radio' />
				<DropdownItem title='Option C' value={3} variant='radio' />
			</Dropdown>
		</div>
	);
};

RadioDropdown.args = {
	label: 'Multi Select Checkbox Dropdown',
	placeholder: 'Select an option',
};
