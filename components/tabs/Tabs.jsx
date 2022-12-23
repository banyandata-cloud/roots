import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { Button } from '../buttons';
import styles from './Tabs.module.css';

const Tabs = (props) => {
	const { tabs, selectedTab, setSelectedTab } = props;

	const onTabClick = (id) => {
		setSelectedTab(id);
	};

	return (
		<div className={styles.root}>
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
