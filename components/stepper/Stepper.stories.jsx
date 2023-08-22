import React from 'react';

import Stepper from './Stepper';
import DisplayPicture from '../displayPicture/DisplayPicture';
import Text from '../text/Text';
import { epochToFormattedDate } from '../../utils';

export default {
	title: 'Components/Stepper',
	component: Stepper,
	parameters: {
		options: {
			options: {
				showToolbar: false,
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
		<div
			style={{
				height: '100%',
			}}>
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
			description:
				'Just another description which is a very very very long text to show the component in a situtation where the text is just too much!',
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

export const Vertical = Template.bind({});

Vertical.args = {
	...Default.args,
	orientation: 'vertical',
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

export const Custom = Template.bind({});

const COMMENTS = [
	{
		user: 'Alok',
		comment: null,
		attachments: [],
		timestamp: Date.now(),
	},
	{
		user: 'Jaidev',
		comment: `Hi Team, 
		I am working on this ticket, will be back with the update.
		
		Hi Saiprakash,
		
		FYI - I will share you with action plan before implementation.`,
		attachments: [],
		timestamp: Date.now(),
	},
	{
		user: 'Pradeep',
		comment: `Hi Jaidev/Saiprakash,

		The schema creation request been processed successfully in the respective database.Here,attaching the document for team reference.
		
		SR operation performed successfully.`,
		attachments: [],
		timestamp: Date.now(),
	},
];

Custom.args = {
	steps: COMMENTS.map((comment) => {
		return {
			title: comment.user,
			renderIcon: () => {
				return <DisplayPicture name={comment.user} />;
			},
			renderTitle: () => {
				return (
					<Text>
						{comment.user} - {epochToFormattedDate(comment.timestamp, 'date')}
					</Text>
				);
			},
			renderDescription: () => {
				return <Text>{comment.comment}</Text>;
			},
		};
	}),
	orientation: 'vertical',
};
