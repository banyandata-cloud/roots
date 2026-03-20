import React, { useEffect, useRef, useState } from 'react';
import BreadcrumbsArrow from './assets/breadcrumbsArrow';
import BreadcrumbsHome from './assets/breadcrumbsHome';
import BreadcrumbsSplash from './assets/breadcrumbsSplash';
import styles from './BreadCrumbs.module.scss';
import type { BreadcrumbDropdownOption, BreadcrumbsProps } from './types';

const cx = (...classes: (string | undefined | false | null)[]) => classes.filter(Boolean).join(' ');

interface DropdownProps {
	options: BreadcrumbDropdownOption[];
	onClose: () => void;
	position: { top: number; left: number };
}

const CrumbDropdown: React.FC<DropdownProps> = ({ options, onClose, position }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onClose]);

	return (
		<div
			className={styles.dropdown}
			ref={ref}
			style={{ top: position.top, left: position.left }}>
			{options.map((opt, i) => (
				<div
					key={`${opt.value}-${i}`}
					className={styles.dropdownItem}
					onClick={() => {
						opt.onClick?.();
						onClose();
					}}>
					{opt.label}
				</div>
			))}
		</div>
	);
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	crumbs = [],
	type = 'text',
	separator = 'chevron',
	className = '',
}) => {
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});
	const isMouseDown = useRef(false);

	if (!Array.isArray(crumbs) || crumbs.length === 0) return null;

	const typeClass =
		type === 'text-with-line'
			? styles.textWithLine
			: type === 'button'
				? styles.button
				: styles.text;

	const Separator = () => (
		<span className={styles.separator}>
			{separator === 'chevron' ? <BreadcrumbsArrow /> : <BreadcrumbsSplash />}
		</span>
	);

	const getHomeIconColor = (isActive: boolean, isHovered: boolean) => {
		if (type === 'button') {
			if (isActive) return '#535862';
			if (isHovered) return '#717680';
			return '#A4A7AE';
		}
		if (isActive) return '#1570EF';
		if (isHovered) return '#717680';
		return '#A4A7AE';
	};

	return (
		<div className={styles.inlineWrapper}>
			<nav aria-label='breadcrumb' className={cx(styles.root, typeClass, className)}>
				{crumbs.map((crumb, index) => {
					const isFirst = index === 0;
					const isLast = index === crumbs.length - 1;
					const isActive = isLast;
					const isHovered = hoveredIndex === index;
					const isFocused = focusedIndex === index;
					const hasDropdown = crumb.dropdownOptions && crumb.dropdownOptions.length > 0;
					const isDropdownOpen = openDropdownIndex === index;

					return (
						<React.Fragment key={`crumb-${index}`}>
							{!isFirst && <Separator />}
							<div
								role='button'
								tabIndex={crumb.isDisabled ? -1 : 0}
								className={cx(
									styles.crumbItem,
									isActive ? styles.active : '',
									isFocused ? styles.focused : '',
									crumb.isDisabled ? styles.disabled : ''
								)}
								onMouseDown={() => {
									isMouseDown.current = true;
								}}
								onMouseUp={() => {
									isMouseDown.current = false;
								}}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
								onFocus={() => {
									if (!isMouseDown.current) {
										setFocusedIndex(index);
									}
								}}
								onBlur={() => setFocusedIndex(null)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										if (crumb.isDisabled) return;
										if (hasDropdown) {
											setOpenDropdownIndex(isDropdownOpen ? null : index);
											return;
										}
										crumb.onClick?.();
									}
								}}
								onClick={(e) => {
									if (crumb.isDisabled) return;
									if (hasDropdown) {
										const rect = (
											e.currentTarget as HTMLElement
										).getBoundingClientRect();
										setDropdownPos({
											top: rect.bottom + 6,
											left: rect.left,
										});
										setOpenDropdownIndex(isDropdownOpen ? null : index);
										return;
									}
									crumb.onClick?.();
								}}>
								<div className={styles.dropdownWrapper}>
									<div className={styles.crumbContent}>
										{isFirst && (
											<span className={styles.iconWrapper}>
												<BreadcrumbsHome
													color={getHomeIconColor(isActive, isHovered)}
												/>
											</span>
										)}
										{!isFirst && (
											<span
												className={
													crumb.label === '...'
														? styles.crumbEllipsis
														: styles.crumbLabel
												}>
												{crumb.label}
											</span>
										)}
									</div>
									{hasDropdown && isDropdownOpen && (
										<CrumbDropdown
											options={crumb.dropdownOptions!}
											onClose={() => setOpenDropdownIndex(null)}
											position={dropdownPos}
										/>
									)}
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</nav>
		</div>
	);
};

export default Breadcrumbs;
