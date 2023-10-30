import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './Breadcrumbs.module.css';
import { getSpacedDisplayName, classes } from '../../utils/utils';
import BreadcrumbSeperator from '../icons/BreadcrumbSeperator/BreadcrumbSeperator';
import { Link } from '../link';
import { ArrowIcon, HomeIcon } from '../icons';
import Button from '../buttons/button/Button';

const BreadCrumbs = (props) => {
	const {
		crumbs,
		maxItems,
		itemsBeforeCollapse,
		itemsAfterCollapse,
		linkComponent,
		theme,
		onBackClick,
		onHomeClick,
	} = props;

	const [expand, setExpand] = useState(false);

	let href = `/${crumbs?.[0]?.path}`;
	const crumbsList = crumbs?.slice(1);

	const CrumbsDOM =
		crumbsList !== null &&
		crumbsList.map((crumb, index) => {
			const { title, value, path, search, icon } = crumb;

			const active = index === crumbsList.length - 1;
			const showSeperator = index < crumbsList.length - 1;

			href += `/${path}`;

			return (
				<React.Fragment key={path}>
					<Link
						href={!active && `${href}${search ?? ''}`}
						underline='none'
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
					{showSeperator && <BreadcrumbSeperator className={styles.seperator} />}
				</React.Fragment>
			);
		});

	if (crumbsList !== null && CrumbsDOM.length > maxItems && !expand) {
		CrumbsDOM.splice(
			itemsBeforeCollapse,
			CrumbsDOM.length - (itemsAfterCollapse + itemsBeforeCollapse),
			<React.Fragment key='expand'>
				<Button
					className={styles.expand}
					size='auto'
					color='default'
					title='...'
					onClick={() => {
						setExpand(true);
					}}
				/>
				<BreadcrumbSeperator className={styles.seperator} />
			</React.Fragment>
		);
	}

	return (
		crumbs?.length > 1 && (
			<div className={classes(styles.root, styles[`theme-${theme}`])}>
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
					className={styles['crumb-actions']}
					leftComponent={() => {
						return <HomeIcon className={styles.icon} position='left' />;
					}}
					onClick={onHomeClick}
				/>
				{CrumbsDOM}
			</div>
		)
	);
};

BreadCrumbs.propTypes = {
	theme: PropTypes.oneOf(['light', 'dark']),
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
};

BreadCrumbs.defaultProps = {
	theme: 'dark',
	crumbs: [],
	maxItems: 4,
	itemsBeforeCollapse: 2,
	itemsAfterCollapse: 1,
	linkComponent: 'a',
};

export default BreadCrumbs;
