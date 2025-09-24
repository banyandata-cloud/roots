import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ComponentType } from 'react';
import { Prism as SyntaxHighlighter, type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import {
	coldarkDark as darkTheme,
	coldarkCold as lightTheme,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { CopyIcon, TickIcon } from '../icons';
import styles from './CodeSnippet.module.css';
import type { CodeSnippetProps, MotionSpanProps } from './types';

const MotionSpan = motion.span as ComponentType<MotionSpanProps>;

const copyIconProps = {
	initial: {
		opacity: 0,
		y: 5,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: -5,
	},
	transition: {
		duration: 0.2,
	},
};

const tickIconProps = {
	initial: {
		scale: 0,
		opacity: 0,
	},
	animate: {
		scale: 1.2,
		opacity: 1,
	},
	exit: {
		scale: 0,
		opacity: 0,
	},
	transition: {
		type: 'spring',
		stiffness: 400,
		damping: 15,
	},
};

const CopyButton = ({ code }: { code: string }) => {
	const [copied, setCopied] = useState<boolean>(false);

	const onCopy = async () => {
		setCopied(true);
		await navigator.clipboard.writeText(code);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	return (
		<Button
			title={
				<AnimatePresence mode='popLayout' initial={false}>
					{!copied ? (
						<MotionSpan key='copy' title='Copy' {...copyIconProps}>
							<CopyIcon className={styles.icon} />
						</MotionSpan>
					) : (
						<MotionSpan key='tick' {...tickIconProps} className='flex items-center'>
							<TickIcon className={styles.tick} />
						</MotionSpan>
					)}
				</AnimatePresence>
			}
			className={styles.copy}
			onClick={onCopy}
		/>
	);
};

const CodeSnippet = (props: CodeSnippetProps) => {
	const {
		copy = false,
		code = '{}',
		language = 'json',
		showLineNumbers = false,
		theme = 'light',
		className = '',
	} = props;

	const syntaxHighlighterProps = {
		showLineNumbers,
		language,
		wrapLines: true,
		wrapLongLines: true,
		codeTagProps: {
			className: classes(styles.code, className),
		},
		style: theme === 'light' ? lightTheme : darkTheme,
	} as SyntaxHighlighterProps;

	return (
		<div className={styles.root}>
			<SyntaxHighlighter {...syntaxHighlighterProps}>{code}</SyntaxHighlighter>
			{copy && <CopyButton code={code} />}
		</div>
	);
};

export default CodeSnippet;
