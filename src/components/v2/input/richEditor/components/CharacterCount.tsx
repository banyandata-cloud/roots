import React from 'react';
import { classes } from '../../../../../utils';
import styles from '../RichTextEditor.module.css';

interface CharacterCountProps {
	textLength: number;
	maxCharacters: number;
}

const CharacterCount: React.FC<CharacterCountProps> = ({ textLength, maxCharacters }) => {
	const charactersLeft = maxCharacters - textLength;
	const limitReached = charactersLeft <= 0;

	return (
		<div
			className={classes(
				styles.characterCount,
				limitReached && styles.overLimit
			)}
			data-elem='character-count'
		>
			{charactersLeft} characters left
		</div>
	);
};

export default CharacterCount;
