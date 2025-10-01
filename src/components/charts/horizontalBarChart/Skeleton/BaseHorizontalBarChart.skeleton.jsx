import { Skeleton } from '../../../skeleton';

const BARS = [...Array(8).keys()].map(() => {
	return Math.random() * 80 + 20;
});

const ChartSkeleton = ({ theme, fallback }) => {
	return (
		<div className='bn-flex bn-flex-col bn-justify-between bn-items-start bn-h-full bn-w-full bn-gap-4 bn-p-8'>
			{BARS.map((bar) => {
				return (
					<Skeleton
						key={bar}
						theme={theme}
						variant='rounded'
						width={`${bar}%`}
						height='3rem'
						noAnimation={fallback}
					/>
				);
			})}
		</div>
	);
};

export default ChartSkeleton;
