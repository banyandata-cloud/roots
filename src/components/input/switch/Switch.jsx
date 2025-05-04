import React, { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import styles from './Switch.module.css';
import { classes, inputHelper } from '../../../utils';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

const Switch = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { label, checked, defaultChecked, onChange, position, className, disabled, custom } =
		props;

	const { current: isControlled } = useRef(checked !== undefined);

	// for uncontrolled input
	const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);

	const handleChange = (event) => {
		const { fieldValue } = inputHelper(event);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledChecked(fieldValue);
		}
	};

	const isChecked = isControlled ? checked : uncontrolledChecked;

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<label
				className={classes(
					styles.root,
					styles[`position-${position}`],
					disabled ? styles.disabled : '',
					className
				)}>
				<input
					disabled={disabled}
					type='checkbox'
					checked={isChecked}
					onChange={handleChange}
				/>
				<div className={classes(styles.pill)} />
				{label && <span data-elem='label'>{label}</span>}
			</label>
		</ErrorBoundary>
	);
};

Switch.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string,
	checked: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	position: PropTypes.oneOf(['left', 'right']),
	onChange: PropTypes.func,
};

Switch.defaultProps = {
	disabled: false,
	label: null,
	checked: undefined,
	defaultChecked: false,
	position: 'left',
	onChange: () => {},
};

export default Switch;
