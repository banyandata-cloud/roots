import React from 'react';
import { ThemedContainer } from '../helpers';
import BreadCrumbs from './Breadcrumbs';

export default {
	title: 'Components/Breadcumbs',
	component: BreadCrumbs,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<ThemedContainer {...args}>
			<BreadCrumbs {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
Default.args = {
	crumbs: [
		{
			title: 'section-1',
			path: 'section-1',
			icon: null,
		},
		{
			title: 'section-2',
			path: 'section-2',
			icon: null,
		},
		{
			title: 'section-3',
			path: 'section-3',
			icon: null,
		},
	],
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/8yLM3htSky4T8kPkamuxXn/Final-Layout---Ver.-05-(Copy)?node-id=5806%3A67551',
	},
};

export const CollapseBreadcrumb = Template.bind({});
CollapseBreadcrumb.args = {
	crumbs: [
		{
			title: 'section-1',
			path: 'section-1',
			icon: null,
		},
		{
			title: 'section-2',
			path: 'section-2',
			icon: null,
		},
		{
			title: 'section-3',
			path: 'section-3',
			icon: null,
		},
		{
			title: 'section-4',
			path: 'section-4',
			icon: null,
		},
		{
			title: 'section-5',
			path: 'section-5',
			icon: null,
		},
		{
			title: 'section-6',
			path: 'section-6',
			icon: null,
		},
		{
			title: 'final-section',
			path: 'final-section',
			icon: null,
		},
	],
};
