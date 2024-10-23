/* eslint-disable max-len */
import mapBase from '@highcharts/map-collection/custom/world-highres3.topo.json';

const MAP_THEME = {
	dark: {
		mapBackgroundColor: '#1b1f23',
		mapAreaColor: '#38434f',
		defaultMarkerColor: '#9db88f',
		mapAreaBorderColor: '#1b1f23',
		zoomButtonsBackground: '#ffffff',
		zoomButtonsTextColor: '#000000',
		zoomButtonsBackgroundOnHover: '#f0f0f0',
	},
	light: {
		mapBackgroundColor: '#FFFFFF',
		mapAreaColor: '#4867714D',
		defaultMarkerColor: '#5a6b51',
		mapAreaBorderColor: '#ffffff',
		zoomButtonsBackground: '#ffffff',
		zoomButtonsTextColor: '#000000',
		zoomButtonsBackgroundOnHover: '#00000088',
	},
};

// default disabled options for the map chart.
const defaultOptions = {
	title: {
		text: undefined,
	},
	credits: {
		enabled: false,
	},
	legend: {
		enabled: false,
	},
	exporting: {
		enabled: false, // disabling in order to get full screen functionality but with custom action.
	},
};

/**
 * Generates options for a map chart.
 *
 * @param {Array} coordinates - An array of objects representing the latitude and longitude coordinates of the map points.
 * @param {boolean} enableDoubleClickZoom - Whether double-click zooming is enabled.
 * @param {boolean} enableMouseWheelZoom - Whether mouse wheel zooming is enabled.
 * @param {boolean} cluster - Whether clustering of map points is enabled.
 * @param {boolean} showZoomButton - Whether to show zoom buttons on the map.
 * @param {Object} zoomButtonOptions - Options for the zoom buttons.
 * @param {Object} mapView - Options for the initial view of the map.
 * @param {boolean} showMarker - Whether to show markers on the map.
 * @param {Object} defaultMarkeroptions - Options for the default markers.
 * @param {string} customMarker - The path to the custom marker either as a predefined strinf or url.
 * @param {Object} customMarkerOptions - Options for the custom markers.
 * @param {string} theme - The theme to be used for the map.
 * @returns {Object}  An object containing the options for the map chart.
 */
export const mapOptions = (props) => {
	const {
		coordinates,
		enableDoubleClickZoom,
		enableMouseWheelZoom,
		cluster,
		showZoomButton,
		zoomButtonOptions,
		mapView,
		showMarker,
		defaultMarkeroptions,
		customMarker,
		customMarkerOptions,
		theme,
		type,
		providerType,
		providerTheme,
	} = props;

	let markerOptions = {};

	if (customMarker) {
		markerOptions = {
			symbol: customMarker,
			customMarkerOptions,
		};
	} else {
		markerOptions = defaultMarkeroptions;
	}

	const baseMap = {
		type,
		provider: {
			type: providerType,
			theme: providerTheme,
		},
		mapData: mapBase, // main world map file to be loaded
		borderColor: MAP_THEME[theme].mapAreaBorderColor, // borders of the countries
		nullColor: MAP_THEME[theme].mapAreaColor, // land areas
	};

	const mapCoordinates = coordinates.map(({ tooltip, ...rest }) => {
		return {
			...rest,
			lon: rest.lng || rest.lon, // check whether lng or lon passed for longitude for old versions
			key: tooltip,
		};
	});

	const mapPoints = {
		type: 'mappoint',
		color: MAP_THEME[theme].defaultMarkerColor,
		data: mapCoordinates,
		cursor: 'pointer',
		marker: {
			enabled: showMarker,
			...markerOptions,
		},
	};

	const defaultZoomButtonOptions = {
		align: 'right',
		alignTo: 'spacingBox',
		style: {
			color: MAP_THEME[theme].zoomButtonsTextColor,
		},
		theme: {
			'stroke-width': 0.5, // zoom buttons outer width
			fill: MAP_THEME[theme].zoomButtonsBackground,
			states: {
				hover: {
					fill: MAP_THEME[theme].zoomButtonsBackgroundOnHover,
				},
			},
		},
	};

	return {
		chart: {
			backgroundColor: MAP_THEME[theme].mapBackgroundColor, // background color of the map container
			spacing: [0, 0, 0, 0], // outer spacing around the map. Setting it to 0 to get max ratio.
			animation: false,
		},
		mapNavigation: {
			enabled: showZoomButton,
			enableDoubleClickZoom,
			enableMouseWheelZoom,
			buttonOptions: zoomButtonOptions ?? defaultZoomButtonOptions,
		},
		tooltip: {
			stickOnContact: true, // persistence of the tooltip on hover contact
			useHTML: true, // use the html tags passed. use only svg tags if false
			formatter() {
				const tooltip = this.point.key;
				if (!tooltip) {
					return false; // hide empty tooltip if undefined
				}
				return tooltip;
			},
		},

		mapView: mapView ?? {
			center: [0, 0], // default view of the map (show whole world map)
		},
		plotOptions: {
			mappoint: {
				cluster: {
					enabled: cluster,
				},
			},
		},
		series: [baseMap, mapPoints],
		// First Index : baseMap represents the map being used. Here it is world map json.
		// Second Index : mapPoints represents the latitude and longitude points.
		...defaultOptions,
	};
};
