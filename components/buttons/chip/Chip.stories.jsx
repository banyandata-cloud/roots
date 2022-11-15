import React from 'react';
import { ArrowIcon, CalenderIcon, CopyIcon } from '../../icons';
import Chip from './Chip';

export default {
	title: 'Components/Buttons/Chip',
	component: Chip,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	return (
		<div>
			<Chip {...args} />
		</div>
	);
};

export const Filled = Template.bind({});

Filled.args = {
	title: 'Chip Name w/ Long Text',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'primary',
};

Filled.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <CopyIcon width='1.5rem' />;
	},
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
	...Filled.args,
	rightComponent: () => {
		return <CopyIcon width='1.5rem' />;
	},
};

export const WithBothSideIcon = Template.bind({});
WithBothSideIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <CalenderIcon height='24' width='24' color='#ffffff' />;
	},
	rightComponent: () => {
		return <ArrowIcon active height='12' width='12' color='#ffffff' />;
	},
};

export const WithOnlyIcon = Template.bind({});
WithOnlyIcon.args = {
	...Filled.args,
	leftComponent: () => {
		return <CalenderIcon height='24' width='24' color='#ffffff' />;
	},
	title: '',
};

export const Disabled = Template.bind({});

Disabled.args = {
	title: 'Chip Name',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'secondary',
	disabled: true,
	leftComponent: () => {
		return <CopyIcon width='1.5rem' />;
	},
};
