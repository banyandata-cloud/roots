import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import { Tabs } from '../tabs';
import type { TabButtonBaseSize } from './tabButtonBase/types';
import type { TabsType } from './types';
import TabsDoc from './Story/TabsDoc';

const meta: Meta<typeof Tabs> = {
	title: 'Components/v2/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: TabsDoc,
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

type Story = StoryObj<typeof Tabs>;

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

const ActiveIcon = () => (
	<svg viewBox='0 0 24 24' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M3 12L9 18L21 6'
			stroke='#1f5fcc'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const InActiveIcon = () => (
	<svg viewBox='0 0 24 24' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M3 12L9 18L21 6'
			stroke='#A4A7AE'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const RightIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		width='14'
		height='14'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M5 12H19M19 12L12 5M19 12L12 19'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const AllTabsStory = () => {
	const [defaultTab, setDefaultTab] = useState('tab1');
	const [verticalTab, setVerticalTab] = useState('tab1');
	const [leftIconTab, setLeftIconTab] = useState('tab1');
	const [rightIconTab, setRightIconTab] = useState('tab1');
	const [bothIconTab, setBothIconTab] = useState('tab1');
	const [dropdownTab, setDropdownTab] = useState('tab1');

	return (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Default</p>
				<Tabs
					selectedTab={defaultTab}
					setSelectedTab={setDefaultTab}
					direction='horizontal'
					tabs={[
						{ id: 'tab1', title: 'Space patrol' },
						{ id: 'tab2', title: 'Mystic force' },
					]}
				>
					<div style={{ padding: '1rem' }}>
						{defaultTab === 'tab1' && <p>You have selected 1</p>}
						{defaultTab === 'tab2' && <p>You have selected 2</p>}
					</div>
				</Tabs>
			</div>

			<div>
				<p style={headingStyle}>Vertical</p>
				<Tabs
					selectedTab={verticalTab}
					setSelectedTab={setVerticalTab}
					direction='vertical'
					tabs={[
						{ id: 'tab1', title: 'Tab One' },
						{ id: 'tab2', title: 'Tab Two' },
					]}
				>
					<div style={{ padding: '1rem' }}>
						{verticalTab === 'tab1' && <p>You have selected 1</p>}
						{verticalTab === 'tab2' && <p>You have selected 2</p>}
					</div>
				</Tabs>
			</div>

			<div>
				<p style={headingStyle}>With Only Left Icon</p>
				<Tabs
					selectedTab={leftIconTab}
					setSelectedTab={setLeftIconTab}
					direction='horizontal'
					tabs={[
						{
							id: 'tab1',
							title: 'Tab One',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
						},
						{
							id: 'tab2',
							title: 'Tab Two',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
						},
						{
							id: 'tab3',
							title: 'Tab Three',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
						},
						{
							id: 'tab4',
							title: 'Tab Four',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
							disabled: true,
						},
					]}
				>
					<div style={{ padding: '1rem' }}>
						{leftIconTab === 'tab1' && <p>You have selected 1</p>}
						{leftIconTab === 'tab2' && <p>You have selected 2</p>}
						{leftIconTab === 'tab3' && <p>You have selected 3</p>}
						{leftIconTab === 'tab4' && <p>You have selected 4</p>}
					</div>
				</Tabs>
			</div>

			<div>
				<p style={headingStyle}>With Only Right Icon</p>
				<Tabs
					selectedTab={rightIconTab}
					setSelectedTab={setRightIconTab}
					direction='horizontal'
					tabs={[
						{ id: 'tab1', title: 'Tab One', rightIcon: RightIcon },
						{ id: 'tab2', title: 'Tab Two', rightIcon: RightIcon },
						{ id: 'tab3', title: 'Tab Three', rightIcon: RightIcon },
						{ id: 'tab4', title: 'Tab Four', rightIcon: RightIcon, disabled: true },
					]}
				>
					<div style={{ padding: '1rem' }}>
						{rightIconTab === 'tab1' && <p>You have selected 1</p>}
						{rightIconTab === 'tab2' && <p>You have selected 2</p>}
						{rightIconTab === 'tab3' && <p>You have selected 3</p>}
						{rightIconTab === 'tab4' && <p>You have selected 4</p>}
					</div>
				</Tabs>
			</div>

			<div>
				<p style={headingStyle}>With Both Icons</p>
				<Tabs
					selectedTab={bothIconTab}
					setSelectedTab={setBothIconTab}
					direction='horizontal'
					tabs={[
						{
							id: 'tab1',
							title: 'Tab One',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
							rightIcon: RightIcon,
						},
						{
							id: 'tab2',
							title: 'Tab Two',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
							rightIcon: RightIcon,
						},
						{
							id: 'tab3',
							title: 'Tab Three',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
							rightIcon: RightIcon,
						},
						{
							id: 'tab4',
							title: 'Tab Four',
							leftIcon: { Active: ActiveIcon, InActive: InActiveIcon },
							rightIcon: RightIcon,
							disabled: true,
						},
					]}
				>
					<div style={{ padding: '1rem' }}>
						{bothIconTab === 'tab1' && <p>You have selected 1</p>}
						{bothIconTab === 'tab2' && <p>You have selected 2</p>}
						{bothIconTab === 'tab3' && <p>You have selected 3</p>}
						{bothIconTab === 'tab4' && <p>You have selected 4</p>}
					</div>
				</Tabs>
			</div>

			<div>
				<p style={headingStyle}>With Dropdown</p>
				<Tabs
					selectedTab={dropdownTab}
					setSelectedTab={setDropdownTab}
					direction='horizontal'
					tabs={[
						{ id: 'tab1', title: 'Tab One' },
						{ id: 'tab2', title: 'Tab Two' },
						{
							id: 'dropdown',
							title: 'More',
							dropdown: true,
							dropdownItems: [
								{ id: 'tab3', title: 'Tab Three' },
								{ id: 'tab4', title: 'Tab Four' },
								{ id: 'tab5', title: 'Tab Five' },
							],
						},
					]}
				>
					<div style={{ padding: '1rem' }}>
						{dropdownTab === 'tab1' && <p>You have selected 1</p>}
						{dropdownTab === 'tab2' && <p>You have selected 2</p>}
						{dropdownTab === 'tab3' && <p>You have selected 3</p>}
						{dropdownTab === 'tab4' && <p>You have selected 4</p>}
						{dropdownTab === 'tab5' && <p>You have selected 5</p>}
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export const AllVariants: Story = {
	name: 'All Variants',
	render: () => <AllTabsStory />,
};

const variantTypes: TabsType[] = ['brand', 'gray', 'border', 'minimal', 'underline'];
const variantSizes: TabButtonBaseSize[] = ['xs', 'sm', 'md'];

const variantTabs = [
	{ id: 'tab1', title: 'My details' },
	{ id: 'tab2', title: 'Profile' },
	{ id: 'tab3', title: 'Password' },
	{ id: 'tab4', title: 'Team', badge: 2 },
	{ id: 'tab5', title: 'Billing', disabled: true },
];

const VariantGroup = ({
	type,
	size,
	fullWidth,
	direction,
}: {
	type: TabsType;
	size: TabButtonBaseSize;
	fullWidth?: boolean;
	direction?: 'horizontal' | 'vertical';
}) => {
	const [selected, setSelected] = useState('tab1');
	return (
		<Tabs
			type={type}
			size={size}
			fullWidth={fullWidth}
			direction={direction}
			tabs={variantTabs}
			selectedTab={selected}
			setSelectedTab={setSelected}
		/>
	);
};

const labelStyle = { fontFamily: 'sans-serif', fontSize: 12, margin: '0 0 8px', color: '#666' };

const VariantsStory = () => (
	<div style={sectionStyle}>
		{variantTypes.map((type) => (
			<div key={type}>
				<p style={headingStyle}>{`Horizontal / ${type}`}</p>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
					{variantSizes.map((size) => (
						<div key={size}>
							<p style={labelStyle}>{`size=${size}`}</p>
							<VariantGroup type={type} size={size} />
							<div style={{ height: 12 }} />
							<p style={labelStyle}>{`size=${size}, full width`}</p>
							<div style={{ maxWidth: 720 }}>
								<VariantGroup type={type} size={size} fullWidth />
							</div>
						</div>
					))}
					{type === 'border' && (
						<div>
							<p style={labelStyle}>size=sm, with icons</p>
							<IconSlotExample />
						</div>
					)}
				</div>
			</div>
		))}
		{variantTypes.map((type) => (
			<div key={`v-${type}`}>
				<p style={headingStyle}>{`Vertical / ${type}`}</p>
				<div style={{ display: 'flex', gap: 48 }}>
					{variantSizes.map((size) => (
						<div key={size}>
							<p style={labelStyle}>{`size=${size}`}</p>
							<VariantGroup type={type} size={size} direction='vertical' />
						</div>
					))}
				</div>
			</div>
		))}
	</div>
);

export const DesignSystemVariants: Story = {
	name: 'Design System Variants',
	render: () => <VariantsStory />,
};

const DemoIcon = ({ mark, color }: { mark: string; color: string }) => (
	<span
		aria-hidden='true'
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 20,
			height: 20,
			borderRadius: '50%',
			background: color,
			color: '#fff',
			font: '600 10px sans-serif',
		}}
	>
		{mark}
	</span>
);

const UbuntuTabIcon = () => <DemoIcon mark='U' color='#dd4814' />;
const PythonTabIcon = () => <DemoIcon mark='Py' color='#3776ab' />;
const DebianTabIcon = () => <DemoIcon mark='D' color='#d70a53' />;

const IconSlotExample = () => {
	const [selected, setSelected] = useState('ubuntu');
	return (
		<Tabs
			type='border'
			size='sm'
			tabs={[
				{
					id: 'ubuntu',
					title: 'My details',
					leftIcon: UbuntuTabIcon,
				},
				{
					id: 'python',
					title: 'My details',
					leftIcon: PythonTabIcon,
				},
				{
					id: 'debian',
					title: 'My details',
					leftIcon: DebianTabIcon,
				},
				{ id: 'profile', title: 'My details' },
				{ id: 'password', title: 'My details' },
				{ id: 'team', title: 'My details', badge: 2 },
				{ id: 'billing', title: 'My details' },
			]}
			selectedTab={selected}
			setSelectedTab={setSelected}
		/>
	);
};
