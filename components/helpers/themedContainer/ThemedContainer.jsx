import { COLORS } from '../../../styles';

const ThemedContainer = (props) => {
	const { theme, style, className, children } = props;

	return (
		<div
			className={className}
			style={{
				background: theme === 'dark' ? COLORS['menu-black'] : COLORS.white,
				padding: '1rem',
				...style,
			}}>
			{children}
		</div>
	);
};

ThemedContainer.defaultProps = {
	theme: 'light',
	style: {},
	className: '',
};

export default ThemedContainer;
