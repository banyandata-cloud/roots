/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { dracula, atomOneLight, CodeBlock } from 'react-code-blocks';
import { classes } from '../../utils';
import { CopyIcon } from '../icons';
import styles from './CodeSnippet.module.css';

const CodeSnippet = (props) => {
	const { copy, code, language, showLineNumbers, theme } = props;

	const themeVariant = theme === 'dark' ? dracula : atomOneLight;
	const [copiedState, setCopiedState] = useState(false);

	setTimeout(() => {
		setCopiedState(false);
	}, 2.0 * 1000);

	const onCopy = () => {
		navigator.clipboard.writeText(JSON.stringify(code));
		setCopiedState(true);
	};

	return (
		<div className={styles.root}>
			<CodeBlock
				text={code}
				language={language}
				showLineNumbers={showLineNumbers}
				theme={themeVariant}
				codeBlock
				wrapLines
			/>
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
	);
};

CodeSnippet.propTypes = {
	copy: PropTypes.bool,
	code: PropTypes.string,
	language: PropTypes.string,
	showLineNumbers: PropTypes.bool,
	theme: PropTypes.string,
};

CodeSnippet.defaultProps = {
	copy: true,
	code: '{}',
	language: 'json',
	showLineNumbers: false,
	theme: 'dark',
};

export default CodeSnippet;
