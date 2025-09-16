import { useState } from 'react';
import styles from './Body.module.css';
import { Dates } from './dates';
import { Days } from './days';

const Body = (props) => {
	const [hoveredEndingDate, setHoveredEndingDate] = useState(() => {
		return null;
	});

	const prp1 = {
		...props,
		selectedMonth: props.displayMonthRight,
		setSelectedMonth: props.setDisplayMonthRight,
	};

	return (
		<div className={styles.root}>
			<div className={styles['body-left']}>
				<Days />
				<Dates
					hoveredEndingDate={hoveredEndingDate}
					setHoveredEndingDate={setHoveredEndingDate}
					{...props}
				/>
			</div>
			<div className={styles['body-right']}>
				<Days />
				<Dates
					hoveredEndingDate={hoveredEndingDate}
					setHoveredEndingDate={setHoveredEndingDate}
					{...prp1}
				/>
			</div>
		</div>
	);
};

export default Body;
