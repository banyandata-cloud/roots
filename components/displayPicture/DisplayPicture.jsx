import PropTypes from 'prop-types';
import { getInitialsOfName, classes } from '../../utils';
import styles from './DisplayPicture.module.css';

const DisplayPicture = (props) => {
	const { name, className, url, size } = props;

	return (
		<div className={classes(styles.root, styles[size], className)}>
			{!url && (
				<div>
					<span data-elem='dp-name'>{getInitialsOfName(name)}</span>
				</div>
			)}
			{url && <img data-elem='dp-img' src={url} alt={name} />}
		</div>
	);
};

DisplayPicture.propTypes = {
	name: PropTypes.string,
	url: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.string,
};

DisplayPicture.defaultProps = {
	name: '',
	url: '',
	className: '',
	size: 'sm',
};

export default DisplayPicture;
