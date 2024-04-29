import React, { useState } from 'react';
import { Toggle } from '../../Toggle';

const ToggleIframeContainer = (props) => {
	const { className, children } = props;
	const [value, setvalue] = useState('hide');

	const themeOptions = [
		{
			title: 'Hide',
			value: 'hide',
		},
		{
			title: 'Display',
			value: 'display',
		},
	];

	const updatevalue = (val) => {
		setvalue(val);
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
				}}>
				<Toggle
					options={themeOptions}
					value={value}
					onChange={updatevalue}
					smooth
				/>
			</div>
			{value === 'display' && children}
		</div>
	);
};

ToggleIframeContainer.defaultProps = {
	style: {},
	className: '',
};

export default ToggleIframeContainer;
