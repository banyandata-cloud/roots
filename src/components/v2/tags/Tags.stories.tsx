import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import Tag from '../../v2/tags/Tags';
import TagDoc from '../tags/Story/TagsDoc';

const meta: Meta<typeof Tag> = {
	title: 'Components/v2/Tag',
	component: Tag,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: true },
		docs: {
			page: TagDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tag>;

const SizeLabel = ({ children }: { children: React.ReactNode }) => (
	<span style={{ fontSize: '12px', fontWeight: '600', color: '#535862' }}>{children}</span>
);

const Row = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>{children}</div>
);

const SizeGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
		<SizeLabel>{label}</SizeLabel>
		<Row>{children}</Row>
	</div>
);

const SizesBlock = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{children}</div>
);

const AllSizes = ({ renderTag }: { renderTag: (size: 'sm' | 'md' | 'lg') => React.ReactNode }) => (
	<SizesBlock>
		{(['sm', 'md', 'lg'] as const).map((size) => (
			<SizeGroup key={size} label={size}>
				{renderTag(size)}
			</SizeGroup>
		))}
	</SizesBlock>
);

const VariantBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
		<span
			style={{
				fontSize: '13px',
				fontWeight: '700',
				color: '#101828',
				borderBottom: '1px solid #EAECF0',
				paddingBottom: '4px',
			}}>
			{label}
		</span>
		{children}
	</div>
);

const GroupWrapper = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>{children}</div>
);

export const DefaultGroup: Story = {
	name: 'Default',
	render: () => {
		const [valSm, setValSm] = useState('');
		const [valMd, setValMd] = useState('');
		const [valLg, setValLg] = useState('');

		return (
			<ThemedContainer theme='light'>
				<GroupWrapper>
					<VariantBlock label='Default'>
						<AllSizes renderTag={(size) => <Tag size={size} label='Label' />} />
					</VariantBlock>

					<VariantBlock label='Default with Closer'>
						<AllSizes
							renderTag={(size) => <Tag size={size} label='Label' closable />}
						/>
					</VariantBlock>

					<VariantBlock label='Default with Count'>
						<AllSizes
							renderTag={(size) => (
								<Tag size={size} label='Label' onlyCount count={5} />
							)}
						/>
					</VariantBlock>

					<VariantBlock label='Default with Checkbox'>
						<AllSizes
							renderTag={(size) => <Tag size={size} label='Label' checkbox />}
						/>
					</VariantBlock>

					<VariantBlock label='Default with Checkbox + Closer'>
						<AllSizes
							renderTag={(size) => <Tag size={size} label='Label' checkboxCloser />}
						/>
					</VariantBlock>

					<VariantBlock label='Default with Checkbox + Count'>
						<AllSizes
							renderTag={(size) => (
								<Tag size={size} label='Label' checkboxCount count={5} />
							)}
						/>
					</VariantBlock>

					<VariantBlock label='Text Field'>
						<SizesBlock>
							<SizeGroup label='sm'>
								<Tag
									size='sm'
									label='Label:'
									textField
									inputValue={valSm}
									onInputChange={setValSm}
								/>
							</SizeGroup>
							<SizeGroup label='md'>
								<Tag
									size='md'
									label='Label:'
									textField
									inputValue={valMd}
									onInputChange={setValMd}
								/>
							</SizeGroup>
							<SizeGroup label='lg'>
								<Tag
									size='lg'
									label='Label:'
									textField
									inputValue={valLg}
									onInputChange={setValLg}
								/>
							</SizeGroup>
						</SizesBlock>
					</VariantBlock>
				</GroupWrapper>
			</ThemedContainer>
		);
	},
};

export const LogoGroup: Story = {
	name: 'Logo',
	render: () => (
		<ThemedContainer theme='light'>
			<GroupWrapper>
				<VariantBlock label='Logo'>
					<AllSizes renderTag={(size) => <Tag size={size} label='Label' logo />} />
				</VariantBlock>

				<VariantBlock label='Logo with Closer'>
					<AllSizes
						renderTag={(size) => <Tag size={size} label='Label' logo closable />}
					/>
				</VariantBlock>

				<VariantBlock label='Logo with Count'>
					<AllSizes
						renderTag={(size) => <Tag size={size} label='Label' logo count={5} />}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Logo'>
					<AllSizes
						renderTag={(size) => <Tag size={size} label='Label' checkboxLogo />}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Logo + Closer'>
					<AllSizes
						renderTag={(size) => <Tag size={size} label='Label' checkboxLogoClosable />}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Logo + Count'>
					<AllSizes
						renderTag={(size) => (
							<Tag size={size} label='Label' checkboxLogoCount count={5} />
						)}
					/>
				</VariantBlock>
			</GroupWrapper>
		</ThemedContainer>
	),
};

const INDICATOR_TYPES = ['success', 'warning', 'error'] as const;
type IndicatorType = (typeof INDICATOR_TYPES)[number];

const INDICATOR_COUNTS: Record<IndicatorType, number> = {
	success: 5,
	warning: 12,
	error: 99,
};

const IndicatorSizes = ({
	renderTag,
}: {
	renderTag: (size: 'sm' | 'md' | 'lg', type: IndicatorType) => React.ReactNode;
}) => (
	<SizesBlock>
		{INDICATOR_TYPES.map((type) => (
			<SizeGroup key={type} label={type}>
				{(['sm', 'md', 'lg'] as const).map((size) => (
					<React.Fragment key={size}>{renderTag(size, type)}</React.Fragment>
				))}
			</SizeGroup>
		))}
	</SizesBlock>
);

export const IndicatorGroup: Story = {
	name: 'Indicator',
	render: () => (
		<ThemedContainer theme='light'>
			<GroupWrapper>
				<VariantBlock label='Indicator'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag size={size} label='Label' indicator indicatorType={type} />
						)}
					/>
				</VariantBlock>

				<VariantBlock label='Indicator with Closer'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag
								size={size}
								label='Label'
								indicator
								indicatorType={type}
								closable
							/>
						)}
					/>
				</VariantBlock>

				<VariantBlock label='Indicator with Count'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag
								size={size}
								label='Label'
								indicator
								indicatorType={type}
								count={INDICATOR_COUNTS[type]}
							/>
						)}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Indicator'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag size={size} label='Label' checkboxIndicator indicatorType={type} />
						)}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Indicator + Closer'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag
								size={size}
								label='Label'
								checkboxIndicatorClosable
								indicatorType={type}
							/>
						)}
					/>
				</VariantBlock>

				<VariantBlock label='Checkbox with Indicator + Count'>
					<IndicatorSizes
						renderTag={(size, type) => (
							<Tag
								size={size}
								label='Label'
								checkboxIndicatorCount
								indicatorType={type}
								count={INDICATOR_COUNTS[type]}
							/>
						)}
					/>
				</VariantBlock>
			</GroupWrapper>
		</ThemedContainer>
	),
};
