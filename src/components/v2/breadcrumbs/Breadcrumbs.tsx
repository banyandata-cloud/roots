import React, { useEffect, useRef, useState, type MouseEvent } from 'react';
import { classes } from '../../../utils';
import Button from '../../buttons/button/Button';
import BreadcrumbsArrow from './assets/breadcrumbsArrow';
import BreadcrumbsHome from './assets/breadcrumbsHome';
import BreadcrumbsSplash from './assets/breadcrumbsSplash';
import styles from './BreadCrumbs.module.scss';
import type { BreadcrumbDropdownOption, BreadcrumbSeparator, BreadcrumbsProps } from './types';

interface DropdownProps {
	options: BreadcrumbDropdownOption[];
	onClose: () => void;
	position: { top: number; left: number };
}

const CrumbDropdown: React.FC<DropdownProps> = ({ options, onClose, position }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: globalThis.MouseEvent) => {
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

interface SeparatorProps {
	separator: BreadcrumbSeparator;
}

const Separator: React.FC<SeparatorProps> = ({ separator }) => (
	<span className={styles.separator}>
		{separator === 'chevron' ? <BreadcrumbsArrow /> : <BreadcrumbsSplash />}
	</span>
);

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	crumbs = [],
	type = 'text',
	separator = 'chevron',
	className = '',
}) => {
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [focusedId, setFocusedId] = useState<string | null>(null);
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
			<nav aria-label='breadcrumb' className={classes(styles.root, typeClass, className)}>
				{crumbs.map((crumb, index) => {
					const isFirst = index === 0;
					const isLast = index === crumbs.length - 1;
					const isActive = isLast;
					const isHovered = hoveredId === crumb.id;
					const isFocused = focusedId === crumb.id;
					const hasDropdown = crumb.dropdownOptions && crumb.dropdownOptions.length > 0;
					const isDropdownOpen = openDropdownId === crumb.id;

					return (
						<React.Fragment key={crumb.id}>
							{!isFirst && <Separator separator={separator} />}
							<div
								className={classes(
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
								onMouseEnter={() => setHoveredId(crumb.id)}
								onMouseLeave={() => setHoveredId(null)}
								onFocus={() => {
									if (!isMouseDown.current) {
										setFocusedId(crumb.id);
									}
								}}
								onBlur={() => setFocusedId(null)}
								onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										if (crumb.isDisabled) return;
										if (hasDropdown) {
											setOpenDropdownId(isDropdownOpen ? null : crumb.id);
											return;
										}
										crumb.onClick?.();
									}
								}}>
								<Button
									id={crumb.id}
									type='button'
									disabled={crumb.isDisabled}
									onClick={(e: MouseEvent<HTMLElement>) => {
										if (crumb.isDisabled) return;
										if (hasDropdown) {
											const rect = e.currentTarget.getBoundingClientRect();
											setDropdownPos({
												top: rect.bottom + 6,
												left: rect.left,
											});
											setOpenDropdownId(isDropdownOpen ? null : crumb.id);
											return;
										}
										crumb.onClick?.();
									}}
									blurOnClick={false}
									title={
										<div className={styles.dropdownWrapper}>
											<div className={styles.crumbContent}>
												{isFirst && (
													<span className={styles.iconWrapper}>
														<BreadcrumbsHome
															color={getHomeIconColor(
																isActive,
																isHovered
															)}
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
													options={crumb.dropdownOptions ?? []}
													onClose={() => setOpenDropdownId(null)}
													position={dropdownPos}
												/>
											)}
										</div>
									}
								/>
							</div>
						</React.Fragment>
					);
				})}
			</nav>
		</div>
	);
};

export default Breadcrumbs;
