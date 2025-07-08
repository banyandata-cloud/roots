import { useEffect, type RefObject } from 'react';

const useOutsideClickListener = (callback: () => void, ref: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};

export default useOutsideClickListener;
