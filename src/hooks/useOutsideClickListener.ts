import { useEffect, type RefObject } from 'react';

const useOutsideClickListener = (ref: RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (!ref.current.contains(event.target as Node)) {
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
