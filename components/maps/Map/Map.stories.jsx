import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button } from '../../buttons';
import { ThemedContainer } from '../../helpers';
import Text from '../../text/Text';
import { InfoWindow } from '../InfoWindow';
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
		<ThemedContainer
			{...args}
			style={{
				width: '100%',
				height: '100%',
			}}>
			<Map {...args}>
				{coords.map((position, index) => {
					return (
						<Marker
							key={`${position.lat}-${position.lng}`}
							position={position}
							title={`Location ${index + 1}`}>
							<InfoWindow
								content={ReactDOMServer.renderToString(
									<>
										<Button title='hey' />
										<Text component='p'>Location {index + 1}</Text>
									</>
								)}
							/>
						</Marker>
					);
				})}
			</Map>
		</ThemedContainer>
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

const WithNetworkCallTemplate = (args) => {
	const [coordinates, setCoordinates] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			setCoordinates(coords);
		}, 1000);
	}, []);

	return (
		<Map {...args}>
			{coordinates.map((position, index) => {
				return (
					<Marker
						key={`${position.lat}-${position.lng}`}
						position={position}
						title={`Location ${index + 1}`}>
						<InfoWindow
							content={ReactDOMServer.renderToString(
								<>
									<Button title='hey' />
									<Text component='p'>Location {index + 1}</Text>
								</>
							)}
						/>
					</Marker>
				);
			})}
		</Map>
	);
};

export const WithNetworkCall = WithNetworkCallTemplate.bind({});

WithNetworkCall.args = {
	...Default.args,
	options: {
		...Default.args.options,
		clustered: true,
	},
};
