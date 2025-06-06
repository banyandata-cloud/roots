import React from 'react';
import { Skeleton } from '../../../skeleton';
import styles from './Skeleton.module.css';
import type { ChartSkeletonProps } from './types';

const BARS = [...Array(10).keys()].map(() => Math.random() * 80 + 20);



const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ theme, fallback }) => {
  return (
    <div className={styles.root}>
      {BARS.map((bar, index) => (
        <Skeleton
          key={index}
          theme={theme}
          width="3rem"
          height={`${bar}%`}
          variant="rounded"
          style={{ animationDuration: '4s' }}
          noAnimation={fallback}
        />
      ))}
    </div>
  );
};

export default ChartSkeleton;
