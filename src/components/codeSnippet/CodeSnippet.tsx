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

interface CodeSnippetProps {
	copy?: boolean;
	code?: string;
	language?: string;
	showLineNumbers?: boolean;
	theme?: 'light' | 'dark';
	className?: string;
	onClick?: (event: React.MouseEvent, keyPath: string | null | Error) => void;
	parentKeyToSelect?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = (props): React.ReactElement => {
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

	const [parentNode, setParentNode] = useState<HTMLElement | null>(null);
	const alertRef = useRef<React.ElementRef<typeof Alert>>(null);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		alertRef.current?.alert({
			title: `${language?.toUpperCase()}`,
			description: 'The code has been copied to the clipboard',
			type: 'info',
			icon: (args: React.ComponentProps<typeof CopyIcon>) => {
				return <CopyIcon {...args} />;
			},
		});
	};

	function findKeyPath(obj: any, targetKey: string, currentPath = ''): string {
		const keys = Object.keys(obj);
		for (const key of keys) {
			const newPath = currentPath ? `${currentPath}/${key}` : key;

			if (key === targetKey) {
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
				const nestedPath = findKeyPath(obj[key], targetKey, newPath);
				if (nestedPath) {
					return nestedPath;
				}
			}
		}

		return '';
	}

	const handleCodeClick = (event: React.MouseEvent<HTMLElement>): string | null | Error => {
		const target = event.target as HTMLElement;
		const hasNoChildren = target.children?.length === 0;

		if (language === 'json' && hasNoChildren) {
			try {
				const parsedCode = JSON.parse(code);
				const clickedKey = target.textContent?.replace(/"/g, '').trim() || '';

				const matchingKey = Object.keys(parsedCode).find((key) => {
					return String(parsedCode[key]) === clickedKey;
				});

				if (matchingKey) {
					return matchingKey;
				}

				const keyPath = findKeyPath(parsedCode, clickedKey);

				if (keyPath) {
					target.parentElement!.style.backgroundColor =
						theme === 'light' ? '#333' : 'white';
					if (parentNode) {
						parentNode.style.backgroundColor = '';
						if (target.parentElement === parentNode) {
							setParentNode(null);
							return null;
						}
					}
					setParentNode(target.parentElement);
					return keyPath;
				}
				return clickedKey;
			} catch (error) {
				return error as Error;
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
		onClick: (event: React.MouseEvent<HTMLElement>) => {
			return onClick(event, handleCodeClick(event));
		},
	};

	return (
		<>
			<div className={styles.root}>
				<SyntaxHighlighter {...syntaxHighlighterProps}>{code}</SyntaxHighlighter>
				{copy && (
					<div className={styles.copy} onClick={onCopy}>
						<CopyIcon className={classes(styles.icon)} />
					</div>
				)}
			</div>
			<Alert ref={alertRef} />
		</>
	);
};

export default CodeSnippet;
