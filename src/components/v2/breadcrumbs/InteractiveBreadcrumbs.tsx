import React, { useCallback, useMemo, useState } from 'react';
import { ThemedContainer } from '../../helpers';
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

	// FIX: Removed `path` from the dependency array. The updater form `prevPath => ...`
	// already gives us the latest path, so including `path` caused stale closures
	// and needless re-creation of this callback on every path change.
	const handleChildSelect = useCallback((childId: string, parentIndex: number) => {
		setPath((prevPath) => [...prevPath.slice(0, parentIndex + 1), childId]);
	}, []);

	const crumbs: BreadcrumbItem[] = useMemo(() => {
		return path
			.map((nodeId, index) => {
				const node = findNode(NAVIGATION_TREE, nodeId);

				// Guard against a node not being found (e.g. stale path after tree changes)
				if (!node) return null;

				const isLast = index === path.length - 1;

				return {
					id: node.id,
					label: node.label,
					// Non-last crumbs navigate back to that point in the path on click
					onClick: !isLast ? () => setPath(path.slice(0, index + 1)) : undefined,
					// FIX: Show dropdown on ALL crumbs that have children — including the
					// last crumb. The last crumb omits onClick (no self-navigation) but
					// should still expose its children for forward navigation via dropdown.
					dropdownOptions: node.children?.map((child) => ({
						label: child.label,
						value: child.id,
						onClick: () => handleChildSelect(child.id, index),
					})),
				};
			})
			.filter((crumb): crumb is BreadcrumbItem => crumb !== null);
	}, [path, handleChildSelect]);

	const handleNext = useCallback(() => {
		const lastId = path[path.length - 1];
		if (!lastId) return;

		const lastNode = findNode(NAVIGATION_TREE, lastId);
		if (!lastNode?.children?.length) return;

		const nextChild = lastNode.children[0];
		if (!nextChild) return;

		setPath((prev) => [...prev, nextChild.id]);
	}, [path]);

	const handlePrevious = useCallback(() => {
		if (path.length === 1) return;
		setPath((prev) => prev.slice(0, -1));
	}, [path]);

	const lastId = path[path.length - 1];
	const lastNode = lastId ? findNode(NAVIGATION_TREE, lastId) : undefined;

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
						disabled={!lastNode?.children?.length}
						onClick={handleNext}
						type='button'
					/>
				</div>
			</div>
		</ThemedContainer>
	);
};

export default InteractiveBreadcrumbs;
