import { forwardRef, useImperativeHandle, useRef } from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import highchartsMap from 'highcharts/modules/map';
import markerClusters from 'highcharts/modules/marker-clusters';
import HighchartsReact from 'highcharts-react-official';
import { mapOptions } from './config';
import styles from './Map.module.css';
import { Skeleton } from '../skeleton';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { FullScreenIcon } from '../icons';
markerClusters(Highcharts);
highchartsMap(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

/**
 * Renders a button with a full-screen icon. When the button is clicked, it calls the `handleFullScreen` function passed as a prop.
 *
 * @param {Function} handleFullScreen - The function to be called when the button is clicked.
 * @returns {JSX.Element} - The rendered button component.
 */
const FullScreenButton = ({ handleFullScreen }) => {
	return (
		<Button
			variant='text'
			onClick={handleFullScreen}
			className={styles['full-screen']}
			size='auto'
			rightComponent={() => {
				return <FullScreenIcon className={styles.icon} />;
			}}
		/>
	);
};

/**
 * Renders a vectorised high resolution world map.
 *
 * @param {boolean} loading - Indicates whether the map is still loading or not.
 * @param {string} theme - The theme to be applied to the map.
 * @param {boolean} fallback - Indicates whether to show a fallback UI when the map is still loading.
 * @param {string} className - Additional CSS class name for the map container.
 * @param {boolean} showFullScreen - Indicates whether to show a full-screen button for the map.
 * @param {boolean} enableDoubleClickZoom - Indicates whether to enable zooming on double-click.
 * @param {boolean} enableMouseWheelZoom - Indicates whether to enable zooming using the mouse wheel.
 * @param {Array} coordinates - The coordinates of the map points to be displayed.
 * @param {boolean} cluster - Indicates whether to enable clustering of map points.
 * @param {boolean} showZoomButton - Indicates whether to show zoom buttons on the map.
 * @param {Object} zoomButtonOptions - Additional options for the zoom buttons.
 * @param {Object} mapView - The initial view of the map.
 * @param {boolean} showMarker - Indicates whether to show markers on the map.
 * @param {Object} defaultMarkeroptions - The default options for the markers.
 * @param {boolean} customMarker - Indicates whether to use custom markers.
 * @param {Object} customMarkerOptions - Additional options for the custom markers.
 * @returns {JSX.Element} The rendered map component.
 */
const Map = forwardRef((props, ref) => {
	const { loading, theme, fallback, className, showFullScreen } = props;

	if (loading) {
		return (
			<div className={styles.root}>
				<Skeleton
					theme={theme}
					height='100%'
					variant='rounded'
					noAnimation={!loading && fallback}
				/>
			</div>
		);
	}

	const mapRef = useRef();

	const chartProps = {
		highcharts: Highcharts,
		options: mapOptions(props),
		constructorType: 'mapChart', // renders map based highchart
		containerProps: { className: styles['bc-map-root'] }, // container class for the map component
		ref: mapRef,
	};

	const handleFullScreen = () => {
		/**
		 * The function first checks if the mapRef exists
		 * and if it has a current property and a chart property.
		 * Finally, it calls the toggle() method of the fullscreen property of the chart object.
		 */
		const mapReference = mapRef && mapRef.current && mapRef.current.chart;
		if (mapReference) {
			mapRef.current.chart.fullscreen.toggle();
		}
	};

	useImperativeHandle(ref, () => ({
		/**
		 * methods to get exposed
		 */
		toggleFullScreen: handleFullScreen,
	}));

	return (
		<div className={classes(styles.root, className)}>
			<HighchartsReact {...chartProps} />
			{showFullScreen && <FullScreenButton handleFullScreen={handleFullScreen} />}
		</div>
	);
});

Map.propTypes = {
	coordinates: PropTypes.arrayOf(
		PropTypes.shape({
			lat: PropTypes.number,
			lon: PropTypes.number,
			tooltip: PropTypes.string,
		})
	),
	enableDoubleClickZoom: PropTypes.bool,
	enableMouseWheelZoom: PropTypes.bool,
	cluster: PropTypes.bool,
	showZoomButton: PropTypes.bool,
	zoomButtonOptions: PropTypes.object,
	mapView: PropTypes.object,
	showMarker: PropTypes.bool,
	defaultMarkeroptions: PropTypes.shape({
		lineColor: PropTypes.string,
		lineWidth: PropTypes.number,
		fillColor: PropTypes.string,
		radius: PropTypes.number,
	}),
	customMarker: PropTypes.string,
	customMarkerOptions: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number,
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	className: PropTypes.string,
	showFullScreen: PropTypes.bool,
};

Map.defaultProps = {
	enableDoubleClickZoom: false,
	enableMouseWheelZoom: true,
	coordinates: [],
	cluster: true,
	showZoomButton: true,
	zoomButtonOptions: null,
	mapView: null,
	showMarker: true,
	defaultMarkeroptions: null,
	customMarker: null,
	customMarkerOptions: null,
	theme: 'dark',
	loading: false,
	fallback: false,
	className: '',
	showFullScreen: true,
};

export default Map;