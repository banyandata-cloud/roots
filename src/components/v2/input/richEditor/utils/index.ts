import type { Editor } from '@tiptap/core';
import type { HeadingLevel, TextType } from '../types';

export const levelToTextType = (level: HeadingLevel): TextType => {
	if (level === 1) return 'h1';
	if (level === 2) return 'h2';
	if (level === 3) return 'h3';
	return 'p';
};

export const getSelectionTextType = (editor: Editor): TextType => {
	const currentNode = editor.state.selection.$head.parent;
	if (currentNode.type.name === 'heading') {
		return levelToTextType(currentNode.attrs.level as HeadingLevel);
	}
	return 'p';
};
