import React, { useState } from 'react';
import ThemedContainer from '../helpers/themedContainer/ThemedContainer';
import { PlusIcon } from '../icons';
import Accordion from './Accordion';
import ComponentOverviewTemplate from '../../templates/componentOverview/ComponentOverviewTemplate';

const props = [
	{
		id: 1,
		title: 'open',
		description:
			'A boolean prop that determines whether the accordion is open or closed. If provided, the accordion becomes a controlled component, and its state is managed externally. If not provided, the accordion becomes an uncontrolled component, and its state is managed internally using the defaultOpen prop.',
	},
	{
		id: 2,
		title: 'onToggle',
		description:
			'A function prop that is called when the accordion is controlled and its open/closed state changes. It is passed the new state as a boolean argument.',
	},
	{
		id: 3,
		title: 'defaultOpen',
		description:
			'A boolean prop used only in uncontrolled mode. It sets the initial state of the accordion.',
	},
	{
		id: 4,
		title: 'defaultOpen',
		description:
			'A boolean prop used only in uncontrolled mode. It sets the initial state of the accordion.',
	},
	{
		id: 5,
		title: 'leftComponent',
		description:
			' A React node that represents the component to be displayed on the left side of the accordion header, typically an icon or other visual element.',
	},
	{
		id: 6,
		title: 'rightComponent',
		description:
			'A React node that represents the component to be displayed on the right side of the accordion header, typically an icon or other visual element.',
	},
	{
		id: 7,
		title: 'title',
		description: 'A React node representing the title or label of the accordion header.',
	},
	{
		id: 8,
		title: 'description',
		description:
			' A string representing additional descriptive text that can be displayed within the accordion body.',
	},
	{
		id: 9,
		title: 'children',
		description:
			'The content to be displayed within the accordion body. This can include any valid React elements.',
	},
	{
		id: 10,
		title: 'onClick',
		description:
			'A function prop that is called when the accordion header is clicked, whether controlled or uncontrolled. It is passed the new state as a boolean argument (uncontrolled) or is triggered externally (controlled).',
	},
	{
		id: 11,
		title: 'className',
		description:
			'A string prop used to add custom CSS classes to the root element of the accordion for styling purposes.',
	},
	{
		id: 12,
		title: 'onExpand',
		description:
			'A function prop that is called when the expand button is clicked. It can be used to trigger additional actions when the accordion is expanded.',
	},
];

export default {
	title: 'Components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			page: () => {
				return (
					<ComponentOverviewTemplate
						title='Accordion'
						description="The accordion component delivers large amounts of content in a small
							space through progressive disclosure. The header title gives the user a
							high-level overview of the content allowing the user to decide which
							sections to read. Accordions can make information processing and
							discovering more effective. However, it does hide content from users and
							it's important to account for a user not noticing or reading all of
							the included content. If a user is likely to read all of the content,
							then don't use an accordion as it adds the burden of an extra
							click; instead use a full scrolling page with normal headers."
						properties={props}
						sourceCode='https://github.com/banyandata-cloud/roots/tree/main/components/accordion'
						designLink='https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library'
					/>
				);
			},
		},
	},
};

export const Default = (args) => {
	return (
		<ThemedContainer>
			{[...Array(4).keys()].map((key) => {
				return <Accordion key={key} {...args} />;
			})}
		</ThemedContainer>
	);
};

Default.args = {
	title: 'Click to Expand',
	description:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	defaultOpen: false,
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
			{[...Array(4).keys()].map((key) => {
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
