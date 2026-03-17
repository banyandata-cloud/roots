import React from 'react';
import styles from './Body.module.css';
import { Dates } from './dates';
import type { DatesProps } from './dates';
import { Days } from './days';

const Body = (props: DatesProps): React.JSX.Element => {
	return (
		<div className={styles.root}>
			<Days />
			<Dates {...props} />
		</div>
	);
};

export default Body;
