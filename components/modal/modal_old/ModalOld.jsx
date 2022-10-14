import React, { useState, useEffect } from 'react';
import Button from '../../buttons/Button';
import styles from './ModalOld.module.css';

const ModalOld = (props) => {
	const {
		title,
		children,
		btnTitle,
		onClick,
		radius,
		size,
		variant,
		lefticon,
		righticon,
		customClass,
		customButtonTitleClass,
		viewModal,
		hideModal,
		defaultFooter,
	} = props;
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		hideModal(false);
	};

	useEffect(() => {
		if (viewModal) {
			openModal();
		} else {
			closeModal();
		}
	}, [viewModal]);

	return (
		<div className={styles.root}>
			{isOpen && (
				<>
					<div className={styles.overlay} />
					<div className={styles.modal}>
						<header className={styles.modal__header}>
							<h2>{title}</h2>
							<button
								type='submit'
								onClick={closeModal}
								className={styles['close-button']}>
								&times;
							</button>
						</header>
						<main className={styles.modal__main}>
							<p>{children}</p>
						</main>
						{defaultFooter && (
							<footer className={styles.modal__footer}>
								<Button
									title={btnTitle}
									onClick={onClick}
									radius={radius}
									size={size}
									variant={variant}
									customClass={customClass}
									customButtonTitleClass={customButtonTitleClass}
									leftIcon={lefticon}
									rightIcon={righticon}
								/>
								<Button
									title={btnTitle}
									onClick={onClick}
									radius={radius}
									size={size}
									variant={variant}
									customClass={customClass}
									customButtonTitleClass={customButtonTitleClass}
									leftIcon={lefticon}
									rightIcon={righticon}
								/>
							</footer>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ModalOld;
