import PropTypes from 'prop-types';
import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
	useMemo,
	useState,
} from 'react';
import styles from './BaseWidget.module.css';
import { ArrowIcon, CaretIcon, MaximizeIcon } from '../icons';
import { Dropdown, DropdownItem } from '../input';
import { Toggle } from '../Toggle';
import { classes } from '../../utils';
import { WidgetFallback } from './fallback';
import { Text } from '../text';
import { Popover } from '../popover';
import { BaseButton, Button } from '../buttons';
import { DatePicker } from '../datePicker';

const renderToggle = (optionData, theme) => {
	return <Toggle className={styles['toggle-body']} theme={theme} {...optionData} />;
};
const generateOptions = (optionData, theme) => {
	switch (optionData?.id ?? '') {
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
						return <MaximizeIcon className={styles['expand-icon']} />;
					}}
				/>
			);
		case 'datepicker':
			return (
				<DatePicker
					className={styles['date-picker']}
					placeholder={optionData?.placeholder ?? 'Select Date'}
					range={optionData?.range ?? false}
					onApply={optionData?.onApply ?? ''}
					onClear={optionData?.onClear ?? ''}
					value={optionData?.date ?? null}
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
		subtitle,
		titleOptions,
		showBack,
		onBack,
		onReload,
		options,
		toggle,
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
		titleDesc,
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

	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const titleText = (
		<Text className={styles['title-container']}>
			<Text className={styles['title-primary']}>
				<Text
					variant='h2'
					stroke='semibold'
					attrs={{
						'data-elem': 'title',
					}}>
					{title} {subtitle && '-'}
				</Text>
				{subtitle && (
					<Text
						variant='b1'
						stroke='medium'
						attrs={{
							'data-elem': 'subtitle',
						}}>
						{' '}
						{subtitle}
					</Text>
				)}
			</Text>
			{titleDesc && (
				<Text
					variant='b1'
					stroke='light'
					attrs={{
						'data-elem': 'title-desc',
					}}>
					{' '}
					{titleDesc}
				</Text>
			)}
		</Text>
	);

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
						(options?.length ?? 0) === 0 ? styles['no-options'] : '',
						titleOptions == null ? styles['no-title-options'] : ''
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
					{titleOptions != null ? (
						<>
							<BaseButton
								blurOnClick={false}
								ref={setAnchorEl}
								size='auto'
								className={styles.title}
								onClick={setOpen}
								title={titleText}
								component3={<CaretIcon className={styles.icon} />}
							/>
							<Popover
								theme={theme}
								className={classes(
									styles['title-popover'],
									styles[`${theme}-theme`]
								)}
								anchorEl={anchorEl}
								open={open}
								setOpen={setOpen}
								placement='bottom-start'>
								{titleOptions}
							</Popover>
						</>
					) : (
						titleText
					)}
				</div>

				<div
					className={classes(
						styles['header-options'],
						(toggle?.options?.length ?? 0) > 0 && styles.toggle
					)}
					data-elem='header-options'>
					<div
						className={classes(styles['header-options-toggle'])}
						data-elem='header-options-toggle'>
						{(toggle?.options?.length ?? 0) > 0 && renderToggle(toggle, theme)}
					</div>
					<div
						className={classes(styles['header-options-list'])}
						data-elem='header-options-list'>
						{(options?.length ?? 0) > 0 &&
							options?.map((objectData) => {
								return generateOptions(objectData, theme);
							})}
					</div>
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
	subtitle: PropTypes.string,
	titleDesc: PropTypes.string,
	showBack: PropTypes.bool,
	onBack: PropTypes.func,
	onReload: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.shape),
	toggle: PropTypes.arrayOf(PropTypes.shape),
	className: PropTypes.string,
	fallbackProps: PropTypes.shape({
		className: PropTypes.string,
		title: PropTypes.string,
		subtitle: PropTypes.string,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
	setFallback: PropTypes.func,
	showFallback: PropTypes.bool,
	titleOptions: PropTypes.node,
};

BaseWidget.defaultProps = {
	loading: false,
	title: '',
	subtitle: '',
	titleDesc: '',
	showBack: false,
	onBack: () => {},
	onReload: () => {},
	options: [],
	toggle: [],
	className: '',
	fallbackProps: {
		className: '',
		title: "We're having trouble loading this data",
		subtitle: 'There could be something happening on our end. Reload this widget to try again.',
	},
	theme: 'dark',
	setFallback: () => {},
	showFallback: false,
	titleOptions: null,
};

export default BaseWidget;
