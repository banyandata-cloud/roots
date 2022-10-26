import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
import styles from './Breadcrumbs.module.css';

import { getSpacedDisplayName, classes } from '../../utils/utils';
import BreadcrumbSeperator from '../icons/BreadcrumbSeperator/BreadcrumbSeperator';

const BreadCrumbs = (props) => {
	const { crumbs, maxItems, itemsBeforeCollapse, itemsAfterCollapse } = props;
	return (
		<div className={classes(styles.container)}>
			<Breadcrumbs
				{...props}
				maxItems={maxItems}
				itemsBeforeCollapse={itemsBeforeCollapse}
				itemsAfterCollapse={itemsAfterCollapse}
				separator={<BreadcrumbSeperator className={styles.seperator} />}
				aria-label='breadcrumb'>
				{crumbs.map((crumb, index) => {
					const active = index === crumbs.length - 1;
					return (
						<Link href=' ' key={crumb} underline='hover'>
							<span
								data-elem={`breadcrumb-item${active ? '-active' : ''}`}
								className={classes(
									styles['breadcrumb-item'],
									active ? styles.active : ''
								)}>
								{getSpacedDisplayName(crumb).replace(/-/g, ' ')}
							</span>
						</Link>
					);
				})}
			</Breadcrumbs>
		</div>
	);
};

BreadCrumbs.propTypes = {
	crumbs: PropTypes.arrayOf(PropTypes.string),
	maxItems: PropTypes.number,
	itemsBeforeCollapse: PropTypes.number,
	itemsAfterCollapse: PropTypes.number,
};

BreadCrumbs.defaultProps = {
	crumbs: [],
	maxItems: 4,
	itemsBeforeCollapse: 2,
	itemsAfterCollapse: 1,
};

export default BreadCrumbs;
