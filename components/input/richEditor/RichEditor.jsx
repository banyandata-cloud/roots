import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import DialogBox from '../../modal/dialogBox/DialogBox';
import { Dropdownv2 as Dropdown, DropdownItemv2 as DropdownItem } from '../dropdownv2';
import { TextFieldv2 as TextField } from '../textFieldv2';
import styles from './RichEditor.module.css';
import { ColorHighlightIcon, ColorPalletteIcon, TextAlignIcon, TextLinkIcon } from './assets';

const ToolBar = ({ editor, textType, onTextTypeDropdownChange, setLink, hiddenMenu }) => {
	const showBold = !hiddenMenu.bold;
	const showItalic = !hiddenMenu.italic;
	const showUnderline = !hiddenMenu.underline;
	const showStrike = !hiddenMenu.strike;
	const showColor = !hiddenMenu.color;
	const showTextType = !hiddenMenu.textType;
	const showAlign = !hiddenMenu.align;
	const showLink = !hiddenMenu.link;

	return (
		<div className={styles.menu}>
			{showBold && (
				<Button
					title='B'
					onClick={() => {
						return editor.chain().focus().toggleBold().run();
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
						return editor.chain().focus().toggleItalic().run();
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
						return editor.chain().focus().toggleUnderline().run();
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
						return editor.chain().focus().toggleStrike().run();
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
							onInput: (event) => {
								return editor.chain().focus().setColor(event.target.value).run();
							},
						}}
						LeftComponent={() => {
							return (
								<ColorPalletteIcon
									color={editor.getAttributes('textStyle').color}
								/>
							);
						}}
						value={editor.getAttributes('textStyle').color}
					/>
					<TextField
						type='color'
						className={classes(styles.item, styles.color)}
						inputProps={{
							onInput: (event) => {
								return editor
									.chain()
									.focus()
									.toggleHighlight({
										color: event.target.value,
									})
									.run();
							},
						}}
						LeftComponent={() => {
							return (
								<ColorHighlightIcon
									color={editor.getAttributes('highlight').color}
								/>
							);
						}}
						value={editor.getAttributes('highlight').color}
					/>
				</>
			)}

			{showTextType && (
				<Dropdown
					value={textType}
					className={styles.dropdown}
					onChange={onTextTypeDropdownChange}
					popperClassName={styles.popper}
					label={null}>
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
									}) && 'white'
								}
							/>
						}
						onClick={() => {
							return editor.chain().focus().setTextAlign('left').run();
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
									}) && 'white'
								}
							/>
						}
						onClick={() => {
							return editor.chain().focus().setTextAlign('center').run();
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
									}) && 'white'
								}
							/>
						}
						onClick={() => {
							return editor.chain().focus().setTextAlign('right').run();
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
					title={<TextLinkIcon color={editor.isActive('link') && 'white'} />}
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

const RichEditor = ({
	className = '',
	defaultContent = '',
	setContent = () => {},
	placeholder = 'Your text here...',
	hiddenMenu = {},
}) => {
	const [textType, setTextType] = useState('p');

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
		onUpdate: (event) => {
			const htmlValue = event.editor.getHTML();

			setContent(htmlValue);
		},
		onSelectionUpdate: (event) => {
			const currentNode = event.editor.state.selection.$head.parent;
			if (currentNode.type.name === 'heading') {
				const headingLevel = currentNode.attrs.level;
				setTextType(`h${headingLevel}`);
			} else {
				setTextType('p');
			}
		},
	});

	const dialogRef = useRef();

	const textfieldRef = useRef(null);

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href;

		dialogRef.current.dialog({
			title: 'URL To Link',
			body: () => {
				const [link, setLinkValue] = useState('');

				useEffect(() => {
					setLinkValue(previousUrl || '');
				}, []);
				return (
					<TextField
						ref={textfieldRef}
						placeholder='Enter or Paste URL'
						value={link}
						onChange={(e) => {
							setLinkValue(e.target.value);
						}}
					/>
				);
			},

			actionText: 'Link',
			cancelText: 'Cancel',
			variant: 'primary',
			onAction: ({ dismiss = () => {} }) => {
				dismiss();

				const focussedEditor = editor.chain().focus();
				if (!textfieldRef.current?.value) {
					focussedEditor.extendMarkRange('link').unsetLink().run();
					return;
				}

				focussedEditor
					.extendMarkRange('link')
					.setLink({
						href: textfieldRef.current?.value,
					})
					.run();
			},
		});
	};

	const onTextTypeDropdownChange = (e) => {
		const focussesEditor = editor.chain().focus();
		const textTypeValue = e.target.value;
		setTextType(e.target.value);
		if (textTypeValue === 'h1') {
			focussesEditor
				.toggleHeading({
					level: 1,
				})
				.run();
			return;
		}
		if (textTypeValue === 'h2') {
			focussesEditor
				.toggleHeading({
					level: 2,
				})
				.run();
			return;
		}
		if (textTypeValue === 'h3') {
			focussesEditor
				.toggleHeading({
					level: 3,
				})
				.run();
			return;
		}
		if (textTypeValue === 'p') {
			focussesEditor.setParagraph().run();
		}
	};

	return (
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
	);
};

export default RichEditor;
