import { useRef, ReactNode } from 'react';
import { useResize } from '../../../hooks';
import { classes } from '../../../utils';
import { ServerIcon } from '../../icons';
import { HierarchyItem } from '../item';
import styles from './HierarchyBrowser.module.css';
import type { ReactElement } from 'react';

interface Item {
	id?: string;
	title?: string;
	count?: number;
	list?: Item[] | boolean;
	[key: string]: any;
}

interface TitleProps {
	item: Item;
}

const Title = ({ item }: TitleProps) => {
	//   let Icon = null;
	let Icon: React.ElementType | null = null;

	switch (item.id) {
		case 'database':
		case 'schema':
		case 'object':
			Icon = ServerIcon;
			break;
		default:
			break;
	}

	return (
		<span className={styles.item}>
			{Icon && <Icon className={styles['item-icon']} />}
			<span className={styles['item-title']}>{item?.title}</span>
			{item?.count && <span className={styles['item-count']}>({item?.count})</span>}
		</span>
	);
};

interface HierarchyBrowserProps {
	className?: string;
	metadata?: Item;
	onItemClick?: (item: Item, pathString: string, open?: boolean) => void;
	onItemDoubleClick?: (item: Item, pathString: string, open?: boolean) => void;
	minWidth?: number;
	maxWidth?: number;
	borderSize?: number;
	resizable?: boolean;
	setItemProps?: (item: Item, pathString: string) => Record<string, any>;
	title?: string;
}

const HierarchyBrowser = ({
	className = '',
	metadata = {},
	onItemClick = () => {},
	onItemDoubleClick = () => {},
	minWidth = 220,
	maxWidth,
	borderSize,
	resizable,
	setItemProps = () => ({}),
	title = 'Browser',
}: HierarchyBrowserProps): ReactElement => {
	const browserRef = useRef<HTMLDivElement>(null);

	useResize({
		ref: browserRef,
		styles: {
			minWidth,
			maxWidth: maxWidth ?? document.documentElement.getBoundingClientRect().width,
			borderSize,
		},
		enabled: resizable,
	});

	const handleItemClick = (item: Item, pathString: string): ((open: boolean) => void) => {
		return (open: boolean): void => {
			onItemClick(item, pathString, open);
		};
	};

	const handleItemDoubleClick = (item: Item, pathString: string): ((open: boolean) => void) => {
		return (open: boolean): void => {
			onItemDoubleClick(item, pathString, open);
		};
	};

	const renderTree = (data: Item, pathString = ''): ReactNode => {
		if (data == null) {
			return null;
		}

		const hasChildren = Array.isArray(data.list);
		return (
			<HierarchyItem
				title={<Title item={data} />}
				iconPlacement={hasChildren ? 'left' : 'none'}
				onClick={handleItemClick(data, pathString)}
				onDoubleClick={handleItemDoubleClick(data, pathString)}
				{...setItemProps(data, pathString)}>
				{hasChildren &&
					(Array.isArray(data.list)
						? data.list.map((item: Item, idx: number) => {
								return renderTree(
									item,
									`${pathString}${pathString.length > 0 ? '.' : ''}list[${idx}]`
								);
						  })
						: null)}
			</HierarchyItem>
		);
	};

	return (
		<div
			ref={browserRef}
			className={classes(styles.root, resizable ? styles.resizable : '', className)}>
			<div className={styles.header} data-elem='header'>
				{title}
			</div>
			<div className={styles.body} data-elem='body'>
				{renderTree(metadata)}
			</div>
		</div>
	);
};

export default HierarchyBrowser;
