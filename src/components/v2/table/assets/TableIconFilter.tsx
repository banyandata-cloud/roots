import type { CSSProperties } from 'react';

interface TableIconFilterProps {
    className?: string;
    style?: CSSProperties;
    color?: string;
}

const TableIconFilter = ({
    className,
    style,
    color = '#717680',
}: TableIconFilterProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            className={className}
            style={{
                width: '16px',
                height: '16px',
                aspectRatio: '1/1',
                ...style,
            }}>
            <path
                d='M2.2959 4.36447H4.05928'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M7.32324 4.36447H13.8973'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M5.77621 5.82621C6.58351 5.82621 7.23796 5.17177 7.23796 4.36446C7.23796 3.55716 6.58351 2.90271 5.77621 2.90271C4.9689 2.90271 4.31445 3.55716 4.31445 4.36446C4.31445 5.17177 4.9689 5.82621 5.77621 5.82621Z'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M2.10254 12.0986H3.86592'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M7.12988 12.0986H13.7039'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M5.58285 13.5603C6.39015 13.5603 7.0446 12.9059 7.0446 12.0986C7.0446 11.2913 6.39015 10.6368 5.58285 10.6368C4.77554 10.6368 4.12109 11.2913 4.12109 12.0986C4.12109 12.9059 4.77554 13.5603 5.58285 13.5603Z'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M12.1338 8.23154H13.8972'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M2.12598 8.23154H8.69999'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M10.4168 9.69328C11.2241 9.69328 11.8786 9.03883 11.8786 8.23153C11.8786 7.42422 11.2241 6.76978 10.4168 6.76978C9.60953 6.76978 8.95508 7.42422 8.95508 8.23153C8.95508 9.03883 9.60953 9.69328 10.4168 9.69328Z'
                stroke={color}
                strokeWidth='1.3'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
        </svg>
    );
};

export default TableIconFilter;