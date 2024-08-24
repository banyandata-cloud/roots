import PropTypes from 'prop-types';
import { classes, getInitialsOfName } from '../../utils';
import styles from './DisplayPicture.module.css';

const DisplayPicture = (props) => {
	const { name = '', className = '', url, size = 'sm' } = props;

	return (
		<div className={classes(styles.root, styles[size], className)}>
			{!url ? (
				<img data-elem='dp-img' src={url} alt={name} />
			) : (
				<div>
					<span data-elem='dp-name'>{getInitialsOfName(name)}</span>
				</div>
			)}
		</div>
	);
};

DisplayPicture.propTypes = {
	name: PropTypes.string,
	url: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.string,
};

export default DisplayPicture;
