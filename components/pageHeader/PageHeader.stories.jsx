import React from 'react';
import Tabs from '../tabs/Tabs';
import PageHeader from './PageHeader';
import { Button } from '../buttons';
import { DownloadIcon, CalenderIcon } from '../icons';
import styles from './PageHeader.module.css';
import ThemedContainer from '../helpers/themedContainer/ThemedContainer';

export default {
	title: 'Components/PageHeader',
	component: PageHeader,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the Chip',
	},
};

const Template = (args) => {
	return (
		<ThemedContainer {...args}>
			<PageHeader {...args}>
				<Tabs />
			</PageHeader>
		</ThemedContainer>
	);
};

export const Light = Template.bind({});

Light.args = {
	title: 'Compliance Dashboard',
	description: 'Resource and Regulation Complaince Details',
	theme: 'light',
	crumbsProps: {
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
	},
	chipTitle: '4 Updates',
	rightAction: () => {
		return (
			<>
				<Button
					title='Save Changes'
					size='medium'
					variant='outlined'
					color='secondary'
					leftIcon={() => {
						return <DownloadIcon className={styles.download} />;
					}}
				/>
				<Button
					title='Select Date'
					size='medium'
					variant='contained'
					color='primary'
					leftIcon={() => {
						return <CalenderIcon className={styles.calender} />;
					}}
				/>
			</>
		);
	},
};

Light.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A8',
	},
};

export const Dark = Template.bind({});

Dark.args = {
	title: 'Page Header',
	description: 'Description of the page',
	theme: 'dark',
};

Dark.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A8',
	},
};
