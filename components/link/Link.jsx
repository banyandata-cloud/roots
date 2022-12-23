import PropTypes from 'prop-types';

const Link = (props) => {
	const { children, href, target } = props;

	return (
		<a href={href} target={target}>
			{children}
		</a>
	);
};

Link.propTypes = {
	href: PropTypes.string,
	target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
};

Link.defaultProps = {
	href: null,
	target: '_self',
};

export default Link;
