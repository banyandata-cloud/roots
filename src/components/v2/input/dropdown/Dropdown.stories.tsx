import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../../helpers';
import Email from '../../../icons/Email/Email';
import DropdownDoc from '../dropdown/Story/DropdownDoc';
import { Dropdown } from './index';

const meta = {
	title: 'Components/v2/Input/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			page: DropdownDoc,
			description: {
				component:
					'A flexible dropdown component supporting single-select, multi-select, and search variants with comprehensive state management.',
			},
		},
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const gridStyle = {
	display: 'flex',
	flexWrap: 'wrap' as const,
	gap: '24px',
};

const itemStyle = {
	minWidth: '320px',
	width: '320px',
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => {
		const searchOptions = [
			{ value: 'react', label: 'React' },
			{ value: 'vue', label: 'Vue.js' },
			{ value: 'angular', label: 'Angular' },
			{ value: 'svelte', label: 'Svelte' },
			{ value: 'nextjs', label: 'Next.js' },
			{ value: 'nuxtjs', label: 'Nuxt.js' },
			{ value: 'gatsby', label: 'Gatsby' },
			{ value: 'remix', label: 'Remix' },
		];
		const availableKeys = [
			{ value: 'status', label: 'Status', icon: Email },
			{ value: 'priority', label: 'Priority', icon: Email },
			{ value: 'assignee', label: 'Assignee', icon: Email },
			{ value: 'category', label: 'Category', icon: Email },
			{ value: 'type', label: 'Type', icon: Email },
			{ value: 'project', label: 'Project', icon: Email },
			{ value: 'team', label: 'Team', icon: Email },
			{ value: 'label', label: 'Label', icon: Email },
			{ value: 'milestone', label: 'Milestone', icon: Email },
			{ value: 'component', label: 'Component', icon: Email },
		];
		const tagOptions = [
			{ value: 'open', label: 'Open' },
			{ value: 'in-progress', label: 'In Progress' },
			{ value: 'closed', label: 'Closed' },
			{ value: 'blocked', label: 'Blocked' },
			{ value: 'review', label: 'Under Review' },
			{ value: 'high', label: 'High Priority' },
			{ value: 'medium', label: 'Medium Priority' },
			{ value: 'low', label: 'Low Priority' },
			{ value: 'urgent', label: 'Urgent' },
			{ value: 'john', label: 'John Doe' },
			{ value: 'jane', label: 'Jane Smith' },
			{ value: 'bob', label: 'Bob Johnson' },
			{ value: 'alice', label: 'Alice Wilson' },
		];

		return (
			<div style={sectionStyle}>
				<div>
					<p style={headingStyle}>Simple Variant</p>
					<div style={gridStyle}>
						<div style={itemStyle}>
							<Dropdown
								label='Default (Uncontrolled)'
								placeholder='Select a user'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								helpText='Choose a user type from the available options. This selection will determine their access permissions.'
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
								onChange={(value) => console.log('Selected:', value)}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Selected (Controlled)'
								value='admin'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Focus'
								value='admin'
								state='focus'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Error'
								value='admin'
								state='error'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								helpText='This field is required. Select one of the available user types to proceed.'
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Warning'
								value='admin'
								state='warning'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								helpText='Selecting certain user types may impact system performance. Consider the implications before proceeding.'
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Disabled'
								value='admin'
								helperText='This is a hint text to help user.'
								disabled={true}
								required={true}
								helpIcon={true}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Read Only'
								value='admin'
								helperText='This is a hint text to help user.'
								readOnly={true}
								required={true}
								helpIcon={true}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
							/>
						</div>
					</div>
				</div>

				<div>
					<p style={headingStyle}>Icon Variant</p>
					<div style={gridStyle}>
						<div style={itemStyle}>
							<Dropdown
								label='Default (Uncontrolled)'
								placeholder='Select the option'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onChange={(value) => console.log('Selected:', value)}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Selected (Controlled)'
								value='admin'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Focus'
								value='admin'
								state='focus'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Error'
								value='admin'
								state='error'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Warning'
								value='admin'
								state='warning'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Disabled'
								value='admin'
								helperText='This is a hint text to help user.'
								disabled={true}
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Read Only'
								value='admin'
								helperText='This is a hint text to help user.'
								readOnly={true}
								required={true}
								helpIcon={true}
								icon={Email}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
							/>
						</div>
					</div>
				</div>

				<div>
					<p style={headingStyle}>Multi Select</p>
					<div style={gridStyle}>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Default (Empty)'
								placeholder='Select users'
								helperText='You can select multiple users.'
								variant='multi-select'
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
									{ value: 'moderator', label: 'Moderator User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Empty multi-select changed:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select (Uncontrolled)'
								placeholder='Select users'
								helperText='You can select multiple users.'
								variant='multi-select'
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								defaultSelectedValues={['admin']}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
									{ value: 'moderator', label: 'Moderator User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Multi-select changed:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Focus'
								defaultSelectedValues={['admin', 'editor']}
								state='focus'
								variant='multi-select'
								helperText='Focus state with 2 selected.'
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
									{ value: 'moderator', label: 'Moderator User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Focus multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Error'
								defaultSelectedValues={[]}
								state='error'
								variant='multi-select'
								helperText='Please select at least one user.'
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Error multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Warning'
								defaultSelectedValues={['admin']}
								state='warning'
								variant='multi-select'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Warning multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Disabled'
								defaultSelectedValues={['admin', 'editor']}
								variant='multi-select'
								helperText='You cannot change the selection.'
								disabled={true}
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('Disabled multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select Read Only'
								defaultSelectedValues={['admin', 'editor']}
								variant='multi-select'
								helperText='This is a hint text to help user.'
								readOnly={true}
								required={true}
								helpIcon={true}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User' },
									{ value: 'editor', label: 'Editor User' },
									{ value: 'viewer', label: 'Viewer User' },
									{ value: 'guest', label: 'Guest User' },
								]}
								onMultiSelectChange={(values) =>
									console.log('ReadOnly multi-select:', values)
								}
							/>
						</div>
					</div>
				</div>

				<div>
					<p style={headingStyle}>Multi Select With Icon</p>
					<div style={gridStyle}>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Default)'
								placeholder='Select users'
								helperText='You can select multiple users.'
								variant='multi-select'
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
									{ value: 'moderator', label: 'Moderator User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Icon multi-select changed:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Selected)'
								defaultSelectedValues={['admin', 'editor']}
								variant='multi-select'
								helperText='2 users selected.'
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
									{ value: 'moderator', label: 'Moderator User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Icon multi-select with selection:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Focus)'
								defaultSelectedValues={['admin']}
								state='focus'
								variant='multi-select'
								helperText='Focus state with icon.'
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Focus icon multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Disabled)'
								defaultSelectedValues={['admin', 'editor']}
								variant='multi-select'
								helperText='You cannot change the selection.'
								disabled={true}
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Disabled icon multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Error)'
								defaultSelectedValues={[]}
								state='error'
								variant='multi-select'
								helperText='Please select at least one user.'
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Error icon multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Warning)'
								defaultSelectedValues={['admin']}
								state='warning'
								variant='multi-select'
								helperText='This is a hint text to help user.'
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('Warning icon multi-select:', values)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Multi-select with Icon (Read Only)'
								defaultSelectedValues={['admin', 'editor']}
								variant='multi-select'
								helperText='This is a hint text to help user.'
								readOnly={true}
								required={true}
								helpIcon={true}
								icon={Email}
								dataLabel={{
									singular: 'User',
									plural: 'Users',
								}}
								options={[
									{ value: 'admin', label: 'Admin User', icon: Email },
									{ value: 'editor', label: 'Editor User', icon: Email },
									{ value: 'viewer', label: 'Viewer User', icon: Email },
									{ value: 'guest', label: 'Guest User', icon: Email },
								]}
								onMultiSelectChange={(values) =>
									console.log('ReadOnly icon multi-select:', values)
								}
							/>
						</div>
					</div>
				</div>

				<div>
					<p style={headingStyle}>Search Variant</p>
					<div style={gridStyle}>
						<div style={itemStyle}>
							<Dropdown
								label='Basic Search'
								placeholder='Search frameworks...'
								helperText='Basic search with shortcut support'
								required={true}
								helpIcon={true}
								helpText='Use the search field to find frameworks quickly. Press ⌘T to focus the search field from anywhere.'
								variant='search'
								shortcut='⌘T'
								options={searchOptions}
								onSearchChange={(value) => console.log('Search input:', value)}
								onChange={(value) => console.log('Selected:', value)}
								onShortcut={() => console.log('Shortcut triggered!')}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Advanced Search with Tag Options'
								placeholder='Type "status", "priority"...'
								helperText='Type filter names, then select from dropdown when editing tag values'
								required={true}
								helpIcon={true}
								variant='search'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								tagOptionsEnabled={true}
								tagOptions={tagOptions}
								shortcut='⌘F'
								options={searchOptions}
								onAdvancedSearchChange={(result) => {
									console.log('Advanced search result:', result);
								}}
								onShortcut={() => console.log('Advanced search focused!')}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Search Focus'
								placeholder='Search frameworks'
								helperText='Focus state for search dropdown.'
								state='focus'
								required={true}
								helpIcon={true}
								variant='search'
								shortcut='⌘K'
								options={searchOptions}
								onSearchChange={(value) =>
									console.log('Search focus input:', value)
								}
								onChange={(value) => console.log('Focus selected:', value)}
								onShortcut={() => console.log('Focus shortcut triggered!')}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Search Disabled'
								placeholder='Cannot search'
								helperText='Search dropdown is disabled.'
								disabled={true}
								required={true}
								helpIcon={true}
								variant='search'
								shortcut='⌘D'
								options={searchOptions}
								onSearchChange={(value) =>
									console.log('Disabled search input:', value)
								}
								onChange={(value) => console.log('Disabled selected:', value)}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Search Error'
								placeholder='Search with error'
								helperText='Error state with tag options enabled.'
								state='error'
								required={true}
								helpIcon={true}
								variant='search'
								shortcut='⌘E'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								tagOptionsEnabled={true}
								tagOptions={tagOptions}
								options={searchOptions}
								onAdvancedSearchChange={(result) =>
									console.log('Error search result:', result)
								}
								onShortcut={() => console.log('Error shortcut triggered!')}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Search Warning'
								placeholder='Search with warning'
								helperText='Warning state with tag options enabled.'
								state='warning'
								required={true}
								helpIcon={true}
								variant='search'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								tagOptionsEnabled={true}
								tagOptions={tagOptions}
								shortcut='⌘W'
								options={searchOptions}
								onAdvancedSearchChange={(result) =>
									console.log('Warning search result:', result)
								}
							/>
						</div>
						<div style={itemStyle}>
							<Dropdown
								label='Search Read Only'
								placeholder='Cannot modify search'
								helperText='Read-only search dropdown.'
								readOnly={true}
								required={true}
								helpIcon={true}
								variant='search'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								options={searchOptions}
							/>
						</div>
					</div>
				</div>

				<div>
					<p style={headingStyle}>Tag Options Comparison</p>
					<div style={{ ...gridStyle }}>
						<div style={{ minWidth: '350px', width: '350px' }}>
							<Dropdown
								label='Advanced Search (Manual Input Only)'
								placeholder='Type to search or create tags...'
								helperText='Tags require manual typing for values'
								required={true}
								helpIcon={true}
								variant='search'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								tagOptionsEnabled={false}
								shortcut='⌘1'
								onAdvancedSearchChange={(result) => {
									console.log('Manual input search result:', result);
								}}
							/>
						</div>
						<div style={{ minWidth: '350px', width: '350px' }}>
							<Dropdown
								label='Advanced Search (With Options Dropdown)'
								placeholder='Type to search or create tags...'
								helperText='Click on tag values to see predefined options'
								required={true}
								helpIcon={true}
								variant='search'
								enableAdvancedSearch={true}
								availableKeys={availableKeys}
								tagOptionsEnabled={true}
								tagOptions={tagOptions}
								shortcut='⌘2'
								onAdvancedSearchChange={(result) => {
									console.log('Dropdown options search result:', result);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
};
