import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../buttons';
import { HomeIcon } from '../icons';
import BaseSidePanel from './BaseSidePanel';

const meta: Meta<typeof BaseSidePanel> = {
	title: 'Components/SidePanel/BaseSidePanel',
	component: BaseSidePanel,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof BaseSidePanel>;

/* ----------------------------------------
 * Default Base Panel
 * ------------------------------------- */
export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(true);

		const toggle = () => setOpen((prev) => !prev);

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					height: '100%',
				}}>
				<Button title='Open Drawer' size='auto' onClick={() => setOpen((prev) => !prev)} />

				<BaseSidePanel
					open={open}
					toggle={toggle}
					renderHeader={
						<div style={{ background: 'red' }}>
							<div>Header</div>
						</div>
					}
					renderFooter={<div style={{ background: 'orange' }}>Footer</div>}>
					<div
						style={{
							background: 'tomato',
							height: '500px',
						}}>
						<p>Body</p>
					</div>
				</BaseSidePanel>
			</div>
		);
	},
};

/* ----------------------------------------
 * Base Panel with Tabs
 * ------------------------------------- */
export const WithTabs: Story = {
	render: () => {
		const [open, setOpen] = useState(true);

		const toggle = () => setOpen((prev) => !prev);

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					height: '100%',
				}}>
				<Button title='Open Drawer' size='auto' onClick={() => setOpen((prev) => !prev)} />

				<BaseSidePanel
					open={open}
					toggle={toggle}
					tabsConfig={{
						tabs: [
							{ id: '1', leftIcon: HomeIcon },
							{ id: '2', leftIcon: HomeIcon },
						],
						className: '',
					}}
					renderHeader={
						<div style={{ background: 'red' }}>
							<div>Header</div>
						</div>
					}
					renderFooter={<div style={{ background: 'orange' }}>Footer</div>}>
					<div
						style={{
							background: 'tomato',
							height: '500px',
						}}>
						<p>Body</p>
					</div>
				</BaseSidePanel>
			</div>
		);
	},
};

/* ----------------------------------------
 * Base Panel Modal
 * ------------------------------------- */
export const Modal: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		const toggle = () => setOpen((prev) => !prev);

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					height: '100%',
				}}>
				<Button title='Open Drawer' size='auto' onClick={() => setOpen((prev) => !prev)} />

				<BaseSidePanel
					isModal
					animation
					open={open}
					toggle={toggle}
					renderHeader={
						<div style={{ background: 'red' }}>
							<div>Header</div>
						</div>
					}
					renderFooter={<div style={{ background: 'orange' }}>Footer</div>}>
					<div
						style={{
							background: 'tomato',
							height: '500px',
						}}>
						<p>Body</p>
					</div>
				</BaseSidePanel>
			</div>
		);
	},
};
