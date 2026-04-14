import type { Meta, StoryObj } from '@storybook/react';
import TooltipDoc from '../tooltip/Story/TooltipDoc';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/v2/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		options: { showToolbar: true },
		docs: {
			page: TooltipDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const triggerStyle: React.CSSProperties = {
	padding: '8px 16px',
	background: '#eaeaea',
	borderRadius: '4px',
	cursor: 'default',
};

export const Default: Story = {
	name: 'Variants & Interactive',
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '48px',
				padding: '60px',
			}}>
			<div>
				<h3 style={{ marginTop: 0, marginBottom: '24px' }}>Position Variants</h3>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '24px',
						flexWrap: 'wrap',
					}}>
					<Tooltip content='Tooltip attached to the top' position='top'>
						<div style={triggerStyle}>Top</div>
					</Tooltip>
					<Tooltip content='Tooltip attached to the bottom' position='bottom'>
						<div style={triggerStyle}>Bottom</div>
					</Tooltip>
					<Tooltip content='Tooltip attached to the left' position='left'>
						<div style={triggerStyle}>Left</div>
					</Tooltip>
					<Tooltip content='Tooltip attached to the right' position='right'>
						<div style={triggerStyle}>Right</div>
					</Tooltip>
				</div>
			</div>
			<div>
				<h3 style={{ marginTop: 0, marginBottom: '24px' }}>Pointer Position - Top</h3>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '24px',
						flexWrap: 'wrap',
					}}>
					<Tooltip content='Top Start Pointer' position='top' pointerPosition='start'>
						<div style={triggerStyle}>Top · Start</div>
					</Tooltip>
					<Tooltip content='Top Center Pointer' position='top' pointerPosition='center'>
						<div style={triggerStyle}>Top · Center</div>
					</Tooltip>
					<Tooltip content='Top End Pointer' position='top' pointerPosition='end'>
						<div style={triggerStyle}>Top · End</div>
					</Tooltip>
				</div>
			</div>

			<div>
				<h3 style={{ marginTop: 0, marginBottom: '24px' }}>Pointer Position - Bottom</h3>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '24px',
						flexWrap: 'wrap',
					}}>
					<Tooltip
						content='Bottom Start Pointer'
						position='bottom'
						pointerPosition='start'>
						<div style={triggerStyle}>Bottom · Start</div>
					</Tooltip>
					<Tooltip
						content='Bottom Center Pointer'
						position='bottom'
						pointerPosition='center'>
						<div style={triggerStyle}>Bottom · Center</div>
					</Tooltip>
					<Tooltip content='Bottom End Pointer' position='bottom' pointerPosition='end'>
						<div style={triggerStyle}>Bottom · End</div>
					</Tooltip>
				</div>
			</div>

			<div>
				<h3 style={{ marginTop: 0, marginBottom: '24px' }}>Interactive Tooltip</h3>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Tooltip
						content={
							<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
								<span style={{ fontSize: '13px', lineHeight: '1.4' }}>
									Confirm your destructive action.
								</span>
								<a
									href='#'
									style={{
										color: '#60A5FA',
										fontSize: '13px',
										textDecoration: 'none',
									}}>
									Learn more
								</a>
							</div>
						}
						position='right'
						interactive={true}>
						<div
							style={{
								padding: '8px 16px',
								background: '#ef4444',
								color: 'white',
								borderRadius: '4px',
								cursor: 'pointer',
								fontWeight: '500',
							}}>
							Delete Workspace
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	),
};
