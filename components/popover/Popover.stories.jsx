import React, { useState } from 'react';
import { Button } from '../buttons';
import Popover from './Popover';

export default {
	title: 'Components/Popover',
	component: Popover,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the Popover',
	},
};

const Template = (args) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);

	return (
		<div
			style={{
				textAlign: 'center',
				marginTop: 50,
			}}>
			<Button
				onClick={() => {
					setOpen((prev) => {
						return !prev;
					});
				}}
				title='Click Me'
				ref={(el) => {
					setAnchorEl(el);
				}}
			/>
			<Popover {...args} anchorEl={anchorEl} open={open} setOpen={setOpen}>
				<div
					style={{
						backgroundColor: 'rgba(36, 161, 72, 0.08)',
						color: '#24a148',
					}}>
					Content of the popover
				</div>
			</Popover>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	content: 'Popover Info',
	position: 'left',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A13',
	},
};
