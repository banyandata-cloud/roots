import { createElement, forwardRef, isValidElement, type ReactElement } from 'react';
import { classes } from '../../utils';
import type { BaseCellComponentType, BaseCellProps } from './types';

const sizeMap: Record<string, string> = {
	sm: 'bn-w-[9.063rem]',
	md: 'bn-w-[15.625rem]',
	lg: 'bn-w-[21.875rem]',
	auto: 'bn-w-auto',
};

const radiusMap: Record<string, string> = {
	default: 'bn-rounded-[0.25rem]',
	round: 'bn-rounded-full',
	ellipse: 'bn-rounded-[1.563rem]',
	none: 'bn-rounded-none',
};

export const BaseCell = forwardRef<HTMLElement, BaseCellProps<BaseCellComponentType>>(
	(props, ref): ReactElement | null => {
		const {
			className,
			size = 'sm',
			flexible,
			component1,
			component2,
			component3,
			RootDOM = 'div',
			attrs = {},
			radius = 'none',
		} = props;

		const cls = classes(
			'bn-flex bn-flex-row  bn-items-center bn-p-2 bn-gap-2 bn-flex-none bn-h-12 bn-max-w-full bn-max-h-full bn-bg-transperent',
			sizeMap[size],
			radiusMap[radius],
			flexible && 'bn-flex-1 bn-min-w-[3rem]',
			flexible && size === 'sm' && 'bn-min-w-[9.063rem]',
			flexible && size === 'md' && 'bn-min-w-[15.625rem]',
			flexible && size === 'lg' && 'bn-min-w-[21.875rem]',
			className
		);

		const Component = createElement(
			RootDOM,
			{
				'data-elem': 'base-cell',
				ref,
				className: cls,
				...attrs,
			},
			<>
				{component1 && (
					<span data-elem='component1' className='bn-inline-block bn-max-h-full'>
						{component1}
					</span>
				)}
				{component2 && (
					<span data-elem='component2' className='bn-inline-block bn-max-h-full'>
						{component2}
					</span>
				)}
				{component3 && (
					<span data-elem='component3' className='bn-inline-block bn-max-h-full '>
						{component3}
					</span>
				)}
			</>
		);

		if (isValidElement(Component)) {
			return Component;
		}
		return null;
	}
);

export default BaseCell;
