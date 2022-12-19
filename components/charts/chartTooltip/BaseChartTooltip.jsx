import React from 'react';
import PropTypes from 'prop-types';
// import { createElement } from 'react';
import styles from './BaseChartTooltip.module.css';
import { classes } from '../../../utils';
// import { htmlToElement } from '../../../utils';

const BaseChartTooltip = (props) => {
	const { title = '', body, footer, params, className } = props;
	const content = [body].flat();

	return (
		<div className={classes(styles.root, className)}>
			{title.length > 0 && (
				<>
					<div>
						<b>{title}</b>
					</div>
					<hr />
				</>
			)}
			{footer && (
				<div className={styles.footer} data-elem='footer'>
					{Object.keys(footer).map((key) => {
						return (
							<React.Fragment key={key}>
								<b>{key}</b> {footer[key]}
							</React.Fragment>
						);
					})}
				</div>
			)}
			{[params].flat().map((item, index) => {
				// const MarkerEl = htmlToElement(item.marker);
				// const Marker = createElement(MarkerEl.tagName.toLowerCase(), {
				// style: MarkerEl.style,
				// });
				return (
					<div key={item} className={styles.content}>
						{/* {Marker} */}
						<span
							className={styles.marker}
							style={{
								backgroundColor: item.color,
							}}
						/>
						<div className={styles.stats}>
							{Object.keys(content[index]).map((elem) => {
								return (
									<div key={elem} className={styles.stat}>
										{elem}: <b>{content[index][elem]}</b>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

BaseChartTooltip.propTypes = {
	title: PropTypes.string,
	body: PropTypes.shape,
	footer: PropTypes.shape,
	params: PropTypes.shape,
	className: PropTypes.string,
};

BaseChartTooltip.defaultProps = {
	title: '',
	body: {
		key: 'value',
	},
	footer: {
		total: '100',
	},
	params: {
		color: 'blue',
	},
	className: '',
};

export default BaseChartTooltip;
