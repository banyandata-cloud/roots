/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import styles from './Notification.module.css';
import { Button } from '../buttons';
import { Toggle } from '../toggle';
import { classes } from '../../utils';
import { DisplayPicture } from '../displayPicture';

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
					text,
					time,
					acceptTitle,
					rejectTitle,
					onAccept,
					onReject,
					actions,
					message,
					name,
					className,
					url,
					size,
				} = option;

				return (
					<div key={option} className={styles.body}>
						<div className={styles.img}>
							<DisplayPicture
								name={name}
								className={className}
								url={url}
								size={size}
							/>
						</div>
						<div className={styles.title}>
							<p className={styles.content} key={title} title={title}>
								<strong>{title.user}</strong>&nbsp;
								{title.action}&nbsp;
								<strong>{title.items}</strong>
							</p>
						</div>
						<div className={styles.message}>
							{message === true ? <div className={styles.rectangle} /> : null}
							<p className={styles.text}>{text}</p>
						</div>
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
	messageOptions: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.shape({
				user: PropTypes.string,
				action: PropTypes.string,
				items: PropTypes.string,
			}),
			text: PropTypes.string,
			time: PropTypes.string,
			acceptTitle: PropTypes.string,
			rejectTitle: PropTypes.string,
			actions: PropTypes.bool,
			message: PropTypes.bool,
			onAccept: PropTypes.func,
			onReject: PropTypes.func,
			name: PropTypes.string,
			className: PropTypes.string,
			url: '',
			size: '',
		})
	),
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
			title: {
				user: 'Alok kumar',
				action: 'requested access to',
				items: 'GCP Compliance Report',
			},
			text: '',
			time: 'Today at 9:42 AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: true,
			message: false,
			onAccept: () => {},
			onReject: () => {},
			name: '',
			className: '',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
			size: 'sm',
		},
		{
			title: {
				user: 'Jaidev',
				action: 'made 6 changes on',
				items: ' SOC2 Regulation Criteria',
			},
			text: '',
			time: 'Yesterday at 11:42 AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			message: false,
			onAccept: () => {},
			onReject: () => {},
			name: '',
			className: '',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
			size: 'sm',
		},
		{
			title: {
				user: 'Pradeep A',
				action: 'Commented on',
				items: 'BanyanCloud SOC2 compliance report',
			},
			text: '"Everything seems fine for now, we will review it once again when other reports are checked. Please update Jaidev about it."',
			time: 'Yesterday at 5:42 PM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			message: true,
			onAccept: () => {},
			onReject: () => {},
			className: '',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
			size: 'sm',
		},
		{
			title: {
				user: 'Chandrashekar K',
				action: 'created',
				items: 'Banyan Cloud SOC2 compliance report',
			},
			text: '',
			time: 'Last Wednesday at 11:15AM',
			acceptTitle: 'Accept',
			rejectTitle: 'Reject',
			actions: false,
			message: false,
			onAccept: () => {},
			onReject: () => {},
			className: '',
			url: 'https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg',
			size: 'sm',
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
