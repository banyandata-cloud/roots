import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { MarkerIcon } from '../icons';
import { Tooltip } from '../tooltip';
import styles from './GeoMap.module.css';
import countries from './countries.json';

const Map = (props) => {
	const {
		loading,
		className = '',
		coordinates = [],
		zoom = 1,
		customMarker = null,
		showZoomButton = true,
	} = props;

	const [position, setPosition] = useState({
		coordinates: [0, 0],
		zoom,
	});

	const handleZoomIn = () => {
		if (position.zoom >= 4) return;
		setPosition((pos) => {
			return {
				...pos,
				zoom: pos.zoom * 2,
			};
		});
	};

	const handleZoomOut = () => {
		if (position.zoom <= 1) return;
		setPosition((pos) => {
			return {
				...pos,
				zoom: pos.zoom / 2,
			};
		});
	};

	const handleMoveEnd = (currentPosition) => {
		setPosition(currentPosition);
	};

	if (loading) {
		return null;
	}
	return (
		<div className={classes(styles.root, className)}>
			{showZoomButton && (
				<div className={styles.zoom}>
					<Button
						className={classes(styles.button, styles.top)}
						leftComponent={() => {
							return (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='3'>
									<line x1='12' y1='5' x2='12' y2='19' />
									<line x1='5' y1='12' x2='19' y2='12' />
								</svg>
							);
						}}
						onClick={handleZoomIn}
					/>
					<Button
						className={classes(styles.button, styles.bottom)}
						leftComponent={() => {
							return (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='3'>
									<line x1='5' y1='12' x2='19' y2='12' />
								</svg>
							);
						}}
						onClick={handleZoomOut}
					/>
				</div>
			)}

			<ComposableMap projection='geoEqualEarth'>
				<ZoomableGroup
					zoom={position.zoom}
					center={position.coordinates}
					onMoveEnd={handleMoveEnd}>
					<Geographies geography={countries}>
						{({ geographies }) => {
							return geographies.map((geo) => {
								return (
									<Geography
										fill='#2a354d'
										stroke='#FFF'
										strokeWidth={0.1}
										key={geo.rsmKey}
										geography={geo}
										style={{
											default: {
												fill: '#486771',
											},
											hover: {
												fill: '#486771',
												opacity: 0.8,
											},
											pressed: {
												fill: '#486771',
												opacity: 0.8,
											},
										}}
									/>
								);
							});
						}}
					</Geographies>
					{coordinates?.map((pos) => {
						return (
							<Tooltip
								className={styles.tooltip}
								key={pos}
								content={pos.tooltip}
								position='left'
								showPointer={false}>
								<Marker coordinates={[pos.lon, pos.lat]}>
									{customMarker || <MarkerIcon />}
								</Marker>
							</Tooltip>
						);
					})}
				</ZoomableGroup>
			</ComposableMap>
		</div>
	);
};

export default Map;
