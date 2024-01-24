import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { Skeleton } from './Skeleton';
import styles from './Tabs.module.css';
import { Dropdown, DropdownItem } from '../input';

const Tabs = (props) => {
	const { tabs, selectedTab, setSelectedTab, theme, loading, fallback, className } = props;

	const onTabClick = (id) => {
		setSelectedTab(id);
	};

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	return (
		<div className={classes(styles.root, styles[`${theme}-theme`], className)}>
			{tabs?.map((tab) => {
				const {
					id,
					title,
					leftIcon: LeftIcon,
					rightIcon: RightIcon,
					disabled,
					dropdownItems,
				} = tab;

				const buttonProps = {
					size: 'auto',
					color: 'default',
					radius: 'none',
					variant: 'text',
					disabled,
					leftComponent:
						LeftIcon &&
						(() => {
							return <LeftIcon className={styles.icon} />;
						}),
				};

				if (dropdownItems) {
					const selected = !!dropdownItems?.find((item) => {
						return item.id === selectedTab;
					});

					return (
						<Button
							key={id}
							{...buttonProps}
							className={classes(styles.main, selected ? styles.active : '')}
							rightComponent={() => {
								return (
									<Dropdown
										className={styles.dropdown}
										onChange={(event, value) => {
											onTabClick(value);
										}}
										placeholder={title}
										value={selectedTab ?? dropdownItems[0].id}>
										{dropdownItems.map((option) => {
											return (
												<DropdownItem
													className={styles.item}
													key={option.id}
													title={option.title}
													value={option.id}
												/>
											);
										})}
									</Dropdown>
								);
							}}
						/>
					);
				}

				return (
					<Button
						key={id}
						{...buttonProps}
						onClick={() => {
							onTabClick(id);
						}}
						title={title}
						className={classes(styles.tab, selectedTab === id ? styles.active : '')}
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
	className: PropTypes.string,
	tabs: PropTypes.arrayOf(PropTypes.string),
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.func,
	theme: PropTypes.oneOf(['light', 'dark']),
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
};

Tabs.defaultProps = {
	className: '',
	tabs: [],
	selectedTab: null,
	setSelectedTab: () => {},
	theme: 'light',
	loading: false,
	fallback: false,
};

export default Tabs;
