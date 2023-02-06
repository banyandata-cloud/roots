import { forwardRef, useEffect, useState } from 'react';

// eslint-disable-next-line prefer-arrow-callback
const InfoWindow = forwardRef(function InfoWindow(options, ref) {
	const [infoWindow, setInfoWindow] = useState();

	useEffect(() => {
		if (!infoWindow) {
			const newInfoWindow = new google.maps.InfoWindow();
			setInfoWindow(newInfoWindow);
			ref.current = newInfoWindow;
		}
	}, [infoWindow]);

	useEffect(() => {
		if (infoWindow) {
			infoWindow.setOptions(options);
		}
	}, [infoWindow, options]);

	return null;
});

export default InfoWindow;
