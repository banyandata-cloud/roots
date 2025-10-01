import type { ReactElement } from 'react';
import { classes, getInitialsOfName } from '../../utils';
import type { DisplayPictureProps } from './types';

const DisplayPicture = (props: DisplayPictureProps): ReactElement => {
	const { name = '', className = '', url = '', size = 'sm' } = props;

	const sizeClasses = {
		sm: 'bn-w-6 bn-h-6 bn-text-base',
		md: 'bn-w-[5.3125rem] bn-h-[5.3125rem] bn-text-[2rem]',
	};

	return (
		<div className={classes('bn-rounded-full bn-overflow-hidden', className)}>
			{url ? (
				<img
					data-elem='dp-img'
					src={url}
					alt={name}
					className={classes('bn-rounded-full bn-object-cover', sizeClasses[size])}
				/>
			) : (
				<div
					data-elem='dp-name-container'
					className={classes(
						'bn-flex bn-items-center bn-justify-center bn-rounded-full bn-bg-secondary-color2',
						sizeClasses[size]
					)}>
					<span className='bn-font-semibold bn-text-white'>
						{getInitialsOfName(name)}
					</span>
				</div>
			)}
		</div>
	);
};

export default DisplayPicture;
