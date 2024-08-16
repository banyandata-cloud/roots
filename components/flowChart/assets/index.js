export const getTickIconSvg = () => {
	return `
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.15" y="0.15" width="11.7" height="11.7" rx="5.85" fill="white"/>
            <rect x="0.15" y="0.15" width="11.7" height="11.7" rx="5.85" stroke="#3A8400" stroke-width="0.3"/>
            <path d="M9.09163 4.14575L5.42497 7.81242L3.7583 6.14575" stroke="#3A8400" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
};

export const getCrossIcon = () => {
    return `
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.15" y="0.15" width="11.7" height="11.7" rx="5.85" fill="white"/>
            <rect x="0.15" y="0.15" width="11.7" height="11.7" rx="5.85" stroke="#E40000" stroke-width="0.3"/>
            <path d="M7.79297 3.55176L3.79297 7.55176M3.79297 3.55176L7.79297 7.55176" 
                  stroke="#E40000" stroke-linecap="round" stroke-linejoin="round"
                  transform="translate(0, 0.3)"/>
        </svg>
    `;
};

export const getExcludeIcon = (color) => {
    return `
        <svg width="1.25rem" height="1.25rem" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" width="12" height="12" rx="6" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59091 3H3.5V6.91304H5.40906V9.00008H9.49997V5.08704H7.59091V3ZM7.59091 5.08704H5.40906V6.91304H7.59091V5.08704Z" fill="${color}"/>
        </svg>
    `;
};
