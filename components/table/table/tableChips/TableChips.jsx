import PropTypes from 'prop-types';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ArrowIcon } from '../../../icons';
import { Skeleton } from './Skeleton';
import { TableChipItem } from './tableChipItem';
import styles from './TableChips.module.css';

const TableChips = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { showBack, onBack, onClear, chips, className, style, loading, onRemove, theme } = props;

	if (loading) {
		return <Skeleton theme={theme} />;
	}

	const chipsDOM = chips
		?.filter((chip) => {
			return chip?.value != null;
		})
		?.map((chip, index) => {
			return (
				<TableChipItem
					key={chip.key}
					{...chip}
					onRemove={() => {
						onRemove(chip, index);
					}}
				/>
			);
		});

	if (chipsDOM?.length > 0 || showBack) {
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
				component2={chipsDOM?.length > 0 ? chipsDOM : null}
				component3={
					chipsDOM?.length > 0 ? (
						<Button
							size='auto'
							variant='outlined'
							color='danger'
							title='Clear All'
							className={styles.clear}
							onClick={onClear}
						/>
					) : (
						''
					)
				}
			/>
		);
	}
	return null;
};

TableChips.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	showBack: PropTypes.bool,
	onBack: PropTypes.func,
	onClear: PropTypes.func,
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
	loading: PropTypes.bool,
	onRemove: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
};

TableChips.defaultProps = {
	className: '',
	style: {},
	showBack: false,
	onBack: () => {},
	onClear: () => {},
	chips: [],
	loading: null,
	onRemove: () => {},
	theme: 'light',
};

export default TableChips;
