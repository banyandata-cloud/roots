import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Notification.module.css';
import { Button } from '../buttons';
import { Text } from '../text';
import { Toggle } from '../toggle';
import { classes } from '../../utils';
import { DisplayPicture } from '../displayPicture';

const Notification = (props) => {
	const { options, messageOptions, onView, onMark } = props;

	const [selectedToggle, setSelectedToggle] = useState('');

	const onToggle = (value) => {
		setSelectedToggle(value);
	};

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.firstrow}>
					<Text variant='b1' weight='700' stroke='bold'>
						Notifications
					</Text>
					<Button color='primary' variant='text' onClick={onView} title='View All' />
				</div>
				<div className={styles.secondrow}>
					<Toggle
						options={options}
						selectedToggle={selectedToggle}
						setSelectedToggle={setSelectedToggle}
						onChange={onToggle}
					/>
					<Button
						className={classes(styles['mark-button'])}
						onClick={onMark}
						title='Mark as read'
					/>
				</div>
			</div>
			{messageOptions.map((option) => {
				const {
					title,
					messageAction,
					time,
					acceptTitle,
					rejectTitle,
					onAccept,
					onReject,
					actions,
					message,
					name,
					url,
				} = option;

				return (
					<div key={option.name} className={styles.body}>
						<div className={styles.container}>
							<DisplayPicture name={name} url={url} />
							<Text title={title}>
								<Text variant='h3' weight='700' stroke='bold'>
									{title.user}
								</Text>
								&nbsp;
								{title.action}&nbsp;
								<Text variant='h3' weight='700' stroke='bold'>
									{title.items}
								</Text>
							</Text>
						</div>
						{messageAction === true ? (
							<div className={styles.messageBox}>
								<div className={styles.rectangle} />
								<Text>{message}</Text>
							</div>
						) : null}
						{actions === true ? (
							<div className={styles.actions}>
								<Button
									title={acceptTitle}
									onClick={onAccept}
									className={classes(styles['accept-button'])}
								/>
								<Button
									title={rejectTitle}
									onClick={onReject}
									className={classes(styles['reject-button'])}
								/>
							</div>
						) : null}
						<div className={styles.timer}>
							<Text variant='b3' stroke='regular' weight='400'>
								{time}
							</Text>
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
			message: PropTypes.string,
			time: PropTypes.string,
			acceptTitle: PropTypes.string,
			rejectTitle: PropTypes.string,
			actions: PropTypes.bool,
			messageAction: PropTypes.bool,
			onAccept: PropTypes.func,
			onReject: PropTypes.func,
			name: PropTypes.string,
			url: '',
		})
	),
	onView: PropTypes.func,
	onMark: PropTypes.func,
};

Notification.defaultProps = {
	options: [
		{
			id: '1',
			value: 'toggle1',
		},
		{
			id: '2',
			value: 'toggle2',
		},
	],
	messageOptions: [
		{
			title: {
				user: '',
				action: '',
				items: '',
			},
			message: '',
			time: '',
			acceptTitle: '',
			rejectTitle: '',
			actions: false,
			messageAction: false,
			onAccept: () => {},
			onReject: () => {},
			name: '',
			url: 'url',
		},
	],
	onView: () => {},
	onMark: () => {},
};

export default Notification;
