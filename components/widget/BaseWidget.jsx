import PropTypes from 'prop-types';
import styles from './BaseWidget.module.css';
import { ExpandArrowAltIcon } from '../icons';
import Button from '../buttons/button/Button';
import { Dropdown, DropdownItem } from '../input';
import { classes } from '../../utils';

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
		case 'custom': return optionData.render();
		default:
			return null;
	}
};

const BaseWidget = (props) => {
	const { title, value, options, className, children } = props;

	return (
		<div className={classes(styles.root, className)}>
			<div className={styles.header} data-elem='header'>
				<div
					className={classes(
						styles['header-title'],
						(options?.length ?? 0) === 0 ? styles['no-options'] : ''
					)}
					data-elem='header-title'>
					<span className={styles.title} data-elem='title'>
						{title}
						{(options?.length ?? 0) > 0 ? ' - ' : ' '}
					</span>
					<span className={styles.value} data-elem='value'>{value}</span>
				</div>

				<div className={styles['header-options']} data-elem='header-options'>
					{(options?.length ?? 0) > 0 &&
						options?.map((objectData) => {
							return generateOptions(objectData);
						})}
				</div>
			</div>
			<hr />
			<div className={styles.children} data-elem='children'>{children}</div>
		</div>
	);
};

BaseWidget.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseWidget.defaultProps = {
	title: '',
	value: '',
	options: [],
	className: '',
};

export default BaseWidget;
