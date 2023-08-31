import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Track } from './track';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

const Slider = (props) => {
	const { custom } = props;
	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<div>
				<Track />
			</div>
		</ErrorBoundary>
	);
};

export default Slider;
