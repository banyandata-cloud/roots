import styles from './Tooltip.module.css';

export const MapTooltip = () => {
	const props = {
		title: 'Tooltip Title',
		header: 'Subtitle',
		headerTitle: 'Sub Sub Title',
		headerValue: 12,
		body: [
			{
				marker: '#24a148',
				bodyTitle: 'Wow',
				bodyValue: 11,
				bodyPercentage: '0.92',
			},
			{
				marker: '#ff626a',
				bodyTitle: 'Oops',
				bodyValue: 1,
				bodyPercentage: '0.08',
			},
		],
	};

	const { title, header, headerTitle, headerValue, body, subHeader } = props;

	return (
		<div className={styles.root}>
			<div className={styles.header}>{title}</div>
			<div>{header}</div>
			<hr />
			<div className={styles.title}>
				<span>{headerTitle}</span>
				<span>{headerValue}</span>
			</div>
			{subHeader &&
				Object.keys(subHeader).map((obj) => {
					return (
						<div className={styles.title} key={obj}>
							<span>{obj}</span>
							<span>{subHeader?.[obj]}</span>
						</div>
					);
				})}
			<hr />
			{body?.map((el) => {
				return (
					<div className={styles.body} key={el?.bodyTitle}>
						<span
							style={{
								display: 'inline-block',
								marginRight: '4px',
								borderRadius: '10px',
								width: '10px',
								height: '10px',
								backgroundColor: `${el.marker}`,
							}}
						/>

						<span className={styles.bodyTitle}>{el?.bodyTitle}</span>
						<span className={styles.bodyPercentage}>
							{((el?.bodyPercentage ?? 0) * 100).toFixed(2)}%&nbsp;
						</span>
						<span className={styles.bodyValue}>({el?.bodyValue})</span>
					</div>
				);
			})}
		</div>
	);
};
