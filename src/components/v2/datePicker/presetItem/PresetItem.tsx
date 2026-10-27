import type { ReactElement } from 'react';
import { classes } from '../../utils';
import styles from './PresetItem.module.scss';
import type { PresetItemProps } from './types';

/** C2 Preset item: one click applies a preset (or a recent custom range). */
const PresetItem = (props: PresetItemProps): ReactElement => {
	const { label, selected = false, variant = 'default', onClick } = props;

	return (
		<button
			type='button'
			className={classes(
				styles.root,
				variant === 'recent' && styles.recent,
				selected && styles.selected
			)}
			aria-pressed={selected}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default PresetItem;
