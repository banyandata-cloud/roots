import { createElement, forwardRef, isValidElement, type ReactElement } from 'react';
import { classes } from '../../utils';
import styles from './BaseCell.module.css';
import type { BaseCellComponentType, BaseCellProps } from './types';

/**
 * BaseCell - A flexible container component for displaying up to three components in a structured layout
 *
 * @returns A React component or null
 *
 * @example
 * ```tsx
 * <BaseCell
 *   component1={<Icon />}
 *   component2={<div>hello world!</div>}
 *   component3={<Button>Action</Button>}
 * />
 * ```
 */
export const BaseCell = forwardRef<HTMLElement, BaseCellProps<BaseCellComponentType>>(
	(props, ref): ReactElement | null => {
		const {
			className,
			size = 'sm',
			flexible,
			component1,
			component2 = '',
			component3,
			RootDOM = 'div',
			attrs = {},
			radius = 'none',
			dataTestId,
			title,
		} = props;

		let mainComponent: ReactElement | undefined | string | null = null;

		if (!component2) {
			if (component1 && component3) {
				mainComponent = null;
			}
			mainComponent = component1 ?? component3;
		}

		const Component = createElement(
			RootDOM,
			{
				'data-elem': 'base-cell',
				'data-testid': dataTestId ?? (typeof title === 'string' ? `${title}-test` : null),
				ref,
				...(typeof title === 'string' && {
					title,
				}),
				className: classes(
					styles.root,
					styles[size],
					styles[`border-radius-${radius}`],
					flexible && styles.flexible,
					mainComponent && styles.centered,
					className
				),
				...attrs,
			},
			<>
				{!mainComponent && component1 && <span data-elem='component1'>{component1}</span>}
				<span data-elem='component2'>{mainComponent ?? component2}</span>
				{!mainComponent && component3 && <span data-elem='component3'>{component3}</span>}
			</>
		);

		if (isValidElement(Component)) {
			return Component;
		}
		return null;
	}
);

export default BaseCell;
