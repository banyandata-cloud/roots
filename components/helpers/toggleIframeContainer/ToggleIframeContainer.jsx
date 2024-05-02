import React, { useState } from 'react';
import styles from './ToggleIframeContainer.module.css';

const ToggleIframeContainer = (props) => {
	const { className, children } = props;
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={className}>
			<div className={styles.root} onClick={toggleAccordion}>
				<div className={`${styles.main} ${isOpen ? styles.open : styles.close}`}>{'>'}</div>
				<div>{isOpen ? 'Hide Code Editor' : 'Show Code Editor'}</div>
			</div>
			{isOpen && children}
		</div>
	);
};

ToggleIframeContainer.defaultProps = {
	style: {},
	className: '',
};

export default ToggleIframeContainer;
