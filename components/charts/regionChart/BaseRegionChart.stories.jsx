/* eslint-disable no-tabs */
import React from 'react';
import BaseRegionChart from './BaseRegionChart';

export default {
	title: 'Components/Charts/RegionChart/BaseRegionChart',
	component: BaseRegionChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const sampleData = [
	{
		name: 'Alabama',
		value: 4,
	},
	{
		name: 'Alaska',
		value: 3,
	},
	{
		name: 'Arizona',
		value: 2,
	},
	{
		name: 'Arkansas',
		value: 4,
	},
	{
		name: 'California',
		value: 4,
	},
	{
		name: 'Colorado',
		value: 2,
	},
	{
		name: 'Connecticut',
		value: 2,
	},
	{
		name: 'Delaware',
		value: 1,
	},
	{
		name: 'District of Columbia',
		value: 1,
	},
	{
		name: 'Florida',
		value: 3,
	},
	{
		name: 'Georgia',
		value: 3,
	},
	{
		name: 'Hawaii',
		value: 2,
	},
	{
		name: 'Idaho',
		value: 2,
	},
	{
		name: 'Illinois',
		value: 1,
	},
	{
		name: 'Indiana',
		value: 3,
	},
	{
		name: 'Iowa',
		value: 1,
	},
	{
		name: 'Kansas',
		value: 2,
	},
	{
		name: 'Kentucky',
		value: 1,
	},
	{
		name: 'Louisiana',
		value: 2,
	},
	{
		name: 'Maine',
		value: 1,
	},
	{
		name: 'Maryland',
		value: 3,
	},
	{
		name: 'Massachusetts',
		value: 2,
	},
	{
		name: 'Michigan',
		value: 2,
	},
	{
		name: 'Minnesota',
		value: 2,
	},
	{
		name: 'Mississippi',
		value: 3,
	},
	{
		name: 'Missouri',
		value: 2,
	},
	{
		name: 'Montana',
		value: 3,
	},
	{
		name: 'Nebraska',
		value: 1,
	},
	{
		name: 'Nevada',
		value: 4,
	},
	{
		name: 'New Hampshire',
		value: 3,
	},
	{
		name: 'New Jersey',
		value: 1,
	},
	{
		name: 'New Mexico',
		value: 4,
	},
	{
		name: 'New York',
		value: 2,
	},
	{
		name: 'North Carolina',
		value: 3,
	},
	{
		name: 'North Dakota',
		value: 4,
	},
	{
		name: 'Ohio',
		value: 4,
	},
	{
		name: 'Oklahoma',
		value: 3,
	},
	{
		name: 'Oregon',
		value: 3,
	},
	{
		name: 'Pennsylvania',
		value: 7,
	},
	{
		name: 'Rhode Island',
		value: 2,
	},
	{
		name: 'South Carolina',
		value: 3,
	},
	{
		name: 'South Dakota',
		value: 1,
	},
	{
		name: 'Tennessee',
		value: 4,
	},
	{
		name: 'Texas',
		value: 4,
	},
	{
		name: 'Utah',
		value: 3,
	},
	{
		name: 'Vermont',
		value: 2,
	},
	{
		name: 'Virginia',
		value: 1,
	},
	{
		name: 'Washington',
		value: 2,
	},
	{
		name: 'West Virginia',
		value: 3,
	},
	{
		name: 'Wisconsin',
		value: 2,
	},
	{
		name: 'Wyoming',
		value: 4,
	},
	{
		name: 'Puerto Rico',
		value: 2,
	},
];

const states = require('./USA.json');

const Template = (args) => {
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseRegionChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	geoJson: states,
	specialAreas: {
		Alaska: {
			left: -131,
			top: 25,
			width: 15,
		},
		Hawaii: {
			left: -110,
			top: 28,
			width: 5,
		},
		'Puerto Rico': {
			left: -76,
			top: 26,
			width: 2,
		},
	},
	regionData: sampleData,
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
		roam: true,
		map: 'states',
		scaleLimit: {
			min: 1,
			max: 10,
		},
		aspectScale: '1:1',
	},
};
