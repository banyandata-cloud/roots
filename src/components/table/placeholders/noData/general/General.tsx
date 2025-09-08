import type { ComponentType } from 'react';
import { classes } from '../../../../../utils';
import { Text } from '../../../../text';
import styles from './General.module.css';

interface GeneralPlaceholderProps {
	placeholder?: string;
	className?: string;
	customPlaceholder?: ComponentType | undefined;
}

const General = ({
	placeholder = 'No Data to display',
	className = '',
	customPlaceholder: CustomPlaceholder,
}: GeneralPlaceholderProps) => {
	return (
		<div className={classes(styles.root, className)}>
			{CustomPlaceholder ? (
				<CustomPlaceholder />
			) : (
				<Text className={styles.placeholder} component='span' variant='b1' weight={500}>
					{placeholder}
				</Text>
			)}
		</div>
	);
};

export default General;
