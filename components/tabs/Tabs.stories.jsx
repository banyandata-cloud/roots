import React, { useState } from 'react';
import Tabs from './Tabs';
import { Caret } from '../icons/Caret';

export default {
	title: 'ComponentsV2/Tabs',
	component: Tabs,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	const [selectedTab, setSelectedTab] = useState('');

	return (
		<div>
			<Tabs {...args} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<span
				style={{
					fontSize: '0.875rem',
				}}>
				You have selected {selectedTab}
			</span>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	tabs: [
		{
			id: '1',
			title: 'Tab1',
		},
		{
			id: '2',
			title: 'Tab2',
		},
		{
			id: '3',
			title: 'Tab3',
		},
		{
			id: '4',
			title: 'Tab4',
		},
	],
	selectedTab: 'Tab1',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=977%3A26830',
	},
};

export const WithOnlyLeftIcon = Template.bind({});

WithOnlyLeftIcon.args = {
	tabs: [
		{
			id: '1',
			title: 'Tab1',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '2',
			title: 'Tab2',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '3',
			title: 'Tab3',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '4',
			title: 'Tab4',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
		},
	],
	selectedTab: 'Tab1',
};

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
	tabs: [
		{
			id: '1',
			title: 'Tab1',
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '2',
			title: 'Tab2',
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '3',
			title: 'Tab3',
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '4',
			title: 'Tab4',
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
	],
	selectedTab: 'Tab1',
};

export const WithBothSideIcon = Template.bind({});

WithBothSideIcon.args = {
	tabs: [
		{
			id: '1',
			title: 'Tab1',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '2',
			title: 'Tab2',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '3',
			title: 'Tab3',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
		{
			id: '4',
			title: 'Tab4',
			leftIcon: (props) => {
				return <Caret {...props} />;
			},
			rightIcon: (props) => {
				return <Caret {...props} />;
			},
		},
	],
	selectedTab: 'Tab1',
};
