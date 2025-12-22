import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import HeatMapChart from './HeatMapChart';
import { sampleData } from './HeatMapChartData';

const meta: Meta<typeof HeatMapChart> = {
	title: 'Components/HeatMapChart',
	component: HeatMapChart,
	parameters: {
		options: {
			showToolbar: false,
		},
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj<typeof HeatMapChart>;

/* ----------------------------------------
 * Shared Wrapper
 * ------------------------------------- */

const Wrapper = (args: any) => (
	<ThemedContainer
		style={{
			height: '400px',
		}}>
		<HeatMapChart {...args} />
	</ThemedContainer>
);

/* ----------------------------------------
 * Default
 * ------------------------------------- */

export const Default: Story = {
	args: {
		gridContainLabel: true,
		gridOptions: {
			left: 0,
			right: 0,
			bottom: 0,
			top: 15,
		},
		xAxisLabel: { show: false },
		xSplitLineShow: false,
		xAxisLineShow: false,
		xAxisTickShow: false,
		yAxisLabelShow: false,
		ySplitLineShow: false,
		yAxisLineShow: false,
		yAxisTickShow: false,
		axisColor: 'grey',
		tooltip: {
			trigger: 'item',
			formatter: (param: any) =>
				`${param.name}: ${sampleData.metaData.seriesData[param.name].total} Permissions`,
		},
		seriesData: sampleData,
		visualMap: {
			min: 0,
			max: 10,
			show: false,
			calculable: true,
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
			label: { show: false },
			itemStyle: { borderWidth: 1 },
		},
	},
	render: Wrapper,
};

/* ----------------------------------------
 * Loading State
 * ------------------------------------- */

export const LoadingState: Story = {
	args: {
		...Default.args,
		loading: true,
	},
	render: Wrapper,
};
