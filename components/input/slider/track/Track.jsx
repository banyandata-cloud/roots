import { useRef } from 'react';
import { Thumb } from '../thumb';
import styles from './track.module.css';

const Track = () => {
	const thumbRef = useRef(null);

	const onTrackClick = () => {
		console.log(thumbRef.current);
	};

	return (
		<div onClick={onTrackClick} className={styles.root}>
			<Thumb thumbRef={thumbRef} />
		</div>
	);
};

export default Track;
