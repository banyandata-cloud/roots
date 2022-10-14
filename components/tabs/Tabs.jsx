import PropTypes from 'prop-types';
import { classes } from '../../utils';
import styles from './Tabs.module.css';

const Tabs = (props) => {
	const { tabs, selectedTab, setSelectedTab } = props;

	const tabViewClassName = (id) => {
		return id === selectedTab ? `${styles['tab-view-selected']}` : `${styles['tab-view']}`;
	};

	const onTabClick = (id) => {
		setSelectedTab(id);
	};

	return (
		<div className={styles.root}>
			{tabs?.map((tab) => {
				const { id, title, leftIcon: LeftIcon, rightIcon: RightIcon } = tab;

				return (
					<div
						key={tab}
						onClick={() => {
							return onTabClick(id);
						}}
						className={tabViewClassName(id)}>
						<div className={styles.content}>
							<div className={styles.left}>
								<div
									style={{
										paddingRight: LeftIcon ? 5 : 0,
									}}>
									<span className={styles['icon-container']}>
										{LeftIcon && <LeftIcon className={classes(styles.icon)} />}
									</span>
								</div>
								<span
									style={{
										paddingRight: !RightIcon ? 8 : 0,
									}}>
									{title}
								</span>
							</div>
							{RightIcon && (
								<div className={styles.right}>
									<vl className={styles.saperator} />
									<span className={styles['icon-container']}>
										<RightIcon className={classes(styles.icon)} />
									</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

Tabs.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.string),
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.string,
};

Tabs.defaultProps = {
	tabs: [
		{
			id: '1',
			title: 'Tab1',
			leftIcon: '',
			rightIcon: '',
		},
		{
			id: '2',
			title: 'Tab2',
			leftIcon: '',
			rightIcon: '',
		},
		{
			id: '3',
			title: 'Tab3',
			leftIcon: '',
			rightIcon: '',
		},
		{
			id: '4',
			title: 'Tab4',
			leftIcon: '',
			rightIcon: '',
		},
	],
	selectedTab: 'Tab1',
	setSelectedTab: 'None',
};

export default Tabs;
