import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
	useRef,
	useState,
} from 'react';

// eslint-disable-next-line prefer-arrow-callback
const Marker = forwardRef(function Marker({ children, ...options }, ref) {
	const [marker, setMarker] = useState();
	const infoWindowRef = useRef(null);

	useEffect(() => {
		if (marker) {
			ref.current = marker;
		}
		if (!marker) {
			const newMap = new google.maps.Marker();
			setMarker(newMap);
			ref.current = newMap;
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
				ref.current = null;
			}
		};
	}, [marker]);

	useEffect(() => {
		if (marker && Children.count(children) === 1 && infoWindowRef?.current) {
			const infoWindow = infoWindowRef?.current;
			marker.addListener('click', () => {
				infoWindow.open({
					anchor: marker,
					map: options.map,
				});
			});
		}
	}, [marker, children]);

	useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	if (Children.count(children) === 1) {
		const child = Children.toArray(children)?.[0];
		if (isValidElement(child)) {
			// set the map prop on the child component
			return cloneElement(child, {
				ref: infoWindowRef,
			});
		}
	}

	return null;
});

export default Marker;
