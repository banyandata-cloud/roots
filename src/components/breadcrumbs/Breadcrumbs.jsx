/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { classes, getSpacedDisplayName } from '../../utils/utils';
import Button from '../buttons/button/Button';
import { ArrowIcon, HomeIcon } from '../icons';
import BreadcrumbSeparator from '../icons/BreadcrumbSeperator/BreadcrumbSeperator';
import { Link } from '../link';
import { Popover } from '../popover';
import styles from './Breadcrumbs.module.css';

const BreadCrumbs = (props) => {
	const {
		crumbs,
		maxItems,
		itemsBeforeCollapse,
		itemsAfterCollapse,
		linkComponent,
		onBackClick,
		onHomeClick,
		homeTitle,
		className,
	} = props;

	const [expand, setExpand] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	// let href = `/${crumbs?.[0]?.path}`;
	const crumbsList = crumbs?.slice(1);

	const CrumbsDOM =
		crumbsList !== null &&
		crumbsList.map((crumb, index) => {
			const { title, value, icon, navigate, isDisabled = false } = crumb;

			const active = index === crumbsList.length - 1;
			const showSeparator = index < crumbsList.length - 1;

			return (
				<React.Fragment key={title}>
					<Link
						underline='none'
						onClick={!isDisabled ? navigate : null}
						className={classes(styles.crumb, active ? styles.active : '')}
						dataAttrs={{
							'data-state': active,
						}}
						component={!active ? linkComponent : 'span'}
						stroke={!active ? 'regular' : 'medium'}>
						{icon && <div className={classes(styles.iconWrapper)}>{icon}</div>}
						{title && (
							<span className={classes(styles.title)}>
								{getSpacedDisplayName(title).replace(/-/g, ' ')} :
							</span>
						)}
						{value && (
							<span className={classes(styles.value)}>
								{getSpacedDisplayName(value).replace(/-/g, ' ')}
							</span>
						)}
					</Link>
					{showSeparator && <BreadcrumbSeparator className={styles.separator} />}
				</React.Fragment>
			);
		});

	// const tempCrumbsDropList = crumbsList;
	crumbsList.splice(0, 1);
	crumbsList.splice(crumbsList.length - 1, 1);

	const crumbsDropList = crumbsList.map((crumb) => {
		const { title, value, navigate, isDisabled = false } = crumb;

		return (
			<React.Fragment key={title}>
				<Link
					underline='none'
					onClick={!isDisabled ? navigate : null}
					className={classes(styles['crumb-list'])}
					component={linkComponent}
					stroke='regular'>
					{title && (
						<span className={classes(styles.title)}>
							{getSpacedDisplayName(title).replace(/-/g, ' ')} :
						</span>
					)}
					{value && (
						<span className={classes(styles.value)}>
							{getSpacedDisplayName(value).replace(/-/g, ' ')}
						</span>
					)}
				</Link>
			</React.Fragment>
		);
	});

	if (crumbsList !== null && CrumbsDOM.length > maxItems) {
		CrumbsDOM.splice(
			itemsBeforeCollapse,
			CrumbsDOM.length - (itemsAfterCollapse + itemsBeforeCollapse),
			<React.Fragment key='expand'>
				<Button
					className={styles.expand}
					size='auto'
					color='default'
					title='...'
					ref={(el) => {
						setAnchorEl(el);
					}}
					onClick={() => {
						setExpand((prev) => {
							return !prev;
						});
					}}
				/>
				<Popover
					className={classes(styles.popover, styles['popover-light'])}
					anchorEl={anchorEl}
					open={expand}
					placement='bottom-end'
					setOpen={setExpand}>
					{crumbsDropList}
				</Popover>
				<BreadcrumbSeparator className={styles.separator} />
			</React.Fragment>
		);
	}

	if (crumbs?.length <= 1) {
		return (
			<div className={classes(styles.root)}>
				<Button
					size='auto'
					radius='round'
					className={classes(styles['crumb-actions'], styles.home, styles.highlight)}
					title={homeTitle}
					leftComponent={() => {
						return <HomeIcon className={styles.icon} position='left' />;
					}}
				/>
			</div>
		);
	}

	return (
		crumbs?.length > 1 && (
			<div className={classes(styles.root, className)}>
				<Button
					size='auto'
					radius='round'
					className={styles['crumb-actions']}
					leftComponent={() => {
						return <ArrowIcon className={styles.icon} position='left' />;
					}}
					onClick={onBackClick}
				/>
				<Button
					size='auto'
					radius='round'
					className={classes(styles['crumb-actions'], styles.home)}
					leftComponent={() => {
						return <HomeIcon className={styles.icon} position='left' />;
					}}
					title={homeTitle}
					onClick={onHomeClick}
				/>
				<BreadcrumbSeparator className={styles.separator} />
				{CrumbsDOM}
			</div>
		)
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
	maxItems: PropTypes.number,
	itemsBeforeCollapse: PropTypes.number,
	itemsAfterCollapse: PropTypes.number,
	linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	homeTitle: PropTypes.string,
	className: PropTypes.string,
};

BreadCrumbs.defaultProps = {
	crumbs: [],
	maxItems: 2,
	itemsBeforeCollapse: 1,
	itemsAfterCollapse: 1,
	linkComponent: 'a',
	homeTitle: '',
	className: '',
};

export default BreadCrumbs;
