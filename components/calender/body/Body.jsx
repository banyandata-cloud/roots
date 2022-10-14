import styles from './Body.module.css';
import { Dates } from './dates';
import { Days } from './days';

const Body = (props) => {
	return (
		<div className={styles.root}>
			<Days />
			<Dates {...props} />
		</div>
	);
};

export default Body;
