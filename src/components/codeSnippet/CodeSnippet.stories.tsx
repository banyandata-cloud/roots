import type { Meta, StoryObj } from '@storybook/react';
import CodeSnippet from './CodeSnippet';

const meta: Meta<typeof CodeSnippet> = {
	title: 'Components/CodeSnippet',
	component: CodeSnippet,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof CodeSnippet>;

/* ----------------------------------------
 * Default
 * ------------------------------------- */

export const Default: Story = {
	args: {
		code: JSON.stringify(
			{
				LastOwnershipUpdateTime: '2025-01-29T12:49:43.7212746+00:00',
				creationData: {
					createOption: 'Empty',
				},
				dataAccessAuthMode: 'None',
				diskIOPSReadWrite: 120,
				diskMBpsReadWrite: 25,
				diskSizeBytes: 4294967296,
				diskSizeGB: 4,
				diskState: 'Reserved',
				encryption: {
					type: 'EncryptionAtRestWithPlatformKey',
				},
				id: '/subscriptions/16e34237-c919-4baa-898a-1b7f1d54e525/resourceGroups/networklogs/providers/Microsoft.Compute/disks/diskattachtest',
				location: 'eastus',
				managedBy:
					'/subscriptions/16e34237-c919-4baa-898a-1b7f1d54e525/resourceGroups/networklogs/providers/Microsoft.Compute/virtualMachines/vm01test',
				name: 'diskattachtest',
				networkAccessPolicy: 'AllowAll',
				provisioningState: 'Succeeded',
				publicNetworkAccess: 'Enabled',
				resourceGroup: 'networklogs',
				sku: {
					name: 'Premium_LRS',
					tier: 'Premium',
				},
				tags: {},
				tier: 'P1',
				timeCreated: '2025-01-28T05:42:17.859145+00:00',
				type: 'Microsoft.Compute/disks',
				uniqueId: '9e75f94d-01f9-48dd-8135-5421852ee3a1',
				zones: ['1'],
			},
			null,
			4
		),
		language: 'json',
		copy: true,
		theme: 'light',
		showLineNumbers: true,
		onClick: (_event, getCode) => {
			console.log(getCode());
		},
	},
};
