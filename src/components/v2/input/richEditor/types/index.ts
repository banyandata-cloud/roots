import type { Editor } from '@tiptap/core';
import type React from 'react';

export type TextType = 'p' | 'h1' | 'h2' | 'h3';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HiddenMenuKey =
	| 'heading'
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'textColor'
	| 'highlight'
	| 'bulletList'
	| 'align'
	| 'justify'
	| 'link'
	| 'image'
	| 'code'
	| 'bubbleMenu';

export type HiddenMenu = Partial<Record<HiddenMenuKey, boolean>>;

export interface RichTextEditorProps {
	className?: string;
	toolbarClassName?: string;
	variant?: 'contained' | 'distinct';
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
}

export interface ToolBarProps {
	editor: Editor | null;
	textType: TextType;
	onTextTypeDropdownChange: (
		e: React.SyntheticEvent,
		value: string | string[] | null | undefined
	) => void;
	setLink: () => void;
	hiddenMenu: HiddenMenu;
}

export interface LinkDialogContextValue {
	linkDraft: string;
	setLinkDraft: (v: string) => void;
}
