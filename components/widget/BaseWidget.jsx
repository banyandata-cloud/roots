import PropTypes from 'prop-types';
import { Children, cloneElement, isValidElement, useEffect, useMemo } from 'react';
import styles from './BaseWidget.module.css';
import { ArrowIcon, ExpandArrowAltIcon } from '../icons';
import Button from '../buttons/button/Button';
import { Dropdown, DropdownItem } from '../input';
import { Toggle } from '../Toggle';
import { classes } from '../../utils';
import { WidgetFallback } from './fallback';

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
	// eslint-disable-next-line object-curly-newline
	const {
		loading,
		title,
		showBack,
		onBack,
		onReload,
		options,
		className,
		children,
		fallbackProps,
		theme,
		setFallback,
	} = props;

	const emptyChartData = useMemo(() => {
		return Children.toArray(children).every((child) => {
			const chartData = child.props?.seriesData?.chartData ?? {};
			return chartData && Object.keys(chartData).length === 0;
		});
	}, [children]);

	useEffect(() => {
		setFallback(emptyChartData);
	}, [emptyChartData]);

	return (
		<div className={classes(styles.root, className)}>
			<div className={styles.header} data-elem='header'>
				<div
					className={classes(
						styles['header-title'],
						(options?.length ?? 0) === 0 ? styles['no-options'] : ''
					)}
					data-elem='header-title'>
					{showBack && (
						<Button
							size='auto'
							radius='round'
							className={styles.back}
							leftComponent={() => {
								return <ArrowIcon className={styles.icon} position='left' />;
							}}
							onClick={onBack}
						/>
					)}
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
				{!loading && emptyChartData && (
					<WidgetFallback {...fallbackProps} onReload={onReload} theme={theme} />
				)}
				{Children.map(children, (child) => {
					if (isValidElement(child)) {
						return cloneElement(child, {
							fallback: !loading && emptyChartData,
						});
					}
					return null;
				})}
			</div>
		</div>
	);
};

BaseWidget.propTypes = {
	loading: PropTypes.bool,
	title: PropTypes.string,
	showBack: PropTypes.bool,
	onBack: PropTypes.func,
	onReload: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.shape),
	className: PropTypes.string,
	fallbackProps: PropTypes.shape({
		className: PropTypes.string,
		title: PropTypes.string,
		subtitle: PropTypes.string,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
	setFallback: PropTypes.func,
};

BaseWidget.defaultProps = {
	loading: false,
	title: '',
	showBack: false,
	onBack: () => {},
	onReload: () => {},
	options: [],
	className: '',
	fallbackProps: {
		className: '',
		title: "We're having trouble loading this data",
		subtitle: 'There could be something happening on our end. Reload this widget to try again.',
	},
	theme: 'dark',
	setFallback: () => {},
};

export default BaseWidget;
