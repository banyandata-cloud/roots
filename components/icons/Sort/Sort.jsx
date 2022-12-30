import { classes } from '../../../utils';
import styles from './Sort.module.css';

const Sort = ({ className, position }) => {
	return (
		<svg
			className={classes(styles.root, className, styles[`order-${position}`])}
			width='1.5rem'
			height='1.5rem'
			viewBox='0 0 16 16'
			fill='#737373'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M4 5.33333C4 4.96514 4.29848 4.66666 4.66667 4.66666H11.3333C11.7015 4.66666 12 4.96514 12 5.33333C12 5.70152 11.7015 6 11.3333 6H4.66667C4.29848 6 4 5.70152 4 5.33333Z' />
			<path d='M5.33333 8C5.33333 7.63181 5.63181 7.33333 6 7.33333H10C10.3682 7.33333 10.6667 7.63181 10.6667 8C10.6667 8.36819 10.3682 8.66666 10 8.66666H6C5.63181 8.66666 5.33333 8.36819 5.33333 8Z' />
			<path d='M7.33333 10C6.96514 10 6.66667 10.2985 6.66667 10.6667C6.66667 11.0349 6.96514 11.3333 7.33333 11.3333H8.66667C9.03486 11.3333 9.33333 11.0349 9.33333 10.6667C9.33333 10.2985 9.03486 10 8.66667 10H7.33333Z' />
		</svg>
	);
};

Sort.defaultProps = {
	position: 'az',
};

export default Sort;
