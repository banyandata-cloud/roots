const CustomLegendItem = ({ label, value, color }) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				cursor: 'pointer',
			}}>
			<svg width='15' height='15' viewBox='0 0 30 30' fill='none'>
				<circle cx='15' cy='15' r='12' stroke={color} strokeWidth='6' />
			</svg>
			<div
				style={{
					marginLeft: 10,
				}}>
				<strong
					style={{
						color: '#333',
					}}>
					{label}
				</strong>
				<span
					style={{
						marginLeft: 10,
						color: '#999',
					}}>
					{value} USD
				</span>
			</div>
		</div>
	);
};

export default CustomLegendItem;
