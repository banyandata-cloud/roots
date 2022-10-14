import React from 'react';
import Tabs from '../tabs/Tabs';
import PageHeader from './PageHeader';
import Button from '../buttons/Button';
import { Download } from '../icons/Download';
import styles from './PageHeader.module.css';
import { Calender } from '../icons/Calender';

export default {
	title: 'ComponentsV2/PageHeader',
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
		<div>
			<PageHeader {...args}>
				<Tabs />
			</PageHeader>
		</div>
	);
};

export const Light = Template.bind({});

Light.args = {
	title: 'Compliance Dashboard',
	description: 'Resource and Regulation Complaince Details',
	theme: 'light',
	chipTitle: '4 Updates',
	renderRightAction: (
		<>
			<Button
				title='Save Changes'
				size='medium'
				variant='outlined'
				color='secondary'
				leftIcon={() => {
					return <Download className={styles.download} />;
				}}
			/>
			<Button
				title='Select Date'
				size='medium'
				variant='contained'
				color='primary'
				leftIcon={() => {
					return <Calender className={styles.calender} />;
				}}
			/>
		</>
	),
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
