import PropTypes from 'prop-types';

export const propTypes = {
	className: PropTypes.string,
	component1: PropTypes.element,
	component2: PropTypes.element,
	component3: PropTypes.element,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'auto']),
	flexible: PropTypes.bool,
	radius: PropTypes.oneOf(['none', 'default', 'round', 'ellipse']),
	RootDOM: PropTypes.oneOf(['div', 'span', 'button']),
	attrs: PropTypes.object,
};

export const defaultProps = {
	className: '',
	component1: null,
	component2: null,
	component3: null,
	size: 'sm',
	flexible: false,
	radius: 'none',
	RootDOM: 'div',
	attrs: {},
};
