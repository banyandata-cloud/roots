import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../../helpers';
import Button from '../button/Button';
import ButtonDoc from '../button/Story/ButtonDoc';

const MailIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M2 12.2V5C2 3.89543 2.89543 3 4 3H14C15.1046 3 16 3.89543 16 5V12.2C16 13.3046 15.1046 14.2 14 14.2H4C2.89543 14.2 2 13.3046 2 12.2Z'
			stroke='currentColor'
			strokeWidth='1.5'
		/>
		<path
			d='M16 5.25854L10 8.72265C9.3812 9.07991 8.6188 9.07991 8 8.72265L2 5.25854'
			stroke='currentColor'
			strokeWidth='1.5'
		/>
	</svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M5 12H19M19 12L12 5M19 12L12 19'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const meta: Meta<typeof Button> = {
	title: 'Components/v2/Buttons/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: ButtonDoc,
		},
		layout: 'padded',
		options: { showToolbar: true },
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

type Story = StoryObj<typeof Button>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const colStyle = { display: 'flex', flexDirection: 'column' as const, gap: '16px' };
const rowStyle = {
	display: 'flex',
	gap: '12px',
	flexWrap: 'wrap' as const,
	alignItems: 'center',
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Primary Button</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='primary'
							size='xs'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='primary'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='primary'
							size='md'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='primary'
							size='lg'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
					</div>
					<div style={rowStyle}>
						<Button variant='primary' size='xs' leftComponent={MailIcon} />
						<Button variant='primary' size='sm' leftComponent={MailIcon} />
						<Button variant='primary' size='md' leftComponent={MailIcon} />
						<Button variant='primary' size='lg' leftComponent={MailIcon} />
					</div>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Secondary Button</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='secondary'
							size='xs'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='secondary'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='secondary'
							size='md'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='secondary'
							size='lg'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
					</div>
					<div style={rowStyle}>
						<Button variant='secondary' size='xs' leftComponent={MailIcon} />
						<Button variant='secondary' size='sm' leftComponent={MailIcon} />
						<Button variant='secondary' size='md' leftComponent={MailIcon} />
						<Button variant='secondary' size='lg' leftComponent={MailIcon} />
					</div>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Soft Button</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='Soft'
							size='xs'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='Soft'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='Soft'
							size='md'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='Soft'
							size='lg'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
					</div>
					<div style={rowStyle}>
						<Button variant='Soft' size='xs' leftComponent={MailIcon} />
						<Button variant='Soft' size='sm' leftComponent={MailIcon} />
						<Button variant='Soft' size='md' leftComponent={MailIcon} />
						<Button variant='Soft' size='lg' leftComponent={MailIcon} />
					</div>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Outline Button</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='outlined'
							size='xs'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='outlined'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='outlined'
							size='md'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='outlined'
							size='lg'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
					</div>
					<div style={rowStyle}>
						<Button variant='outlined' size='xs' leftComponent={MailIcon} />
						<Button variant='outlined' size='sm' leftComponent={MailIcon} />
						<Button variant='outlined' size='md' leftComponent={MailIcon} />
						<Button variant='outlined' size='lg' leftComponent={MailIcon} />
					</div>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Ghost Button</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='ghost'
							size='xs'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='ghost'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='ghost'
							size='md'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
						<Button
							title='Verb + noun'
							variant='ghost'
							size='lg'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
						/>
					</div>
					<div style={rowStyle}>
						<Button variant='ghost' size='xs' leftComponent={MailIcon} />
						<Button variant='ghost' size='sm' leftComponent={MailIcon} />
						<Button variant='ghost' size='md' leftComponent={MailIcon} />
						<Button variant='ghost' size='lg' leftComponent={MailIcon} />
					</div>
				</div>
			</div>

			<div>
				<p style={headingStyle}>Disabled State</p>
				<div style={colStyle}>
					<div style={rowStyle}>
						<Button
							title='Verb + noun'
							variant='primary'
							size='sm'
							leftComponent={MailIcon}
							rightComponent={ArrowIcon}
							disabled
						/>
						<Button variant='primary' size='sm' leftComponent={MailIcon} disabled />
					</div>
				</div>
			</div>
		</div>
	),
};
