type Size = 'sm' | 'md';

export interface DisplayPictureProps {
	name: string;
	className?: string;
	url: string;
	size?: Size;
}
