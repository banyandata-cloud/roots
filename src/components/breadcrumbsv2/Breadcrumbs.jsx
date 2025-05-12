/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { classes } from '../../utils/utils';
import Button from '../buttons/button/Button';
import { CaretIcon } from '../icons';
import { Link } from '../link';
import { Popover } from '../popover';
import styles from './Breadcrumbs.module.css';

const BreadCrumbs = (props) => {
	const { crumbs = [], className = '' } = props;

	const [expand, setExpand] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	if (!crumbs || crumbs.length === 0) {
		return null;
	}

	const CrumbsDOM = crumbs.map((crumb = {}, index) => {
		const { title, value, icon, navigate, isDisabled = false } = crumb;
		const active = index === crumbs.length - 1;

		return (
			<Link
				underline='none'
				key={crumb}
				onClick={!isDisabled ? navigate : null}
				className={classes(styles['crumb-list'], active ? styles.active : '')}
				dataAttrs={{
					'data-state': active,
				}}>
				<div className={styles.left}>
					{icon && <div className={classes(styles.iconWrapper)}>{icon}</div>}
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
			</Link>
		);
	});

	const icon = crumbs[crumbs.length - 1]?.icon;

	return (
		<div className={classes(styles.root, className)}>
			<Button
				ref={setAnchorEl}
				onClick={() => {
					if (crumbs.length > 1) {
						setExpand((prev) => {
							return !prev;
						});
					}
				}}
				className={classes(
					styles.selected,
					expand ? styles.expand : '',
					icon ? styles.gap : ''
				)}
				{...(icon && {
					leftComponent: () => {
						return <div className={classes(styles.iconWrapper)}>{icon}</div>;
					},
				})}
				title={`${crumbs[crumbs.length - 1]?.title} : ${crumbs[crumbs.length - 1]?.value}`}
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
				className={classes(styles.popover)}
				anchorEl={anchorEl}
				open={expand}
				placement='bottom-start'
				setOpen={setExpand}>
				{CrumbsDOM}
			</Popover>
		</div>
	);
};

BreadCrumbs.propTypes = {
	crumbs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			value: PropTypes.string,
			path: PropTypes.string,
			icon: PropTypes.node,
		})
	),
	className: PropTypes.string,
};

export default BreadCrumbs;
