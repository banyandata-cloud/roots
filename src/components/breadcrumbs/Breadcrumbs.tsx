import React, { useState } from 'react';
import { classes } from '../../utils/utils';
import Button from '../buttons/button/Button';
import { CaretIcon } from '../icons';
import { Popover } from '../popover';
import styles from './Breadcrumbs.module.css';
import type { BreadCrumbsProps } from './types';

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ crumbs = [], className = '' }) => {
	const [expand, setExpand] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	if (!Array.isArray(crumbs) || crumbs.length === 0) return null;

	const CrumbsDOM = crumbs.map((crumb, index) => {
		const { title, value, icon, navigate, isDisabled = false } = crumb;
		const active = index === crumbs.length - 1;

		return (
			<div
				key={`${title}-${index.toString()}`}
				className={classes(styles['crumb-list'], active ? styles.active : '')}
				onClick={!isDisabled ? navigate : undefined}
				data-state={active}>
				<div className={styles.left}>
					{icon && <div className={styles.iconWrapper}>{icon}</div>}
					{value && (
						<span className={styles.value}>
							{title && `${title}: `}
							{value}
						</span>
					)}
				</div>
				<div className={styles.right}>
					{index === 0 && <div className={styles.circle} />}
					{index !== 0 && index !== crumbs.length - 1 && (
						<div className={styles['circle-dropdown']}>
							<CaretIcon className={styles.icon} />
						</div>
					)}
					{index === crumbs.length - 1 && <div className={styles['circle-filled']} />}
				</div>
			</div>
		);
	});

	const lastCrumb = crumbs[crumbs.length - 1];
	const icon = lastCrumb?.icon;
	const buttonTitle = `${lastCrumb?.title ?? ''} : ${String(lastCrumb?.value)}`;

	return (
		<div className={classes(styles.root, className)}>
			<Button
				ref={(el: HTMLDivElement | null) => {
					setAnchorEl(el);
				}}
				onClick={() => {
					if (crumbs.length > 1)
						setExpand((prev) => {
							return !prev;
						});
				}}
				className={classes(
					styles.selected,
					expand ? styles.expand : '',
					icon ? styles.gap : ''
				)}
				title={buttonTitle}
				leftComponent={
					icon
						? () => {
								return <div className={styles.iconWrapper}>{icon}</div>;
							}
						: undefined
				}
				rightComponent={() => {
					return (
						<CaretIcon
							className={classes(styles.icon, expand && styles.expand)}
							upDown
						/>
					);
				}}
			/>
			<Popover
				className={styles.popover}
				anchorEl={anchorEl}
				open={expand}
				placement='bottom-start'
				setOpen={setExpand}>
				{CrumbsDOM}
			</Popover>
		</div>
	);
};

export default BreadCrumbs;
