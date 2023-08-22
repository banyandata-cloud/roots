import React, { useEffect, useState } from 'react';
import { Button } from '../../buttons';
import { ThemedContainer } from '../../helpers';
import { ServerIcon, CopyIcon, ArrowIcon } from '../../icons';
import { usePagination } from '../../pagination';
import { Popover } from '../../popover';
import { Tooltip } from '../../tooltip';
import { TableColumn } from '../BaseTable.class';
import { TableCell } from '../cell';
import Table from './Table';
import { TableChip } from './tableChips';

export default {
	title: 'Components/Table/Table',
	component: Table,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

const Template = (args) => {
	const [paginationState, paginationDispatch] = usePagination({
		totalPages: 20,
		currentPage: 1,
	});

	return (
		<ThemedContainer
			style={{
				height: '100%',
			}}>
			<Table
				{...args}
				paginationData={{
					paginationState,
					paginationDispatch,
				}}
			/>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {
	onIntersection: (state) => {
		if (state) {
			console.log('Make API call for next Page APIS');
		}
	},
	isFloating: true,
	onRowClick: (datum, setActiveId) => {
		console.log(datum, setActiveId);
		setActiveId();
	},
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'sm',
			// flexible: true,
			sticky: 'left',
		}),
		new TableColumn({
			title: 'Description',
			id: 'description',
			size: 'lg',
			flexible: true,
			multiLine: true,
		}),
		new TableColumn({
			title: 'Gender',
			id: 'gender',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Age',
			id: 'age',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Designation',
			id: 'designation',
		}),
		new TableColumn({
			title: 'A Column',
			id: 'aColumn',
			size: 'lg',
			flexible: true,
		}),
		new TableColumn({
			title: 'Another Column',
			id: 'anotherColumn',
			size: 'lg',
		}),
		new TableColumn({
			title: 'Another One',
			id: 'anotherOne',
			size: 'lg',
		}),
		new TableColumn({
			title: 'And Another One',
			id: 'andAnotherOne',
			size: 'lg',
		}),
		new TableColumn({
			title: 'State',
			id: 'state',
			size: 'sm',
			sticky: 'right',
		}),
	],
	tableData: [
		{
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',
			age: 23,
			designation: 'UI Engineer',
			aColumn:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			anotherColumn:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			anotherOne:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			andAnotherOne:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			state: 'Delhi',
		},
		...[...Array(20).keys()].fill({
			name: 'Pradeep Annadurai',
			gender: 'M',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nulla voluptatum consectetur libero, fuga amet earum ducimus quidem aliquam fugit id ipsum, cupiditate dignissimos facilis, repellendus possimus aspernatur tempore! Veniam saepe dolor reprehenderit sunt tenetur quam adipisci quis deleniti, maxime officiis dolorum, iure quia excepturi velit repellendus ad eius iste.',

			age: 24,
			designation: 'UI Engineer',
			aColumn:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			anotherColumn:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			anotherOne:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			andAnotherOne:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab dicta voluptatum pariatur architecto! Necessitatibus ut reiciendis cumque cum adipisci nesciunt unde veritatis rem consequuntur!',
			state: 'Tamil Nadu',
		}),
	],
};

Default.parameters = {};

export const WithChips = Template.bind({});

WithChips.args = {
	...Default.args,
	chipsData: {
		showBack: true,
		chips: [
			new TableChip({
				key: 'something',
				icon: ArrowIcon,
				label: 'DB Tech',
				value: 'PgSQL',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: ArrowIcon,
				label: 'DB Tech',
				value: 'MySQL',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: (iconProps) => {
					return <CopyIcon {...iconProps} />;
				},
				label: 'Cloud',
				value: 'Google',
				disabled: true,
			}),
			new TableChip({
				key: 'something',
				icon: (iconProps) => {
					return <ServerIcon {...iconProps} />;
				},
				label: 'Cloud',
				value: 'Amazon',
				disabled: true,
			}),
		],
	},
};

export const WithFilters = Template.bind({});

WithFilters.args = {
	...Default.args,
	// disabledFilterOptions: {
	// filterButton: true,
	// settings: true,
	// columnFilter: true,
	// refresh: true,
	// },
	filtersData: {
		filterValue: {
			applied: 4,
		},
	},
};

export const WithChipsAndFilters = Template.bind({});

WithChipsAndFilters.args = {
	...WithChips.args,
	...WithFilters.args,
};

const API_RESPONSE = {
	data: [
		{
			uuid: 1,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: null,
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '1edadbf46b547bc677b1006d963e1776',
			k8sClusterRolebindingDetailsId: 'eef2a948-523c-41e1-b426-ca2fb39330bb',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'kubectl.kubernetes.io/last-applied-configuration':
							'{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBinding","metadata":{"annotations":{},"name":"kubernetes-dashboard"},"roleRef":{"apiGroup":"rbac.authorization.k8s.io","kind":"ClusterRole","name":"kubernetes-dashboard"},"subjects":[{"kind":"ServiceAccount","name":"kubernetes-dashboard","namespace":"kubernetes-dashboard"}]}\n',
					},
					creationTimestamp: '2022-08-17T12:03:37Z',
					name: 'kubernetes-dashboard',
					resourceVersion: '5372993',
					uid: 'c4af5ddc-828a-4ebf-93c8-b25242651ff4',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'kubernetes-dashboard',
				},
				subjects: [
					{
						kind: 'ServiceAccount',
						name: 'kubernetes-dashboard',
						namespace: 'kubernetes-dashboard',
					},
				],
			},
			k8sClusterRolebindingName: 'kubernetes-dashboard',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 2,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: false,
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '37aa1cb53653648c3df558e473b7cb5e',
			k8sClusterRolebindingDetailsId: '6ec07323-223f-4f8a-a0bf-4716aab7a0bd',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'components.gke.io/layer': 'addon',
					},
					creationTimestamp: '2022-08-08T12:17:10Z',
					labels: {
						'addonmanager.kubernetes.io/mode': 'Reconcile',
					},
					name: 'uas-hpa-external-metrics-reader',
					resourceVersion: '17342076',
					uid: '04d96fe9-c9fd-41a9-a451-1319c1ee76d3',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'external-metrics-reader',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'User',
						name: 'system:vpa-recommender',
						namespace: 'kube-system',
					},
				],
			},
			k8sClusterRolebindingName: 'uas-hpa-external-metrics-reader',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 3,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: true,
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: 'f3817cbae8f112b2de33ae87ee71d4ba',
			k8sClusterRolebindingDetailsId: 'f23cb175-f2c7-4984-b924-0997fbfa3e5b',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:volume-scheduler',
					resourceVersion: '154',
					uid: '3a92c8d4-8b66-4cc3-a9c4-d4011cae7238',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:volume-scheduler',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'User',
						name: 'system:kube-scheduler',
					},
				],
			},
			k8sClusterRolebindingName: 'system:volume-scheduler',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 4,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: 'dae4f83a27f75885ca1f02396af99afe',
			k8sClusterRolebindingDetailsId: '193017d6-3872-4385-a039-f74c7ee73007',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'components.gke.io/component-name': 'slo-monitor-rbac',
						'components.gke.io/component-version': '1.0.1',
					},
					creationTimestamp: '2022-08-08T12:17:03Z',
					labels: {
						'addonmanager.kubernetes.io/mode': 'Reconcile',
					},
					name: 'system:slo-monitor',
					resourceVersion: '17342003',
					uid: 'c45cf941-c371-4442-88a9-f18a908a3b68',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:slo-monitor',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'User',
						name: 'system:slo-monitor',
					},
				],
			},
			k8sClusterRolebindingName: 'system:slo-monitor',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 5,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '053750aec2004ca207c4eb3d6e5e4452',
			k8sClusterRolebindingDetailsId: 'a29cffec-f82b-4552-b53e-a854fba8825a',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:service-account-issuer-discovery',
					resourceVersion: '156',
					uid: 'd9e39fd9-db14-4352-83bc-d6f7edfdf504',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:service-account-issuer-discovery',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'Group',
						name: 'system:serviceaccounts',
					},
				],
			},
			k8sClusterRolebindingName: 'system:service-account-issuer-discovery',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 6,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: 'aa3753c75e8f76c68b2d1b3b8281faa8',
			k8sClusterRolebindingDetailsId: '272cf93a-1683-45d8-8318-c07f2c8c4c60',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'components.gke.io/component-version': 'resource-tracker-rbac-1.0.3',
					},
					creationTimestamp: '2022-08-08T12:17:01Z',
					labels: {
						'addonmanager.kubernetes.io/mode': 'Reconcile',
					},
					name: 'system:resource-tracker',
					resourceVersion: '17341992',
					uid: 'de69823c-d0cd-4e85-bf60-ae70bed8140c',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:resource-tracker',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'User',
						name: 'system:resource-tracker',
					},
				],
			},
			k8sClusterRolebindingName: 'system:resource-tracker',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 7,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: 'dcab6ec6960020012c4f71d19881a125',
			k8sClusterRolebindingDetailsId: '3d268a64-6ea9-4e2b-a7c9-f0cc30977173',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:public-info-viewer',
					resourceVersion: '149',
					uid: '322d1b1d-009c-46b5-be9e-a76115c74797',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:public-info-viewer',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'Group',
						name: 'system:authenticated',
					},
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'Group',
						name: 'system:unauthenticated',
					},
				],
			},
			k8sClusterRolebindingName: 'system:public-info-viewer',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 8,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '69a2d96bdd42c2b74febcccadebbbe92',
			k8sClusterRolebindingDetailsId: 'cd32b06d-cad9-4f85-a568-8bbe2e686c57',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:node-proxier',
					resourceVersion: '150',
					uid: '5753a8aa-4763-4957-a7ee-33769d0ccdf1',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:node-proxier',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'User',
						name: 'system:kube-proxy',
					},
				],
			},
			k8sClusterRolebindingName: 'system:node-proxier',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 9,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '9c0c78a82362360da1b58ea4a4be458c',
			k8sClusterRolebindingDetailsId: '8a8374f2-81a8-430e-a698-5f82b3accce0',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:node',
					resourceVersion: '155',
					uid: 'ac008b50-63cd-4d47-95e3-d81fe2e9e261',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:node',
				},
			},
			k8sClusterRolebindingName: 'system:node',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
		{
			uuid: 10,
			cloudAccountId: 'kubernetes-358811',
			cloudOrganizationId: 'null',
			ecsCustomerId: 'b16a72a2-4fb3-4ec1-978c-3fabc8a9b20f',
			ecsCustomerName: 'Titan',
			encsTags: 'null',
			environmentMetadata: 'null',
			k8sClusterDetailsId: '0b0a1bf9-2d77-4997-a263-178cde79c8eb',
			k8sClusterRolebindingChecksum: '9a28b7e399d50367e69fea8b81d65a3f',
			k8sClusterRolebindingDetailsId: 'fb3f7ea3-09e7-449d-b5bc-df464c41058b',
			k8sClusterRolebindingMetadata: {
				apiVersion: 'rbac.authorization.k8s.io/v1',
				kind: 'ClusterRoleBinding',
				metadata: {
					annotations: {
						'rbac.authorization.kubernetes.io/autoupdate': 'true',
					},
					creationTimestamp: '2022-08-08T12:15:36Z',
					labels: {
						'kubernetes.io/bootstrapping': 'rbac-defaults',
					},
					name: 'system:monitoring',
					resourceVersion: '146',
					uid: '5c90727e-2e3a-4014-a705-f080ed1fa82e',
				},
				roleRef: {
					apiGroup: 'rbac.authorization.k8s.io',
					kind: 'ClusterRole',
					name: 'system:monitoring',
				},
				subjects: [
					{
						apiGroup: 'rbac.authorization.k8s.io',
						kind: 'Group',
						name: 'system:monitoring',
					},
				],
			},
			k8sClusterRolebindingName: 'system:monitoring',
			k8sTenantDetailsId: 'fb191101-5f8f-4bd3-8779-aa1cea4fa3cf',
		},
	],
	header: [
		{
			flexible: 'false',
			id: 'k8sClusterRolebindingDetailsId',
			size: 'md',
			sort: 'asc',
			title: 'uuid',
		},
		{
			flexible: 'false',
			id: 'k8sTenantDetailsId',
			size: 'md',
			sort: 'desc',
			title: 'Tenant Details Id',
		},
		{
			flexible: 'false',
			id: 'ecsCustomerId',
			size: 'md',
			sort: 'default',
			title: 'Customer Id',
		},
		{
			flexible: 'false',
			id: 'ecsCustomerName',
			size: 'md',
			sort: null,
			title: 'Customer Name',
		},
		{
			flexible: 'false',
			id: 'cloudOrganizationId',
			size: 'md',
			sort: 'default',
			title: 'Organization Id',
		},
		{
			flexible: true,
			id: 'cloudAccountId',
			size: 'md',
			sort: 'default',
			title: 'Account Id',
		},
		{
			flexible: 'default',
			id: 'k8sClusterDetailsId',
			size: 'md',
			sort: 'false',
			title: 'Details Id',
		},
		{
			flexible: 'false',
			id: 'k8sClusterRolebindingName',
			size: 'md',
			sort: 'false',
			title: 'Rolebinding Name',
		},
		{
			flexible: 'false',
			id: 'k8sClusterRolebindingMetadata',
			size: 'md',
			sort: 'false',
			title: 'Cluster Metadata',
		},
		{
			flexible: 'false',
			id: 'k8sClusterRolebindingChecksum',
			size: 'md',
			sort: 'false',
			title: 'Cluster Checksum',
		},
		{
			flexible: 'false',
			id: 'environmentMetadata',
			size: 'md',
			sort: 'false',
			title: 'environment Metadata',
		},
		{
			flexible: 'false',
			id: 'encsTags',
			size: 'md',
			sort: 'false',
			title: 'encs Tags',
		},
	],
	message: 'Resources fetched successfully',
	total_pages: 33,
	total_data: 325,
};

export const WithCustomCells = Template.bind({});

WithCustomCells.args = {
	...WithChipsAndFilters.args,
	headerData: [
		{
			title: 'S No.',
			id: 'serial',
			size: 'sm',
			sticky: 'left',
		},
		...API_RESPONSE.header.filter((header) => {
			return header.title !== 'uuid';
		}),
	],
	uniqueKey: 'uuid',
	tableData: API_RESPONSE.data,
	customCells: {
		body: () => {
			return {
				serial: ({ _index, ...rest }) => {
					return <TableCell {...rest} cellContent={_index + 1} />;
				},
				k8sClusterRolebindingMetadata: ({ cellContent, ...rest }) => {
					return (
						<TableCell
							{...rest}
							multiLine
							cellContent={JSON.stringify(cellContent, 4)}
						/>
					);
				},
				ecsCustomerId: ({ cellContent, setActiveId, ...rest }) => {
					const [anchorEl, setAnchorEl] = useState(null);
					const [open, setOpen] = useState(false);

					useEffect(() => {
						setActiveId(!open);
					}, [open]);

					return (
						<>
							<TableCell
								{...rest}
								ref={(el) => {
									setAnchorEl(el);
								}}
								cellContent={
									<Button
										onClick={() => {
											setOpen((prev) => {
												return !prev;
											});
										}}
										title='Click Me'
									/>
								}
							/>
							<Popover anchorEl={anchorEl} open={open} setOpen={setOpen}>
								<div
									style={{
										backgroundColor: 'rgba(36, 161, 72, 0.08)',
										color: '#24a148',
									}}>
									{cellContent}
								</div>
							</Popover>
						</>
					);
				},
				ecsCustomerName: ({ cellContent, setActiveId, ...rest }) => {
					return (
						<TableCell
							{...rest}
							multiLine
							cellContent={
								<Button
									onClick={() => {
										setActiveId();
									}}
									title='Select'
								/>
							}
						/>
					);
				},
				cloudOrganizationId: ({ cellContent, setActiveId, ...rest }) => {
					return (
						<TableCell
							{...rest}
							multiLine
							cellContent={
								<Button
									onClick={() => {
										setActiveId(false, true);
									}}
									title='Multi'
								/>
							}
						/>
					);
				},
				cloudAccountId: ({ cellContent, ...rest }) => {
					return (
						<TableCell
							{...rest}
							// className={styles.root}
							style={{
								borderBottom: '1px dotted',
							}}
							cellTitle={null}
							cellContent={
								<Tooltip content={cellContent} variant='dark'>
									<span>{cellContent}</span>
								</Tooltip>
							}
						/>
					);
				},
			};
		},
	},
};

export const WithDefaultActive = Template.bind({});

WithDefaultActive.args = {
	...Default.args,
	defaultActiveIndex: 0,
};

const LoaderTemplate = (args) => {
	const [tableData, setTableData] = useState({});

	const [paginationState, paginationDispatch] = usePagination({
		currentPage: 1,
		totalPages: tableData.total_pages,
		totalData: tableData.total_data,
	});

	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(4);

	const fetchAPI = () => {
		setLoading(true);
		return new Promise((resolve) => {
			setTimeout(() => {
				setTableData(API_RESPONSE);
				setLoading(false);
				resolve();
			}, 1000);
		});
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<div
			style={{
				background: '#777777',
				padding: '1rem',
				display: 'flex',
				height: '100%',
			}}>
			<Table
				{...args}
				defaultActiveIndex={activeIndex}
				loading={loading}
				headerData={tableData?.header}
				tableData={tableData?.data}
				onRowClick={({ _index }) => {
					fetchAPI();
					setActiveIndex(_index);
				}}
				paginationData={{
					paginationState,
					paginationDispatch,
					onChange: () => {
						fetchAPI();
					},
				}}
			/>
		</div>
	);
};

export const WithLoader = LoaderTemplate.bind({});

WithLoader.args = {
	...WithCustomCells.args,
};
