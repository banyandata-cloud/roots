import PropTypes from 'prop-types';
import styles from './BaseWidget.module.css';
import { ExpandArrowAltIcon } from '../icons';
import Button from '../buttons/button/Button';
import { Dropdown, DropdownItem } from '../input';
import { Toggle } from '../Toggle';
import { classes } from '../../utils';

const generateOptions = (optionData) => {
	switch (optionData?.id ?? '') {
		case 'toggle':
			return <Toggle className={styles['toggle-body']} theme='dark' {...optionData} />;
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
		case 'custom':
			return optionData.render();
		default:
			return null;
	}
};

const BaseWidget = (props) => {
	const { title, options, className, children } = props;

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
					</span>
				</div>

				<div className={styles['header-options']} data-elem='header-options'>
					{(options?.length ?? 0) > 0 &&
						options?.map((objectData) => {
							return generateOptions(objectData);
						})}
				</div>
			</div>
			<div className={styles.children} data-elem='children'>
				{children}
			</div>
		</div>
	);
};

BaseWidget.propTypes = {
	title: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseWidget.defaultProps = {
	title: '',
	options: [],
	className: '',
};

export default BaseWidget;
