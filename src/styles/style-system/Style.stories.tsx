import type { Meta } from '@storybook/react';

const meta: Meta = {
	title: 'Style System/Styles',
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			page: () => (
				<>
					<h1>Style Guidelines</h1>

					<p>
						We are using{' '}
						<a
							href='https://github.com/css-modules/css-modules'
							target='_blank'
							rel='noopener noreferrer'>
							CSS Modules
						</a>{' '}
						where all class names and animation names are scoped locally by default.
					</p>

					<h3>
						Why we are using{' '}
						<a
							href='https://css-tricks.com/css-modules-part-1-need/'
							target='_blank'
							rel='noopener noreferrer'>
							CSS Modules
						</a>
					</h3>

					<ul>
						<li>
							<strong>No conflicts</strong> – Styles apply only to that component,
							solving the problem of global CSS scope with explicit dependencies.
						</li>
						<li>
							React promotes independent and reusable components, allowing small UI
							updates without affecting the whole page.
						</li>
					</ul>

					<p>
						As React applications grow, the number of components and layers increases.
						Simple style changes can unintentionally affect other parts of the UI.
					</p>

					<p>
						CSS Modules allow granular control over styles, enabling modular, layered
						styling approaches that scale cleanly as applications grow.
					</p>

					<h2>Naming</h2>

					<p>
						For local class names, <code>camelCase</code> naming is recommended (but not
						enforced). You can still use <code>kebab-case</code> via bracket notation:
					</p>

					<pre>
						<code>{`styles['class-name'] or styles.className`}</code>
					</pre>

					<h2>Steps for writing styles</h2>

					<h3>1. Style File</h3>
					<ul>
						<li>
							Create a style file in <code>componentName.module.scss</code>
						</li>
						<li>Import global styles (mixins, variables, etc.)</li>
					</ul>

					<pre>
						<code>{`@import '../../assets/styles/index';

.container {
  @include flex(row, flex-start, center);
  width: auto;
  height: 3.5rem;

  .breadcrumb-item-title {
    @include flex(row, flex-start, center);
    font-weight: 600;
    font-size: 24px;
    color: #001833;
  }

  .breadcrumb-item {
    @include flex(row, flex-start, center);
    font-weight: 500;
    font-size: 20px;
    color: #003ecb;
  }
}`}</code>
					</pre>

					<h3>2. JSX File</h3>
					<ul>
						<li>
							Create a <code>.jsx</code> (or <code>.tsx</code>) file
						</li>
						<li>
							Import compiled CSS:
							<pre>
								<code>{`import styles from './componentName.module.css';`}</code>
							</pre>
						</li>
						<li>
							Import utility helpers:
							<pre>
								<code>{`import { classes } from '../../utils';`}</code>
							</pre>
						</li>
						<li>
							Apply styles using either:
							<pre>
								<code>{`styles.className or styles['class-name']`}</code>
							</pre>
						</li>
					</ul>

					<pre>
						<code>{`import React from 'react';
import { Breadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
import styles from './Breadcrumbs.module.css';
import { BreadcrumbSeperatorIcon } from '../../assets/vectors/common';
import { getSpacedDisplayName, classes } from '../../utils/utils';

const BreadCrumbs = ({ crumbs }) => {
  return (
    <div className={classes(styles.container)}>
      <Breadcrumbs
        separator={
          <BreadcrumbSeperatorIcon width="7" height="9" color="#001833" />
        }
        aria-label="breadcrumb"
      >
        {crumbs.map((crumb, index) => (
          <Link href=" " key={crumb} underline="none">
            <span
              className={classes(
                index === 0
                  ? styles['breadcrumb-item-title']
                  : styles['breadcrumb-item']
              )}
            >
              {getSpacedDisplayName(crumb).replace(/-/g, ' ')}
            </span>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};`}</code>
					</pre>
				</>
			),
		},
	},
};

export default meta;
