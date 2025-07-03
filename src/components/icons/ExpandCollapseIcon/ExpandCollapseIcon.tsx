interface ExpandCollapseIconProps {
	open: boolean;
	className?: string | undefined;
}

const ExpandCollapseIcon = ({ open, className = '' }: ExpandCollapseIconProps) => {
	return (
		<span className={className}>
			{open ? (
				<svg
					width='29'
					height='38'
					viewBox='0 0 29 38'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<circle cx='5' cy='5' r='4.9' fill='white' stroke='#97979F' strokeWidth='0.2' />
					<path
						d='M7.05719 4.51629H5.48469C5.5 4.5 5.2675 4.5 5 4.5C4.7325 4.5 4.5 4.5 4.51719 4.51616L2.94469 4.51629C2.67719 4.51629 2.46094 4.73254 2.46094 5.00004C2.46094 5.26754 2.67719 5.48379 2.94469 5.48379H4.51719L4.5 5.50008C4.5 5.50008 4.7325 5.50008 5 5.50008C5.2675 5.50008 5.5 5.50008 5.48469 5.48379H7.05719C7.32469 5.48379 7.54094 5.26754 7.54094 5.00004C7.54094 4.73254 7.32344 4.51629 7.05719 4.51629Z'
						fill='black'
					/>
				</svg>
			) : (
				<svg
					width='10'
					height='10'
					viewBox='0 0 10 10'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<circle cx='5' cy='5' r='4.9' fill='white' stroke='#97979F' strokeWidth='0.2' />
					<path
						d='M7.05719 4.51621H5.48469V2.94371C5.48469 2.67621 5.26844 2.45996 5.00094 2.45996C4.73344 2.45996 4.51719 2.67621 4.51719 2.94371V4.51621H2.94469C2.67719 4.51621 2.46094 4.73246 2.46094 4.99996C2.46094 5.26746 2.67719 5.48371 2.94469 5.48371H4.51719V7.05621C4.51719 7.32371 4.73344 7.53996 5.00094 7.53996C5.26844 7.53996 5.48469 7.32371 5.48469 7.05621V5.48371H7.05719C7.32469 5.48371 7.54094 5.26746 7.54094 4.99996C7.54094 4.73246 7.32344 4.51621 7.05719 4.51621Z'
						fill='black'
					/>
				</svg>
			)}
		</span>
	);
};

export default ExpandCollapseIcon;
