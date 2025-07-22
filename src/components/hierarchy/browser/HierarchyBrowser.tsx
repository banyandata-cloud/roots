import React, { useRef, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { useResize } from '../../../hooks';
import { classes } from '../../../utils';
import { HierarchyItem } from '../item';
import styles from './HierarchyBrowser.module.css';

interface Item {
	id?: string;
	title?: string;
	count?: number;
	list?: Item[] | boolean;
}

interface TitleProps {
	leftComponent?: React.ReactNode;
	title: string | React.ReactNode;
	rightComponent?: React.ReactNode;
}

interface SetItemPropsResult {
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	title: string;
	count?: number | string;
	[key: string]: unknown;
}

const Title = ({ leftComponent, title, rightComponent }: TitleProps) => {
	return (
		<span className={styles.item}>
			{leftComponent && <span className={styles['item-icon']}>{leftComponent}</span>}
			<span className={styles['item-title']}>{title}</span>
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
}

const HierarchyBrowser = ({
	className = '',
	metadata = [],
	onItemClick = () => {
		//  left blank
	},
	onItemDoubleClick = () => {
		//  left blank
	},
	minWidth = 220,
	maxWidth,
	borderSize,
	resizable,
	setItemProps = () => {
		return {};
	},
}: HierarchyBrowserProps): ReactElement => {
	const browserRef = useRef<HTMLDivElement>(null);
	const [searchResults, setSearchResults] = useState<Record<string, string>>({});

	useResize({
		ref: browserRef as React.RefObject<HTMLElement>,
		styles: {
			minWidth,
			maxWidth: maxWidth ?? document.documentElement.getBoundingClientRect().width,
			borderSize: borderSize ?? 0,
		},
		enabled: resizable ?? true,
	});

	const [lastOpenedPath, setLastOpenedPath] = useState<string | null>(null);
	const [, setOpenPaths] = useState<Set<string>>(new Set());
	const [searchingPath, setSearchingPath] = useState<string | null>(null);

	const getParentPath = (path: string): string | null => {
		const parts = path.split('.list[');
		if (parts.length <= 1) return null;
		parts.pop();
		return parts.join('.list[');
	};

	const trackOpenState = (item: Item, pathString: string, open: boolean) => {
		setOpenPaths((prevPaths) => {
			const newPaths = new Set(prevPaths);

			if (open) {
				newPaths.add(pathString);
				setLastOpenedPath(pathString);
			} else {
				Array.from(newPaths).forEach((p) => {
					if (p === pathString || p.startsWith(`${pathString}.`)) {
						newPaths.delete(p);
					}
				});

				if (lastOpenedPath === pathString || lastOpenedPath?.startsWith(`${pathString}.`)) {
					const parent = getParentPath(pathString);
					if (parent && newPaths.has(parent)) {
						setLastOpenedPath(parent);
					} else {
						const sorted = Array.from(newPaths).sort((a, b) => {
							return b.length - a.length;
						});
						const fallback = sorted[0];
						if (fallback) {
							setLastOpenedPath(fallback);
						} else {
							setLastOpenedPath(null);
						}
					}
				}
			}

			return newPaths;
		});
	};

	const handleItemClick = (item: Item, pathString: string) => {
		return (open: boolean): void => {
			onItemClick(item, pathString, open);
			if (!open) {
				setSearchResults((prev) => {
					return Object.fromEntries(
						Object.entries(prev).filter(([key]) => {
							return key !== pathString;
						})
					);
				});
			}
		};
	};

	const handleItemDoubleClick = (item: Item, pathString: string) => {
		return (open: boolean): void => {
			onItemDoubleClick(item, pathString, open);
		};
	};

	const handleSearchSubmit = (searchText: string | undefined, pathString: string) => {
		setSearchResults((prev) => {
			return {
				...prev,
				[pathString]: (searchText ?? '').toLowerCase(),
			};
		});
	};

	const shouldDisplayItem = (item: Item, searchText: string): boolean => {
		if (!searchText) return true;
		return item.title?.toLowerCase().includes(searchText) ?? false;
	};

	const renderTree = (
		data: Item,
		pathString = '',
		isFirstChild: boolean,
		isLast = false
	): ReactNode => {
		const children = Array.isArray(data.list) ? data.list : [];
		const currentPath = pathString || 'metadata';
		const searchText = searchResults[currentPath] ?? '';
		const filteredChildren = searchText
			? children.filter((child) => {
					return shouldDisplayItem(child, searchText);
				})
			: children;

		const { leftComponent, rightComponent, title, count } = setItemProps(
			data,
			currentPath
		) as SetItemPropsResult;

		return (
			<HierarchyItem
				// key={currentPath}
				pathString={currentPath}
				title={
					<Title
						leftComponent={leftComponent}
						title={title}
						rightComponent={rightComponent}
					/>
				}
				iconPlacement={children.length ? 'left' : 'none'}
				onClick={(open) => {
					handleItemClick(data, currentPath)(open);
					trackOpenState(data, currentPath, open);
				}}
				onDoubleClick={(open) => {
					handleItemDoubleClick(data, currentPath)(open);
					trackOpenState(data, currentPath, open);
				}}
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
				onSearchSubmit={(text) => {
					handleSearchSubmit(text, currentPath);
					setSearchingPath(null);
				}}>
				{filteredChildren.map((child: Item, idx: number) => {
					const isLastChild = idx === filteredChildren.length - 1;
					const nextPath = `${currentPath}.list[${String(idx)}]`;
					return renderTree(child, nextPath, idx === 0, isLastChild);
				})}
			</HierarchyItem>
		);
	};

	return (
		<div
			ref={browserRef}
			className={classes(styles.root, resizable ? styles.resizable : '', className)}>
			<div className={styles.body} data-elem='body'>
				{metadata.map((item, index) => {
					const isLastItem = index === metadata.length - 1;
					return renderTree(item, `metadata[${String(index)}]`, index === 0, isLastItem);
				})}
			</div>
		</div>
	);
};

export default HierarchyBrowser;
