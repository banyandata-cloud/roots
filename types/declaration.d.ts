declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.svg' {
	import React from 'react';

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
