import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'tabs',
		type: 'Tab[]',
		description: 'Array of tab objects defining each tab in the component.',
		default: '[]',
	},
	{
		prop: 'selectedTab',
		type: 'string',
		description: 'The id of the currently active tab.',
		default: '-',
	},
	{
		prop: 'setSelectedTab',
		type: '(id: string) => void',
		description: 'Callback fired when the user selects a tab, receives the tab id.',
		default: '-',
	},
	{
		prop: 'direction',
		type: "'horizontal' | 'vertical'",
		description: 'Sets the layout direction of the tabs.',
		default: "'horizontal'",
	},
	{
		prop: 'children',
		type: 'ReactNode',
		description: 'Content rendered below the tab bar, typically the active panel content.',
		default: 'null',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles to the Tabs container.',
		default: 'undefined',
	},
];

const CODE = `
import { useState } from 'react';
import { Tabs } from '@banyan_cloud/roots';

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tabs
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      direction="horizontal"
      tabs={[
        { id: 'tab1', title: 'Overview' },
        { id: 'tab2', title: 'Details' },
        { id: 'tab3', title: 'Settings' },
      ]}
    >
      <div>
        {selectedTab === 'tab1' && <p>Overview content</p>}
        {selectedTab === 'tab2' && <p>Details content</p>}
        {selectedTab === 'tab3' && <p>Settings content</p>}
      </div>
    </Tabs>
  );
};
`;

const TabsDoc = () => (
	<>
		<Title />
		<Subtitle>
			Tabs organise content into multiple panels within the same view, allowing users to
			switch between them without leaving the page. Supports horizontal and vertical layouts,
			icons, disabled states, and dropdown overflow.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=732-694&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/tabs'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Tabs component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Tabs component.</p>
		<Subheading>Tab</Subheading>
		<Source
			language='tsx'
			code={`interface Tab {
    id: string;
    title: string;
    disabled?: boolean;
    leftIcon?: ComponentType | { Active?: ComponentType; InActive?: ComponentType };
    rightIcon?: ComponentType<{ className?: string }>;
    dropdown?: boolean;
    dropdownItems?: { id: string; title: string }[];
}`}
		/>

		<Subheading>TabDirection</Subheading>
		<Source language='tsx' code={`type TabDirection = 'horizontal' | 'vertical';`} />

		<Heading>Usage</Heading>
		<Source language='tsx' code={CODE} />
	</>
);

export default TabsDoc;
