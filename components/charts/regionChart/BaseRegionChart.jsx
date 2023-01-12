/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import {
	GridComponent,
	TooltipComponent,
	TitleComponent,
	DatasetComponent,
	LegendComponent,
	VisualMapComponent,
	GeoComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';
import styles from './BaseRegionChart.module.css';
import { classes } from '../../../utils';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	MapChart,
	VisualMapComponent,
	GeoComponent,
	LegendComponent,
	CanvasRenderer,
]);

const BaseRegionChart = (props) => {
	const {
		geoJson,
		specialAreas,
		regionData,
		visualMap,
		seriesOption,
		cursor,
		onEvents,
		style,
		className,
	} = props;

	echarts.registerMap('states', geoJson, specialAreas);

	return (
		<EChartsReactCore
			option={{
				cursor,
				visualMap: {
					...visualMap,
				},
				series: [
					{
						...seriesOption,
						data: regionData,
					},
				],
			}}
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseRegionChart.propTypes = {
	geoJson: PropTypes.shape(),
	specialAreas: PropTypes.shape(),
	regionData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	visualMap: PropTypes.shape(),
	seriesOption: PropTypes.shape(),
	onEvents: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseRegionChart.defaultProps = {
	geoJson: {},
	specialAreas: {},
	regionData: {},
	visualMap: {
		show: false,
		min: 1,
		max: 10,
		inRange: {
			color: [
				'#313695',
				'#74add1',
				'#abd9e9',
				'#e0f3f8',
				'#ffffbf',
				'#fee090',
				'#fdae61',
				'#f46d43',
				'#d73027',
				'#a50026',
			],
		},
	},
	seriesOption: {
		name: 'USA',
		type: 'map',
		roam: false,
		map: 'states',
		scaleLimit: {
			min: 1,
			max: 10,
		},
		aspectScale: '1:1',
	},
	onEvents: () => {},
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
};

export default BaseRegionChart;
