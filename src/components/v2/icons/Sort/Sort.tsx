const Sort = ({
    className,
    position = 'default',
}: {
    className?: string | undefined;
    position: 'az' | 'za' | 'default';
}) => {
    const upColor = position === 'az' ? '#1f5fcc' : '#A4A7AE';
    const downColor = position === 'za' ? '#1f5fcc' : '#A4A7AE';

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            className={className}>
            {/* Up arrow — left side */}
            {(position === 'default' || position === 'az') && (
                <>
                    <path
                        d='M1.6001 7.02413C2.58888 6.03195 3.58443 5.03298 4.57321 4.04081C5.562 5.03298 6.55755 6.03195 7.54633 7.02413'
                        stroke={upColor}
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M4.57324 4.0408V12.4811'
                        stroke={upColor}
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </>
            )}
            {/* Down arrow — right side */}
            {(position === 'default' || position === 'za') && (
                <>
                    <path
                        d='M14.3998 9.53172C13.4111 10.5239 12.4155 11.5229 11.4267 12.515C10.4379 11.5229 9.44239 10.5239 8.45361 9.53172'
                        stroke={downColor}
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <path
                        d='M11.4268 12.5218V4'
                        stroke={downColor}
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </>
            )}
        </svg>
    );
};

export default Sort;