/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	coldarkDark as darkTheme,
	coldarkCold as lightTheme,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { classes } from '../../utils';
import { AlertV2 as Alert } from '../alertV2';
import { CopyIcon } from '../icons';
import styles from './CodeSnippet.module.css';

const CodeSnippet = (props) => {
	const {
		copy,
		code = '{}',
		language = 'json',
		showLineNumbers,
		theme = 'light',
		className = '',
		onClick = () => {},
		parentKeyToSelect,
	} = props;

	const [parentNode, setParentNode] = useState(null);

	const alertRef = useRef(Alert);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		alertRef.current?.alert({
			title: `${language?.toUpperCase()}`,
			description: 'The snippet has been copied to the clipboard.',
			type: 'info',
			icon: (args) => {
				return <CopyIcon {...args} />;
			},
		});
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
			if (obj[key] && typeof obj[key] === 'object') {
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
		const hasNoChildren = event.target.children?.length === 0;
		if (language === 'json' && hasNoChildren) {
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
					if (parentNode) {
						parentNode.style.backgroundColor = '';
						if (event.target.parentNode === parentNode) {
							setParentNode(null);
							return null;
						}
					}
					setParentNode(event.target.parentNode);
					return keyPath;
				}
				return clickedKey;
			} catch (error) {
				return error;
			}
		}
		return null;
	};

	const syntaxHighlighterProps = {
		showLineNumbers,
		language,
		wrapLines: true,
		wrapLongLines: true,
		codeTagProps: {
			className: classes(styles.code, className),
		},
		style: theme === 'light' ? lightTheme : darkTheme,
		onClick: (event) => {
			return onClick(event, handleCodeClick);
		},
	};

	return (
		<>
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
					</div>
				)}
			</div>
			<Alert ref={alertRef} />
		</>
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

export default CodeSnippet;
