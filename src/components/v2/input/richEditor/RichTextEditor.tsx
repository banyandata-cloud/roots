import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { Editor } from '@tiptap/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { classes } from '../../../../utils';
import {
	BulletListIcon,
	CodeIcon,
	ImageIcon,
	TextColorIcon,
	TextAlignIcon,
	TextLinkIcon,
} from './assets';
import styles from './RichTextEditor.module.css';
import type { HeadingLevel, HiddenMenu, RichTextEditorProps, TextType } from './types';

const TEXT_TYPE_LABEL: Record<TextType, string> = {
	p: 'Paragraph',
	h1: 'Heading 1',
	h2: 'Heading 2',
	h3: 'Heading 3',
};

const SWATCH_COLORS = [
	'#161616',
	'#697586',
	'#A4A7AE',
	'#D0D5DD',
	'#E4E7EC',
	'#12B76A',
	'#1D9BF0',
	'#F04438',
	'#E67000',
	'#175CD3',
	'#7F56D9',
	'#CA2C92',
];

const levelToTextType = (level: HeadingLevel): TextType => {
	if (level === 1) return 'h1';
	if (level === 2) return 'h2';
	if (level === 3) return 'h3';
	return 'p';
};

const getSelectionTextType = (editor: Editor): TextType => {
	const currentNode = editor.state.selection.$head.parent;
	if (currentNode.type.name === 'heading') {
		return levelToTextType(currentNode.attrs.level as HeadingLevel);
	}
	return 'p';
};

const ToolbarButton: React.FC<{
	ariaLabel: string;
	onClick: () => void;
	children: React.ReactNode;
	active?: boolean;
	disabled?: boolean;
}> = ({ ariaLabel, onClick, children, active = false, disabled = false }) => {
	return (
		<button
			type='button'
			aria-label={ariaLabel}
			title={ariaLabel}
			disabled={disabled}
			onMouseDown={(event) => {
				event.preventDefault();
			}}
			onClick={onClick}
			className={classes(
				styles.toolbarButton,
				active && styles.active,
				disabled && styles.disabled
			)}
		>
			{children}
		</button>
	);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
	className = '',
	defaultContent = '',
	content,
	setContent,
	placeholder = 'Your text here...',
	hiddenMenu = {},
	editable = true,
	maxCharacters = 1000,
	showCharacterCount = true,
	headingLevels = [1, 2, 3],
	onInsertImage,
}) => {
	const [textType, setTextType] = useState<TextType>('p');
	const [textLength, setTextLength] = useState<number>(0);
	const [isColorMenuOpen, setIsColorMenuOpen] = useState<boolean>(false);
	const [customColor, setCustomColor] = useState<string>('#7F56D9');
	const colorMenuRef = useRef<HTMLDivElement | null>(null);
	const highlightInputRef = useRef<HTMLInputElement | null>(null);

	const normalizedHeadingLevels = useMemo<HeadingLevel[]>(() => {
		const validLevels = headingLevels.filter((level): level is HeadingLevel => {
			return level === 1 || level === 2 || level === 3;
		});
		if (validLevels.length === 0) {
			return [1];
		}
		return Array.from(new Set(validLevels));
	}, [headingLevels]);

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
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
				protocols: ['http', 'https'],
			}),
			Placeholder.configure({
				placeholder,
			}),
		],
		content: content ?? defaultContent,
		editable,
		onCreate: ({ editor: mEditor }) => {
			setTextType(getSelectionTextType(mEditor));
			setTextLength(mEditor.getText().length);
		},
		onUpdate: ({ editor: mEditor }) => {
			setTextLength(mEditor.getText().length);
			setContent?.(mEditor.getHTML());
		},
		onSelectionUpdate: ({ editor: mEditor }) => {
			setTextType(getSelectionTextType(mEditor));
		},
	});

	useEffect(() => {
		if (!editor || content === undefined) return;
		if (content === editor.getHTML()) return;
		editor.commands.setContent(content, false);
		setTextLength(editor.getText().length);
	}, [content, editor]);

	useEffect(() => {
		if (!editor) return;
		if (content !== undefined) return;
		if (defaultContent === '') editor.commands.clearContent();
	}, [content, defaultContent, editor]);

	useEffect(() => {
		if (!isColorMenuOpen) return;

		const onMouseDown = (event: MouseEvent) => {
			if (!colorMenuRef.current) return;
			if (colorMenuRef.current.contains(event.target as Node)) return;
			setIsColorMenuOpen(false);
		};

		document.addEventListener('mousedown', onMouseDown);
		return () => {
			document.removeEventListener('mousedown', onMouseDown);
		};
	}, [isColorMenuOpen]);

	if (!editor) {
		return null;
	}

	const toolbarMenu: HiddenMenu = hiddenMenu ?? {};
	const currentHighlight = (editor.getAttributes('highlight').color as string) || '#161616';
	const charactersLeft = maxCharacters - textLength;

	const applyTextType = (nextType: TextType) => {
		const chain = editor.chain().focus();
		setTextType(nextType);
		if (nextType === 'p') {
			chain.setParagraph().run();
			return;
		}
		const level = Number(nextType.replace('h', '')) as HeadingLevel;
		chain.setHeading({ level }).run();
	};

	const applyAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
		editor.chain().focus().setTextAlign(align).run();
	};

	const applyHighlight = (color: string) => {
		editor
			.chain()
			.focus()
			.toggleHighlight({
				color,
			})
			.run();
	};

	const setLink = () => {
		const previousUrl = (editor.getAttributes('link').href as string | undefined) ?? '';
		const inputUrl =
			typeof window !== 'undefined' ? window.prompt('Enter URL', previousUrl) : previousUrl;
		if (inputUrl === null) return;
		const url = inputUrl.trim();
		const chain = editor.chain().focus().extendMarkRange('link');
		if (!url) {
			chain.unsetLink().run();
			return;
		}
		chain
			.setLink({
				href: url,
			})
			.run();
	};

	return (
		<div className={classes(styles.root, className)}>
			<div className={styles.toolbarWrap}>
				<div className={styles.toolbar} data-elem='toolbar'>
					{!toolbarMenu.bold && (
						<ToolbarButton
							ariaLabel='Bold'
							onClick={() => {
								editor.chain().focus().toggleBold().run();
							}}
							active={editor.isActive('bold')}
						>
							<strong>B</strong>
						</ToolbarButton>
					)}
					{!toolbarMenu.italic && (
						<ToolbarButton
							ariaLabel='Italic'
							onClick={() => {
								editor.chain().focus().toggleItalic().run();
							}}
							active={editor.isActive('italic')}
						>
							<em>I</em>
						</ToolbarButton>
					)}
					{!toolbarMenu.underline && (
						<ToolbarButton
							ariaLabel='Underline'
							onClick={() => {
								editor.chain().focus().toggleUnderline().run();
							}}
							active={editor.isActive('underline')}
						>
							<span className={styles.underlineText}>U</span>
						</ToolbarButton>
					)}
					{!toolbarMenu.strike && (
						<ToolbarButton
							ariaLabel='Strike'
							onClick={() => {
								editor.chain().focus().toggleStrike().run();
							}}
							active={editor.isActive('strike')}
						>
							<span className={styles.strikeText}>S</span>
						</ToolbarButton>
					)}

					{!toolbarMenu.textColor && !toolbarMenu.highlight && (
						<div className={styles.colorMenuTrigger} ref={colorMenuRef}>
							<ToolbarButton
								ariaLabel='Text color'
								onClick={() => {
									setIsColorMenuOpen((prev) => !prev);
								}}
								active={editor.isActive('highlight')}
							>
								<TextColorIcon color={currentHighlight} />
							</ToolbarButton>

							{isColorMenuOpen && (
								<div className={styles.colorPopover}>
									<div className={styles.swatchGrid}>
										{SWATCH_COLORS.map((color) => {
											return (
												<button
													key={color}
													type='button'
													aria-label={`Select color ${color}`}
													className={classes(
														styles.swatch,
														currentHighlight === color &&
															styles.swatchActive
													)}
													style={{ backgroundColor: color }}
													onClick={() => {
														applyHighlight(color);
														setCustomColor(color);
													}}
												/>
											);
										})}
									</div>
									<div className={styles.customRow}>
										<span className={styles.customLabel}>Custom</span>
										<input
											ref={highlightInputRef}
											type='color'
											aria-label='Custom highlight color'
											value={customColor}
											onChange={(event) => {
												const color = event.target.value;
												setCustomColor(color);
												applyHighlight(color);
											}}
										/>
										<input
											type='text'
											className={styles.hexInput}
											aria-label='Hex color input'
											value={customColor.toUpperCase()}
											onChange={(event) => {
												const value = event.target.value.trim();
												setCustomColor(
													value.startsWith('#') ? value : `#${value}`
												);
											}}
											onBlur={() => {
												const nextColor = customColor.startsWith('#')
													? customColor
													: `#${customColor}`;
												if (/^#[0-9a-fA-F]{6}$/.test(nextColor)) {
													setCustomColor(nextColor);
													applyHighlight(nextColor);
												}
											}}
										/>
									</div>
								</div>
							)}
						</div>
					)}
					{!toolbarMenu.bulletList && (
						<ToolbarButton
							ariaLabel='Bullet list'
							onClick={() => {
								editor.chain().focus().toggleBulletList().run();
							}}
							active={editor.isActive('bulletList')}
						>
							<BulletListIcon />
						</ToolbarButton>
					)}

					{!toolbarMenu.heading && (
						<div className={styles.headingSelectWrap}>
							<select
								aria-label='Text style'
								className={styles.headingSelect}
								value={textType}
								onChange={(event) => {
									applyTextType(event.target.value as TextType);
								}}
							>
								<option value='p'>{TEXT_TYPE_LABEL.p}</option>
								{normalizedHeadingLevels.includes(1) && (
									<option value='h1'>{TEXT_TYPE_LABEL.h1}</option>
								)}
								{normalizedHeadingLevels.includes(2) && (
									<option value='h2'>{TEXT_TYPE_LABEL.h2}</option>
								)}
								{normalizedHeadingLevels.includes(3) && (
									<option value='h3'>{TEXT_TYPE_LABEL.h3}</option>
								)}
							</select>
						</div>
					)}

					{!toolbarMenu.align && (
						<>
							<ToolbarButton
								ariaLabel='Align left'
								onClick={() => {
									applyAlign('left');
								}}
								active={editor.isActive({ textAlign: 'left' })}
							>
								<TextAlignIcon.Left />
							</ToolbarButton>
							<ToolbarButton
								ariaLabel='Align center'
								onClick={() => {
									applyAlign('center');
								}}
								active={editor.isActive({ textAlign: 'center' })}
							>
								<TextAlignIcon.Center />
							</ToolbarButton>
							<ToolbarButton
								ariaLabel='Align right'
								onClick={() => {
									applyAlign('right');
								}}
								active={editor.isActive({ textAlign: 'right' })}
							>
								<TextAlignIcon.Right />
							</ToolbarButton>
							{!toolbarMenu.justify && (
								<ToolbarButton
									ariaLabel='Justify'
									onClick={() => {
										applyAlign('justify');
									}}
									active={editor.isActive({ textAlign: 'justify' })}
								>
									<TextAlignIcon.Justify />
								</ToolbarButton>
							)}
						</>
					)}

					{!toolbarMenu.link && (
						<ToolbarButton
							ariaLabel='Link'
							onClick={setLink}
							active={editor.isActive('link')}
						>
							<TextLinkIcon />
						</ToolbarButton>
					)}
					{!toolbarMenu.image && (
						<ToolbarButton
							ariaLabel='Insert image'
							onClick={() => {
								onInsertImage?.();
							}}
						>
							<ImageIcon />
						</ToolbarButton>
					)}
					{!toolbarMenu.code && (
						<ToolbarButton
							ariaLabel='Inline code'
							onClick={() => {
								editor.chain().focus().toggleCode().run();
							}}
							active={editor.isActive('code')}
						>
							<CodeIcon />
						</ToolbarButton>
					)}
				</div>
			</div>

			<EditorContent className={styles.editor} editor={editor} />

			{!toolbarMenu.bubbleMenu && editable && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
					<div className={styles.bubbleMenu}>
						<ToolbarButton
							ariaLabel='Bubble bold'
							onClick={() => {
								editor.chain().focus().toggleBold().run();
							}}
							active={editor.isActive('bold')}
						>
							<strong>B</strong>
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble italic'
							onClick={() => {
								editor.chain().focus().toggleItalic().run();
							}}
							active={editor.isActive('italic')}
						>
							<em>I</em>
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble underline'
							onClick={() => {
								editor.chain().focus().toggleUnderline().run();
							}}
							active={editor.isActive('underline')}
						>
							<span className={styles.underlineText}>U</span>
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble strike'
							onClick={() => {
								editor.chain().focus().toggleStrike().run();
							}}
							active={editor.isActive('strike')}
						>
							<span className={styles.strikeText}>S</span>
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble align left'
							onClick={() => {
								applyAlign('left');
							}}
							active={editor.isActive({ textAlign: 'left' })}
						>
							<TextAlignIcon.Left />
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble align center'
							onClick={() => {
								applyAlign('center');
							}}
							active={editor.isActive({ textAlign: 'center' })}
						>
							<TextAlignIcon.Center />
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble align right'
							onClick={() => {
								applyAlign('right');
							}}
							active={editor.isActive({ textAlign: 'right' })}
						>
							<TextAlignIcon.Right />
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble justify'
							onClick={() => {
								applyAlign('justify');
							}}
							active={editor.isActive({ textAlign: 'justify' })}
						>
							<TextAlignIcon.Justify />
						</ToolbarButton>
					</div>
				</BubbleMenu>
			)}

			{showCharacterCount && (
				<div
					className={classes(
						styles.characterCount,
						charactersLeft < 0 && styles.overLimit
					)}
					data-elem='character-count'
				>
					{charactersLeft} characters left
				</div>
			)}
		</div>
	);
};

export default RichTextEditor;
