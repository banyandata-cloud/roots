export interface PresetItemProps {
	label: string;
	selected?: boolean | undefined;
	/** `recent` items use smaller text and can wrap to two lines. */
	variant?: 'default' | 'recent' | undefined;
	onClick: () => void;
}
