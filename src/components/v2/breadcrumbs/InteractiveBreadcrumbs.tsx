import React, { useCallback, useMemo, useState } from 'react';
import ThemedContainer from '../../helpers/themedContainer/ThemedContainer';
import Button from '../../v2/buttons/button/Button';
import Breadcrumbs from './Breadcrumbs';
import type { BreadcrumbItem, BreadcrumbType } from './types';

interface NavigationNode {
	id: string;
	label: string;
	children?: NavigationNode[];
}

interface Props {
	type?: BreadcrumbType;
}

const NAVIGATION_TREE: NavigationNode[] = [
	{
		id: 'home',
		label: 'Home',
		children: [
			{
				id: 'projects',
				label: 'Projects',
				children: [
					{ id: 'frontend', label: 'Frontend' },
					{ id: 'backend', label: 'Backend' },
					{ id: 'design', label: 'Design' },
				],
			},
			{
				id: 'settings',
				label: 'Settings',
				children: [
					{ id: 'profile', label: 'Profile' },
					{ id: 'security', label: 'Security' },
				],
			},
			{
				id: 'reports',
				label: 'Reports',
				children: [
					{ id: 'q1', label: 'Q1 Report' },
					{ id: 'q2', label: 'Q2 Report' },
				],
			},
		],
	},
];

const findNode = (nodes: NavigationNode[], id: string): NavigationNode | undefined => {
	for (const node of nodes) {
		if (node.id === id) return node;
		if (node.children) {
			const found = findNode(node.children, id);
			if (found) return found;
		}
	}
	return undefined;
};

const InteractiveBreadcrumbs: React.FC<Props> = ({ type = 'text' }) => {
	const [path, setPath] = useState<string[]>(['home']);

	const handleChildSelect = useCallback(
		(childId: string, parentIndex: number) => {
			const nextPath = [...path.slice(0, parentIndex + 1), childId];
			setPath(nextPath);
		},
		[path]
	);

	const crumbs: BreadcrumbItem[] = useMemo(() => {
		return path.map((nodeId, index) => {
			const node = findNode(NAVIGATION_TREE, nodeId)!;
			const isLast = index === path.length - 1;

			return {
				id: node.id,
				label: node.label,

				onClick: !isLast ? () => setPath(path.slice(0, index + 1)) : undefined,

				dropdownOptions: !isLast
					? node.children?.map((child) => ({
							label: child.label,
							value: child.id,
							onClick: () => handleChildSelect(child.id, index),
						}))
					: undefined,
			};
		});
	}, [path, handleChildSelect]);

	const handleNext = useCallback(() => {
		const lastId = path[path.length - 1];
		if (!lastId) return;

		const lastNode = findNode(NAVIGATION_TREE, lastId);
		if (!lastNode?.children?.length) return;

		const nextChild = lastNode.children[0];
		if (!nextChild) return;

		setPath([...path, nextChild.id]);
	}, [path]);

	const handlePrevious = useCallback(() => {
		if (path.length === 1) return;
		setPath(path.slice(0, -1));
	}, [path]);

	return (
		<ThemedContainer theme='light'>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
				<Breadcrumbs
					crumbs={crumbs}
					type={type}
					separator='chevron'
					activeIndex={path.length - 1}
				/>

				<div style={{ display: 'flex', gap: '12px' }}>
					<Button
						title='Previous'
						variant='secondary'
						size='sm'
						disabled={path.length === 1}
						onClick={handlePrevious}
						type='button'
					/>
					<Button
						title='Next'
						variant='primary'
						size='sm'
						disabled={
							!findNode(NAVIGATION_TREE, path[path.length - 1] ?? '')?.children
								?.length
						}
						onClick={handleNext}
						type='button'
					/>
				</div>
			</div>
		</ThemedContainer>
	);
};

export default InteractiveBreadcrumbs;
