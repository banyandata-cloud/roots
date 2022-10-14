import PropTypes from 'prop-types';
import styles from './PageHeader.module.css';
import BreadCrumbs from '../breadcumbs/Breadcrumbs';
import Chip from '../chip/Chip';
import { classes } from '../../utils';

const PageHeader = (props) => {
	const { theme, title, description, children, chipTitle, renderRightAction } = props;

	return (
		<div className={classes(styles.root, styles[theme])}>
			<div className={styles.breadcrumb}>
				<BreadCrumbs {...props} />
			</div>
			<div className={styles.contents}>
				<div className={styles.left}>
					<div className={styles.title}>{title}</div>
					{chipTitle && (
						<Chip
							variant='contained'
							color='primary'
							size='small'
							title={chipTitle}
							radius='ellipsis'
							customClass={styles.chip}
						/>
					)}
				</div>
				{renderRightAction && <div className={styles.right}>{renderRightAction}</div>}
			</div>
			<div className={styles.description}>{description}</div>
			{children}
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};

PageHeader.defaultProps = {
	title: 'Page Header',
	description: '',
};

export default PageHeader;
