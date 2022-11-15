import React from 'react';
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
	return <BreadCrumbs {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	crumbs: ['Section1', 'section2', 'section3'],
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/8yLM3htSky4T8kPkamuxXn/Final-Layout---Ver.-05-(Copy)?node-id=5806%3A67551',
	},
};

export const CollapseBreadcrumb = Template.bind({});
CollapseBreadcrumb.args = {
	crumbs: ['Section1', 'section2', 'section3', 'section4', 'section5', 'Final Section'],
};
