import React, {
	Children,
	cloneElement,
	CSSProperties,
	forwardRef,
	isValidElement,
	MouseEvent,
	ReactElement,
	ReactNode,
	TouchEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { classes } from '../../../utils';
import { BaseButton, Button } from '../../buttons';
import { DatePicker } from '../../datePicker';
import { ArrowIcon, CaretIcon, FilterIcon, MaximizeIcon } from '../../icons';
import { DropdownItemv2, Dropdownv2 } from '../../input';
import { Popover } from '../../popover';
import BaseSidePanel from '../../sidePanel/BaseSidePanel';
import { Text } from '../../text';
import { Toggle } from '../../toggle';
import { WidgetFallback } from '../fallback';
import styles from './BaseV2Widget.module.css';

interface SelectOption {
	title: string;
	value: string;
}

interface ToggleOption {
	title: string;
	value: string;
}

interface BaseOptionData {
	id: string;
	title?: string;
	placeholder?: string;
	value?: string | number | boolean | Date | null;
	className?: string;
}

interface DropdownOptionData extends BaseOptionData {
	id: 'dropdown';
	onChange: (event: React.SyntheticEvent, value: string | string[] | null | undefined) => void;
	selectOption: SelectOption[];
}

interface ExpandOptionData extends BaseOptionData {
	id: 'expand';
	onClick: () => void;
}

interface DatePickerOptionData extends BaseOptionData {
	id: 'datepicker';
	range?: boolean;
	onApply: (date: Date | Date[] | null) => void;
	onClear: () => void;
	date: Date | Date[] | null;
}

interface FilterOptionData extends BaseOptionData {
	id: 'filter';
}

interface ToggleOptionData extends BaseOptionData {
	id: 'toggle';
	options: ToggleOption[];
	onChange?: (value: string | number | boolean) => void;
}

interface CustomOptionData extends BaseOptionData {
	id: 'custom';
	render: () => ReactNode;
}

type OptionData =
	| DropdownOptionData
	| ExpandOptionData
	| DatePickerOptionData
	| FilterOptionData
	| ToggleOptionData
	| CustomOptionData;

interface ToggleDrawerData {
	index: number;
	[key: string]: unknown;
}

interface ToggleDrawerState {
	open: boolean;
	data: ToggleDrawerData;
}

interface GenerateOptionsProps {
	optionData: OptionData;
	toggleDrawer: (params?: { data?: ToggleDrawerData }) => void;
	header?: boolean;
}

interface FallbackProps {
	className?: string;
	title?: string;
	onReload?: () => void;
}

interface ChildWithProps extends ReactElement {
	props: {
		seriesData?: {
			chartData?: Record<string, unknown>;
		};
		fallback?: boolean;
		toggleDrawer?: (params?: { data?: ToggleDrawerData }) => void;
		[key: string]: unknown;
	};
}

interface BodyProps {
	toggle: (params?: { data?: ToggleDrawerData }) => void;
}

interface BaseWidgetProps {
	loading?: boolean;
	title?: string;
	titleOptions?: ReactNode;
	showBack?: boolean;
	onBack?: () => void;
	onReload?: () => void;
	options?: OptionData[];
	className?: string;
	children?: ReactNode;
	drawerClassName?: string;
	overlayClassName?: string;
	fallbackProps?: FallbackProps;
	setFallback?: (value: boolean) => void;
	showFallback?: boolean;
	style?: CSSProperties;
	onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
	onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
	titleDesc?: string;
	body?: React.ComponentType<BodyProps>;
	headerOptions?: OptionData[];
	rightActions?: (toggleDrawerParams: {
		toggleDrawer: (params?: { data?: ToggleDrawerData }) => void;
	}) => ReactNode;
}

const generateOptions = ({
	optionData,
	toggleDrawer,
	header = false,
}: GenerateOptionsProps): ReactNode => {
	switch (optionData.id) {
		case 'dropdown': {
			return (
				<Dropdownv2
					placeholder={optionData.placeholder ?? ''}
					value={optionData.value as string}
					onChange={optionData.onChange}
					className={classes(styles['dropdown-header'])}
					popperClassName={styles['dropdown-popper']}>
					{optionData.selectOption.map((objectData: SelectOption) => {
						return (
							<DropdownItemv2
								title={objectData.title}
								key={objectData.value}
								value={objectData.value}
								className={styles['dropdown-item'] ?? ''}
							/>
						);
					})}
				</Dropdownv2>
			);
		}
		case 'expand': {
			return (
				<Button
					title={optionData.title ?? ''}
					variant='outlined'
					size='auto'
					className={styles['expand-button']}
					onClick={optionData.onClick}
					leftComponent={() => {
						return <MaximizeIcon v2 className={styles['expand-icon']} />;
					}}
				/>
			);
		}
		case 'datepicker': {
			return (
				<DatePicker
					className={styles['date-picker']}
					placeholder={optionData.placeholder ?? 'Select Date'}
					range={optionData.range ?? false}
					onApply={optionData.onApply}
					onClear={optionData.onClear}
					value={optionData.date ?? null}
				/>
			);
		}
		case 'filter': {
			return (
				<Button
					title={optionData.title ?? 'Filter'}
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
		}
		case 'toggle': {
			return (
				<Toggle
					className={styles['toggle-body'] ?? ''}
					smooth
					secondary={!header}
					options={optionData.options}
				/>
			);
		}
		case 'custom': {
			return optionData.render();
		}
		default:
			return null;
	}
};

const BaseWidget = forwardRef<HTMLDivElement, BaseWidgetProps>((props, ref) => {
	const {
		loading = false,
		title = '',
		titleOptions = null,
		showBack = false,
		onBack,
		onReload,
		options = [],
		className = '',
		children,
		drawerClassName,
		overlayClassName,
		fallbackProps = {
			className: '',
			title: "We're having trouble loading this data",
		},
		setFallback,
		showFallback = false,
		style,
		onMouseDown,
		onMouseUp,
		onTouchEnd,
		titleDesc,
		body: Body = () => {
			return null;
		},
		headerOptions = [],
		rightActions = null,
	} = props;

	const emptyChartData = useMemo((): boolean => {
		return Children.toArray(children).every((child) => {
			if (isValidElement(child)) {
				const childWithProps = child as ChildWithProps;
				const chartData = childWithProps.props.seriesData?.chartData ?? {};
				return Object.keys(chartData).length === 0;
			}
			return true;
		});
	}, [children]);

	useEffect(() => {
		setFallback?.(emptyChartData);
	}, [emptyChartData, setFallback]);

	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const [toggleTableDrawer, setToggleTableDrawer] = useState<ToggleDrawerState>({
		open: false,
		data: {
			index: 0,
		},
	});

	const toggleDrawer = ({ data }: { data?: ToggleDrawerData } = {}) => {
		setToggleTableDrawer((prevState) => {
			return {
				open: !prevState.open,
				data: data ?? {
					index: 0,
				},
			};
		});
	};

	const titleText = (
		<Text className={styles['title-container'] ?? ''}>
			<Text className={styles['title-primary'] ?? ''}>
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
				{headerOptions.length > 0 &&
					headerOptions.map((objectData: OptionData, index: number) => {
						return (
							<React.Fragment key={`${objectData.id}-${index.toString()}`}>
								{generateOptions({
									optionData: objectData,
									toggleDrawer,
									header: true,
								})}
							</React.Fragment>
						);
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
						options.length === 0 ? styles['no-options'] : '',
						titleOptions == null ? styles['no-title-options'] : ''
					)}
					data-elem='header-title'>
					{showBack && (
						<Button
							title=''
							size='auto'
							radius='round'
							className={styles.back}
							leftComponent={() => {
								return <ArrowIcon className={styles.icon} position='left' />;
							}}
							onClick={() => {
								return onBack?.();
							}}
						/>
					)}
					{titleOptions != null ? (
						<>
							<BaseButton
								blurOnClick={false}
								ref={setAnchorEl}
								size='auto'
								className={styles.title}
								onClick={() => {
									setOpen(!open);
								}}
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

				{options.length > 0 && (
					<div className={styles['header-options']} data-elem='header-options'>
						<div
							className={classes(styles['header-options-list'])}
							data-elem='header-options-list'>
							{options.map((objectData: OptionData, index: number) => {
								return (
									<React.Fragment key={`${objectData.id}-${index.toString()}`}>
										{generateOptions({
											optionData: objectData,
											toggleDrawer,
										})}
									</React.Fragment>
								);
							})}
						</div>
					</div>
				)}
				{rightActions && (
					<div className={styles['header-options']} data-elem='header-options'>
						<div
							className={classes(styles['header-options-list'])}
							data-elem='header-options-list'>
							{rightActions({
								toggleDrawer,
							})}
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
				{isValidElement(<Body toggle={toggleDrawer} />) && <Body toggle={toggleDrawer} />}
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
				{Children.map(children, (child, index) => {
					if (isValidElement(child)) {
						return cloneElement(child as ReactElement<Record<string, unknown>>, {
							key: child.key ?? `child-${index.toString()}`,
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

BaseWidget.displayName = 'BaseWidget';

export default BaseWidget;
