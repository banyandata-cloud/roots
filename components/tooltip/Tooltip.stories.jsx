import React, { useRef } from 'react';
import Tooltip from './Tooltip';

export default {
	title: 'Components/Tooltip',
	component: Tooltip,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the Tooltip',
	},
};

const Template = (args) => {
	const ref = useRef(null);
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: 150,
			}}>
			<Tooltip {...args}>
				<div
					style={{
						width: '70%',
						backgroundColor: 'rgba(36, 161, 72, 0.08)',
						color: '#24a148',
						textAlign: 'center',
						marginTop: -20,
					}}
					ref={ref}>
					Children, Here child is Div, it can by anything
				</div>
			</Tooltip>
		</div>
	);
};

export const Left = Template.bind({});
Left.args = {
	content: 'Tooltip Info',
	position: 'left',
};

Left.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1%3A13',
	},
};

export const Right = Template.bind({});
Right.args = {
	content: 'Tooltip Info',
	position: 'right',
};

export const Top = Template.bind({});
Top.args = {
	content: 'Tooltip Info',
	position: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
	content: 'Tooltip Info',
	position: 'bottom',
};
