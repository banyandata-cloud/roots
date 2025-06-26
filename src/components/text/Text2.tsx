/* eslint-disable max-len */
import { forwardRef, type RefObject } from 'react';

const Text2 = forwardRef<RefObject<HTMLElement>>((props: { title?: string }) => {
	const { title = '' } = props;
	return (
		<div className='flex justify-center items-center h-screen bg-blue-500'>
			<h1 className='text-blue mb-3 font-bold'>{title}</h1>
		</div>
	);
});

export default Text2;
