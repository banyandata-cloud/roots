import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { toggleModal } from '../../../redux/drawer/drawerActions';
import store from '../../../redux/store';
import BaseModal from './BaseModal';

export default {
	title: 'ComponentsV2/Modal/BaseModal',
	component: BaseModal,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const TemplateModal = (args) => {
	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(
			toggleModal({
				open: true,
			})
		);
	};

	return (
		<div>
			<button
				type='button'
				onClick={toggle}
				style={{
					padding: 10,
				}}>
				Open Modal
			</button>
			<BaseModal {...args}>
				<div>
					<p>Modal description: Pass the header and footer as a Component</p>
				</div>
			</BaseModal>
		</div>
	);
};

const Template = (args) => {
	return (
		<Provider store={store}>
			<TemplateModal {...args} />
		</Provider>
	);
};

export const Default = Template.bind({});

Default.args = {
	renderHeader: 'Header',
	renderFooter: 'Footer',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
