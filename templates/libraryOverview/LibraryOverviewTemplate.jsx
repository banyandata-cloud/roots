import React from 'react';
import { Subtitle, Title } from '@storybook/addon-docs';
import packageJson from '../../package.json';

const LibraryOverviewTemplate = () => {
	return (
		<>
			<Title>Roots by Banyan Cloud</Title>
			<Subtitle>v{packageJson.version}</Subtitle>
			<Subtitle>
				<span
					style={{
						fontSize: '1.125rem',
					}}>
					<a
						target='_blank'
						rel='noreferrer'
						href='https://www.npmjs.com/package/@banyan_cloud/roots'>
						NPM Package
					</a>
					{' | '}
					<a
						target='_blank'
						rel='noreferrer'
						href='https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library'>
						Design
					</a>
					{' | '}
					<a
						target='_blank'
						rel='noreferrer'
						href='https://github.com/banyandata-cloud/roots'>
						Github
					</a>
				</span>
			</Subtitle>
		</>
	);
};

export default LibraryOverviewTemplate;
