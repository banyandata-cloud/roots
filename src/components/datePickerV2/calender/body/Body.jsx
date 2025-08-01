import styles from './Body.module.css';
import { Dates } from './dates';
import { Days } from './days';

const Body = (props) => {
	const prp1 = {
		...props,
		selectedMonth: props.displayMonthRight,
		setSelectedMonth: props.setDisplayMonthRight,
	};

	console.log({
		body: props,
	});

	return (
		<div className={styles.root}>
			<div className={styles['body-left']}>
				<Days />
				<Dates {...props} />
			</div>
			<div className={styles['body-right']}>
				<Days />
				<Dates {...prp1} />
			</div>
		</div>
	);
};

export default Body;
