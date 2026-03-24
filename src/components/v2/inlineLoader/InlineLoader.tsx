import React from 'react';
import styles from './InlineLoader.module.css';

export interface InlineLoaderProps {
  /**
   * The current state of the inline loader.
   */
  status: 'loading' | 'success' | 'error';
  /**
   * The optional text label displayed next to the icon.
   */
  text?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

export const InlineLoader = ({ status, text, className = '' }: InlineLoaderProps) => {
  return (
    <div className={`${styles.container} ${className}`} data-testid="inline-loader">
      <div className={styles.iconWrapper}>
        {status === 'loading' && (
          <div className={styles.spinner}></div>
        )}
        
        {status === 'success' && (
          <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#10B981" />
            <path d="M7 13l3 3 7-7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}

        {status === 'error' && (
          <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L22 6.5V17.5L12 23L2 17.5V6.5L12 1Z" fill="#DC2626" />
            <path d="M12 7V14M12 17V18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};
