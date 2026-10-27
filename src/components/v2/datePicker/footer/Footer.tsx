import type { ReactElement } from 'react';
import { Button } from '../../buttons';
import { Dropdown } from '../../input/dropdown';
import { Toggle } from '../../input/toggle';
import styles from './Footer.module.scss';
import type { FooterProps } from './types';

/** C14-C18: Default to show, 24-hour switch, time zone, Cancel, Apply dates. */
const Footer = (props: FooterProps): ReactElement => {
	const {
		defaultPresetOptions,
		defaultPresetValue,
		onDefaultPresetChange,
		hour12,
		onHour12Change,
		timeZone,
		onCancel,
		onApply,
		applyDisabled = false,
		showApply = true,
	} = props;

	return (
		<div className={styles.root}>
			<div className={styles.leftGroup}>
				<span className={styles.label}>Default to show</span>
				<Dropdown
					variant='simple'
					size='sm'
					className={styles.defaultSelect}
					options={defaultPresetOptions}
					value={defaultPresetValue}
					onChange={onDefaultPresetChange}
				/>
			</div>
			<div className={styles.rightGroup}>
				<div className={styles.info}>
					<div className={styles.toggleGroup}>
						<span className={styles.toggleLabel}>24-hour</span>
						<Toggle
							size='s'
							checked={!hour12}
							onChange={(_event, checked) => onHour12Change(!checked)}
						/>
					</div>
					<span className={styles.timeZone}>Time zone: {timeZone}</span>
				</div>
				<div className={styles.actions}>
					<Button variant='outlined' size='sm' title='Cancel' onClick={onCancel} />
					{showApply && (
						<Button
							variant='primary'
							size='sm'
							title='Apply dates'
							disabled={applyDisabled}
							onClick={onApply}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Footer;
