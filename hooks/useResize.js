import { useEffect } from 'react';

const useResize = (props) => {
	const { ref, styles = {} } = props;

	const { MIN_WIDTH, MAX_WIDTH, BORDER_SIZE } = styles;

	useEffect(() => {
		let mPos = null;
		const itemRect = ref?.current?.getBoundingClientRect?.();
		const resize = (event) => {
			const dX = event.x - mPos;
			// eslint-disable-next-line no-param-reassign
			const newWidth = parseInt(itemRect.width, 10) + dX;

			if (newWidth > MIN_WIDTH && newWidth < MAX_WIDTH && ref.current != null) {
				ref.current.style.width = `${newWidth}px`;
			}
		};

		const onMouseDown = (evt) => {
			if (itemRect.width - evt.offsetX < BORDER_SIZE) {
				mPos = evt.x;
				document.addEventListener('mousemove', resize);
			}
		};

		const onMouseUp = (evt) => {
			mPos = evt.x;
			itemRect.width = ref?.current?.getBoundingClientRect?.()?.width;
			document.removeEventListener('mousemove', resize);
		};

		ref?.current?.addEventListener('mousedown', onMouseDown, false);

		document.documentElement.addEventListener('mouseup', onMouseUp, false);

		return () => {
			ref?.current?.removeEventListener?.('mousedown', onMouseDown, false);
			document.documentElement.removeEventListener('mouseup', onMouseUp, false);
		};
	}, []);
};

export default useResize;
