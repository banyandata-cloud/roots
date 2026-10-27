import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import TextDoc from './Story/TextDoc';
import Text from './Text';
import type { TextStroke, TextVariant } from './types';

const meta: Meta<typeof Text> = {
	title: 'Components/v2/Text',
	component: Text,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: TextDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Text>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: 'var(--color-text-secondary, #414651)',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const GROUPS: { title: string; variants: TextVariant[]; strokes: TextStroke[] }[] = [
	{
		title: 'Heading',
		variants: [
			'heading-xxlarge',
			'heading-xlarge',
			'heading-large',
			'heading-medium',
			'heading-small',
			'heading-xsmall',
			'heading-xxsmall',
		],
		strokes: ['bold', 'semibold', 'medium', 'regular'],
	},
	{
		title: 'Body',
		variants: ['body-large', 'body', 'body-small'],
		strokes: ['bold', 'semibold', 'medium', 'regular'],
	},
	{
		title: 'Metric',
		variants: ['metric-large', 'metric-medium', 'metric-small'],
		strokes: ['bold'],
	},
	{ title: 'Code', variants: ['code'], strokes: ['regular'] },
];

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			{GROUPS.map(({ title, variants, strokes }) => (
				<div key={title}>
					<p style={headingStyle}>{title}</p>
					{variants.map((variant) =>
						strokes.map((stroke) => (
							<div key={`${variant}-${stroke}`}>
								<Text variant={variant} stroke={stroke}>
									{variant} / {stroke}: This is just some sample text.
								</Text>
							</div>
						))
					)}
				</div>
			))}
		</div>
	),
};
