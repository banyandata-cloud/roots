import React from 'react';

import Stepper from './Stepper';

export default {
	title: 'ComponentsV2/Stepper',
	component: Stepper,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: `The stepper is used to indicate the current 
                step in a multiple-step process. It will be mostly used in 
                forms where we will try to break down the form into multiple parts 
                to reduce the cognitive load of the user. `,
			},
		},
	},
};

const Template = (args) => {
	return (
		<div>
			<Stepper {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: false,
			completion: 1,
			error: false,
		},
		{
			title: 'Step B',
			description: 'Some Description',
			active: true,
			completion: 0.75,
			error: false,
		},
		{
			title: 'Step C',
			description: null,
			active: true,
			completion: 0,
			error: false,
		},
		{
			title: 'This step has a very very long title',
			description: null,
			active: false,
			completion: 0,
			error: true,
		},
		{
			title: 'Step E',
			description: 'Just another description',
			active: false,
			completion: 0,
			error: false,
		},
	],
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=266%3A49880',
	},
};

export const Active = Template.bind({});

Active.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: true,
			completion: 0,
			error: false,
		},
		{
			title: 'Step A',
			description: 'With Description',
			active: true,
			completion: 0,
			error: false,
		},
	],
};

export const Completed = Template.bind({});

Completed.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: false,
			completion: 1,
			error: false,
		},
		{
			title: 'Step A',
			description: 'With Description',
			active: false,
			completion: 1,
			error: false,
		},
	],
};

export const Incomplete = Template.bind({});

Incomplete.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: true,
			completion: 0.5,
			error: false,
		},
		{
			title: 'Step A',
			description: 'With Description',
			active: true,
			completion: 0.75,
			error: false,
		},
	],
};

export const Disabled = Template.bind({});

Disabled.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: false,
			completion: 0,
			error: false,
		},
		{
			title: 'Step A',
			description: 'With Description',
			active: false,
			completion: 0,
			error: false,
		},
	],
};

export const Error = Template.bind({});

Error.args = {
	steps: [
		{
			title: 'Step A',
			description: null,
			active: true,
			completion: 0,
			error: true,
		},
		{
			title: 'Step A',
			description: 'With Description',
			active: true,
			completion: 0,
			error: true,
		},
	],
};
