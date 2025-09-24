/* eslint-disable no-restricted-syntax */
import type { ReactElement, ReactNode, Ref } from 'react';
import React, { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { useResize } from '../../../hooks';
import { classes } from '../../../utils';
import { HierarchyItem } from '../item';
import styles from './HierarchyBrowser.module.css';

interface Item {
	_id?: string;
	id?: string;
	title?: string;
	count?: number;
	list?: Item[] | boolean;
}

interface TitleProps {
	leftComponent?: React.ReactNode;
	title: string | React.ReactNode;
	rightComponent?: React.ReactNode;
	highlight?: boolean | undefined;
}

interface SetItemPropsResult {
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	title: string;
	count?: number | string;
	[key: string]: unknown;
	ref: Ref<HTMLDivElement> | undefined;
}

interface OnScrollPayload {
	name: string;
	pathString: string;
}

interface HierarchyBrowserProps {
	className?: string;
	metadata?: Item[];
	onItemClick?: (item: Item, pathString: string, open?: boolean) => void;
	onItemDoubleClick?: (item: Item, pathString: string, open?: boolean) => void;
	minWidth?: number;
	maxWidth?: number;
	borderSize?: number;
	resizable?: boolean;
	setItemProps?: (item: Item, pathString: string) => Record<string, unknown>;
	callbackOnScroll?: (payload: OnScrollPayload) => Promise<void> | void;

	/** Progressive mounting controls */
	progressiveRender?: boolean; // default true
	initialChunkSize?: number; // default 200
	subsequentChunkSize?: number; // default 200
	/** Keep search UX as-is; when true, large search results mount progressively */
	chunkSearchResults?: boolean; // default true
	defaultOpenLevel?: number; // default 0
}

const hasRIC = typeof globalThis.requestIdleCallback === 'function';
const scheduleIdle = (fn: () => void) => {
	if (hasRIC)
		globalThis.requestIdleCallback(fn, {
			timeout: 50,
		});
	else setTimeout(fn, 0);
};

const Title = ({ leftComponent, title, rightComponent, highlight }: TitleProps) => {
	return (
		<span className={styles.item}>
			{leftComponent && <span className={styles['item-icon']}>{leftComponent}</span>}
			<span className={classes(styles['item-title'], highlight && styles.highlight)}>
				{title}
			</span>
			{rightComponent !== undefined && Number(rightComponent) !== 0 && (
				<span className={styles['item-count']}>
					<span className={styles['count-bg']}>
						<span className={styles['count-text']}>{rightComponent}</span>
					</span>
				</span>
			)}
		</span>
	);
};

interface ItemNode {
	id?: string;
	title?: string;
	count?: number;
	list?: ItemNode[] | boolean;
}

/** Collect all paths (with array children) up to the given depth. Depth 1 = root level. */
function collectOpenPaths(meta: ItemNode[], maxDepth: number): { path: string; total: number }[] {
	const out: { path: string; total: number }[] = [];
	if (maxDepth <= 0) return out;

	const walk = (node: ItemNode, path: string, depth: number) => {
		if (depth >= maxDepth) return;
		if (Array.isArray(node.list)) {
			const total = node.list.length;
			out.push({
				path,
				total,
			});
			// continue to next level
			node.list.forEach((child, i) => {
				walk(child, `${path}.list[${i.toString()}]`, depth + 1);
			});
		}
	};

	meta.forEach((n, i) => {
		walk(n, `metadata[${i.toString()}]`, 0);
	});
	return out;
}

// put near other refs/utilities
const pathIsDescendant = (p: string, ancestor: string) => {
	return p === ancestor || p.startsWith(`${ancestor}.`);
};

const removePendingUnder = (prefix: string, pending: Set<string>) => {
	for (const p of Array.from(pending)) {
		if (pathIsDescendant(p, prefix)) pending.delete(p);
	}
};

const HierarchyBrowser = ({
	className = '',
	metadata = [],
	onItemClick,
	onItemDoubleClick,
	callbackOnScroll,
	minWidth = 220,
	maxWidth,
	borderSize,
	resizable,
	setItemProps = () => {
		return {};
	},

	progressiveRender = true,
	initialChunkSize = 200,
	subsequentChunkSize = 200,
	chunkSearchResults = true,
	defaultOpenLevel = 0,
}: HierarchyBrowserProps): ReactElement => {
	const browserRef = useRef<HTMLDivElement>(null);

	// --- your existing state (preserved) ---
	const [searchResults, setSearchResults] = useState<Record<string, string>>({});
	const [activePath, setActivePath] = useState<string | null>(null);
	const [lastOpenedPath, setLastOpenedPath] = useState<string | null>(null);
	const [searchingPath, setSearchingPath] = useState<string | null>(null);

	// --- new state for progressive mounting ---
	const [openPaths, setOpenPaths] = useState<Set<string>>(new Set());
	const [visibleCounts, setVisibleCounts] = useState<Map<string, number>>(new Map());
	const totalCountsRef = useRef<Map<string, number>>(new Map());
	const pendingPathsRef = useRef<Set<string>>(new Set());
	const scheduledRef = useRef(false);

	useResize({
		ref: browserRef as React.RefObject<HTMLElement>,
		styles: {
			minWidth,
			maxWidth: maxWidth ?? document.documentElement.getBoundingClientRect().width,
			borderSize: borderSize ?? 0,
		},
		enabled: resizable ?? true,
	});

	const didInitDefaultOpen = useRef(false);

	const kickScheduler = useCallback(() => {
		if (scheduledRef.current) return;
		scheduledRef.current = true;

		scheduleIdle(() => {
			scheduledRef.current = false;

			let changed = false;
			startTransition(() => {
				setVisibleCounts((prev) => {
					const next = new Map(prev);
					for (const path of Array.from(pendingPathsRef.current)) {
						if (!openPaths.has(path)) {
							pendingPathsRef.current.delete(path);
						}
						const total = totalCountsRef.current.get(path) ?? 0;
						const current = next.get(path) ?? Math.min(initialChunkSize, total);
						if (current < total) {
							next.set(path, Math.min(current + subsequentChunkSize, total));
							changed = true;
						} else {
							pendingPathsRef.current.delete(path);
						}
					}
					return changed ? next : prev;
				});
			});

			if (pendingPathsRef.current.size) kickScheduler();
		});
	}, [openPaths, initialChunkSize, subsequentChunkSize]);

	useEffect(() => {
		if (didInitDefaultOpen.current) return;
		if (defaultOpenLevel <= 0) return;
		if (metadata.length === 0) return;

		const targets = collectOpenPaths(metadata, defaultOpenLevel);
		if (!targets.length) return;

		setOpenPaths((prev) => {
			const next = new Set(prev);
			for (const { path } of targets) next.add(path);
			return next;
		});

		startTransition(() => {
			setVisibleCounts((prev) => {
				const next = new Map(prev);
				for (const { path, total } of targets) {
					totalCountsRef.current.set(path, total);
					if (!next.has(path))
						next.set(path, Math.min(initialChunkSize, total || initialChunkSize));
					pendingPathsRef.current.add(path);
				}
				return next;
			});
		});

		kickScheduler();
		didInitDefaultOpen.current = true; // <-- move here (after we actually initialized)
	}, [metadata, defaultOpenLevel, initialChunkSize, kickScheduler]);

	const getParentPath = (path: string): string | null => {
		const parts = path.split('.list[');
		if (parts.length <= 1) return null;
		parts.pop();
		return parts.join('.list[');
	};

	const trackOpenState = (pathString: string, open: boolean) => {
		setOpenPaths((prev) => {
			const next = new Set(prev);

			if (open) {
				next.add(pathString);
				setLastOpenedPath(pathString);

				startTransition(() => {
					setVisibleCounts((prevVC) => {
						const out = new Map(prevVC);
						const total = totalCountsRef.current.get(pathString) ?? 0;
						if (!out.has(pathString)) {
							out.set(
								pathString,
								Math.min(initialChunkSize, total || initialChunkSize)
							);
						}
						return out;
					});
				});

				pendingPathsRef.current.add(pathString);
				kickScheduler();
			} else {
				// ❗ Close ONLY this node; keep descendant open states intact so they "remember" expansion.
				next.delete(pathString);

				// Stop progressive appends for this subtree while hidden, but DO NOT erase saved slices.
				removePendingUnder(pathString, pendingPathsRef.current);

				// Keep visibleCounts and totalCounts as-is (cached), so re-open resumes where it left off.

				// Pick a sensible lastOpenedPath that is still visible (parent if open, else null).
				const parent = getParentPath(pathString);
				if (parent && next.has(parent)) setLastOpenedPath(parent);
				else setLastOpenedPath(null);

				// Preserve your search behavior (clear search for this path on close) — optional
				setSearchResults((previous) => {
					return Object.fromEntries(
						Object.entries(previous).filter(([k]) => {
							return k !== pathString;
						})
					);
				});
				if (searchingPath === pathString) setSearchingPath(null);
			}

			return next;
		});
	};

	// Keep search UX as-is
	const handleItemClick = (item: Item, pathString: string) => {
		return (open: boolean) => {
			onItemClick?.(item, pathString, open);
			setActivePath(pathString);
		};
	};
	const handleItemDoubleClick = (item: Item, pathString: string) => {
		return (open: boolean) => {
			onItemDoubleClick?.(item, pathString, open);
		};
	};
	const handleSearchSubmit = (text: string | undefined, pathString: string) => {
		setSearchResults((prev) => {
			return {
				...prev,
				[pathString]: (text ?? '').toLowerCase(),
			};
		});
		setSearchingPath(null);

		// Optional: reset visible slice for this path so new results start at initialChunkSize
		if (chunkSearchResults) {
			startTransition(() => {
				setVisibleCounts((prev) => {
					const out = new Map(prev);
					const total = totalCountsRef.current.get(pathString) ?? 0;
					out.set(pathString, Math.min(initialChunkSize, total || initialChunkSize));
					return out;
				});
			});
			pendingPathsRef.current.add(pathString);
			kickScheduler();
		}
	};
	const shouldDisplayItem = (item: Item, s: string) => {
		return !s ? true : (item.title?.toLowerCase().includes(s) ?? false);
	};

	// If filtering reduces totals, clamp visibleCounts
	useEffect(() => {
		startTransition(() => {
			setVisibleCounts((prev) => {
				let changed = false;
				const out = new Map(prev);
				for (const [path, count] of out) {
					const total = totalCountsRef.current.get(path);
					if (typeof total === 'number' && count > total) {
						out.set(path, total);
						changed = true;
					}
				}
				return changed ? out : prev;
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchResults]);

	const renderTree = (data: Item, pathString = '', isLast = false): ReactNode => {
		const allChildren = Array.isArray(data.list) ? data.list : [];
		const currentPath = pathString || 'metadata';
		const searchText = searchResults[currentPath] ?? '';

		const filteredChildren = searchText
			? allChildren.filter((ch) => {
					return shouldDisplayItem(ch, searchText);
				})
			: allChildren;

		const { leftComponent, rightComponent, title, count, ref } = setItemProps(
			data,
			currentPath
		) as SetItemPropsResult;

		const isOpenHere = openPaths.has(currentPath);
		if (isOpenHere) {
			// record totals (after filtering) for scheduler targets
			totalCountsRef.current.set(currentPath, filteredChildren.length);
			if (progressiveRender && !visibleCounts.has(currentPath)) {
				pendingPathsRef.current.add(currentPath);
			}
		}

		let childrenToRender: Item[] = [];
		if (isOpenHere) {
			if (!progressiveRender) {
				childrenToRender = filteredChildren;
			} else {
				const shouldChunk = chunkSearchResults || !searchText;
				if (!shouldChunk) {
					childrenToRender = filteredChildren;
				} else {
					const visible =
						visibleCounts.get(currentPath) ??
						Math.min(initialChunkSize, filteredChildren.length);
					childrenToRender = filteredChildren.slice(0, visible);
					if (visible < filteredChildren.length) pendingPathsRef.current.add(currentPath);
				}
			}
		}

		return (
			<HierarchyItem
				key={currentPath}
				callbackOnScroll={callbackOnScroll}
				ref={ref}
				pathString={currentPath}
				title={
					searchText ? (
						<Title title={searchText} highlight />
					) : (
						<Title
							leftComponent={leftComponent}
							title={title}
							rightComponent={rightComponent}
						/>
					)
				}
				iconPlacement={allChildren.length ? 'left' : 'none'}
				onClick={(open) => {
					handleItemClick(data, currentPath)(open);
					trackOpenState(currentPath, open);
				}}
				onDoubleClick={(open) => {
					handleItemDoubleClick(data, currentPath)(open);
					trackOpenState(currentPath, open);
				}}
				controlledOpen={isOpenHere}
				active={activePath === currentPath}
				lastActive={lastOpenedPath === currentPath}
				isLastItem={isLast}
				count={count ?? 0}
				name={title}
				list={data.list ?? false}
				leftComponent={leftComponent}
				isSearching={searchingPath === currentPath}
				onSearchStart={() => {
					setSearchingPath(currentPath);
				}}
				searchedText={searchText}
				onSearchSubmit={(text) => {
					handleSearchSubmit(text, currentPath);
				}}>
				{childrenToRender.map((child, idx) => {
					const isLastChild = idx === childrenToRender.length - 1;
					const nextPath = `${currentPath}.list[${String(idx)}]`;
					return renderTree(child, nextPath, isLastChild);
				})}
			</HierarchyItem>
		);
	};

	useEffect(() => {
		if (pendingPathsRef.current.size) kickScheduler();
	}, [openPaths, searchResults, kickScheduler]);

	return (
		<div
			ref={browserRef}
			className={classes(styles.root, resizable ? styles.resizable : '', className)}>
			<div className={styles.body} data-elem='body'>
				{metadata.map((item, index) => {
					const isLastItem = index === metadata.length - 1;
					return renderTree(item, `metadata[${String(index)}]`, isLastItem);
				})}
			</div>
		</div>
	);
};

export default HierarchyBrowser;
