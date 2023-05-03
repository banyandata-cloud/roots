import { forwardRef, useState } from 'react';
import { classes } from '../../../../../utils';
import { Button, Chip } from '../../../../buttons';
import { BaseCell } from '../../../../cell';
import { CloseIcon } from '../../../../icons';
import { TextField } from '../../../../input';
import { Text } from '../../../../text';
import styles from './TableChipItem.module.css';

const TableChipItem = forwardRef((props, ref) => {
	// eslint-disable-next-line object-curly-newline
	const {
		className,
		icon,
		rightComponent,
		label,
		labelSearch,
		value,
		valueSearch,
		onRemove,
		disabled,
		onSearch,
		onKeyDown,
		autocompleteOptions,
		temp,
	} = props;

	const [autocompleteOpen, setAutocompleteOpen] = useState(false);

	// component 1
	let Icon = icon;

	if (Icon) {
		Icon = <Icon className={styles['chip-icon']} />;
	} else {
		Icon = null;
	}

	let labelDOM = (
		<Text variant='b2' stroke='medium' className={styles.label}>
			{label}
		</Text>
	);

	if (labelSearch) {
		labelDOM = (
			<Text className={styles.label} variant='b2' stroke='medium'>
				{labelSearch ? (
					<TextField
						autocomplete
						autocompleteOptions={{
							...autocompleteOptions,
							open: autocompleteOpen,
							setOpen: setAutocompleteOpen,
						}}
						name='label'
						value={label}
						onChange={onSearch}
						className={styles['chip-search']}
						inputProps={{
							style: {
								width: `${label?.length}ch`,
								minWidth: '2rem',
								maxWidth: '20rem',
							},
							'data-search': 'label',
							size: 1,
						}}
					/>
				) : (
					label
				)}
			</Text>
		);
	}

	let valueDOM = typeof value === 'string' && value.length > 0 && (
		<Chip
			disabled={disabled}
			className={styles.chip}
			title={value}
			radius='ellipse'
			color='info'
			variant='input'
		/>
	);

	if (!labelSearch && valueSearch) {
		valueDOM = (
			<TextField
				autocomplete
				autocompleteOptions={{
					...autocompleteOptions,
					open: autocompleteOpen,
					setOpen: setAutocompleteOpen,
				}}
				name='value'
				value={value}
				onChange={onSearch}
				onKeyDown={onKeyDown}
				className={styles['chip-search']}
				inputProps={{
					style: {
						width: `${value?.length}ch`,
						minWidth: '2rem',
						maxWidth: '20rem',
					},
					size: 1,
					'data-search': 'value',
				}}
			/>
		);
	}

	// component 2
	const Title = (
		<>
			{labelDOM}
			{valueDOM && <> : {valueDOM}</>}
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
			ref={ref}
			className={classes(
				styles.root,
				className,
				disabled ? styles.disabled : '',
				temp ? styles.temp : ''
			)}
			component1={Icon}
			component2={Title}
			component3={[
				RightComponent,
				!disabled && (
					<Button
						size='auto'
						color='default'
						className={styles.remove}
						onClick={onRemove}
						rightComponent={() => {
							return <CloseIcon className={styles.icon} />;
						}}
					/>
				),
			]}
			title={`${label} : ${value}`}
		/>
	);
});

export default TableChipItem;
