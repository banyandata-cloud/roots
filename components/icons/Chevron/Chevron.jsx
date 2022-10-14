import { classes } from '../../../utils';
import styles from './Chevron.module.css';

const Chevron = (props) => {
    const { className, position } = props;
    return (
        <svg
        className={classes(className, styles[position])}
        viewBox='0 0 22 22'
        fill='none'
        stroke='white'
        xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M14.3649 16.766L8.78855 11.1896C8.68381 11.0849 8.68381 10.9151 8.78855 10.8104L14.3649 5.23399'
            strokeWidth='0.893962'
            strokeLinecap='round'
        />
        </svg>
    );
};

Chevron.defaultProps = {
    className: '',
    position: 'left',
};

export default Chevron;
