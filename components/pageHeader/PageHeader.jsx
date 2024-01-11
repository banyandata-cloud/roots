import PropTypes from 'prop-types';
import styles from './PageHeader.module.css';
import { BreadCrumbs } from '../breadcrumbs';
import { classes } from '../../utils';

const PageHeader = (props) => {
	const {
		theme,
		title,
		children,
		rightAction: RightAction,
		crumbsProps,
		startLeft,
		compact,
		className,
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
	startLeft: PropTypes.bool,
	compact: PropTypes.bool,
	className: PropTypes.string,
};

PageHeader.defaultProps = {
	title: '',
	theme: 'light',
	crumbsProps: {},
	rightAction: null,
	startLeft: false,
	compact: false,
	className: '',
};

export default PageHeader;
