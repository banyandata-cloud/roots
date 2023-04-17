import { classes } from '../../../../../utils';
import { Chip } from '../../../../buttons';
import { BaseCell } from '../../../../cell';
import { CloseIcon } from '../../../../icons';
import { TextField } from '../../../../input';
import { Text } from '../../../../text';
import styles from './TableChipItem.module.css';

const TableChipItem = (props) => {
	// eslint-disable-next-line object-curly-newline
	const {
		className,
		icon,
		rightComponent,
		label,
		value,
		onRemove,
		disabled,
		search,
		onSearch,
		inputValue,
	} = props;

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
			{search ? (
				<TextField
					value={inputValue}
					onChange={onSearch}
					className={styles['chip-search']}
					inputProps={{
						style: {
							width: `${inputValue?.length}ch`,
							minWidth: '2rem',
							maxWidth: '20rem',
						},
						size: 1,
					}}
				/>
			) : (
				typeof value === 'string' &&
				value.length > 0 && (
					<Chip
						disabled={disabled}
						className={styles.chip}
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
				)
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
			className={classes(styles.root, className, disabled ? styles.disabled : '')}
			component1={Icon}
			component2={Title}
			component3={RightComponent}
			title={`${label} : ${value}`}
		/>
	);
};

export default TableChipItem;
