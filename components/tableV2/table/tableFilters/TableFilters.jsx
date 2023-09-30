import PropTypes from 'prop-types';
import {
	useState,
} from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { BaseCell } from '../../../cell';
import {
	FilterIcon,
	CaretIcon,
	ColumnFilter,
} from '../../../icons';
import { Columns } from './Filters';
import styles from './TableFilters.module.css';
import { Skeleton } from './Skeleton';

const TableFilters = (props) => {
	const {
		className,
		style,
		onSearch,
		headerData,
		hiddenColumns,
		setHiddenColumns,
		loading,
		disabledFilterOptions,
		theme,
	} = props;

	const [openColumns, setOpenColumns] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const { search: disabledSearch, columnFilter: disabledColumnFilter } = disabledFilterOptions;

	if (loading) {
		return <Skeleton theme={theme} />;
	}

	return (
		<BaseCell
			flexible
			className={classes(styles.root, className)}
			attrs={{
				style,
				// onBlur,
			}}
			component1={
				!disabledSearch && (
					<Button
						size='auto'
						className={styles['icon-button']}
						color='default'
						title='Search Filter'
						onClick={onSearch}
						leftComponent={() => {
							return <FilterIcon className={styles.icon} />;
						}}
					/>
				)
			}
			component2={
				!disabledColumnFilter && (
					<>
						<Button
							ref={(el) => {
								setAnchorEl(el);
							}}
							size='auto'
							className={styles['icon-button']}
							color='default'
							leftComponent={() => {
								return <ColumnFilter className={styles.icon} />;
							}}
							rightComponent={() => {
								return <CaretIcon className={styles.icon} />;
							}}
							title='Columns'
							onClick={() => {
								setOpenColumns((prev) => {
									return !prev;
								});
							}}
						/>
						<Columns
							anchorEl={anchorEl}
							open={openColumns}
							setOpen={setOpenColumns}
							columns={headerData}
							hiddenColumns={hiddenColumns}
							setHiddenColumns={setHiddenColumns}
							theme={theme}
						/>
					</>
				)
			}
		/>
	);
};

TableFilters.propTypes = {
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	style: PropTypes.object,
	onSearch: PropTypes.func,
	searchValue: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	searchOptions: PropTypes.object,
	filterValue: PropTypes.shape({
		applied: PropTypes.number,
	}),
	loading: PropTypes.bool,
	disabledFilterOptions: PropTypes.shape({
		filterButton: PropTypes.bool,
		refresh: PropTypes.bool,
		columnFilter: PropTypes.bool,
		settings: PropTypes.bool,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
};

TableFilters.defaultProps = {
	className: '',
	style: {},
	onSearch: () => {},
	searchValue: null,
	searchOptions: {},
	filterValue: {
		applied: null,
	},
	loading: null,
	disabledFilterOptions: {
		filterButton: false,
		refresh: false,
		columnFilter: false,
		settings: false,
	},
	theme: 'light',
};

export default TableFilters;
