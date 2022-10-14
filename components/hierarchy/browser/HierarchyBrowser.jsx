import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useResize } from '../../../../hooks';
import { classes } from '../../../utils';
import { Server } from '../../icons';
import { HierarchyItem } from '../item';
import styles from './HierarchyBrowser.module.css';

const BORDER_SIZE = 4;
const MIN_WIDTH = 220;
const MAX_WIDTH = document.documentElement.getBoundingClientRect().width;

const Title = (props) => {
	const { item } = props;

	let Icon = null;

	switch (item.id) {
		case 'database':
		case 'schema':
		case 'object':
			Icon = Server;
			break;
		default:
			break;
	}

	return (
		<span className={styles.item}>
			{Icon && <Icon className={styles['item-icon']} />}
			<span className={styles['item-title']}>{item?.title}</span>
			<span className={styles['item-count']}>({item?.count})</span>
		</span>
	);
};

const HierarchyBrowser = (props) => {
	const { className, metadata, onItemClick } = props;

	const browserRef = useRef(null);

	useResize({
		ref: browserRef,
		styles: {
			MIN_WIDTH,
			MAX_WIDTH,
			BORDER_SIZE,
		},
	});

	const handleItemClick = (item, pathString) => {
		return (open) => {
			onItemClick(item, pathString, open);
		};
	};

	const renderTree = (data, pathString = '') => {
		if (data == null) {
			return null;
		}

		const hasChildren = data?.list != null;

		return (
			<HierarchyItem
				title={<Title item={data} />}
				iconPlacement={hasChildren ? 'left' : 'none'}
				onClick={handleItemClick(data, pathString)}>
				{hasChildren &&
					data.list.map((item, idx) => {
						return renderTree(
							item,
							`${pathString}${pathString.length > 0 ? '.' : ''}list[${idx}]`
						);
					})}
			</HierarchyItem>
		);
	};

	return (
		<div ref={browserRef} className={classes(styles.root, className)}>
			<div className={styles.header}>Browser</div>
			<div className={styles.body}>{renderTree(metadata)}</div>
		</div>
	);
};

HierarchyBrowser.propTypes = {
	className: PropTypes.string,
	metadata: PropTypes.objectOf({
		title: PropTypes.string,
		id: PropTypes.string,
		count: PropTypes.number,
		list: PropTypes.array,
	}),
	onItemClick: PropTypes.func,
};

HierarchyBrowser.defaultProps = {
	className: '',
	metadata: {},
	onItemClick: () => {},
};

export default HierarchyBrowser;
