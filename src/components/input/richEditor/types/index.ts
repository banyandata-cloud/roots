import type { Editor } from '@tiptap/core';
import type React from 'react';

export type TextType = 'p' | 'h1' | 'h2' | 'h3';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HiddenMenuKey =
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike'
	| 'color'
	| 'textType'
	| 'align'
	| 'link';
export type HiddenMenu = Partial<Record<HiddenMenuKey, boolean>>;

export interface RichEditorProps {
	className?: string;
	defaultContent?: string;
	setContent?: (html: string) => void;
	placeholder?: string;
	hiddenMenu?: HiddenMenu;
	editable?: boolean;
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

/* -------------------------- Link dialog context --------------------------- */
/** Small context so the dialog body can read/update the link draft
 *  without defining components inside render.
 */
export interface LinkDialogContextValue {
	linkDraft: string;
	setLinkDraft: (v: string) => void;
}
