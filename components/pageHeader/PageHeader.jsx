import PropTypes from 'prop-types';
import styles from './PageHeader.module.css';
import { BreadCrumbs } from '../breadcrumbs';
import { Chip } from '../buttons/chip';
import { classes } from '../../utils';

const PageHeader = (props) => {
	const {
		theme,
		title,
		description,
		children,
		chipTitle,
		rightAction: RightAction,
		crumbsProps,
	} = props;

	return (
		<div className={classes(styles.root, styles[`${theme}-theme`])}>
			<div className={styles.breadcrumb}>
				<BreadCrumbs
					{...{
						...crumbsProps,
						theme,
						className: styles.breadcrumb,
					}}
				/>
			</div>
			<div className={styles.contents}>
				<div className={styles.left}>
					<div className={styles.title}>{title}</div>
					{chipTitle && (
						<Chip
							className={styles.chip}
							size='sm'
							title={chipTitle}
							radius='ellipse'
							variant='status'
						/>
					)}
				</div>
				{RightAction && (
					<div className={styles.right}>
						<RightAction />
					</div>
				)}
			</div>
			<div className={styles.description}>{description}</div>
			{children}
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	theme: PropTypes.oneOf(['dark', 'light']),
	chipTitle: PropTypes.string,
	crumbsProps: PropTypes.shape(BreadCrumbs.propTypes),
	rightAction: PropTypes.node,
};

PageHeader.defaultProps = {
	title: 'Page Header',
	description: '',
	theme: 'light',
	chipTitle: null,
	crumbsProps: {},
	rightAction: null,
};

export default PageHeader;
