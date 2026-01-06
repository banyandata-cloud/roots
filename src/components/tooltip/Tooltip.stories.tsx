import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Tooltip',
	component: Tooltip,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

/* ------------------------------------------------------------------ */
/* Shared Wrapper */
/* ------------------------------------------------------------------ */

const CenteredBox = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			marginTop: 150,
		}}>
		{children}
	</div>
);

const TooltipChild = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => (
	<div
		ref={ref}
		style={{
			width: '70%',
			backgroundColor: 'rgba(36, 161, 72, 0.08)',
			color: '#24a148',
			textAlign: 'center',
			marginTop: -20,
		}}>
		Children, Here child is Div, it can be anything
	</div>
);

/* ------------------------------------------------------------------ */
/* Stories */
/* ------------------------------------------------------------------ */

export const TooltipLeft: Story = {
	name: 'Tooltip Left',
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		return (
			<CenteredBox>
				<Tooltip content='Tooltip Info' position='left' showPointer={false}>
					<TooltipChild ref={ref} />
				</Tooltip>
			</CenteredBox>
		);
	},
};

export const TooltipRight: Story = {
	name: 'Tooltip Right',
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		return (
			<CenteredBox>
				<Tooltip content='Tooltip Info' position='right'>
					<TooltipChild ref={ref} />
				</Tooltip>
			</CenteredBox>
		);
	},
};

export const TooltipTop: Story = {
	name: 'Tooltip Top',
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		return (
			<CenteredBox>
				<Tooltip content='Tooltip Info' position='top'>
					<TooltipChild ref={ref} />
				</Tooltip>
			</CenteredBox>
		);
	},
};

export const TooltipBottom: Story = {
	name: 'Tooltip Bottom',
	render: () => {
		const ref = useRef<HTMLDivElement>(null);

		return (
			<CenteredBox>
				<Tooltip content='Tooltip Info' position='bottom'>
					<TooltipChild ref={ref} />
				</Tooltip>
			</CenteredBox>
		);
	},
};
