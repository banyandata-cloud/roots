import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

const Marker = ({ children, ...options }) => {
	const [marker, setMarker] = useState();
	const infoWindowRef = useRef(null);

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	useEffect(() => {
		if (marker && Children.count(children) === 1 && infoWindowRef?.current) {
			const infoWindow = infoWindowRef?.current;
			console.log(marker, infoWindow);
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
};

export default Marker;
