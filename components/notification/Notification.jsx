/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import styles from './Notification.module.css';
import { Button } from '../buttons';
import { Toggle } from '../Toggle';
import { classes } from '../../utils';

const Notification = (props) => {
	const {
		options,
		selectedToggle,
		setSelectedToggle,
		messageOptions,
		Viewtitle,
		Marktitle,
		onView,
		onMark,
	} = props;
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.firstrow}>
					<p className={styles.notification}>Notifications</p>
					<Button
						key={Viewtitle}
						className={classes(styles['view-button'])}
						onClick={onView}
						title={Viewtitle}
					/>
				</div>
				<div className={styles.secondrow}>
					<Toggle
						className={styles.toggle}
						options={options}
						selectedToggle={selectedToggle}
						setSelectedToggle={setSelectedToggle}
					/>
					<Button
						key={Marktitle}
						className={classes(styles['mark-button'])}
						onClick={onMark}
						title={Marktitle}
					/>
				</div>
			</div>
			{messageOptions.map((option) => {
				const {
					title,
					leftComponent,
					rightComponent,
					time,
					acceptTitle,
					rejectTitle,
					onAccept,
					onReject,
					actions,
				} = option;

				return (
					<div key={option} className={styles.body}>
						<p
							className={styles.content}
							key={title}
							title={title}
							leftComponent={leftComponent}
							rightComponent={rightComponent}>
							{title}
						</p>
						{actions === true ? (
							<div className={styles.actions}>
								<Button
									key={acceptTitle}
									title={acceptTitle}
									onAccept={onAccept}
									className={classes(styles['accept-button'])}
								/>
								<Button
									key={rejectTitle}
									title={rejectTitle}
									onReject={onReject}
									className={classes(styles['reject-button'])}
								/>
							</div>
						) : null}
						<div className={styles.timer}>
							<p className={styles.timing}>{time}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

Notification.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string),
	messageOptions: PropTypes.arrayOf(PropTypes.string),
	selectedToggle: PropTypes.string,
	Viewtitle: PropTypes.string,
	Marktitle: PropTypes.string,
	setSelectedToggle: PropTypes.string,
	onView: PropTypes.func,
	onMark: PropTypes.func,
};

Notification.defaultProps = {
	options: [
		{
			title: 'Unread',
			value: 'Unread',
		},
		{
			title: 'All',
			value: 'All',
		},
	],
	messageOptions: [
		{
			title: 'Alok has requested access to GCP Compliance Report',
			time: 'Today at 9:42 AM',
			rightComponent: '',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: true,
			onAccept: () => {},
			onReject: () => {},
			leftComponent: '',
		},
		{
			title: 'Jaidev made 6 changes on the SOC2 Regulation Criteria',
			rightComponent: '',
			time: 'Yesterday at 11:42 AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			onAccept: () => {},
			onReject: () => {},
			leftComponent: '',
		},
		{
			title: 'Pradeeep Commented on the BanyanCloud SOC2 compliance report',
			rightComponent: '',
			time: 'Yesterday at 5:42 PM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			onAccept: () => {},
			onReject: () => {},
			leftComponent: '',
		},
	],
	selectedToggle: '',
	Viewtitle: 'View All',
	Marktitle: 'Mark as read',
	setSelectedToggle: '',
	onView: () => {},
	onMark: () => {},
};

export default Notification;
