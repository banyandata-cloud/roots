import PropTypes from 'prop-types';
import { isValidElement } from 'react';
import { classes } from '../../../../utils';
import { Button, Chip } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ArrowIcon } from '../../../icons';
import styles from './TableChips.module.css';

const TableChips = (props) => {
	const { showBack, onBack, chips, className, style } = props;

	return (
		<BaseCell
			flexible
			className={classes(className, styles.root)}
			attrs={{
				style,
			}}
			component1={
				showBack && (
					<Button
						size='auto'
						radius='round'
						className={styles.back}
						leftComponent={() => {
							return <ArrowIcon className={styles.icon} position='left' />;
						}}
						onClick={onBack}
					/>
				)
			}
			component2={chips.map((chip) => {
				return (
					<Chip
						variant='input'
						color='default'
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
						rightComponent={chip.rightComponent}
					/>
				);
			})}
		/>
	);
};

TableChips.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	showBack: PropTypes.bool,
	onBack: PropTypes.func,
	chips: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			icon: PropTypes.func,
			label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			disabled: PropTypes.bool,
			rightComponent: PropTypes.node,
		})
	),
};

TableChips.defaultProps = {
	className: '',
	style: {},
	showBack: false,
	onBack: () => {},
	chips: [],
};

export default TableChips;
