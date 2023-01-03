import React from 'react';
import Notification from './Notification';

export default {
	title: 'Components/Notification',
	component: Notification,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  Notification component',
	},
};

const Template = (args) => {
	return (
		<div>
			<Notification {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

export const Disabled = Template.bind({});

Default.args = {
	options: [
		{
			id: '1',
			value: 'Unread',
		},
		{
			id: '2',
			value: 'All',
		},
	],
	messageOptions: [
		{
			title: {
				user: 'Alok kumar',
				action: 'requested access to',
				items: 'GCP Compliance Report',
			},
			message: '',
			time: 'Today at 9:42 AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: true,
			messageAction: false,
			onAccept: () => {},
			onReject: () => {},
			name: 'alok',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
		},
		{
			title: {
				user: 'Jaidev',
				action: 'made 6 changes on',
				items: ' SOC2 Regulation Criteria',
			},
			message: '',
			time: 'Yesterday at 11:42 AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			messageAction: false,
			onAccept: () => {},
			onReject: () => {},
			name: 'jaidev',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
		},
		{
			title: {
				user: 'Pradeep A',
				action: 'Commented on',
				items: 'BanyanCloud SOC2 compliance report',
			},
			message:
				'"Everything seems fine for now, we will review it once again when other reports are checked. Please update Jaidev about it."',
			time: 'Yesterday at 5:42 PM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			messageAction: true,
			onAccept: () => {},
			onReject: () => {},
			name: 'pradeep',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
		},
		{
			title: {
				user: 'Chandrashekar K',
				action: 'created',
				items: 'Banyan Cloud SOC2 compliance report',
			},
			message: '',
			time: 'Last Wednesday at 11:15AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			messageAction: false,
			onAccept: () => {},
			onReject: () => {},
			name: 'chandrashekar',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
		},
	],
};
