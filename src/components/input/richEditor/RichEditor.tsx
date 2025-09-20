import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { classes } from '../../../utils';
import { Button } from '../../buttons';
import DialogBox, { type DialogBoxHandle } from '../../modal/dialogBox/DialogBox';
import { Dropdownv2 as Dropdown, DropdownItemv2 as DropdownItem } from '../dropdown';
import { TextFieldv2 as TextField } from '../textField';
import styles from './RichEditor.module.css';
import { ColorHighlightIcon, ColorPalletteIcon, TextAlignIcon, TextLinkIcon } from './assets';
import type {
	HeadingLevel,
	LinkDialogContextValue,
	RichEditorProps,
	TextType,
	ToolBarProps,
} from './types';

const LinkDialogContext = React.createContext<LinkDialogContextValue | null>(null);

const LinkDialogBody: React.FC<{
	dismiss: () => void;
	setNoDismissEnabled: (enabled: boolean) => void;
}> = () => {
	const ctx = useContext(LinkDialogContext);
	if (!ctx) return null;
	const { linkDraft, setLinkDraft } = ctx;

	return (
		<TextField
			placeholder='Enter or Paste URL'
			value={linkDraft}
			onChange={(e, v) => {
				setLinkDraft(typeof v === 'string' ? v : (e.target as HTMLInputElement).value);
			}}
		/>
	);
};

const ToolBar: React.FC<ToolBarProps> = ({
	editor,
	textType,
	onTextTypeDropdownChange,
	setLink,
	hiddenMenu,
}) => {
	if (!editor) return null;

	const showBold = !hiddenMenu.bold;
	const showItalic = !hiddenMenu.italic;
	const showUnderline = !hiddenMenu.underline;
	const showStrike = !hiddenMenu.strike;
	const showColor = !hiddenMenu.color;
	const showTextType = !hiddenMenu.textType;
	const showAlign = !hiddenMenu.align;
	const showLink = !hiddenMenu.link;

	const currentTextColor = editor.getAttributes('textStyle').color as string;
	const currentHighlight = editor.getAttributes('highlight').color as string;

	return (
		<div className={styles.menu}>
			{showBold && (
				<Button
					title='B'
					onClick={() => {
						editor.chain().focus().toggleBold().run();
					}}
					className={classes(
						styles.item,
						styles.bold,
						editor.isActive('bold') && styles.active
					)}
				/>
			)}
			{showItalic && (
				<Button
					title='I'
					onClick={() => {
						editor.chain().focus().toggleItalic().run();
					}}
					className={classes(
						styles.item,
						styles.italic,
						editor.isActive('italic') && styles.active
					)}
				/>
			)}
			{showUnderline && (
				<Button
					title='U'
					onClick={() => {
						editor.chain().focus().toggleUnderline().run();
					}}
					className={classes(
						styles.item,
						styles.underline,
						editor.isActive('underline') && styles.active
					)}
				/>
			)}
			{showStrike && (
				<Button
					title='S'
					onClick={() => {
						editor.chain().focus().toggleStrike().run();
					}}
					className={classes(
						styles.item,
						styles.strike,
						editor.isActive('strike') && styles.active
					)}
				/>
			)}

			{showColor && (
				<>
					<TextField
						type='color'
						className={classes(styles.item, styles.color)}
						inputProps={{
							onInput: (event: React.FormEvent<HTMLInputElement>) => {
								editor.chain().focus().setColor(event.currentTarget.value).run();
							},
						}}
						LeftComponent={() => {
							return <ColorPalletteIcon color={currentTextColor} />;
						}}
						value={currentTextColor}
					/>
					<TextField
						type='color'
						className={classes(styles.item, styles.color)}
						inputProps={{
							onInput: (event: React.FormEvent<HTMLInputElement>) => {
								editor
									.chain()
									.focus()
									.toggleHighlight({
										color: event.currentTarget.value,
									})
									.run();
							},
						}}
						LeftComponent={() => {
							return <ColorHighlightIcon color={currentHighlight} />;
						}}
						value={currentHighlight}
					/>
				</>
			)}

			{showTextType && (
				<Dropdown
					value={textType}
					className={styles.dropdown}
					onChange={onTextTypeDropdownChange}
					popperClassName={styles.popper}>
					<DropdownItem title='Paragraph' value='p' />
					<DropdownItem title='Heading 1' value='h1' />
					<DropdownItem title='Heading 2' value='h2' />
					<DropdownItem title='Heading 3' value='h3' />
				</Dropdown>
			)}

			{showAlign && (
				<>
					<Button
						title={
							<TextAlignIcon.Left
								color={
									editor.isActive({
										textAlign: 'left',
									})
										? 'white'
										: undefined
								}
							/>
						}
						onClick={() => {
							editor.chain().focus().setTextAlign('left').run();
						}}
						className={classes(
							styles.item,
							styles.align,
							editor.isActive({
								textAlign: 'left',
							}) && styles.active
						)}
					/>
					<Button
						title={
							<TextAlignIcon.Center
								color={
									editor.isActive({
										textAlign: 'center',
									})
										? 'white'
										: undefined
								}
							/>
						}
						onClick={() => {
							editor.chain().focus().setTextAlign('center').run();
						}}
						className={classes(
							styles.item,
							styles.align,
							editor.isActive({
								textAlign: 'center',
							}) && styles.active
						)}
					/>
					<Button
						title={
							<TextAlignIcon.Right
								color={
									editor.isActive({
										textAlign: 'right',
									})
										? 'white'
										: undefined
								}
							/>
						}
						onClick={() => {
							editor.chain().focus().setTextAlign('right').run();
						}}
						className={classes(
							styles.item,
							styles.align,
							editor.isActive({
								textAlign: 'right',
							}) && styles.active
						)}
					/>
				</>
			)}

			{showLink && (
				<Button
					title={<TextLinkIcon color={editor.isActive('link') ? 'white' : undefined} />}
					onClick={setLink}
					className={classes(
						styles.item,
						styles.link,
						editor.isActive('link') && styles.active
					)}
				/>
			)}
		</div>
	);
};

const levelToTextType = (level: HeadingLevel): TextType => {
	if (level === 1) return 'h1';
	if (level === 2) return 'h2';
	if (level === 3) return 'h3';
	return 'p';
};
const RichEditor: React.FC<RichEditorProps> = ({
	className = '',
	defaultContent = '',
	setContent,
	placeholder = 'Your text here...',
	hiddenMenu = {},
	editable = true,
}) => {
	const [textType, setTextType] = useState<TextType>('p');

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Link.configure({
				openOnClick: true,
				autolink: true,
				defaultProtocol: 'https',
				protocols: ['http', 'https'],
			}),
			Placeholder.configure({
				placeholder,
			}),
		],
		content: defaultContent,
		editable,
		onUpdate: ({ editor: mEditor }) => {
			setContent?.(mEditor.getHTML());
		},
		onSelectionUpdate: ({ editor: mEditor }) => {
			const currentNode = mEditor.state.selection.$head.parent;
			if (currentNode.type.name === 'heading') {
				setTextType(levelToTextType(currentNode.attrs.level as HeadingLevel));
			} else {
				setTextType('p');
			}
		},
	});

	useEffect(() => {
		if (editor && defaultContent === '') editor.commands.clearContent();
	}, [defaultContent, editor]);

	const dialogRef = useRef<DialogBoxHandle | null>(null);

	// linkDraft state + ref (so onAction always sees latest)
	const [linkDraftState, setLinkDraftState] = useState<string>('');
	const linkDraftRef = useRef<string>('');
	const setLinkDraft = useCallback((v: string) => {
		linkDraftRef.current = v;
		setLinkDraftState(v);
	}, []);
	const linkDialogCtxValue = useMemo<LinkDialogContextValue>(() => {
		return {
			linkDraft: linkDraftState,
			setLinkDraft,
		};
	}, [linkDraftState, setLinkDraft]);

	const setLink = () => {
		if (!editor) return;
		const previousUrl = (editor.getAttributes('link').href as string | undefined) ?? '';
		setLinkDraft(previousUrl);

		dialogRef.current?.dialog({
			title: 'URL To Link',
			body: LinkDialogBody, // stable component type
			actionText: 'Link',
			cancelText: 'Cancel',
			variant: 'primary',
			onAction: ({ dismiss }) => {
				dismiss();
				const focussed = editor.chain().focus();
				const nextHref = linkDraftRef.current.trim();

				if (!nextHref) {
					focussed.extendMarkRange('link').unsetLink().run();
					return;
				}
				focussed
					.extendMarkRange('link')
					.setLink({
						href: nextHref,
					})
					.run();
			},
		});
	};

	// Match DropdownProps.onChange signature
	const onTextTypeDropdownChange = (
		_: React.SyntheticEvent,
		value: string | string[] | null | undefined
	) => {
		if (!editor) return;
		const next: TextType = (typeof value === 'string' ? value : 'p') as TextType;
		setTextType(next);

		const chain = editor.chain().focus();
		if (next === 'h1')
			void chain
				.toggleHeading({
					level: 1,
				})
				.run();
		if (next === 'h2')
			void chain
				.toggleHeading({
					level: 2,
				})
				.run();
		if (next === 'h3')
			void chain
				.toggleHeading({
					level: 3,
				})
				.run();
		if (next === 'p') void chain.setParagraph().run();
	};

	return (
		<LinkDialogContext.Provider value={linkDialogCtxValue}>
			<div className={classes(styles.root, className)}>
				<ToolBar
					editor={editor}
					textType={textType}
					onTextTypeDropdownChange={onTextTypeDropdownChange}
					setLink={setLink}
					hiddenMenu={hiddenMenu}
				/>
				<EditorContent className={styles.editor} editor={editor} />
				<DialogBox ref={dialogRef} />
			</div>
		</LinkDialogContext.Provider>
	);
};

export default RichEditor;
