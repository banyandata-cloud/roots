import { useEffect, type RefObject } from 'react';

interface Style {
	minWidth?: number;
	maxWidth?: number;
	borderSize?: number;
}

interface ResizeHookProps {
	ref: RefObject<HTMLElement>;
	styles?: Style;
	enabled?: boolean;
}

const useResize = (props: ResizeHookProps) => {
	const { ref, styles = {}, enabled } = props;

	const { minWidth, maxWidth, borderSize } = styles;

	useEffect(() => {
		if (enabled) {
			const refElement = ref.current;
			let mPos = 0;
			const itemRect = refElement.getBoundingClientRect();
			const resize = (event: MouseEvent) => {
				const dX = event.x - mPos;
				const newWidth = itemRect.width + dX;

				if (minWidth && maxWidth && newWidth > minWidth && newWidth < maxWidth) {
					refElement.style.width = `${newWidth.toString()}px`;
				}
			};

			const onMouseDown = (evt: MouseEvent) => {
				if (borderSize && itemRect.width - evt.offsetX < borderSize) {
					mPos = evt.x;
					document.addEventListener('mousemove', resize);
				}
			};

			const onMouseUp = (evt: MouseEvent) => {
				mPos = evt.x;
				itemRect.width = refElement.getBoundingClientRect().width;
				document.removeEventListener('mousemove', resize);
			};

			refElement.addEventListener('mousedown', onMouseDown, false);

			document.documentElement.addEventListener('mouseup', onMouseUp, false);

			return () => {
				refElement.removeEventListener('mousedown', onMouseDown, false);
				document.documentElement.removeEventListener('mouseup', onMouseUp, false);
			};
		}
		return () => {
			// Do Nothing
		};
	}, [borderSize, enabled, maxWidth, minWidth, ref]);
};

export default useResize;
