import { Marker } from '../Marker';
import Map from './Map';

export default {
	title: 'Components/Map',
	component: Map,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Map component used everywhere',
	},
};

const coords = [
	{
		lat: 28,
		lng: 120,
	},
	{
		lat: 28.5,
		lng: 120,
	},
	{
		lat: 28.2,
		lng: 120,
	},
	{
		lat: 27,
		lng: 103,
	},
	{
		lat: 22,
		lng: 125,
	},
	{
		lat: 22,
		lng: 78,
	},
];

const Template = (args) => {
	return (
		<Map {...args}>
			{coords.map((position) => {
				return <Marker key={`${position.lat}-${position.lng}`} position={position} />;
			})}
		</Map>
	);
};

export const Default = Template.bind({});

Default.args = {
	apiKey: process.env.GOOGLE_MAPS_API_KEY,
	options: {
		style: {
			flexGrow: '1',
			height: '100%',
		},
		mapId: '20e2e511856fee45',
	},
};

export const Clustered = Template.bind({});

Clustered.args = {
	...Default.args,
	options: {
		...Default.args.options,
		clustered: true,
	},
};