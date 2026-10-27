import { useEffect, useState, type CSSProperties, type ReactElement } from 'react';
import { Toggle } from '../../input/toggle';

type ThemeType = 'light' | 'dark';

interface ThemedContainerProps {
    theme?: ThemeType;
    style?: CSSProperties;
    className?: string;
    children: ReactElement;
}

const ThemedContainer = (props: ThemedContainerProps): ReactElement => {
    const { theme, style, className, children } = props;
    const [colorMode, setColorMode] = useState<ThemeType>(theme ?? 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', colorMode);
    }, [colorMode]);

    return (
        <div
            className={className}
            style={{
                // Follows the toggle (colorMode), not the static theme prop, so it reacts live.
                background: 'var(--color-bg-primary-alt, #FFFFFF)',
                padding: '1rem',
                ...style,
            }}>
            <div
                style={{
                    display: 'flex',
                    flex: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary, #414651)',
                }}>
                <span>Dark mode</span>
                <Toggle
                    checked={colorMode === 'dark'}
                    onChange={(_event, checked) => {
                        setColorMode(checked ? 'dark' : 'light');
                    }}
                />
            </div>
            {children}
        </div>
    );
};

export default ThemedContainer;
