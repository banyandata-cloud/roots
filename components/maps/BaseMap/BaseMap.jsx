import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useDeepCompareEffectForMaps } from './utils';

const BaseMap = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { onClick, onIdle, children, style, mapId, clustered, fitBounds, ...options } = props;

	const ref = useRef(null);
	const [map, setMap] = useState();

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId,
				})
			);
		}
	}, [map]);

	useEffect(() => {
		if (clustered && map && Children.count(children) > 0) {
			const markers = Children.map(children, (child) => {
				return new google.maps.Marker({
					position: child.props.position,
				});
			});
			// eslint-disable-next-line no-new
			new MarkerClusterer({
				map,
				markers,
			});
		}
	}, [clustered, children, map]);

	useEffect(() => {
		if (map && Children.count(children) > 0) {
			const bounds = new google.maps.LatLngBounds();

			Children.forEach(children, (child) => {
				bounds.extend(
					new google.maps.LatLng(child.props.position.lat, child.props.position.lng)
				);
			});
			map.fitBounds(bounds);
		}
	}, [fitBounds, map]);

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	useEffect(() => {
		if (map) {
			['click', 'idle'].forEach((eventName) => {
				return google.maps.event.clearListeners(map, eventName);
			});
			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => {
					return onIdle(map);
				});
			}
		}
	}, [map, onClick, onIdle]);

	useEffect(() => {
		if (map) {
			['click', 'idle'].forEach((eventName) => {
				return google.maps.event.clearListeners(map, eventName);
			});
			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => {
					return onIdle(map);
				});
			}
		}
	}, [map, onClick, onIdle]);

	return (
		<>
			<div ref={ref} style={style} />
			{!clustered &&
				Children.map(children, (child) => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, {
							map,
						});
					}
					return null;
				})}
		</>
	);
};

BaseMap.defaultProps = {
	clustered: false,
	fitBounds: false,
	zoom: 1,
	center: {
		lat: 0,
		lng: 0,
	},
};

export default BaseMap;