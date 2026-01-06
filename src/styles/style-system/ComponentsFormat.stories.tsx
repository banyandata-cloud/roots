import type { Meta } from '@storybook/react';

const meta: Meta = {
	title: 'Style System/Component Format',
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			page: () => (
				<>
					<h1>Component Format</h1>

					<p>We are using below format for each component:</p>

					<ul>
						<li>
							<code>componentName.stories.tsx</code> – Story about the respective
							component with all possible use cases
						</li>

						<li>
							<code>ComponentName.module.scss</code> – Styles related to particular
							components. Detailed descriptions are available under the{' '}
							<a href='?path=/story/style-system-styles--page'>Styles</a> folder in
							Storybook
						</li>

						<li>
							<code>ComponentName.jsx</code> – JSX stands for JavaScript XML. JSX
							allows us to write HTML in React. JSX makes it easier to write and add
							HTML in React.
							<br />
							Import global config and utils if they are common in the{' '}
							<code>.jsx</code> file, otherwise create unique config and utils folders
							specific to the component.
						</li>

						<li>
							<code>Config</code> – Folder containing data related to the respective
							component (e.g. used in charts)
						</li>

						<li>
							<code>Utils</code> – Unique utility functions related to the component
						</li>

						<li>
							<code>index.js</code> – Simplifies imports by re-exporting the main
							component
						</li>
					</ul>

					<h3>Example</h3>

					<p>
						<strong>With index.js</strong>
					</p>
					<pre>
						<code>{`import Component from '../Component';`}</code>
					</pre>

					<p>
						<strong>Without index.js</strong> (you would need to import the actual file)
					</p>
					<pre>
						<code>{`import Editable from '../ComponentFolder/ComponentJsx';`}</code>
					</pre>
				</>
			),
		},
	},
};

export default meta;
