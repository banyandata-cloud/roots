import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import Badge from '../../v2/badges/Badge';
import BadgeDoc from '../badges/Story/BadgeDoc';

const meta: Meta<typeof Badge> = {
	title: 'Components/v2/Badges',
	component: Badge,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: true },
		docs: {
			page: BadgeDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Badge>;

// ─── Shared layout helpers ───────────────────────────────────────────────────

const sizes = ['sm', 'md', 'lg'] as const;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
		<span style={{ width: '160px', fontSize: '12px', color: '#888', flexShrink: 0 }}>
			{label}
		</span>
		<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>{children}</div>
	</div>
);

// ─── PILL ─────────────────────────────────────────────────────────────────────

export const Pill: Story = {
	name: 'Pill',
	render: () => (
		<ThemedContainer theme='light'>
			<div style={{ padding: '16px' }}>
				<Row label='Text only'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='pill' label='Label' />
					))}
				</Row>
				<Row label='With Closer'>
					{sizes.map((size) => (
						<Badge
							key={size}
							size={size}
							variant='pill'
							label='Label'
							onClose={() => {}}
						/>
					))}
				</Row>
				<Row label='With Dot'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='pill' label='Label' dot />
					))}
				</Row>
				<Row label='With Arrow (right)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='pill' label='Label' arrow />
					))}
				</Row>
				<Row label='With Arrow (up)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='pill' label='Label' upArrow />
					))}
				</Row>
				<Row label='With Plus'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='pill' label='' plus />
					))}
				</Row>
			</div>
		</ThemedContainer>
	),
};

// ─── BADGE ────────────────────────────────────────────────────────────────────

export const BadgeStory: Story = {
	name: 'Badge',
	render: () => (
		<ThemedContainer theme='light'>
			<div style={{ padding: '16px' }}>
				<Row label='Text only'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='badge' label='Label' />
					))}
				</Row>
				<Row label='With Closer'>
					{sizes.map((size) => (
						<Badge
							key={size}
							size={size}
							variant='badge'
							label='Label'
							onClose={() => {}}
						/>
					))}
				</Row>
				<Row label='With Dot'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='badge' label='Label' dot />
					))}
				</Row>
				<Row label='With Arrow (right)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='badge' label='Label' arrow />
					))}
				</Row>
				<Row label='With Arrow (up)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='badge' label='Label' upArrow />
					))}
				</Row>
				<Row label='With Plus'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='badge' label='' plus />
					))}
				</Row>
			</div>
		</ThemedContainer>
	),
};

// ─── MODERN BADGE ─────────────────────────────────────────────────────────────

export const ModernBadge: Story = {
	name: 'Modern Badge',
	render: () => (
		<ThemedContainer theme='light'>
			<div style={{ padding: '16px' }}>
				<Row label='Text only'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='modern' label='Label' />
					))}
				</Row>
				<Row label='With Closer'>
					{sizes.map((size) => (
						<Badge
							key={size}
							size={size}
							variant='modern'
							label='Label'
							onClose={() => {}}
						/>
					))}
				</Row>
				<Row label='With Dot'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='modern' label='Label' dot />
					))}
				</Row>
				<Row label='With Arrow (right)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='modern' label='Label' arrow />
					))}
				</Row>
				<Row label='With Arrow (up)'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='modern' label='Label' upArrow />
					))}
				</Row>
				<Row label='With Plus'>
					{sizes.map((size) => (
						<Badge key={size} size={size} variant='modern' label='' plus />
					))}
				</Row>
			</div>
		</ThemedContainer>
	),
};
