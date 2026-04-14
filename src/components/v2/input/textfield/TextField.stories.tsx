import type { Meta, StoryObj } from '@storybook/react';
import { CopyIcon, EmailIcon, PasswordIcon } from '../../../icons';
import TextFieldDoc from '../textfield/Story/TextFieldDoc';
import { TextField } from './index';

const meta: Meta<typeof TextField> = {
	title: 'Components/v2/Input/TextField',
	component: TextField,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: false },
		docs: {
			page: TextFieldDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof TextField>;
export const Default: Story = {
	name: 'Default',
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Default'
					placeholder='Enter Email Address'
					helperText='Helper text'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Active Typing'
					placeholder='Enter Password'
					helperText='Helper text'
					state='active-typing'
					required={true}
					rightIcon={PasswordIcon}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='filled'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled Focus'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='filled-focus'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='error-filled'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error Focus'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='error-focus'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Warning'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='warning'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Disabled'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='disable'
					disabled={true}
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					helpIcon={true}
				/>
			</div>
		</div>
	),
};

// ---------------------------------------------------------------------------
// Leading Text Variant
// ---------------------------------------------------------------------------

export const LeadingText: Story = {
	name: 'Leading Text',
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Default'
					placeholder='Enter website URL'
					helperText='Helper text'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Active Typing'
					placeholder='Enter website URL'
					helperText='Helper text'
					state='active-typing'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='filled'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled Focus'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='filled-focus'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='error-filled'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error Focus'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='error-focus'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Warning'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='warning'
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Disabled'
					value='app.banyancloud.io'
					helperText='Helper text'
					state='disable'
					disabled={true}
					required={true}
					leadingText='https://'
					helpIcon={true}
					type='leading-text'
				/>
			</div>
		</div>
	),
};

// ---------------------------------------------------------------------------
// Trailing Button Variant
// ---------------------------------------------------------------------------

export const TrailingButton: Story = {
	name: 'Trailing Button',
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Default'
					placeholder='Enter Email Address'
					helperText='Helper text'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Active Typing'
					placeholder='Enter Email Address'
					helperText='Helper text'
					state='active-typing'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='filled'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled Focus'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='filled-focus'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='error-filled'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error Focus'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='error-focus'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Warning'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='warning'
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Disabled'
					value='balaji@banyancloud.io'
					helperText='Helper text'
					state='disable'
					disabled={true}
					required={true}
					leadingIcon={true}
					leadingIconComponent={EmailIcon}
					trailingButton={true}
					trailingButtonText='Copy'
					trailingButtonIcon={true}
					trailingButtonIconComponent={CopyIcon}
					type='trailing-button'
				/>
			</div>
		</div>
	),
};

// ---------------------------------------------------------------------------
// Leading Dropdown Variant
// ---------------------------------------------------------------------------

const countryOptions = [
	{ value: 'us', label: 'US' },
	{ value: 'uk', label: 'UK' },
	{ value: 'ca', label: 'CA' },
	{ value: 'au', label: 'AU' },
	{ value: 'in', label: 'IN' },
];

export const LeadingDropdown: Story = {
	name: 'Leading Dropdown',
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Phone Number'
					placeholder='Enter Phone Number'
					helperText='Helper text'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Active Typing'
					placeholder='Enter Phone Number'
					helperText='Helper text'
					state='active-typing'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled'
					value='9876543210'
					helperText='Helper text'
					state='filled'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Filled Focus'
					value='9876543210'
					helperText='Helper text'
					state='filled-focus'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error'
					value='9876543210'
					helperText='Helper text'
					state='error-filled'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Error Focus'
					value='9876543210'
					helperText='Helper text'
					state='error-focus'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Warning'
					value='9876543210'
					helperText='Helper text'
					state='warning'
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Disabled'
					value='9876543210'
					helperText='Helper text'
					state='disable'
					disabled={true}
					required={true}
					leadingDropdown={true}
					leadingDropdownOptions={countryOptions}
					leadingDropdownDefaultValue='us'
					leadingDropdownPlaceholder='US'
					helpIcon={true}
					type='leading-dropdown'
				/>
			</div>
		</div>
	),
};

// ---------------------------------------------------------------------------
// Trailing Dropdown Variant
// ---------------------------------------------------------------------------

const currencyOptions = [
	{ value: 'USD', label: 'USD' },
	{ value: 'EUR', label: 'EUR' },
	{ value: 'GBP', label: 'GBP' },
	{ value: 'INR', label: 'INR' },
	{ value: 'JPY', label: 'JPY' },
	{ value: 'CAD', label: 'CAD' },
];

export const TrailingDropdown: Story = {
	name: 'Trailing Dropdown',
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Amount'
					placeholder='Enter amount'
					helperText='Helper text'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Price'
					placeholder='Enter price'
					helperText='Helper text'
					state='active-typing'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Budget'
					value='1500'
					helperText='Helper text'
					state='filled'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Cost'
					value='2500'
					helperText='Helper text'
					state='filled-focus'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Fee'
					value='99'
					helperText='Helper text'
					state='error-filled'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Salary'
					value='65000'
					helperText='Helper text'
					state='error-focus'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Revenue'
					value='128000'
					helperText='Helper text'
					state='warning'
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
			<div style={{ minWidth: '320px', width: '320px' }}>
				<TextField
					label='Balance'
					value='8500'
					helperText='Helper text'
					state='disable'
					disabled={true}
					required={true}
					trailingDropdown={true}
					trailingDropdownOptions={currencyOptions}
					trailingDropdownDefaultValue='USD'
					helpIcon={true}
					type='trailing-dropdown'
				/>
			</div>
		</div>
	),
};
