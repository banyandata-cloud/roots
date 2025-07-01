import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { classes } from '../../../utils';
import { Toggle } from '../../Toggle';
import { BaseButton, Button } from '../../buttons';
import { DatePicker } from '../../datePicker';
import { ArrowIcon, CaretIcon, FilterIcon, MaximizeIcon } from '../../icons';
import { DropdownItemv2, Dropdownv2 } from '../../input';
import { Popover } from '../../popover';
import BaseSidePanel from '../../sidePanel/BaseSidePanel';
import { Text } from '../../text';
import { WidgetFallback } from '../fallback';
import styles from './BaseV2Widget.module.css';

const generateOptions = ({ optionData, toggleDrawer, header = false }) => {
	switch (optionData?.id ?? '') {
		case 'dropdown':
			return (
				<Dropdownv2
					placeholder={optionData?.placeholder ?? ''}
					value={optionData?.value ?? ''}
					onChange={optionData?.onChange ?? ''}
					className={classes(styles['dropdown-header'])}
					popperClassName={styles['dropdown-popper']}>
					{(optionData?.selectOption ?? []).map((objectData) => {
						return (
							<DropdownItemv2
								title={objectData?.title ?? ''}
								key={objectData?.value ?? ''}
								value={objectData?.value ?? ''}
								className={styles['dropdown-item']}
							/>
						);
					})}
				</Dropdownv2>
			);
		case 'expand':
			return (
				<Button
					title={optionData?.title ?? ''}
					variant='outlined'
					size='auto'
					className={styles['expand-button']}
					onClick={optionData?.onClick ?? ''}
					leftComponent={() => {
						return <MaximizeIcon v2 className={styles['expand-icon']} />;
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
		case 'filter':
			return (
				<Button
					title={optionData?.title ?? 'Filter'}
					variant='outlined'
					size='auto'
					className={styles['filter-button']}
					onClick={() => {
						toggleDrawer({
							data: {
								index: 0,
							},
						});
					}}
					leftComponent={() => {
						return <FilterIcon v2 className={styles['filter-icon']} />;
					}}
				/>
			);
		case 'toggle':
			return (
				<Toggle
					v2
					{...optionData}
					className={styles['toggle-body']}
					smooth
					secondary={!header}
					options={optionData.options}
				/>
			);
		case 'custom':
			return optionData.render();
		default:
			return null;
	}
};

// eslint-disable-next-line prefer-arrow-callback
const BaseWidget = forwardRef(function BaseWidget(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const {
		loading = false,
		title = '',
		titleOptions = null,
		showBack = false,
		onBack = () => {},
		onReload = () => {},
		options = [],
		className = '',
		children,
		drawerClassName,
		overlayClassName,
		fallbackProps = {
			className: '',
			title: "We're having trouble loading this data",
		},
		setFallback = () => {},
		showFallback = false,
		style,
		onMouseDown,
		onMouseUp,
		onTouchEnd,
		titleDesc,
		body: Body = () => {},
		headerOptions = null,
		rightActions = null,
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

	const [toggleTableDrawer, setToggleTableDrawer] = useState({
		open: false,
		data: {
			index: 0,
		},
	});

	const toggleDrawer = ({ data } = {}) => {
		setToggleTableDrawer((prevState) => {
			return {
				open: !prevState.open,
				data,
			};
		});
	};

	const titleText = (
		<Text className={styles['title-container']}>
			<Text className={styles['title-primary']}>
				{title && (
					<Text
						variant='h2'
						stroke='semibold'
						attrs={{
							'data-elem': 'title',
						}}>
						{title}
					</Text>
				)}
				{(headerOptions?.length ?? 0) > 0 &&
					headerOptions?.map((objectData) => {
						return generateOptions({
							optionData: objectData,
							toggleDrawer,
							header: true,
						});
					})}
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
			className={classes(styles.root, className)}
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
								className={classes(styles['title-popover'])}
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

				<div className={styles['header-options']} data-elem='header-options'>
					<div
						className={classes(styles['header-options-list'])}
						data-elem='header-options-list'>
						{(options?.length ?? 0) > 0 &&
							options?.map((objectData) => {
								return generateOptions({
									optionData: objectData,
									toggleDrawer,
								});
							})}
					</div>
				</div>
				{rightActions && (
					<div className={styles['header-options']} data-elem='header-options'>
						<div
							className={classes(styles['header-options-list'])}
							data-elem='header-options-list'>
							{options && (
								<div
									className={styles['header-options']}
									data-elem='header-options'>
									<div
										className={classes(styles['header-options-list'])}
										data-elem='header-options-list'>
										{rightActions}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			<BaseSidePanel
				toggle={toggleDrawer}
				open={toggleTableDrawer.open}
				className={classes(styles.drawer, drawerClassName)}
				data-elem='panel'
				animation>
				{isValidElement(<Body />) && <Body toggle={toggleDrawer} />}
			</BaseSidePanel>

			{toggleTableDrawer.open && (
				<div
					className={classes(styles.overlay, overlayClassName)}
					onClick={() => {
						toggleDrawer();
					}}
				/>
			)}

			<div className={styles.children} data-elem='children'>
				{showFallback && !loading && emptyChartData && (
					<WidgetFallback {...fallbackProps} onReload={onReload} />
				)}
				{Children.map(children, (child) => {
					if (isValidElement(child)) {
						return cloneElement(child, {
							fallback: !loading && emptyChartData,
							toggleDrawer,
						});
					}
					return null;
				})}
			</div>
		</div>
	);
});

export default BaseWidget;
