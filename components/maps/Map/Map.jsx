import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@googlemaps/react-wrapper';
import { BaseMap } from '../BaseMap';
import { Mapv2 } from '../../mapsV2/';

const Map = (props) => {
	const { loading, options, apiKey, libraries, children, theme, fallback, v2 } = props;

	if (v2) {
		return <Mapv2 {...props} />;
	}

	return (
		<Wrapper apiKey={apiKey} libraries={libraries}>
			<BaseMap {...options} loading={loading} theme={theme} fallback={fallback}>
				{children}
			</BaseMap>
		</Wrapper>
	);
};

Map.propTypes = {
	loading: PropTypes.bool,
	apiKey: PropTypes.string.isRequired,
	libraries: PropTypes.arrayOf(PropTypes.string),
	theme: PropTypes.oneOf(['light', 'dark']),
};

Map.defaultProps = {
	loading: false,
	libraries: undefined,
	theme: 'dark',
};

export default Map;
