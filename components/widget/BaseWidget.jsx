import PropTypes from 'prop-types';
import { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo } from 'react';
import styles from './BaseWidget.module.css';
import { ArrowIcon, ExpandArrowAltIcon } from '../icons';
import Button from '../buttons/button/Button';
import { Dropdown, DropdownItem } from '../input';
import { Toggle } from '../Toggle';
import { classes } from '../../utils';
import { WidgetFallback } from './fallback';

const generateOptions = (optionData, theme) => {
	switch (optionData?.id ?? '') {
		case 'toggle':
			return <Toggle className={styles['toggle-body']} theme={theme} {...optionData} />;
		case 'dropdown':
			return (
				<Dropdown
					placeholder={optionData?.placeholder ?? ''}
					value={optionData?.value ?? ''}
					onChange={optionData?.onChange ?? ''}
					className={classes(styles['dropdown-header'])}
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
			return optionData.render({
				theme,
			});
		default:
			return null;
	}
};

// eslint-disable-next-line prefer-arrow-callback
const BaseWidget = forwardRef(function BaseWidget(props, ref) {
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
		showFallback,
		style,
		onMouseDown,
		onMouseUp,
		onTouchEnd,
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
		<div
			ref={ref}
			className={classes(styles.root, className, styles[`${theme}-theme`])}
			style={style}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchEnd={onTouchEnd}>
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

				<div className={classes(styles['header-options'])} data-elem='header-options'>
					{(options?.length ?? 0) > 0 &&
						options?.map((objectData) => {
							return generateOptions(objectData, theme);
						})}
				</div>
			</div>
			<div className={styles.children} data-elem='children'>
				{showFallback && !loading && emptyChartData && (
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
});

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
	showFallback: PropTypes.bool,
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
	showFallback: false,
};

export default BaseWidget;
