import React, { useState } from 'react';
import BaseSidePanel from './BaseSidePanel';

export default {
	title: 'Components/SidePanel/BaseSidePanel',
	component: BaseSidePanel,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Header = () => {
	return (
		<div
			style={{
				background: 'red',
			}}>
			<div>Header</div>
		</div>
	);
};

const Footer = () => {
	return (
		<div
			style={{
				background: 'orange',
			}}>
			Footer
		</div>
	);
};

const BasePanel = (args) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen((prevState) => {
			return !prevState;
		});
	};

	return (
		<div>
			<button
				type='button'
				onClick={toggle}
				style={{
					padding: 10,
				}}>
				Open Drawer
			</button>
			<BaseSidePanel
				{...args}
				renderHeader={<Header />}
				renderFooter={<Footer />}
				open={open}
				toggle={toggle}>
				<div
					style={{
						background: 'tomato',
					}}>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
					<p>Body</p>
				</div>
			</BaseSidePanel>
		</div>
	);
};

const Template = (args) => {
	return <BasePanel {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	renderHeader: 'Header Component',
	renderFooter: 'Footer Component',
	position: 'right',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=2%3A157&t=QUwVGAtrtHseOQKo-0',
	},
};
