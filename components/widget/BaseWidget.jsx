import PropTypes from 'prop-types';
import styles from './BaseWidget.module.css';
import { ExpandArrowAltIcon } from '../icons';
import Button from '../buttons/button/Button';
import { Dropdown, DropdownItem } from '../input';
import { classes } from '../../utils';

const BaseWidget = (props) => {
	const { title, value, options, children } = props;

	const generateOptions = (optionData) => {
		switch (optionData?.id ?? '') {
			case 'switch':
				return <div>Switch</div>;
			case 'dropdown':
				return (
					<Dropdown
						placeholder={optionData?.placeholder ?? ''}
						value={optionData?.value ?? ''}
						onChange={optionData?.onChange ?? ''}
						className={styles['dropdown-header']}
						popperClassName={styles['dropdown-popper']}>
						{(optionData?.selectOption ?? []).map((objectData) => {
							return (
								<DropdownItem
									title={objectData?.title ?? ''}
									key={objectData?.value ?? ''}
									value={objectData?.value ?? ''}
									variant='checkbox'
									className={styles['dropdown-item']}
								/>
							);
						})}
					</Dropdown>
				);
			case 'expand':
				return (
					<Button
						title={optionData?.title ?? ''}
						variant='outlined'
						size='auto'
						className={styles['expand-button']}
						onClick={optionData?.onClick ?? ''}
						rightComponent={() => {
							return <ExpandArrowAltIcon className={styles['expand-icon']} />;
						}}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div
					className={classes(
						styles['header-title'],
						(options?.length ?? 0) === 0 ? styles['no-options'] : ''
					)}>
					<span className={styles.title}>
						{title}
						{(options?.length ?? 0) > 0 ? ' - ' : ' '}
					</span>
					<span className={styles.value}>{value}</span>
				</div>

				<div className={styles['header-options']}>
					{(options?.length ?? 0) > 0 &&
						options?.map((objectData) => {
							return generateOptions(objectData);
						})}
				</div>
			</div>
			<hr />
			<div className={styles.children}>{children}</div>
		</div>
	);
};

BaseWidget.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape),
};

BaseWidget.defaultProps = {
	title: 'Chart Title',
	value: '140 Control',
	options: [],
};

export default BaseWidget;
