import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../docs';

const datePickerPropsData = [
	{
		prop: 'value',
		type: 'number | [number, number] | null',
		description: 'The selected date(s) in Unix timestamp format.',
		default: 'null',
	},
	{
		prop: 'range',
		type: 'boolean',
		description: 'Enables range selection mode (Start and End dates).',
		default: 'false',
	},
	{
		prop: 'showTime',
		type: 'boolean',
		description: 'If true, shows the time picker inside the calendar popper.',
		default: 'true',
	},
	{
		prop: 'showCustomRanges',
		type: 'boolean',
		description: 'Displays a sidebar with predefined shortcuts (e.g., Last 7 Days).',
		default: 'false',
	},
	{
		prop: 'onApply',
		type: '(value, fixedRange, tag) => void',
		description: 'Callback triggered when the user clicks the Apply button.',
		default: '—',
	},
	{
		prop: 'disableDatesBefore',
		type: 'number[]',
		description: 'Unix timestamps. All dates before these values will be unselectable.',
		default: '[]',
	},
	{
		prop: 'limitHours',
		type: 'number',
		description: 'Used with valueAsRange to set a fixed duration for time selection.',
		default: 'undefined',
	},
];

const DatePickerDoc = () => (
	<>
		<Title />
		<Subtitle>
			A flexible Date and Time picker that supports single dates, ranges, custom shortcuts,
			and high-precision time selection. It uses <code>floating-ui</code> for positioning and{' '}
			<code>date-fns</code> for logic.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/kywa4kIXJcp4Wl8BBbljZN/Components?node-id=DatePicker'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/date-picker'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the DatePicker component.</p>
		<PropsTable data={datePickerPropsData} />

		<Heading>Usage</Heading>

		<Subheading>Single Date with Time</Subheading>
		<p>The default mode for selecting a specific point in time.</p>
		<Source
			language='tsx'
			code={`
<DatePicker
  label="Departure"
  showTime={true}
  value={timestamp}
  onApply={(val) => setTimestamp(val)}
/>
            `}
		/>

		<Subheading>Range Selection with Shortcuts</Subheading>
		<p>
			Enabling <code>range</code> and <code>showCustomRanges</code> provides a powerful
			interface for data filtering.
		</p>
		<Source
			language='tsx'
			code={`
<DatePicker
  range={true}
  showCustomRanges={true}
  customRanges={[
    { title: 'Last 7 Days', type: 'days', value: 7 },
    { title: 'Last 1 Month', type: 'days', value: 30 }
  ]}
  onApply={(range) => setDateRange(range)}
/>
            `}
		/>

		<Heading>Technical Details</Heading>
		<ul>
			<li>
				<strong>Unix Timestamps:</strong> All inputs and outputs use Unix timestamps
				(seconds) to maintain consistency across the system.
			</li>
			<li>
				<strong>Floating UI:</strong> The popper uses <code>useFloating</code> to handle
				collisions with viewport edges.
			</li>
			<li>
				<strong>Validation:</strong> Uses <code>maxRange</code> to prevent users from
				selecting intervals that are too large for specific queries.
			</li>
		</ul>
	</>
);

export default DatePickerDoc;
