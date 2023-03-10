import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '@googlemaps/react-wrapper';
import { BaseMap } from '../BaseMap';

const Map = (props) => {
	const { loading, options, apiKey, libraries, children, theme, fallback } = props;

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
