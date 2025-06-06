import type { ReactElement } from 'react';
import { classes, getInitialsOfName } from '../../utils';
import styles from './DisplayPicture.module.css';
import type { DisplayPictureProps } from './types';

const DisplayPicture = (props: DisplayPictureProps): ReactElement => {
	const { name = '', className = '', url = '', size = 'sm' } = props;

	return (
		<div className={classes(styles.root, styles[size], className)}>
			{url ? (
				<img data-elem='dp-img' src={url} alt={name} />
			) : (
				<div data-elem='dp-name-container'>
					<span data-elem='dp-name'>{getInitialsOfName(name)}</span>
				</div>
			)}
		</div>
	);
};

export default DisplayPicture;
