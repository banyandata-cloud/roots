import type { Meta } from '@storybook/react';

const meta: Meta = {
	title: 'Style System/Designs',
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			page: () => (
				<>
					<h1>Design Descriptions</h1>

					<p>
						We use{' '}
						<a href='https://www.figma.com/' target='_blank' rel='noopener noreferrer'>
							Figma
						</a>{' '}
						to create mockups and prototypes.
					</p>

					<ul>
						<li>
							<a
								href='https://www.designedbyalok.com/links/'
								target='_blank'
								rel='noopener noreferrer'>
								Templates
							</a>{' '}
							– Use cases of all components
						</li>

						<li>
							<a
								href='https://www.figma.com/file/kKEE3r3h9OcHuhs0vnwMG9/Colors-%26-Typography?node-id=4%3A3'
								target='_blank'
								rel='noopener noreferrer'>
								Typography
							</a>{' '}
							– Typeface information including italic, oblique, and small caps
						</li>

						<li>
							<a
								href='https://www.figma.com/file/kKEE3r3h9OcHuhs0vnwMG9/Colors-%26-Typography?node-id=0%3A1'
								target='_blank'
								rel='noopener noreferrer'>
								Theme / Color
							</a>{' '}
							– Brand color system and themes
						</li>

						<li>
							<a
								href='https://www.figma.com/files/drafts?fuid=1103974723664924599'
								target='_blank'
								rel='noopener noreferrer'>
								Components List
							</a>{' '}
							– Atomic components used to build pages
						</li>

						<li>
							<a
								href='https://www.figma.com/file/kKEE3r3h9OcHuhs0vnwMG9/Colors-%26-Typography?node-id=34%3A92'
								target='_blank'
								rel='noopener noreferrer'>
								Assets
							</a>{' '}
							– Icons and visual assets used across projects
						</li>

						<li>
							<a
								href='https://www.designedbyalok.com/links/'
								target='_blank'
								rel='noopener noreferrer'>
								Features
							</a>{' '}
							– Feature-level prototypes
						</li>
					</ul>
				</>
			),
		},
	},
};

export default meta;
