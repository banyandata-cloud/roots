import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@googlemaps/react-wrapper';
import { BaseMap } from '../BaseMap';

const Map = (props) => {
	const { loading, options, apiKey, libraries, children } = props;

	return (
		<Wrapper apiKey={apiKey} libraries={libraries}>
			<BaseMap {...options} loading={loading}>
				{children}
			</BaseMap>
		</Wrapper>
	);
};

Map.propTypes = {
	loading: PropTypes.bool,
	apiKey: PropTypes.string.isRequired,
	libraries: PropTypes.arrayOf(PropTypes.string),
};

Map.defaultProps = {
	loading: false,
	libraries: undefined,
};

export default Map;
