import React, { useEffect, useRef, useState } from 'react';
import { classes } from '../../../utils';
import Button from '../../v2/buttons/button/Button';
import Link from '../../v2/link/Link';
import BreadcrumbsArrow from './assets/breadcrumbsArrow';
import BreadcrumbsHome from './assets/breadcrumbsHome';
import BreadcrumbsSplash from './assets/breadcrumbsSplash';
import styles from './BreadCrumbs.module.scss';
import type { BreadcrumbsProps, DropdownProps, SeparatorProps } from './types';

const CrumbDropdown: React.FC<DropdownProps> = ({ options, onClose, anchorRef }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	const updatePosition = () => {
		if (anchorRef.current) {
			const rect = anchorRef.current.getBoundingClientRect();
			setPosition({ top: rect.bottom + 6, left: rect.left });
		}
	};

	useEffect(() => {
		updatePosition();

		const handleClickOutside = (e: globalThis.MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		};

		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={ref}
			className={styles.dropdown}
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

const Separator: React.FC<SeparatorProps> = ({ separator }) => (
	<span className={styles.separator} aria-hidden='true'>
		{separator === 'chevron' ? <BreadcrumbsArrow /> : <BreadcrumbsSplash />}
	</span>
);

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	crumbs = [],
	type = 'text',
	separator = 'chevron',
	className = '',
	activeIndex,
}) => {
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
	const [focusedId, setFocusedId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const isMouseDown = useRef(false);
	const crumbRefs = useRef<Map<string, React.RefObject<HTMLSpanElement | null>>>(new Map());

	const breadcrumbBtnClass = styles.breadcrumbBtn!;

	if (!Array.isArray(crumbs) || crumbs.length === 0) return null;

	const isTextVariant = type === 'text' || type === 'text-with-line';

	const rootClass = classes(
		styles.root,
		type === 'text-with-line'
			? styles.textWithLine
			: type === 'button'
				? styles.button
				: styles.text,
		className
	);

	const getCrumbRef = (crumbId: string): React.RefObject<HTMLSpanElement | null> => {
		if (!crumbRefs.current.has(crumbId)) {
			crumbRefs.current.set(crumbId, React.createRef<HTMLSpanElement>());
		}
		return crumbRefs.current.get(crumbId)!;
	};

	return (
		<nav
			aria-label='breadcrumb'
			className={rootClass}
			onMouseDown={() => {
				isMouseDown.current = true;
			}}
			onMouseUp={() => {
				isMouseDown.current = false;
			}}>
			{crumbs.map((crumb, index) => {
				const crumbId = crumb.id ?? `crumb-${index}`;
				const isFirst = index === 0;
				const isLast = index === crumbs.length - 1;
				const isActive = typeof activeIndex === 'number' ? index === activeIndex : isLast;
				const isFocused = focusedId === crumbId;
				const isHovered = hoveredId === crumbId;
				const hasDropdown = Boolean(crumb.dropdownOptions?.length);
				const isDropdownOpen = openDropdownId === crumbId;
				const crumbRef = getCrumbRef(crumbId);

				const sharedItemClass = classes(
					styles.crumbItem,
					isFirst ? styles.iconCrumbItem : '',
					isActive ? styles.active : '',
					isFocused ? styles.focused : '',
					crumb.isDisabled ? styles.disabled : ''
				);

				const iconColor = isFirst
					? isActive
						? '#1570EF'
						: isHovered
							? '#414651'
							: '#A4A7AE'
					: '#A4A7AE';

				const buttonIconColor = isFirst
					? isActive
						? '#535862'
						: isHovered
							? '#414651'
							: '#A4A7AE'
					: '#A4A7AE';

				const handleDropdownToggle = () => {
					setOpenDropdownId(isDropdownOpen ? null : crumbId);
				};

				const handleKeyDown = (e: React.KeyboardEvent) => {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					e.preventDefault();
					if (crumb.isDisabled) return;
					if (hasDropdown) {
						setOpenDropdownId(isDropdownOpen ? null : crumbId);
						return;
					}
					crumb.onClick?.();
				};

				const focusHandlers = {
					onFocus: () => {
						if (!isMouseDown.current) setFocusedId(crumbId);
					},
					onBlur: () => setFocusedId(null),
				};

				return (
					<React.Fragment key={crumbId}>
						{!isFirst && <Separator separator={separator} />}

						<span
							ref={crumbRef}
							className={sharedItemClass}
							onMouseEnter={() => setHoveredId(crumbId)}
							onMouseLeave={() => setHoveredId(null)}
							onKeyDown={handleKeyDown}
							{...focusHandlers}>
							{isFirst ? (
								isTextVariant ? (
									<Link
										variant='unstyled'
										href={crumb.href ?? 'javascript:void(0)'}
										disabled={crumb.isDisabled ?? false}
										className={breadcrumbBtnClass}
										attrs={{ id: crumbId }}>
										<span className={styles.iconWrapper}>
											<BreadcrumbsHome color={iconColor} />
										</span>
									</Link>
								) : (
									<span className={styles.iconCrumbWrapper}>
										<Button
											id={crumbId}
											type='button'
											variant='unstyled'
											className={breadcrumbBtnClass}
											disabled={crumb.isDisabled}
											blurOnClick={false}
											onClick={() => {
												if (!crumb.isDisabled) crumb.onClick?.();
											}}
											title={
												<span className={styles.iconWrapper}>
													<BreadcrumbsHome color={buttonIconColor} />
												</span>
											}
										/>
									</span>
								)
							) : (
								<>
									<Button
										id={crumbId}
										type='button'
										variant='unstyled'
										className={classes(
											breadcrumbBtnClass,
											isActive ? styles.activeLink : ''
										)}
										disabled={crumb.isDisabled}
										blurOnClick={false}
										onClick={() => {
											if (crumb.isDisabled) return;
											if (hasDropdown) {
												handleDropdownToggle();
												return;
											}
											crumb.onClick?.();
										}}
										title={
											<span
												className={
													crumb.label === '...'
														? styles.crumbEllipsis
														: styles.crumbLabel
												}>
												{crumb.label}
											</span>
										}
									/>
									{hasDropdown && isDropdownOpen && (
										<CrumbDropdown
											options={crumb.dropdownOptions ?? []}
											onClose={() => setOpenDropdownId(null)}
											anchorRef={crumbRef}
										/>
									)}
								</>
							)}
						</span>
					</React.Fragment>
				);
			})}
		</nav>
	);
};

export default Breadcrumbs;
