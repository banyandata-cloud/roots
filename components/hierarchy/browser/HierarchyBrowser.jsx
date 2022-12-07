import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useResize } from '../../../hooks';
import { classes } from '../../../utils';
import { ServerIcon } from '../../icons';
import { HierarchyItem } from '../item';
import styles from './HierarchyBrowser.module.css';

const Title = (props) => {
	const { item } = props;

	let Icon = null;

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

const HierarchyBrowser = (props) => {
	const {
		className,
		metadata,
		onItemClick,
		minWidth,
		maxWidth,
		borderSize,
		resizable,
		setItemProps,
		title,
	} = props;

	const browserRef = useRef(null);

	useResize({
		ref: browserRef,
		styles: {
			minWidth,
			maxWidth: maxWidth ?? document.documentElement.getBoundingClientRect().width,
			borderSize,
		},
		enabled: resizable,
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

		const hasChildren = data?.list === true || Array.isArray(data?.list);

		return (
			<HierarchyItem
				title={<Title item={data} />}
				iconPlacement={hasChildren ? 'left' : 'none'}
				onClick={handleItemClick(data, pathString)}
				{...setItemProps(data, pathString)}>
				{hasChildren &&
					(data.list?.map?.((item, idx) => {
						return renderTree(
							item,
							`${pathString}${pathString.length > 0 ? '.' : ''}list[${idx}]`
						);
					}) ??
						[])}
			</HierarchyItem>
		);
	};

	return (
		<div
			ref={browserRef}
			className={classes(styles.root, className, resizable ? styles.resizable : '')}>
			<div className={styles.header} data-elem='header'>
				{title}
			</div>
			<div className={styles.body} data-elem='body'>
				{renderTree(metadata)}
			</div>
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
	borderSize: PropTypes.number,
	minWidth: PropTypes.number,
	maxWidth: PropTypes.number,
	resizable: PropTypes.bool,
	setItemProps: PropTypes.func,
	title: PropTypes.string,
};

HierarchyBrowser.defaultProps = {
	className: '',
	metadata: {},
	onItemClick: () => {},
	borderSize: 4,
	minWidth: 220,
	maxWidth: null,
	resizable: false,
	setItemProps: () => {
		return {};
	},
	title: 'Browser',
};

export default HierarchyBrowser;
