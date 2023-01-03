import { COLORS } from '../../../styles';

const ThemedContainer = (props) => {
	const { theme, children } = props;

	return (
		<div
			style={{
				background: theme === 'dark' ? COLORS['dark-grey'] : COLORS.white,
				padding: '1rem',
			}}>
			{children}
		</div>
	);
};

ThemedContainer.defaultProps = {
	theme: 'dark',
};

export default ThemedContainer;
