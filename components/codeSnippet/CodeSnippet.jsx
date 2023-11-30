/* eslint-disable no-param-reassign */
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
	const {
		copy,
		code,
		language,
		showLineNumbers,
		theme,
		className,
		custom,
		onClick,
		parentKeyToSelect,
	} = props;

	const [copiedState, setCopiedState] = useState(false);

	setTimeout(() => {
		setCopiedState(false);
	}, 2.0 * 1000);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		setCopiedState(true);
	};

	function findKeyPath(obj, targetKey, currentPath = '') {
		const keys = Object.keys(obj);
		// eslint-disable-next-line no-restricted-syntax
		for (const key of keys) {
			const newPath = currentPath ? `${currentPath}/${key}` : key;

			if (key === targetKey) {
				// Display the full path of the key from the object
				return newPath;
			}
			if (parentKeyToSelect && !currentPath) {
				const nestedPath = findKeyPath(
					obj[parentKeyToSelect],
					targetKey,
					parentKeyToSelect
				);
				if (nestedPath) {
					return nestedPath;
				}
			}
			if (typeof obj[key] === 'object') {
				// Recursively search nested keys
				const nestedPath = findKeyPath(obj[key], targetKey, newPath);
				if (nestedPath) {
					return nestedPath;
				}
			}
		}

		return '';
	}

	const handleCodeClick = (event) => {
		if (language === 'json') {
			try {
				const parsedCode = JSON.parse(code);
				const clickedKey = event.target.textContent.replace(/"/g, '').trim();

				// Check for a direct match in top-level keys
				const matchingKey = Object.keys(parsedCode).find((key) => {
					return String(parsedCode[key]) === clickedKey;
				});

				if (matchingKey) {
					return matchingKey;
				}
				// Check for nested keys
				const keyPath = findKeyPath(parsedCode, clickedKey);

				if (keyPath) {
					event.target.parentNode.style.backgroundColor =
						theme === 'light' ? '#333' : 'white';
					return keyPath;
				}
				return clickedKey;
			} catch (error) {
				return error;
			}
		}
		return '';
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
		onClick: (event) => {
			return onClick(event, handleCodeClick);
		},
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
	onClick: PropTypes.func,
	parentKeyToSelect: PropTypes.string,
};

CodeSnippet.defaultProps = {
	copy: true,
	code: '{}',
	language: 'json',
	showLineNumbers: false,
	theme: 'light',
	className: '',
	onClick: () => {},
	parentKeyToSelect: null,
};

export default CodeSnippet;
