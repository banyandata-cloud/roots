import { useEffect, useState, type CSSProperties, type ReactElement } from 'react';
import { COLORS } from '../../../styles';
import { Toggle } from '../../Toggle';

type ThemeType = 'light' | 'dark';

interface ThemedContainerProps {
	theme?: ThemeType;
	style?: CSSProperties;
	className?: string;
	children: ReactElement;
}

const themeOptions = [
	{
		title: 'Light mode',
		value: 'light',
	},
	{
		title: 'Dark mode',
		value: 'dark',
	},
];

const ThemedContainer = (props: ThemedContainerProps): ReactElement => {
	const { theme, style, className, children } = props;
	const [colorMode, setColorMode] = useState<ThemeType>('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', colorMode);
	}, [colorMode]);

	const updateColorMode = (value: ThemeType) => {
		setColorMode(value);
	};

	return (
		<div
			className={className}
			style={{
				background: theme === 'dark' ? COLORS['menu-black'] : COLORS.white,
				padding: '1rem',
				...style,
			}}>
			<div
				style={{
					display: 'flex',
					flex: 'row',
					width: '100%',
					alignItems: 'flex-end',
					justifyContent: 'flex-end',
				}}>
				<Toggle
					options={themeOptions}
					value={colorMode}
					onChange={updateColorMode}
					smooth
				/>
			</div>
			{children}
		</div>
	);
};

export default ThemedContainer;
