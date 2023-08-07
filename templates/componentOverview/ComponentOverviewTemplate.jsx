import React from 'react';
import { Title, Subtitle, Description, Primary, Controls } from '@storybook/addon-docs';

const ComponentOverviewTemplate = (props) => {
	const { title, description, properties, sourceCode, designLink } = props;
	return (
		<>
			<Title>{title}</Title>
			<Subtitle>
				<span
					style={{
						fontSize: '1.125rem',
					}}>
					<a target='_blank' rel='noreferrer' href={sourceCode}>
						Source code
					</a>
					{' | '}
					<a target='_blank' rel='noreferrer' href={designLink}>
						Design
					</a>
				</span>
			</Subtitle>
			<Subtitle>Overview</Subtitle>
			<Description>{description}</Description>
			<Primary />
			<Subtitle>Props</Subtitle>
			<Subtitle>
				<ol
					style={{
						fontSize: '1.125rem',
					}}>
					{properties.map((prop) => {
						return (
							<li key={prop.id}>
								<b>{prop.title}:</b> {prop.description}
							</li>
						);
					})}
				</ol>
			</Subtitle>
			<Subtitle>Component API</Subtitle>
			<Controls />
			{/* <Stories /> */}
		</>
	);
};

export default ComponentOverviewTemplate;
