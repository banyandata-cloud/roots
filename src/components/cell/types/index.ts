import type { ComponentProps, JSX, ReactElement } from 'react';

/**
 * Defines the possible size values for the cell component.
 * - 'sm': Small size
 * - 'md': Medium size
 * - 'lg': Large size
 * - 'auto': Automatic sizing based on content
 */
export type ElementSizeTypes = 'sm' | 'md' | 'lg' | 'auto';

/**
 * Specifies the allowed root DOM element types for the cell.
 * - 'div': Standard block-level container
 * - 'span': Inline container
 * - 'button': Button element
 */
type RootDOMTypes = 'div' | 'span' | 'button' | 'td';

/**
 * Specifies the border radius options for the cell.
 * - 'none': No border radius
 * - 'default': Default border radius
 * - 'round': Fully rounded (pill-shaped)
 * - 'ellipse': Elliptical border radius
 */
type RadiusTypes = 'none' | 'default' | 'round' | 'ellipse';

/**
 * Specifies the Component Type to be rendered as it is dynamic.
 * - 'button': default as button
 * - 'div': Otherwise as div
 */
export type BaseCellComponentType = 'button' | 'div';

/**
 * Props for the base cell component.
 */
export type BaseCellProps<
	T extends keyof JSX.IntrinsicElements,
	TComponent2 extends boolean = true,
> = {
	/**
	 * Additional CSS class names to apply to the cell.
	 */
	className?: string | undefined;

	/**
	 * Size of the cell. Can be 'sm', 'md', 'lg', or 'auto'.
	 */
	size?: ElementSizeTypes;

	/**
	 * If true, the cell will be flexible and expand to fill available space.
	 */
	flexible?: boolean | undefined;

	/**
	 * An optional React element to render inside the cell.
	 */
	component1?: ReactElement | undefined;

	/**
	 * An optional tertiary React element to render inside the cell.
	 */
	component3?: ReactElement | undefined;

	/**
	 * The root DOM element type for the cell. Can be 'div', 'span', or 'button'.
	 */
	RootDOM?: RootDOMTypes;

	/**
	 * Additional HTML attributes to apply to the root element.
	 */
	attrs?: ComponentProps<T>;

	/**
	 * Border radius style for the cell. Can be 'none', 'default', 'round', or 'ellipse'.
	 */
	radius?: RadiusTypes;
} & (TComponent2 extends true
	? { component2: ReactElement }
	: { component2?: ReactElement | undefined });
