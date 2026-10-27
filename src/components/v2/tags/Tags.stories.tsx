import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { ThemedContainer } from '../helpers';
import { HelpIcon } from '../icons';
import Tag from './Tags';
import TagDoc from './Story/TagsDoc';
import type { TagSize } from './types';

const meta: Meta<typeof Tag> = {
	title: 'Components/v2/Tag',
	component: Tag,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: true },
		docs: { page: TagDoc },
	},
};

export default meta;

type Story = StoryObj<typeof Tag>;

const SIZES: TagSize[] = ['sm', 'md', 'lg'];

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
	<section style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
		<h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{title}</h4>
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
			{children}
		</div>
	</section>
);

const EachSize = ({ render }: { render: (size: TagSize) => ReactNode }) => (
	<>
		{SIZES.map((size) => (
			<span key={size}>{render(size)}</span>
		))}
	</>
);

const Page = ({ children }: { children: ReactNode }) => (
	<ThemedContainer theme='light'>
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
			{children}
		</div>
	</ThemedContainer>
);

const TextField = ({ size }: { size: TagSize }) => {
	const [value, setValue] = useState('');
	return (
		<Tag
			size={size}
			label='Label:'
			textField
			inputValue={value}
			inputPlaceholder='Search'
			onInputChange={setValue}
			onInputClear={() => setValue('')}
		/>
	);
};

export const Default: Story = {
	render: () => (
		<Page>
			<Block title='Default'>
				<EachSize render={(size) => <Tag size={size} label='Label' />} />
			</Block>
			<Block title='Closable'>
				<EachSize render={(size) => <Tag size={size} label='Label' closable />} />
			</Block>
			<Block title='Count'>
				<EachSize render={(size) => <Tag size={size} label='Label' count={5} />} />
			</Block>
			<Block title='Checkbox'>
				<EachSize render={(size) => <Tag size={size} label='Label' checkbox />} />
			</Block>
			<Block title='Checkbox + closable'>
				<EachSize render={(size) => <Tag size={size} label='Label' checkbox closable />} />
			</Block>
			<Block title='Checkbox + count'>
				<EachSize render={(size) => <Tag size={size} label='Label' checkbox count={5} />} />
			</Block>
		</Page>
	),
};

export const Indicator: Story = {
	render: () => (
		<Page>
			{(['success', 'warning', 'error'] as const).map((type) => (
				<Block key={type} title={type}>
					<EachSize
						render={(size) => (
							<Tag size={size} label='Label' indicator indicatorType={type} />
						)}
					/>
					<EachSize
						render={(size) => (
							<Tag
								size={size}
								label='Label'
								indicator
								indicatorType={type}
								closable
							/>
						)}
					/>
					<EachSize
						render={(size) => (
							<Tag
								size={size}
								label='Label'
								checkbox
								indicator
								indicatorType={type}
								count={5}
							/>
						)}
					/>
				</Block>
			))}
		</Page>
	),
};

export const Icon: Story = {
	render: () => (
		<Page>
			<Block title='Icon'>
				<EachSize
					render={(size) => <Tag size={size} label='Label' icon={<HelpIcon />} />}
				/>
			</Block>
			<Block title='Icon + closable'>
				<EachSize
					render={(size) => (
						<Tag size={size} label='Label' icon={<HelpIcon />} closable />
					)}
				/>
			</Block>
			<Block title='Icon + count'>
				<EachSize
					render={(size) => (
						<Tag size={size} label='Label' icon={<HelpIcon />} count={5} />
					)}
				/>
			</Block>
			<Block title='Checkbox + icon'>
				<EachSize
					render={(size) => (
						<Tag size={size} label='Label' checkbox icon={<HelpIcon />} />
					)}
				/>
			</Block>
		</Page>
	),
};

export const Search: Story = {
	render: () => (
		<Page>
			<Block title='Search tag (label only)'>
				<EachSize render={(size) => <Tag size={size} label='Label:' searchTag />} />
			</Block>
			<Block title='Text field'>
				<EachSize render={(size) => <TextField size={size} />} />
			</Block>
			<Block title='Read only'>
				<EachSize
					render={(size) => (
						<Tag size={size} label='Label:' textField readOnly inputValue='Search' />
					)}
				/>
			</Block>
		</Page>
	),
};
