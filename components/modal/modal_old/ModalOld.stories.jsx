import React, { useState } from 'react';
import ModalOld from './ModalOld';
import styles from './ModalOld.module.css';

export default {
	title: 'ComponentsV2/Modal/ModalOld',
	component: ModalOld,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
	argTypes: {
		title: {
			control: 'text',
		},
		// close: {
		// control: 'boolean',
		// },
		// size: {
		// options: ['xs', 'sm', 'md', 'lg', 'xl'],
		// control: {
		// type: 'radio',
		// },
		// },
		// noPadding: {
		// control: 'boolean',
		// },
		// isAnimate: {
		// control: 'boolean',
		// },
		// isHeaderShow: {
		// control: 'boolean',
		// },
		// isCloseIconShow: {
		// control: 'boolean',
		// },
	},
};

const Template = (args) => {
	const [show, setShow] = useState(false);

	return (
		<div>
			<div>
				<button
					type='submit'
					className={styles.button}
					onClick={() => {
						setShow(!show);
					}}>
					Open Modal
				</button>
			</div>
			<ModalOld {...args} viewModal={show} hideModal={setShow} defaultFooter>
				<div>
					<p>Some content here!</p>
				</div>
			</ModalOld>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Modal Title',
	btnTitle: 'Save Changes',
	variant: 'primary',
	size: 'small',
	radius: 'default',
	// close: false,
	// size: 'xs',
	// noPadding: false,
	// columnCount: ' ',
	// custombg: ' ',
	// isAnimate: true,
	// isHeaderShow: true,
	// isCloseIconShow: true,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
