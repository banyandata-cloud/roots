import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.module.css';

import { getSpacedDisplayName, classes } from '../../utils/utils';
import BreadcrumbSeperator from '../icons/BreadcrumbSeperator/BreadcrumbSeperator';
import { Link } from '../link';
import Button from '../buttons/button/Button';

const BreadCrumbs = (props) => {
	const { crumbs, maxItems, itemsBeforeCollapse, itemsAfterCollapse, linkComponent } = props;

	const [expand, setExpand] = useState(false);

	let href = '';

	const CrumbsDOM = crumbs.map((crumb, index) => {
		const { title, path, icon } = crumb;

		const active = index === crumbs.length - 1;
		const showSeperator = index < crumbs.length - 1;

		href += `/${path}`;

		return (
			<React.Fragment key={path}>
				<Link
					href={!active && href}
					underline={!active ? 'hover' : 'none'}
					className={classes(styles.crumb, active ? styles.active : '')}
					dataAttrs={{
						'data-state': active,
					}}
					component={!active ? linkComponent : 'span'}>
					{icon && icon}
					{title && <span>{getSpacedDisplayName(title).replace(/-/g, ' ')}</span>}
				</Link>
				{showSeperator && <BreadcrumbSeperator className={styles.seperator} />}
			</React.Fragment>
		);
	});

	if (CrumbsDOM.length > maxItems && !expand) {
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

	return <div className={classes(styles.root)}>{CrumbsDOM}</div>;
};

BreadCrumbs.propTypes = {
	crumbs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
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
	crumbs: [],
	maxItems: 4,
	itemsBeforeCollapse: 2,
	itemsAfterCollapse: 1,
	linkComponent: 'a',
};

export default BreadCrumbs;
