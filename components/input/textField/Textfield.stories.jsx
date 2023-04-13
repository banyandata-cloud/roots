import React, { useState } from 'react';
import ThemedContainer from '../../helpers/themedContainer/ThemedContainer';
import { ArrowIcon, CopyIcon } from '../../icons';

import TextField from './TextField';

export default {
	title: 'Components/Input/TextField',
	component: TextField,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
	decorators: [
		(Story) => {
			return (
				<div
					style={{
						margin: '1em',
					}}>
					<Story />
				</div>
			);
		},
	],
};

const Template = (args) => {
	return (
		<div
			style={{
				width: 320,
			}}>
			<TextField {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	label: 'Label',
	placeholder: 'Type Here...',
	type: 'text',
	onChange: () => {},
	size: 'md',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://banyancloud.sharepoint.com/:w:/r/sites/ux/_layouts/15/Doc.aspx?sourcedoc=%7Ba7c1a049-ba55-4f71-8f4b-7f312e353083%7D&action=editnew&cid=e67ec59d-be0c-47f8-8f14-dcb2539ee69c',
	},
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
	...Default.args,
	RightComponent: () => {
		return <ArrowIcon active height='12' width='12' color='#0aa6ee' />;
	},
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
	...Default.args,
	LeftComponent: () => {
		return <CopyIcon height='18' width='18' color='#0aa6ee' />;
	},
};

export const WithBothSideIcon = Template.bind({});
WithBothSideIcon.args = {
	...Default.args,
	LeftComponent: () => {
		return <CopyIcon height='18' width='18' color='#0aa6ee' />;
	},
	RightComponent: () => {
		return <ArrowIcon active height='12' width='12' color='#0aa6ee' />;
	},
};

export const WithRightSideIconLabel = Template.bind({});
WithRightSideIconLabel.args = {
	...Default.args,
	LeftComponent: () => {
		return <CopyIcon height='18' width='18' color='#0aa6ee' />;
	},
	RightComponent: () => {
		return (
			<>
				<span>Label</span>
				<ArrowIcon active height='12' width='12' color='#0aa6ee' />
			</>
		);
	},
};

export const WithInputIconFieldIcon = Template.bind({});
WithInputIconFieldIcon.args = {
	...Default.args,
	LeftComponent: () => {
		return <CopyIcon height='18' width='18' color='#0aa6ee' />;
	},
	RightComponent: () => {
		return <ArrowIcon active height='12' width='12' color='#0aa6ee' />;
	},
	rightIconLabel: 'Label',
	fieldIcon: () => {
		return <ArrowIcon active height='12' width='12' color='#0aa6ee' />;
	},
	fieldInfo: 'Some Text',
};

const AutocompleteTemplate = (args) => {
	const [autocompleteOpen, setAutocompleteOpen] = useState(true);

	return (
		<ThemedContainer {...args}>
			<TextField
				{...args}
				autocompleteOptions={{
					open: autocompleteOpen,
					setOpen: setAutocompleteOpen,
				}}
			/>
		</ThemedContainer>
	);
};

export const WithAutocomplete = AutocompleteTemplate.bind({});

WithAutocomplete.args = {
	...Default.args,
	autocomplete: true,
};
