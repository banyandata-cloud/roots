import type { FC } from 'react';
import { Text } from '../text';
import styles from './BaseModal.module.scss';

interface ModalHeaderProps {
	title?: string | undefined;
	description?: string | undefined;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, description }) => {
	return (
		<>
			<Text component='h2' variant='heading-medium' stroke='medium' className={styles.title}>
				{title}
			</Text>
			{description && (
				<Text component='span' variant='body-large' className={styles.description}>
					{description}
				</Text>
			)}
		</>
	);
};

export default ModalHeader;
