import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@googlemaps/react-wrapper';
import { BaseMap } from '../BaseMap';

const Map = (props) => {
	const { options, apiKey, libraries, children } = props;

	return (
		<Wrapper apiKey={apiKey} libraries={libraries}>
			<BaseMap {...options}>{children}</BaseMap>
		</Wrapper>
	);
};

Map.propTypes = {
	apiKey: PropTypes.string.isRequired,
	libraries: PropTypes.arrayOf(PropTypes.string),
};

Map.defaultProps = {
	libraries: undefined,
};

export default Map;
