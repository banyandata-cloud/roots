import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const BASIC_USAGE_CODE = `
import { Dropdown } from '@banyan_cloud/roots';

// Single-select dropdown
<Dropdown
  label="Select a user"
  placeholder="Choose..."
  helperText="Select one of the available users"
  required={true}
  options={[
    { value: 'admin', label: 'Admin User' },
    { value: 'editor', label: 'Editor User' },
    { value: 'viewer', label: 'Viewer User' },
  ]}
  onChange={(value) => console.log('Selected:', value)}
/>
`;

const MULTI_SELECT_CODE = `
import { Dropdown } from '@banyan_cloud/roots';

// Multi-select dropdown
<Dropdown
  label="Select users"
  placeholder="Choose multiple users..."
  helperText="You can select multiple users"
  variant="multi-select"
  required={true}
  dataLabel={{ singular: 'User', plural: 'Users' }}
  defaultSelectedValues={['admin']}
  options={[
    { value: 'admin', label: 'Admin User' },
    { value: 'editor', label: 'Editor User' },
    { value: 'viewer', label: 'Viewer User' },
    { value: 'guest', label: 'Guest User' },
  ]}
  onMultiSelectChange={(values) => console.log('Selected:', values)}
/>
`;

const ICON_VARIANT_CODE = `
import { Dropdown } from '@banyan_cloud/roots';
import Email from '../../icons/Email/Email';

// Dropdown with icons
<Dropdown
  label="Select with icon"
  placeholder="Choose..."
  icon={Email}
  options={[
    { value: 'admin', label: 'Admin User', icon: Email },
    { value: 'editor', label: 'Editor User', icon: Email },
    { value: 'viewer', label: 'Viewer User', icon: Email },
  ]}
  onChange={(value) => console.log('Selected:', value)}
/>
`;

const SEARCH_VARIANT_CODE = `
import { Dropdown } from '@banyan_cloud/roots';

// Search variant with shortcuts
<Dropdown
  label="Search frameworks"
  placeholder="Type to search..."
  variant="search"
  shortcut="⌘T"
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
  ]}
  onSearchChange={(value) => console.log('Search input:', value)}
  onChange={(value) => console.log('Selected:', value)}
  onShortcut={() => console.log('Shortcut triggered!')}
/>
`;

const ADVANCED_SEARCH_CODE = `
import { Dropdown } from '@banyan_cloud/roots';

// Advanced search with key-value pairs and tag options
<Dropdown
  label="Advanced search"
  variant="search"
  enableAdvancedSearch={true}
  tagOptionsEnabled={true}
  availableKeys={[
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'assignee', label: 'Assignee' },
  ]}
  tagOptions={[
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'high', label: 'High Priority' },
  ]}
  onAdvancedSearchChange={(result) => {
    console.log('Tags:', result.tags);
    console.log('Search:', result.defaultSearch);
  }}
/>
`;

const CONTROLLED_CODE = `
import { Dropdown } from '@banyan_cloud/roots';
import { useState } from 'react';

function ControlledDropdown() {
  const [value, setValue] = useState('');

  return (
    <Dropdown
      label="Controlled dropdown"
      value={value}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
`;

const propsData = [
	{
		prop: 'label',
		type: 'string',
		description: 'Label text displayed above the dropdown field.',
		default: 'undefined',
	},
	{
		prop: 'placeholder',
		type: 'string',
		description: 'Placeholder text shown when no option is selected.',
		default: "'Select the option'",
	},
	{
		prop: 'helperText',
		type: 'string',
		description: 'Helper text displayed below the dropdown.',
		default: "'This is a hint text to help user.'",
	},
	{
		prop: 'value',
		type: 'string',
		description: 'Controlled value for single-select dropdown.',
		default: 'undefined',
	},
	{
		prop: 'defaultValue',
		type: 'string',
		description: 'Default value for uncontrolled single-select dropdown.',
		default: 'undefined',
	},
	{
		prop: 'selectedValues',
		type: 'string[]',
		description: 'Controlled values for multi-select dropdown.',
		default: 'undefined',
	},
	{
		prop: 'defaultSelectedValues',
		type: 'string[]',
		description: 'Default values for uncontrolled multi-select dropdown.',
		default: 'undefined',
	},
	{
		prop: 'options',
		type: 'DropdownOption[]',
		description: 'Array of available options for selection.',
		default: '[]',
	},
	{
		prop: 'dataLabel',
		type: 'string | { singular: string; plural: string }',
		description:
			'Display text for selected items in multi-select. Can be a string or object with singular/plural forms.',
		default: "'option'",
	},
	{
		prop: 'customAllLabel',
		type: 'string',
		description: 'Custom label for the "All" option in multi-select.',
		default: "'All'",
	},
	{
		prop: 'state',
		type: "'default' | 'selected' | 'focus' | 'disabled' | 'error' | 'warning' | 'read-only'",
		description: 'Visual state of the dropdown.',
		default: "'default'",
	},
	{
		prop: 'size',
		type: "'sm' | 'md'",
		description: 'Size variant of the dropdown.',
		default: "'sm'",
	},
	{
		prop: 'variant',
		type: "'simple' | 'multi-select' | 'with-icon' | 'borderless' | 'search'",
		description: 'Display variant of the dropdown.',
		default: "'simple'",
	},
	{
		prop: 'required',
		type: 'boolean',
		description: 'Whether the field is marked as required.',
		default: 'true',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Whether the dropdown is disabled.',
		default: 'false',
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Whether the dropdown is in read-only mode.',
		default: 'false',
	},
	{
		prop: 'helpIcon',
		type: 'boolean',
		description: 'Whether to show the help icon in the label.',
		default: 'true',
	},
	{
		prop: 'helpText',
		type: 'string',
		description: 'Tooltip content for the help icon.',
		default: "'Additional information about this field'",
	},
	{
		prop: 'errorIcon',
		type: 'boolean',
		description: 'Whether to show the error icon in error state.',
		default: 'true',
	},
	{
		prop: 'warningIcon',
		type: 'boolean',
		description: 'Whether to show the warning icon in warning state.',
		default: 'true',
	},
	{
		prop: 'icon',
		type: 'React.ComponentType<any>',
		description: 'Leading icon component for the dropdown.',
		default: 'undefined',
	},
	{
		prop: 'searchIcon',
		type: 'React.ComponentType<any>',
		description: 'Custom search icon for search variant. Defaults to v2 SearchIcon.',
		default: 'undefined',
	},
	{
		prop: 'shortcut',
		type: 'string',
		description: 'Keyboard shortcut display text (e.g., "⌘T"). For search variant only.',
		default: 'undefined',
	},
	{
		prop: 'onShortcut',
		type: '() => void',
		description: 'Callback when keyboard shortcut is triggered.',
		default: 'undefined',
	},
	{
		prop: 'enableAdvancedSearch',
		type: 'boolean',
		description: 'Enable key-value pair search with badge-style tags.',
		default: 'false',
	},
	{
		prop: 'searchTags',
		type: 'SearchTag[]',
		description: 'Controlled search tags for advanced search.',
		default: 'undefined',
	},
	{
		prop: 'defaultSearchTags',
		type: 'SearchTag[]',
		description: 'Default search tags for uncontrolled advanced search.',
		default: 'undefined',
	},
	{
		prop: 'availableKeys',
		type: 'DropdownOption[]',
		description: 'Available keys for creating search tags in advanced search mode.',
		default: '[]',
	},
	{
		prop: 'onAdvancedSearchChange',
		type: '(result: AdvancedSearchResult) => void',
		description:
			'Callback fired when advanced search tags or main search input changes. Returns structured search result.',
		default: 'undefined',
	},
	{
		prop: 'tagOptionsEnabled',
		type: 'boolean',
		description: 'Enable dropdown options for tag value selection in advanced search mode.',
		default: 'false',
	},
	{
		prop: 'tagOptions',
		type: 'DropdownOption[]',
		description: 'Available options for tag values when tagOptionsEnabled is true.',
		default: '[]',
	},
	{
		prop: 'onChange',
		type: '(value: string) => void',
		description: 'Callback fired when single-select value changes.',
		default: 'undefined',
	},
	{
		prop: 'onMultiSelectChange',
		type: '(values: string[]) => void',
		description: 'Callback fired when multi-select values change.',
		default: 'undefined',
	},
	{
		prop: 'onSearchChange',
		type: '(searchValue: string) => void',
		description: 'Callback fired when search input changes in search variant.',
		default: 'undefined',
	},
	{
		prop: 'onFocus',
		type: '(e: React.FocusEvent<HTMLElement>) => void',
		description: 'Focus event handler.',
		default: 'undefined',
	},
	{
		prop: 'onBlur',
		type: '(e: React.FocusEvent<HTMLElement>) => void',
		description: 'Blur event handler.',
		default: 'undefined',
	},
	{
		prop: 'popoverOffset',
		type: 'number',
		description: 'Custom offset for popover positioning.',
		default: '4',
	},
	{
		prop: 'popoverClassName',
		type: 'string',
		description: 'Custom CSS class for popover container.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class for the dropdown container.',
		default: 'undefined',
	},
	{
		prop: 'id',
		type: 'string',
		description: 'HTML id attribute for the dropdown.',
		default: 'undefined',
	},
	{
		prop: 'name',
		type: 'string',
		description: 'HTML name attribute for the dropdown.',
		default: 'undefined',
	},
];

const dropdownOptionData = [
	{
		prop: 'value',
		type: 'string',
		description: 'Unique value identifier for the option.',
		default: 'required',
	},
	{
		prop: 'label',
		type: 'string',
		description: 'Display text shown in the dropdown.',
		default: 'required',
	},
	{
		prop: 'icon',
		type: 'React.ComponentType<any>',
		description: 'Optional icon component displayed next to the label.',
		default: 'undefined',
	},
];

const searchTagData = [
	{
		prop: 'id',
		type: 'string',
		description: 'Unique identifier for the tag. Auto-generated if not provided.',
		default: 'required',
	},
	{
		prop: 'key',
		type: 'string',
		description: 'Filter key name displayed in the tag label.',
		default: 'required',
	},
	{
		prop: 'value',
		type: 'string',
		description: 'Filter value entered by the user.',
		default: '""',
	},
	{
		prop: 'isEditingValue',
		type: 'boolean',
		description: 'Whether the tag is in edit mode for value input.',
		default: 'false',
	},
];

const advancedSearchResultData = [
	{
		prop: 'tags',
		type: 'Array<{ key: string; value: string }>',
		description: 'Array of key-value pair tags created in the search.',
		default: '[]',
	},
	{
		prop: 'defaultSearch',
		type: 'string',
		description: 'Main search input text.',
		default: "''",
	},
];

const DropdownDoc = () => (
	<>
		<Title />
		<Subtitle>
			A flexible dropdown component supporting single-select, multi-select, and search
			variants with comprehensive state management, icons, keyboard shortcuts, and advanced
			search capabilities.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=161-555&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/input/dropdown'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Dropdown component.</p>
		<PropsTable data={propsData} />

		<Subheading>DropdownOption</Subheading>
		<p>Shape of each object in the options array.</p>
		<PropsTable data={dropdownOptionData} />

		<Subheading>SearchTag</Subheading>
		<p>Shape of each tag in the advanced search tags array.</p>
		<PropsTable data={searchTagData} />

		<Subheading>AdvancedSearchResult</Subheading>
		<p>Shape of the result passed to onAdvancedSearchChange callback.</p>
		<PropsTable data={advancedSearchResultData} />

		<Heading>Custom Types</Heading>
		<p>Custom types exported by the Dropdown component.</p>

		<Subheading>DropdownRef</Subheading>
		<Source
			language='tsx'
			code={`interface DropdownRef {
  focus: () => void;
}`}
		/>

		<Subheading>DropdownOption</Subheading>
		<Source
			language='tsx'
			code={`interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ComponentType<any> | undefined;
}`}
		/>

		<Subheading>DataLabel</Subheading>
		<Source
			language='tsx'
			code={`interface DataLabel {
  singular: string;
  plural: string;
}`}
		/>

		<Subheading>SearchTag</Subheading>
		<Source
			language='tsx'
			code={`interface SearchTag {
  id: string;
  key: string;
  value: string;
  isEditingValue?: boolean;
}`}
		/>

		<Subheading>AdvancedSearchResult</Subheading>
		<Source
			language='tsx'
			code={`interface AdvancedSearchResult {
  tags: Omit<SearchTag, 'id' | 'isEditingValue'>[];
  defaultSearch: string;
}`}
		/>

		<Heading>Keyboard Shortcuts</Heading>
		<p>
			The search variant supports custom keyboard shortcuts. Use the <code>shortcut</code>{' '}
			prop to set a display shortcut (e.g., "⌘T") and <code>onShortcut</code> callback to
			handle the action.
		</p>
		<ul>
			<li>
				<strong>Enter:</strong> Submit search or toggle dropdown (search variant)
			</li>
			<li>
				<strong>Escape:</strong> Close dropdown and blur focus
			</li>
			<li>
				<strong>Backspace:</strong> Remove last search tag when search input is empty
				(advanced search only)
			</li>
			<li>
				<strong>Tab:</strong> Move focus to next element and close tag options popover
			</li>
		</ul>

		<Heading>Best Practices</Heading>
		<ul>
			<li>
				Always provide a <code>label</code> and <code>helperText</code> to guide users
			</li>
			<li>
				Use <code>helpIcon</code> and <code>helpText</code> for additional context on
				complex selections
			</li>
			<li>
				Set <code>required={true}</code> for mandatory fields and provide error states when
				validation fails
			</li>
			<li>For large option lists, consider using search variant to improve usability</li>
			<li>
				Use <code>dataLabel</code> object with singular/plural forms for better UX in
				multi-select
			</li>
			<li>
				Implement debouncing on <code>onSearchChange</code> for API-based filtering
			</li>
			<li>
				For advanced search, provide meaningful key names and tag options to guide users
			</li>
		</ul>
	</>
);

export default DropdownDoc;
