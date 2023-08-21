import React from 'react';
import LibraryOverviewTemplate from '../../templates/libraryOverview/LibraryOverviewTemplate';

export default {
	title: 'Getting Started',
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: {
			control: 'color',
		},
	},
	parameters: {
		storyOrder: 1,
		options: {
			options: {
				showToolbar: false,
			},
		},
		canvas: {
			hidden: true,
		},
		docs: {
			page: () => {
				return <LibraryOverviewTemplate />;
			},
		},
	},
};

export const Default = () => {
	return null;
};
