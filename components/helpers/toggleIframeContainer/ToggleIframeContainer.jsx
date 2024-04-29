import React, { useState } from 'react';

const ToggleIframeContainer = (props) => {
	const { className, children } = props;
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={className}>
			<div
				style={{
					display: 'flex',
					flex: 'row',
					width: '100%',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginBottom: '1rem',
					cursor: 'pointer',
					backgroundColor: '#eeeeee',
					padding: '0.5rem',
				}}
				onClick={toggleAccordion}>
				<div
					style={{
						transition: 'transform 0.3s',
						transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
						marginRight: '1rem',
					}}>
					{'>'}
				</div>
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
