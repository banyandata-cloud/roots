/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { Button } from '../buttons';
// import { classes } from '../../utils';
import styles from './Toggle.module.css';

const Toggle = (props) => {
	const { options, selectedToggle, setSelectedToggle, onChange } = props;

	const onButtonClick = (value) => {
		setSelectedToggle(value);
		onChange(value);
	};

	return (
		<div className={styles.root}>
			{options.map((item) => {
				const { title, value, leftComponent, rightComponent, color } = item;
				const isActive = selectedToggle === value;
				return (
					<Button
						key={title}
						className={classes(
							styles['toggle-button'],
							selectedToggle === value ? styles.active : ''
						)}
						onClick={() => {
							return onButtonClick(value);
						}}
						title={value}
						value={value}
						color={isActive ? color : 'default'}
						leftComponent={leftComponent}
						rightComponent={rightComponent}>
						{value}
					</Button>
				);
			})}
		</div>
	);
};

Toggle.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string),
	selectedToggle: PropTypes.string,
	setSelectedToggle: PropTypes.string,
};

Toggle.defaultProps = {
	options: [
		{
			title: 'First',
			value: 'First',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			title: 'Second',
			value: 'Second',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			title: 'Third',
			value: 'Third',
			rightCompoenent: '',
			leftCompoenent: '',
		},
		{
			title: 'Fourth',
			value: 'Fourth',
			rightCompoenent: '',
			leftCompoenent: '',
		},
	],
	selectedToggle: 'First',
	setSelectedToggle: 'None',
};

export default Toggle;
