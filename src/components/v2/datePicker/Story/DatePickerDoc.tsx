import { Heading, Source, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'mode',
		type: "'single' | 'range'",
		description: 'One date or a range. Fixed per page.',
		default: "'range'",
	},
	{
		prop: 'time',
		type: 'boolean',
		description: 'Shows the time controls. Turns auto-apply off.',
		default: 'false',
	},
	{
		prop: 'future',
		type: 'boolean',
		description: 'Allows future days and adds the future presets.',
		default: 'false',
	},
	{
		prop: 'autoApply',
		type: 'boolean',
		description: 'Applies after the second click or a preset. Ignored when time is on.',
		default: 'true',
	},
	{
		prop: 'dataStart',
		type: 'Date | null',
		description: 'First day with data (new tenant). Earlier starts are moved to it.',
		default: 'null',
	},
	{
		prop: 'defaultPreset',
		type: 'string',
		description: 'Per user/page default preset id.',
		default: 'undefined',
	},
	{
		prop: 'value',
		type: 'DatePickerValue',
		description: 'Controlled applied value.',
		default: 'undefined',
	},
	{
		prop: 'defaultValue',
		type: 'DatePickerValue',
		description: 'Uncontrolled initial value.',
		default: 'undefined',
	},
	{
		prop: 'onChange',
		type: '(value: DatePickerValue) => void',
		description: 'Fires when a value is applied (auto-apply or Apply dates).',
		default: 'undefined',
	},
	{ prop: 'hour12', type: 'boolean', description: 'Set by the 24-hour switch.', default: 'true' },
	{
		prop: 'timeZone',
		type: 'string',
		description: 'Shown in the footer.',
		default: 'system time zone',
	},
	{ prop: 'open', type: 'boolean', description: 'Controlled open state.', default: 'undefined' },
	{
		prop: 'defaultOpen',
		type: 'boolean',
		description: 'Uncontrolled initial open state.',
		default: 'false',
	},
	{
		prop: 'trigger',
		type: '(state) => ReactElement',
		description: 'Custom trigger renderer; a default trigger is used when omitted.',
		default: 'undefined',
	},
];

const DatePickerDoc = () => (
	<>
		<Title />
		<Subtitle>
			One date picker for every page that filters by date — presets, calendars, and optional
			time controls, in range or single-date mode.
		</Subtitle>

		<Heading>Props</Heading>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { DatePicker } from '@banyan_cloud/roots';

const MyComponent = () => (
  <DatePicker
    mode='range'
    defaultValue={{ preset: 'last-7-days', from: null, to: null }}
    onChange={(value) => console.log('applied', value)}
  />
);`}
		/>
	</>
);

export default DatePickerDoc;
