import React, { useState } from 'react';
import ThemedContainer from '../helpers/themedContainer/ThemedContainer';
import { PlusIcon } from '../icons';
import Accordion from './Accordion';

export default {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: `The accordion component delivers large amounts of content in a small space through progressive disclosure. 
                The header title gives the user a high-level overview of the content allowing the user to decide which sections to read. 
                Accordions can make information processing and discovering more effective. 
                However, it does hide content from users and it's important to account for a user not noticing or reading all of the included content. 
                If a user is likely to read all of the content, then don't use an accordion as it adds the burden of an extra click; instead use a full scrolling page with normal headers.`,
			},
		},
	},
};

export const Default = (args) => {
	return (
		<ThemedContainer>
			{[...Array(8).keys()].map((key) => {
				return <Accordion key={key} {...args} />;
			})}
		</ThemedContainer>
	);
};

Default.args = {
	title: 'Click to Expand',
	description: null,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A6',
	},
};

export const CustomIcon = Default.bind({});

CustomIcon.args = {
	...Default.args,
	leftComponent: PlusIcon,
	rightComponent: PlusIcon,
};

export const Controlled = () => {
	const [open, setOpen] = useState(null);

	return (
		<ThemedContainer>
			{[...Array(8).keys()].map((key) => {
				return (
					<Accordion
						open={key === open}
						onToggle={(active) => {
							if (active) {
								setOpen(null);
							} else {
								setOpen(key);
							}
						}}
						key={key}
						title={`Item ${key + 1}`}
						description={`This is the decription for Item ${key + 1}`}
					/>
				);
			})}
		</ThemedContainer>
	);
};

export const Nested = () => {
	return (
		<ThemedContainer>
			<Accordion title='Parent' description='This is the parent description'>
				<Accordion
					title='Child'
					description='This is the child description'
					onExpand={() => {}}
				/>
			</Accordion>
		</ThemedContainer>
	);
};
