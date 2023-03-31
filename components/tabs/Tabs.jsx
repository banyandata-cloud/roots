import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { Button } from '../buttons';
import styles from './Tabs.module.css';

const Tabs = (props) => {
	const { tabs, selectedTab, setSelectedTab, theme } = props;

	const onTabClick = (id) => {
		setSelectedTab(id);
	};

	return (
		<div className={classes(styles.root, styles[`${theme}-theme`])}>
			{tabs?.map((tab) => {
				const { id, title, leftIcon: LeftIcon, rightIcon: RightIcon } = tab;

				return (
					<Button
						size='auto'
						color='default'
						radius='none'
						key={id}
						variant='text'
						onClick={() => {
							onTabClick(id);
						}}
						title={title}
						className={classes(styles.tab, selectedTab === id ? styles.active : '')}
						leftComponent={
							LeftIcon &&
							(() => {
								return <LeftIcon className={styles.icon} />;
							})
						}
						rightComponent={
							RightIcon &&
							(() => {
								return <RightIcon className={styles.icon} />;
							})
						}
					/>
				);
			})}
		</div>
	);
};

Tabs.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.string),
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
};

Tabs.defaultProps = {
	tabs: [],
	selectedTab: null,
	setSelectedTab: () => {},
	theme: 'light',
};

export default Tabs;
