import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor, Extension } from '@tiptap/react';
import { Plugin } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { classes } from '../../../../utils';
import {
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	BulletListIcon,
	CodeIcon,
	ImageIcon,
	TextColorIcon,
	TextAlignIcon,
	TextLinkIcon,
	ResizeHandleIcon,
} from './assets';
import styles from './RichTextEditor.module.css';
import type { HeadingLevel, HiddenMenu, RichTextEditorProps, TextType } from './types';

import { SWATCH_COLORS, TEXT_TYPE_LABEL } from './constants';
import { getSelectionTextType } from './utils';
import Dropdown from '../../../input/dropdown/Dropdown';
import DropdownItem from '../../../input/dropdown/dropdown-item/DropdownItem';
import CharacterCount from './components/CharacterCount';

const ToolbarButton: React.FC<{
	ariaLabel: string;
	onClick: () => void;
	children: React.ReactNode;
	active?: boolean;
	disabled?: boolean;
	className?: string | undefined;
}> = ({ ariaLabel, onClick, children, active = false, disabled = false, className = '' }) => {
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
				disabled && styles.disabled,
				className
			)}
		>
			{children}
		</button>
	);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
	className = '',
	variant = 'distinct',
	defaultContent = '',
	content,
	setContent,
	placeholder = 'Your text here...',
	hiddenMenu = {},
	editable = true,
	maxCharacters = 1816,
	showCharacterCount = true,
	headingLevels = [1, 2, 3],
	onInsertImage,
	toolbarClassName = '',
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

	const extensions = useMemo(() => {
		return [
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
			Extension.create({
				name: 'characterLimit',
				addOptions() {
					return {
						limit: 1816,
					};
				},
				addProseMirrorPlugins() {
					return [
						new Plugin({
							filterTransaction: (transaction, state) => {
								const limit = this.options.limit;
								if (!limit) return true;

								const nextLength = transaction.doc.textBetween(
									0,
									transaction.doc.content.size,
									'\n',
									'\n'
								).length;
								const previousLength = state.doc.textBetween(
									0,
									state.doc.content.size,
									'\n',
									'\n'
								).length;

								// Allow if within limit OR if the transaction reduces the length
								return nextLength <= limit || nextLength < previousLength;
							},
						}),
					];
				},
			}).configure({
				limit: maxCharacters,
			}),
		];
	}, [maxCharacters, placeholder]);

	const editor = useEditor({
		extensions,
		content: content ?? defaultContent,
		editable,
		onCreate: ({ editor: mEditor }) => {
			setTextType(getSelectionTextType(mEditor));
			const currentText = mEditor.state.doc.textBetween(0, mEditor.state.doc.content.size, '\n', '\n');
			setTextLength(currentText.length);
		},
		onUpdate: ({ editor: mEditor }) => {
			const currentText = mEditor.state.doc.textBetween(0, mEditor.state.doc.content.size, '\n', '\n');
			setTextLength(currentText.length);
			setContent?.(mEditor.getHTML());
		},
		onSelectionUpdate: ({ editor: mEditor }) => {
			setTextType(getSelectionTextType(mEditor));
			const currentText = mEditor.state.doc.textBetween(0, mEditor.state.doc.content.size, '\n', '\n');
			setTextLength(currentText.length);
		},
	});





	useEffect(() => {
		if (editor && maxCharacters !== undefined) {
			(editor as any).setOptions('characterLimit', { limit: maxCharacters });
		}
	}, [editor, maxCharacters]);

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
	const currentTextColor = (editor.getAttributes('textStyle').color as string) || '#181D27';

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

	const applyTextColor = (color: string) => {
		editor.chain().focus().setColor(color).run();
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
		<div className={classes(styles.root, variant === 'contained' && styles.variantContained, className)}>
			<div className={styles.toolbarWrap}>
				<div className={classes(styles.toolbar, toolbarClassName)} data-elem='toolbar'>
					{/* Heading Group */}
					{!toolbarMenu.heading && (
						<div className={styles.headingSelectWrap}>
							<Dropdown
								value={textType}
								className={styles.headingDropdown}
								onChange={(_event, value) => {
									applyTextType(value as TextType);
								}}
							>
								<DropdownItem title={TEXT_TYPE_LABEL.p} value='p' />
								{normalizedHeadingLevels.includes(1) && (
									<DropdownItem title={TEXT_TYPE_LABEL.h1} value='h1' />
								)}
								{normalizedHeadingLevels.includes(2) && (
									<DropdownItem title={TEXT_TYPE_LABEL.h2} value='h2' />
								)}
								{normalizedHeadingLevels.includes(3) && (
									<DropdownItem title={TEXT_TYPE_LABEL.h3} value='h3' />
								)}
							</Dropdown>
						</div>
					)}

					{/* Text Formatting Group */}
					{!toolbarMenu.bold && (
						<ToolbarButton
							ariaLabel='Bold ⌘B'
							onClick={() => {
								editor.chain().focus().toggleBold().run();
							}}
							active={editor.isActive('bold')}
						>
							<BoldIcon color={editor.isActive('bold') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}
					{!toolbarMenu.italic && (
						<ToolbarButton
							ariaLabel='Italic ⌘I'
							onClick={() => {
								editor.chain().focus().toggleItalic().run();
							}}
							active={editor.isActive('italic')}
						>
							<ItalicIcon color={editor.isActive('italic') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}
					{!toolbarMenu.underline && (
						<ToolbarButton
							ariaLabel='Underline ⌘U'
							onClick={() => {
								editor.chain().focus().toggleUnderline().run();
							}}
							active={editor.isActive('underline')}
						>
							<UnderlineIcon color={editor.isActive('underline') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}

					{(!toolbarMenu.bold || !toolbarMenu.italic || !toolbarMenu.underline) && (
						<div className={styles.toolbarDivider} />
					)}

					{/* Color Group */}
					{!toolbarMenu.textColor && !toolbarMenu.highlight && (
						<>
							<div className={styles.colorMenuTrigger} ref={colorMenuRef}>
								<ToolbarButton
									ariaLabel='Text color'
									className={styles.colorToolbarButton}
									onClick={() => {
										setIsColorMenuOpen((prev) => !prev);
									}}
									active={editor.isActive('textStyle')}
								>
									<TextColorIcon color={currentTextColor} />
								</ToolbarButton>

								{isColorMenuOpen && (
									<div className={styles.colorPopover}>
										<div className={styles.swatchGrid}>
											{SWATCH_COLORS.map((color) => {
												return (
													<button
														key={color}
														type='button'
														aria-label={`Select text color ${color}`}
														className={classes(
															styles.swatch,
															currentTextColor === color &&
															styles.swatchActive
														)}
														style={{ backgroundColor: color }}
														onClick={() => {
															applyTextColor(color);
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
												aria-label='Custom text color'
												value={customColor}
												onChange={(event) => {
													const color = event.target.value;
													setCustomColor(color);
													applyTextColor(color);
												}}
											/>
											<input
												type='text'
												className={styles.hexInput}
												aria-label='Hex text color input'
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
														applyTextColor(nextColor);
													}
												}}
											/>
										</div>
									</div>
								)}
							</div>
							<div className={styles.toolbarDivider} />
						</>
					)}

					{/* Alignment & List Group */}
					{!toolbarMenu.align && (
						<>
							<ToolbarButton
								ariaLabel='Left align'
								onClick={() => {
									applyAlign('left');
								}}
								active={editor.isActive({ textAlign: 'left' })}
							>
								<TextAlignIcon.Left color={editor.isActive({ textAlign: 'left' }) ? 'white' : 'currentColor'} />
							</ToolbarButton>
							<ToolbarButton
								ariaLabel='Center align'
								onClick={() => {
									applyAlign('center');
								}}
								active={editor.isActive({ textAlign: 'center' })}
							>
								<TextAlignIcon.Center color={editor.isActive({ textAlign: 'center' }) ? 'white' : 'currentColor'} />
							</ToolbarButton>
							<ToolbarButton
								ariaLabel='Right align'
								onClick={() => {
									applyAlign('right');
								}}
								active={editor.isActive({ textAlign: 'right' })}
							>
								<TextAlignIcon.Right color={editor.isActive({ textAlign: 'right' }) ? 'white' : 'currentColor'} />
							</ToolbarButton>
						</>
					)}
					{!toolbarMenu.bulletList && (
						<ToolbarButton
							ariaLabel='Dot points'
							onClick={() => {
								editor.chain().focus().toggleBulletList().run();
							}}
							active={editor.isActive('bulletList')}
						>
							<BulletListIcon color={editor.isActive('bulletList') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}

					{(!toolbarMenu.align || !toolbarMenu.bulletList) &&
						(!toolbarMenu.link ||
							!toolbarMenu.code ||
							!toolbarMenu.strike ||
							!toolbarMenu.justify ||
							!toolbarMenu.image) && <div className={styles.toolbarDivider} />}

					{/* Link & Code Group */}
					{!toolbarMenu.link && (
						<ToolbarButton
							ariaLabel='Link ⌘K'
							className={styles.linkToolbarButton}
							onClick={setLink}
							active={editor.isActive('link')}
						>
							<TextLinkIcon color={editor.isActive('link') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}
					{!toolbarMenu.code && (
						<ToolbarButton
							ariaLabel='Insert code'
							className={styles.codeToolbarButton}
							onClick={() => {
								editor.chain().focus().toggleCode().run();
							}}
							active={editor.isActive('code')}
						>
							<CodeIcon color={editor.isActive('code') ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}

					{/* Remaining Tools (Hidden by default or in Interactive via hiddenMenu prop) */}
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
					{!toolbarMenu.align && !toolbarMenu.justify && (
						<ToolbarButton
							ariaLabel='Justify'
							onClick={() => {
								applyAlign('justify');
							}}
							active={editor.isActive({ textAlign: 'justify' })}
						>
							<TextAlignIcon.Justify color={editor.isActive({ textAlign: 'justify' }) ? 'white' : 'currentColor'} />
						</ToolbarButton>
					)}
					{!toolbarMenu.image && (
						<ToolbarButton
							ariaLabel='Insert image'
							onClick={() => {
								onInsertImage?.();
							}}
						>
							<ImageIcon color='currentColor' />
						</ToolbarButton>
					)}
				</div>
			</div>

			<div className={styles.editorWrap}>
				<EditorContent className={styles.editor} editor={editor} />
				<div className={styles.resizeHandle}>
					<ResizeHandleIcon />
				</div>
			</div>

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
							<BoldIcon color={editor.isActive('bold') ? 'white' : 'currentColor'} />
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble italic'
							onClick={() => {
								editor.chain().focus().toggleItalic().run();
							}}
							active={editor.isActive('italic')}
						>
							<ItalicIcon color={editor.isActive('italic') ? 'white' : 'currentColor'} />
						</ToolbarButton>
						<ToolbarButton
							ariaLabel='Bubble underline'
							onClick={() => {
								editor.chain().focus().toggleUnderline().run();
							}}
							active={editor.isActive('underline')}
						>
							<UnderlineIcon color={editor.isActive('underline') ? 'white' : 'currentColor'} />
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
					</div>
				</BubbleMenu>
			)}

			{showCharacterCount && <CharacterCount textLength={textLength} maxCharacters={maxCharacters} />}
		</div>
	);
};

export default RichTextEditor;
