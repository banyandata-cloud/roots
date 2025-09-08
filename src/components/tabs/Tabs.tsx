import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactElement,
	type SyntheticEvent,
} from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import Dropdown from '../input/dropdown/Dropdown';
import DropdownItem from '../input/dropdown/dropdown-item/DropdownItem';
import styles from './Tabs.module.css';
import type { TabsProps } from './types';

const Tabs = (props: TabsProps): ReactElement => {
	const {
		tabs = [],
		className = '',
		selectedTab,
		setSelectedTab,
		direction = 'horizontal',
		children = null,
	} = props;

	const vertical = direction === 'vertical';

	const [sliderLeft, setSliderLeft] = useState<number>(0);
	const [sliderWidth, setSliderWidth] = useState<number>(0);
	const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

	const tabIndex = tabs.findIndex((tab) => {
		if (tab.dropdown) {
			const dropdownItem = tab.dropdownItems?.find((item) => {
				return item.id === selectedTab;
			});
			return !!dropdownItem;
		}
		return tab.id === selectedTab;
	});

	const selectedTabIndex = tabIndex !== -1 ? tabIndex : 0;

	const [activeTab, setActiveTab] = useState<number>(0);

	useEffect(() => {
		setActiveTab(selectedTabIndex);
	}, [selectedTabIndex]);

	const updateSliderPosition = useCallback(() => {
		const activeTabElement = tabRefs.current[activeTab];

		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	}, [activeTab]);

	useEffect(() => {
		updateSliderPosition();
	}, [activeTab, tabs, selectedTab, updateSliderPosition]);

	const handleTabClick = (id: string, index: number) => {
		setSelectedTab(id);
		setActiveTab(index);
	};

	const handleDropClick = (selectedValue: string) => {
		setSelectedTab(selectedValue);
		updateSliderPosition();
	};

	return (
		<div
			className={classes(
				vertical ? styles['tabs-container-vertical'] : styles['tabs-container'],
				className
			)}>
			<div className={vertical ? styles.vertical : styles.tabs}>
				{tabs.map((tab, index) => {
					const isActive = tab.id === selectedTab;
					const {
						id,
						title,
						leftIcon: LeftIcon,
						rightIcon: RightIcon,
						disabled,
						dropdown,
						dropdownItems,
					} = tab;

					const getLeftComponent = () => {
						if (LeftIcon) {
							if (
								typeof LeftIcon === 'object' &&
								(LeftIcon.Active || LeftIcon.InActive)
							) {
								if (isActive && LeftIcon.Active) {
									return <LeftIcon.Active />;
								}
								if (LeftIcon.InActive) {
									return <LeftIcon.InActive />;
								}
							}
							if (typeof LeftIcon === 'function') {
								return <LeftIcon />;
							}
						}
						return null;
					};

					return (
						<div
							key={tab.id}
							ref={(ref) => {
								tabRefs.current[index] = ref;
							}}
							className={classes(
								styles.tab,
								vertical ? styles.vertical : styles.horizontal,
								isActive ? styles.active : ''
							)}>
							{dropdown ? (
								<Dropdown
									className={`${String(styles.dropdown)} ${String(
										isActive && styles.active
									)}`}
									onChange={(_: SyntheticEvent, selectedValue) => {
										handleDropClick(selectedValue?.toString() ?? '');
										setActiveTab(index);
									}}
									value={selectedTab}
									placeholder={title}>
									{dropdownItems?.map((option) => {
										return (
											<DropdownItem
												key={option.id}
												title={option.title}
												value={option.id}
											/>
										);
									})}
								</Dropdown>
							) : (
								<Button
									size='auto'
									radius='none'
									key={id}
									variant='text'
									disabled={disabled}
									className={isActive ? styles.active : ''}
									title={title}
									onClick={() => {
										handleTabClick(tab.id, index);
									}}
									leftComponent={() => {
										return getLeftComponent();
									}}
									rightComponent={
										RightIcon &&
										(() => {
											return <RightIcon className={styles.icon} />;
										})
									}
								/>
							)}
						</div>
					);
				})}
				<div
					className={vertical ? styles['tab-slider-vertical'] : styles['tab-slider']}
					style={{
						left: `${String(sliderLeft)}px`,
						width: `${String(sliderWidth)}px`,
					}}
				/>
			</div>
			<div className={!vertical ? styles['tab-content'] : styles['tab-content-vertical']}>
				{children}
			</div>
		</div>
	);
};

export default Tabs;
