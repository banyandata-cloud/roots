import type { ReactElement } from 'react';
import PresetItem from '../presetItem/PresetItem';
import styles from './PresetPanel.module.scss';
import type { PresetPanelProps } from './types';

/** Left panel: draft preset selection and previously applied custom dates. */
const PresetPanel = (props: PresetPanelProps): ReactElement => {
	const { presets, selectedPresetId, onSelectPreset, recents = [], onSelectRecent } = props;

	return (
		<div className={styles.root}>
			<div className={styles.list}>
				{presets.map((preset) => (
					<PresetItem
						key={preset.id}
						label={preset.label}
						selected={preset.id === selectedPresetId}
						onClick={() => onSelectPreset(preset)}
					/>
				))}
			</div>
			{recents.length > 0 && (
				<>
					<div className={styles.divider} />
					<div className={styles.recentBlock}>
						<div className={styles.recentHeader}>Recent</div>
						{recents.map((recent) => (
							<PresetItem
								key={recent.id}
								label={recent.label}
								variant='recent'
								onClick={() => onSelectRecent?.(recent)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default PresetPanel;
