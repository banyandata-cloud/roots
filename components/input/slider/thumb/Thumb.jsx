import styles from './Thumb.module.css';

const Thumb = (props) => {
	const { thumbRef } = props;

	return <div ref={thumbRef} className={styles.root} />;
};

export default Thumb;
