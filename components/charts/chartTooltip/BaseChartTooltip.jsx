import { createElement } from 'react';
import { htmlToElement } from '../../../utils';

const BaseChartTooltip = (props) => {
	const { title = '', body, footer, params } = props;
	const content = [body].flat();

	return (
		<div>
			{title.length > 0 && (
				<div>
					<b>{title}</b>
				</div>
			)}
			{[params].flat().map((item, index) => {
				const MarkerEl = htmlToElement(item.marker);
				const Marker = createElement(MarkerEl.tagName.toLowerCase(), {
					style: MarkerEl.style,
				});
				return (
					<div
						key={item}
						style={{
							display: 'flex',
						}}>
						{Marker}
						<div>
							{Object.keys(content[index]).map((elem) => {
								return (
									<div key={elem}>
										{elem} : <b>{content[index][elem]}</b>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			{footer && (
				<>
					<hr />
					<div>
						Total : <b>{footer}</b>
					</div>
				</>
			)}
		</div>
	);
};

export default BaseChartTooltip;
