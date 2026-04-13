import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'content',
		type: 'ReactNode',
		description: 'The string or interactive React node to display inside the tooltip body.',
		default: 'Required',
	},
	{
		prop: 'position',
		type: 'string',
		description:
			'This key decides the position of Tooltip, among the options top, bottom, left and right.',
		default: "'top'",
	},
	{
		prop: 'interactive',
		type: 'boolean',
		description:
			'Whether the tooltip allows pointer events and hovering inside its body to natively interact with embedded links or elements.',
		default: 'false',
	},
	{
		prop: 'pointerPosition',
		type: "'start' | 'center' | 'end'",
		description:
			'Controls where the pointer appears along the active side (start, center, end).',
		default: "'center'",
	},
	{
		prop: 'showPointer',
		type: 'boolean',
		description:
			'Toggles the rendering of the small directional pointer arrow pointing back to the trigger element.',
		default: 'true',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Key to change style through external className.',
		default: "''",
	},
	{
		prop: 'children',
		type: 'ReactElement',
		description: 'Required. The target element that triggers the tooltip on hover or focus.',
		default: '-',
	},
];

const TooltipDoc = () => (
	<>
		<Title />
		<Subtitle>
			A highly dynamic layout wrapper for providing dense contextual information on hover or
			focus. Built on top of Floating UI with collision-aware screen-edge repositioning,
			animated presence, and an interactive mode that safely embeds clickable content inside
			the floating layer.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=1-13&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/tooltip'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Tooltip component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Tooltip component props.</p>

		<Subheading>TooltipPosition</Subheading>
		<Source
			language='tsx'
			code={`type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';`}
		/>

		<Subheading>TooltipPointerPosition</Subheading>
		<Source language='tsx' code={`type TooltipPointerPosition = 'start' | 'center' | 'end';`} />

		<Heading>Usage</Heading>

		<Subheading>Basic Usage</Subheading>
		<Source
			language='tsx'
			code={`import { Tooltip } from '@banyan_cloud/roots';
 
<Tooltip content='Helpful context'>
  <button>Hover me</button>
</Tooltip>`}
		/>

		<Subheading>Positional Variants</Subheading>
		<Source
			language='tsx'
			code={`<Tooltip content='Above the trigger' position='top'>
  <span>Top</span>
</Tooltip>
 
<Tooltip content='Below the trigger' position='bottom'>
  <span>Bottom</span>
</Tooltip>
 
<Tooltip content='Left of the trigger' position='left'>
  <span>Left</span>
</Tooltip>
 
<Tooltip content='Right of the trigger' position='right'>
  <span>Right</span>
</Tooltip>`}
		/>

		<Subheading>Pointer Alignment Variants</Subheading>
		<Source
			language='tsx'
			code={`<Tooltip content='Pointer at start' position='top' pointerPosition='start'>
  <span>Top · Start</span>
</Tooltip>
 
<Tooltip content='Pointer at center' position='top' pointerPosition='center'>
  <span>Top · Center</span>
</Tooltip>
 
<Tooltip content='Pointer at end' position='top' pointerPosition='end'>
  <span>Top · End</span>
</Tooltip>`}
		/>

		<Subheading>Without Pointer Arrow</Subheading>
		<Source
			language='tsx'
			code={`<Tooltip content='No arrow' position='right' showPointer={false}>
  <span>Hover</span>
</Tooltip>`}
		/>

		<Subheading>Interactive Tooltip</Subheading>
		<p>
			Embeds clickable content inside the floating layer. A 150ms close delay is applied
			automatically to ease mouse bridging between the trigger and the tooltip.
		</p>
		<Source
			language='tsx'
			code={`<Tooltip
  content={
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span>Confirm your destructive action.</span>
      <a href='#' style={{ color: '#60A5FA', textDecoration: 'none' }}>
        Learn more
      </a>
    </div>
  }
  position='right'
  interactive={true}
>
  <button>Delete Workspace</button>
</Tooltip>`}
		/>
	</>
);
export default TooltipDoc;
