/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { classes } from '../../utils/utils';
import Button from '../buttons/button/Button';
import { Popover } from '../popover';
import { Link } from '../link';
import styles from './Breadcrumbs.module.css';
import { CaretIcon, FlowChartIcon } from '../icons';

const BreadCrumbs = (props) => {
	const { crumbs = [], className = '' } = props;

	const [expand, setExpand] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	if (!crumbs) {
		return null;
	}

	const CrumbsDOM =
		crumbs !== null &&
		crumbs?.map((crumb, index) => {
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
						{title && <span className={styles.label}>{title} : </span>}
						{value && <span className={styles.value}>{value}</span>}
					</div>
					<div className={styles.right}>
						{index === 0 && <div className={styles.circle} />}
						{index !== 0 && index !== (crumbs?.length ?? 1) - 1 && (
							<div className={styles['circle-dropdown']}>
								<CaretIcon className={styles.icon} />
							</div>
						)}
						{index === (crumbs?.length ?? 1) - 1 && (
							<div className={styles['circle-filled']} />
						)}
					</div>
				</Link>
			);
		});
	return (
		<div className={classes(styles.root, className)}>
			<Button
				ref={setAnchorEl}
				onClick={() => {
					if (crumbs?.length > 1) {
						setExpand((prev) => {
							return !prev;
						});
					}
				}}
				className={classes(styles.selected, expand ? styles.expand : '')}
				leftComponent={() => {
					return (
						crumbs?.[(crumbs?.length ?? 1) - 1]?.icon && (
							<div className={classes(styles.iconWrapper)}>
								{crumbs?.[(crumbs?.length ?? 1) - 1]?.icon}
							</div>
						)
					);
				}}
				title={`${crumbs?.[(crumbs?.length ?? 1) - 1]?.title} : ${
					crumbs?.[(crumbs?.length ?? 1) - 1]?.value
				}`}
				rightComponent={() => {
					return <FlowChartIcon className={classes(expand ? '' : styles.icon)} />;
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
