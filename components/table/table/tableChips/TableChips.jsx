import PropTypes from 'prop-types';
import { isValidElement } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import Chip from '../../../chip/Chip';
import { Arrow } from '../../../icons';
import styles from './TableChips.module.css';

const TableChips = (props) => {
	const { showBack, chips, className } = props;

	return (
		<BaseCell
			flexible
			className={classes(className, styles.root)}
			component1={
				showBack && (
					<Button
						size='auto'
						radius='round'
						className={styles.back}
						leftComponent={() => {
							return <Arrow className={styles.icon} position='left' />;
						}}
					/>
				)
			}
			component2={chips.map((chip) => {
				return (
					<Chip
						variant='input'
						disabled={chip.disabled}
						className={styles.chip}
						key={chip.key}
						title={`${chip.label} : ${chip.value}`}
						leftComponent={(iconProps) => {
							const Icon = chip.icon;
							if (isValidElement(<Icon />)) {
								return <Icon {...iconProps} className={styles['chip-icon']} />;
							}
							return null;
						}}
					/>
				);
			})}
		/>
	);
};

TableChips.propTypes = {
	showBack: PropTypes.bool,
	chips: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			icon: PropTypes.func,
			label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			disabled: PropTypes.bool,
		})
	),
};

TableChips.defaultProps = {
	showBack: false,
	chips: [],
};

export default TableChips;
