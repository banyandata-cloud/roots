import styles from './Body.module.css';
import { Dates } from './dates';
import { Days } from './days';

const Body = (props) => {
	return (
		<div className={styles.root}>
			<div className={styles['body-left']}>
				<Days />
				<Dates {...props} />
			</div>
			<div className={styles['body-right']}>
				<Days />
				<Dates {...props} />
			</div>
		</div>
	);
};

export default Body;
