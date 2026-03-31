export type TextType = 'p' | 'h1' | 'h2' | 'h3';

export type HeadingLevel = 1 | 2 | 3;

export type HiddenMenuKey =
	| 'heading'
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'bulletList'
	| 'textColor'
	| 'highlight'
	| 'align'
	| 'justify'
	| 'link'
	| 'image'
	| 'attachment'
	| 'code'
	| 'bubbleMenu';

export type HiddenMenu = Partial<Record<HiddenMenuKey, boolean>>;

export interface RichTextEditorProps {
	className?: string;
	defaultContent?: string;
	content?: string;
	setContent?: (html: string) => void;
	placeholder?: string;
	hiddenMenu?: HiddenMenu;
	editable?: boolean;
	maxCharacters?: number;
	showCharacterCount?: boolean;
	headingLevels?: HeadingLevel[];
	onInsertImage?: () => void;
	onAttachFile?: () => void;
}
