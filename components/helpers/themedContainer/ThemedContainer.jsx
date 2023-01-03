import { COLORS } from '../../../styles';

const ThemedContainer = (props) => {
	const { theme, style, className, children } = props;

	return (
		<div
			className={className}
			style={{
				background: theme === 'dark' ? COLORS['dark-grey'] : COLORS.white,
				padding: '1rem',
				...style,
			}}>
			{children}
		</div>
	);
};

ThemedContainer.defaultProps = {
	theme: 'dark',
	style: {},
	className: '',
};

export default ThemedContainer;
