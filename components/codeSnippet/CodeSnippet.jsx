/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { classes } from '../../utils';
import { CopyIcon } from '../icons';
import styles from './CodeSnippet.module.css';
import { ErrorBoundaryWrapper } from '../errorBoundary';

const CodeSnippet = (props) => {
	const { copy, code, language, showLineNumbers, theme, className } = props;

	const [copiedState, setCopiedState] = useState(false);

	setTimeout(() => {
		setCopiedState(false);
	}, 2.0 * 1000);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		setCopiedState(true);
	};

	const syntaxHighlighterProps = {
		showLineNumbers,
		language,
		wrapLines: true,
		wrapLongLines: true,
		codeTagProps: {
			className: classes(styles.code, className),
		},
		style: theme === 'light' ? oneLight : oneDark,
	};

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<div className={styles.root}>
				<SyntaxHighlighter {...syntaxHighlighterProps}>{code}</SyntaxHighlighter>
				{copy && (
					<div className={styles.copy} onClick={onCopy}>
						<CopyIcon
							className={classes(
								styles.icon,
								theme === 'dark' ? styles.dark : styles.light
							)}
						/>
						<div className={copiedState ? styles.copied : styles.notCopied}>
							{copiedState ? 'Copied' : ''}
						</div>
					</div>
				)}
			</div>
		</ErrorBoundary>
	);
};

CodeSnippet.propTypes = {
	copy: PropTypes.bool,
	code: PropTypes.string,
	language: PropTypes.string,
	showLineNumbers: PropTypes.bool,
	theme: PropTypes.string,
	className: PropTypes.string,
};

CodeSnippet.defaultProps = {
	copy: true,
	code: '{}',
	language: 'json',
	showLineNumbers: false,
	theme: 'light',
	className: '',
};

export default CodeSnippet;
