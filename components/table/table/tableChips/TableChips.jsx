import PropTypes from 'prop-types';
import { classes } from '../../../../utils';
import { Button, Chip } from '../../../buttons';
import { BaseCell } from '../../../cell';
import { ArrowIcon, CloseIcon, TrashIcon } from '../../../icons';
import { Text } from '../../../text';
import { Skeleton } from './Skeleton';
import styles from './TableChips.module.css';

const TableChip = (props) => {
	const { icon, rightComponent, label, value, onRemove, disabled } = props;

	// component 1
	let Icon = icon;

	if (Icon) {
		Icon = <Icon className={styles['chip-icon']} />;
	} else {
		Icon = null;
	}

	// component 2
	const Title = (
		<>
			<Text className={styles.label} variant='b2' stroke='medium'>
				{label} :
			</Text>
			{typeof value === 'string' && value.length > 0 && (
				<Chip
					disabled={disabled}
					className={styles['chip-child']}
					title={value}
					radius='ellipse'
					color='info'
					variant='input'
					onClick={onRemove}
					rightComponent={
						!disabled &&
						(() => {
							return <CloseIcon className={styles.icon} />;
						})
					}
				/>
			)}
		</>
	);

	// component 3
	let RightComponent = rightComponent;

	if (RightComponent) {
		RightComponent = <RightComponent />;
	} else {
		RightComponent = null;
	}

	return (
		<BaseCell
			radius='default'
			size='auto'
			className={styles['chip-parent']}
			component1={Icon}
			component2={Title}
			component3={RightComponent}
			title={`${label} : ${value}`}
		/>
	);
};

const TableChips = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { showBack, onBack, onClear, chips, className, style, loading, onRemove } = props;

	if (loading) {
		return <Skeleton />;
	}

	const chipsDOM = chips
		?.filter((chip) => {
			return chip?.value != null;
		})
		?.map((chip, index) => {
			return (
				<TableChip
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
							leftComponent={() => {
								return <TrashIcon className={styles.icon} />;
							}}
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
};

export default TableChips;
