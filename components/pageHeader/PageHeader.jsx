import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { BreadCrumbs } from '../breadcrumbs';
import styles from './PageHeader.module.css';

const PageHeader = (props) => {
	const {
		theme,
		title,
		children,
		compact,
		rightAction: RightAction,
		crumbsProps,
		className,
		startLeft,
	} = props;

	return (
		<div
			className={classes(
				styles.root,
				compact ? styles.compact : '',
				styles[`${theme}-theme`],
				className
			)}>
			<div className={styles.breadcrumb}>
				<BreadCrumbs
					{...{
						...crumbsProps,
						theme,
						className: styles.breadcrumb,
						homeTitle: title,
					}}
				/>
			</div>
			<div className={classes(styles.contents, startLeft ? styles['start-left'] : '')}>
				{RightAction && (
					<div className={styles.right}>
						<RightAction />
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	theme: PropTypes.oneOf(['dark', 'light']),
	crumbsProps: PropTypes.shape(BreadCrumbs.propTypes),
	rightAction: PropTypes.node,
	className: PropTypes.string,
};

PageHeader.defaultProps = {
	title: '',
	theme: 'light',
	crumbsProps: {},
	rightAction: null,
	className: '',
};

export default PageHeader;
