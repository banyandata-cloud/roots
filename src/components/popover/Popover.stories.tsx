import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from '../buttons';
import Popover from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'Components/Popover',
	component: Popover,
	parameters: {
		options: { showToolbar: false },
		docs: {
			description: {
				component:
					'A layover component that renders above existing elements using z-index. Built using floating-ui for positioning.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Popover>;

/* ---------------------------------- */
/* Default Story                      */
/* ---------------------------------- */

export const Default: Story = {
	render: () => {
		const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
		const [open, setOpen] = useState(false);

		useEffect(() => {
			const handleEsc = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					setOpen(false);
				}
			};

			window.addEventListener('keydown', handleEsc);
			return () => window.removeEventListener('keydown', handleEsc);
		}, []);

		return (
			<div
				style={{
					textAlign: 'center',
					marginTop: 50,
				}}>
				<Button
					title='Toggle Popover'
					size='auto'
					ref={setAnchorEl}
					onClick={() => setOpen((prev) => !prev)}
				/>

				<Popover open={open} anchorEl={anchorEl}>
					<div
						style={{
							backgroundColor: 'rgba(36, 161, 72, 0.08)',
							color: '#24a148',
							padding: '0.75rem 1rem',
							borderRadius: 4,
						}}>
						Content of the popover
					</div>
				</Popover>
			</div>
		);
	},
};
