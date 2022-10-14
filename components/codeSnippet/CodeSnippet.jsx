import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import Copy from '../icons/Copy/Copy';
import styles from './CodeSnippet.module.css';

const CodeSnippet = (props) => {
	const { showIcon, src } = props;

	const [copiedState, setCopiedState] = useState(false);

	setTimeout(() => {
		setCopiedState(false);
	}, 2.0 * 1000);

	return (
		<div className={styles.root}>
			<ReactJson
				{...props}
				theme='apathy:inverted'
				name={null}
				iconStyle='triangle'
				indentWidth={4}
				displayDataTypes={false}
				src={src}
			/>
			{showIcon && (
				<div
					className={styles.copy}
					onClick={() => {
						navigator.clipboard.writeText(JSON.stringify(src));
						setCopiedState(true);
					}}>
					<Copy className={styles.icon} />
					<div className={copiedState ? styles.copied : styles.notCopied}>
						{copiedState ? 'Copied' : ''}
					</div>
				</div>
			)}
		</div>
	);
};

CodeSnippet.propTypes = {
	showIcon: PropTypes.bool,
};

CodeSnippet.defaultProps = {
	showIcon: true,
};

export default CodeSnippet;
