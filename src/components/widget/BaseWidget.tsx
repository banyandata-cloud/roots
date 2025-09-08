import React, {
	Children,
	cloneElement,
	CSSProperties,
	ForwardedRef,
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
import { classes } from '../../utils';
import { BaseButton, Button } from '../buttons';
import { DatePicker } from '../datePicker';
import { ArrowIcon, CaretIcon, MaximizeIcon } from '../icons';
import { Dropdownv2 as Dropdown, DropdownItemv2 as DropdownItem } from '../input';
import { Popover } from '../popover';
import { Text } from '../text';
import { Toggle } from '../toggle';
import { BaseV2Widget } from './BaseV2Widget';
import styles from './BaseWidget.module.css';
import { WidgetFallback } from './fallback';

type Theme = 'light' | 'dark';

interface SelectOption {
	title: string;
	value: string;
}

interface DropdownOption {
	children?: ReactNode;
	id: 'dropdown';
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	selectOption?: SelectOption[];
}

interface ExpandOption {
	id: 'expand';
	title?: string;
	onClick?: () => void;
}

interface DatePickerOption {
	id: 'datepicker';
	placeholder?: string;
	range?: boolean;
	onApply?: (date: Date | Date[] | null) => void;
	onClear?: () => void;
	date?: Date | Date[] | null;
}

interface CustomOption {
	id: 'custom';
	render: (props: { theme: Theme }) => ReactNode;
}

type WidgetOption = DropdownOption | ExpandOption | DatePickerOption | CustomOption;

interface ToggleOption {
	title: string;
	value: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	disabled?: boolean;
	className?: string;
	options?: unknown[];
	[key: string]: unknown;
}

interface FallbackProps {
	className?: string;
	title?: string;
	subtitle?: string;
}

interface ChildWithProps extends ReactElement {
	props: {
		seriesData?: {
			chartData?: Record<string, unknown>;
		};
		fallback?: boolean;
		[key: string]: unknown;
	};
}

interface BaseWidgetProps {
	loading?: boolean;
	title?: string;
	subtitle?: string;
	titleOptions?: ReactNode;
	showBack?: boolean;
	onBack?: () => void;
	onReload?: () => void;
	options?: WidgetOption[];
	toggle?: ToggleOption;
	className?: string;
	children?: ReactNode;
	fallbackProps?: FallbackProps;
	theme?: Theme;
	setFallback?: (value: boolean) => void;
	showFallback?: boolean;
	style?: CSSProperties;
	onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
	onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
	titleDesc?: string;
	v2?: boolean;
	body?: () => void;
}

const renderToggle = (optionData: ToggleOption, theme: Theme): ReactElement => {
	return (
		<Toggle
			className={styles['toggle-body'] ?? ''}
			theme={theme}
			smooth
			options={[optionData]}
		/>
	);
};

const generateOptions = (optionData: WidgetOption, theme: Theme): ReactNode => {
	switch (optionData.id) {
		case 'dropdown': {
			return (
				<Dropdown
					placeholder={optionData.placeholder ?? ''}
					value={optionData.value ?? ''}
					onChange={optionData.onChange}
					className={classes(styles['dropdown-header'])}
					popperClassName={styles['dropdown-popper']}>
					{(optionData.selectOption ?? []).map((objectData: SelectOption) => {
						return (
							<DropdownItem
								title={objectData.title}
								key={objectData.value}
								value={objectData.value}
								variant='checkbox'
								className={styles['dropdown-item']}
							/>
						);
					})}
				</Dropdown>
			);
		}
		case 'expand': {
			return (
				<Button
					title={optionData.title ?? ''}
					variant='outlined'
					size='auto'
					className={styles['expand-button']}
					onClick={() => {
						return optionData.onClick?.();
					}}
					rightComponent={() => {
						return <MaximizeIcon className={styles['expand-icon']} />;
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
		case 'custom': {
			return optionData.render({
				theme,
			});
		}
		default:
			return null;
	}
};

const BaseWidget = forwardRef<HTMLDivElement, BaseWidgetProps>(
	(props, ref: ForwardedRef<HTMLDivElement>) => {
		const {
			loading = false,
			title = '',
			subtitle = '',
			titleOptions = null,
			showBack = false,
			onBack,
			onReload,
			options = [],
			toggle,
			className = '',
			children,
			fallbackProps = {
				className: '',
				title: "We're having trouble loading this data",
				subtitle:
					'There could be something happening on our end. Reload this widget to try again.',
			},
			theme = 'light',
			setFallback,
			showFallback = false,
			style,
			onMouseDown,
			onMouseUp,
			onTouchEnd,
			titleDesc,
			v2 = false,
		} = props;

		const emptyChartData = useMemo(() => {
			return Children.toArray(children).every((child) => {
				if (isValidElement(child)) {
					const typedChild = child as ChildWithProps;
					const chartData = typedChild.props.seriesData?.chartData ?? {};
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

		if (v2) {
			return <BaseV2Widget {...props} />;
		}

		const titleText = (
			<Text className={styles['title-container'] ?? ''}>
				<Text className={styles['title-primary'] ?? ''}>
					{title ? (
						<Text
							variant='h2'
							stroke='semibold'
							attrs={{
								'data-elem': 'title',
							}}>
							{title} {subtitle && '-'}
						</Text>
					) : (
						<div
							className={classes(styles['header-options-toggle'])}
							data-elem='header-options-toggle'>
							{(toggle?.options?.length ?? 0) > 0 && renderToggle(toggle, theme)}
						</div>
					)}
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
						{title && (
							<div
								className={classes(styles['header-options-toggle'])}
								data-elem='header-options-toggle'>
								{(toggle?.options?.length ?? 0) > 0 && renderToggle(toggle, theme)}
							</div>
						)}
						<div
							className={classes(styles['header-options-list'])}
							data-elem='header-options-list'>
							{options.length > 0 &&
								options.map((objectData: WidgetOption, index: number) => {
									return (
										<div key={`option-${index.toString()}`}>
											{generateOptions(objectData, theme)}
										</div>
									);
								})}
						</div>
					</div>
				</div>

				<div className={styles.children} data-elem='children'>
					{showFallback && !loading && emptyChartData && (
						<WidgetFallback {...fallbackProps} onReload={onReload} theme={theme} />
					)}
					{Children.map(children, (child, index) => {
						if (isValidElement(child)) {
							return cloneElement(child as ReactElement<{ fallback?: boolean }>, {
								key: child.key ?? `child-${index.toString()}`,
								fallback: !loading && emptyChartData,
							});
						}
						return null;
					})}
				</div>
			</div>
		);
	}
);

export default BaseWidget;
