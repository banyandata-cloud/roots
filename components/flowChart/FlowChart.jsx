/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * Renders a FlowChart that visualizes data as a chart from neo4j Database.
 *
 * @param {string} apiUrl - API url.
 * @param {number} width - Width allow you to manually adjust the width of the Graph screen.
 * @param {number} height - Height allow you to manually adjust the height of the Graph screen.
 * @param {number} linkDistance - linkDistance adjust the distance of the link connected between the nodes.
 * @param {string} linkFontSize - linkFontSize adjust the font size of relation label displayed on link connected between the nodes.
 * @param {string} labelFontSize - labelFontSize adjust the size of label displayed on the nodes.
 * @param {number} nodeRadius - nodeRadius is radius of node.
 * @param {string} labelColor - labelColor to modify the color of label displayed on the nodes.
 * @param {string} linkFontColor - linkFontColor to modify the color of relation label displayed on the link.
 * @returns {JSX.Element} - The rendered FlowChart component.
 */

const FlowChart = ({
	data,
	width,
	height,
	linkDistance,
	linkFontSize,
	linkFontColor,
	nodeRadius,
	labelColor,
	labelFontSize,
	linkTextColor,
	hideLinkText,
	showLegend,
}) => {
	const svgRef = useRef(null);

	useEffect(() => {
		const nodes = data?.nodes?.map((node) => {
			return {
				id: node.properties.id || node.properties.name,
				label: node.labels[0],
				timestamp: node.properties.timestamp,
				properties: node.properties,
				level: node.labels[0],
				visibility: 'visible',
			};
		});

		const links = data?.relationships?.map((relationship) => {
			return {
				source:
					relationship.start_node.properties.id ||
					relationship.start_node.properties.name,
				target:
					relationship.end_node.properties.id || relationship.end_node.properties.name,
				relationshipType: relationship.type,
			};
		});

		const Width = width;
		const Height = height;

		const svg = d3?.select(svgRef.current);
		svg.selectAll('*').remove();

		const svgContainer = svg
			.append('svg')
			.attr('width', Width)
			.attr('height', Height)
			.append('g')
			.attr('transform', `translate(${Width / 3.5},${Height / 2.7})scale(0.36)`);
		const container = svgContainer?.append('g');

		function filterDuplicateNodes() {
			const uniqueNodesMap = new Map();
			nodes.forEach((node) => {
				uniqueNodesMap.set(node.id, node);
			});
			return Array?.from(uniqueNodesMap.values());
		}

		const uniqueNodes = filterDuplicateNodes(
			Array.from(
				new Map(
					nodes.map((node) => {
						return [node.id, node];
					})
				).values()
			)
		);

		const linkedNodesIds = new Set();
		links.forEach((link) => {
			linkedNodesIds.add(link.source);
			linkedNodesIds.add(link.target);
		});

		const filteredNodes = uniqueNodes
			?.filter((node) => {
				return linkedNodesIds.has(node.id);
			})
			.map((node) => {
				return {
					...node,
					shortId: node.id.substr(node.id.lastIndexOf('/') + 1),
				};
			});

		const simulation = d3
			.forceSimulation(filteredNodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => {
						return d.id;
					})
					.distance(linkDistance)
			)
			.force('charge', d3.forceManyBody().strength(-300))
			.force('center', d3.forceCenter(Width / 2, Height / 2));

		const dragstarted = (event, d) => {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		};

		const dragged = (event, d) => {
			d.fx = event.x;
			d.fy = event.y;
		};

		const dragended = (event, d) => {
			if (!event.active) simulation.alphaTarget(0).restart();
			d.fx = d.x;
			d.fy = d.y;
		};

		const link = container
			.selectAll('.link')
			.data(links)
			.enter()
			.append('line')
			.attr('class', 'link')
			.style('stroke', '#999')
			.style('stroke-Width', 2.5)
			.attr('stroke-opacity', 0.5)
			.style('visibility', (d) => {
				return d.source.visibility !== 'hidden' && d.target.visibility !== 'hidden'
					? 'visible'
					: 'hidden';
			});

		const defs = svgContainer?.append('defs');

		const linkPaths = defs
			.selectAll('path')
			.data(links)
			.enter()
			.append('path')
			.attr('id', (d, i) => {
				return `linkPath${i}`;
			})
			.attr('d', (d) => {
				const startX = d.source.x;
				const startY = d.source.y;
				const endX = d.target.x;
				const endY = d.target.y;
				return `M${startX},${startY}L${endX},${endY}`;
			})
			.style('visibility', (d) => {
				return d.source.visibility !== 'hidden' && d.target.visibility !== 'hidden'
					? 'visible'
					: 'hidden';
			});

		const linkText = container
			.selectAll('.link-label')
			.data(links)
			.enter()
			.append('text')
			.attr('class', 'link-label')
			.style('text-anchor', 'middle')
			.append('textPath')
			.attr('href', (d, i) => {
				return `#linkPath${i}`;
			})
			.attr('startOffset', '50%')
			.text((d) => {
				return d.relationshipType;
			})
			.attr('font-size', linkFontSize)
			.attr('fill', linkTextColor)
			.style('visibility', (d) => {
				return d.source.visibility !== 'hidden' && d.target.visibility !== 'hidden'
					? 'visible'
					: 'hidden';
			});

		// Hide link text if hideLinkText prop is true
		if (hideLinkText) {
			linkText.style('visibility', 'hidden');
		}

		const predefinedColors = [
			'#0043CE',
			'#71839B',
			'#BD3C45',
			'#2a9d8f',
			'#c1121f',
			'#FF892A',
			'#5e548e',
			'#FF1597',
			'#CBA006',
			'#4E9F3D',
			'#FFBF45',
		];
		const colorMap = {};

		function getRandomColor() {
			return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		}

		const node = container
			.selectAll('.node')
			.data(filteredNodes, (d) => {
				return d.id;
			})
			.enter()
			.append('g')
			.attr('class', (d) => {
				return `node-level-${d.level}`;
			})
			.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))
			.on('mouseover', handleMouseOver) // Attach mouseover event
			.on('mouseout', handleMouseOut)
			.style('cursor', 'pointer');

		node.append('circle')
			.attr('r', (d) => {
				return calculateRadius(d.label);
			})
			.attr('fill', (d) => {
				const labelStr = d.label.replace(/[^a-zA-Z]/g, '');

				if (!colorMap[labelStr]) {
					colorMap[labelStr] = predefinedColors.pop() || getRandomColor();
				}

				// Return the color for the current labelStr
				return colorMap[labelStr];
			});

		// Append text for label
		node.append('text')
			.attr('text-anchor', 'middle')
			.attr('fill', labelColor)
			.attr('font-size', labelFontSize)
			.attr('dy', -5)
			.text((d) => {
				return d.label;
			});

		// Append text for ID
		node.append('text')
			.attr('text-anchor', 'middle')
			.attr('fill', 'black')
			.attr('font-size', labelFontSize)
			.attr('dy', 10)
			.text((d) => {
				const maxLength = 15; // Maximum characters allowed before wrapping
				const id =
					d.shortId.length > maxLength
						? `${d.shortId.substring(0, maxLength)}...`
						: d.shortId;
				return id;
			});

		function handleMouseOver(event, d) {
			d3.select(this).attr('stroke-width', 2);

			// Show popover
			d3.select(this).append('title').text(d.id);
		}

		function handleMouseOut() {
			d3.select(this)
				.attr('stroke', () => {
					return d3.darker(1);
				})
				.attr('stroke-width', 1);

			// Remove popover
			d3.select(this).select('title').remove();
		}

		function calculateRadius(label) {
			const defaultRadius = nodeRadius;
			const labelLength = label.length;
			const maxLength = 7;
			const scale = d3.scaleLinear().domain([0, maxLength]).range([1, 2]);
			return defaultRadius * scale(Math.min(labelLength, maxLength)) + 13;
		}

		simulation.on('tick', () => {
			node.attr('transform', (d) => {
				return `translate(${d.x}, ${d.y})`;
			});
			link.attr('x1', (d) => {
				return d.source.x;
			})
				.attr('y1', (d) => {
					return d.source.y;
				})
				.attr('x2', (d) => {
					return d.target.x;
				})
				.attr('y2', (d) => {
					return d.target.y;
				});
			linkPaths.attr('d', (d) => {
				const startX = d.source.x;
				const startY = d.source.y;
				const endX = d.target.x;
				const endY = d.target.y;
				return `M${startX},${startY}L${endX},${endY}`;
			});
			linkText
				.attr('x', (d) => {
					return (d.source.x + d.target.x) / 2;
				})
				.attr('y', (d) => {
					return (d.source.y + d.target.y) / 2;
				});
		});

		const zoom = d3.zoom().scaleExtent([0.1, 7]).on('zoom', zoomed);
		svg.call(zoom);

		function zoomed(event) {
			container.attr('transform', event.transform);
		}

		if (showLegend) {
			const legendX = 10;
			const legendY = 10;
			const legendItemHeight = 13;
			const colorSquareSize = 10;

			// Create legend container
			const legendContainer = svg
				.append('g')
				.attr('class', 'legend')
				.attr('transform', `translate(${legendX}, ${legendY})`);

			// Add legend items
			const legendItems = legendContainer
				.selectAll('.legend-item')
				.data(Object.entries(colorMap))
				.enter()
				.append('g')
				.attr('class', 'legend-item')
				.attr('transform', (d, i) => {
					return `translate(0, ${i * legendItemHeight})`;
				});

			// Add colored squares
			legendItems
				.append('rect')
				.attr('width', colorSquareSize)
				.attr('height', colorSquareSize)
				.attr('fill', (d) => {
					return d[1];
				});

			// Add labels
			legendItems
				.append('text')
				.attr('x', colorSquareSize + 5)
				.attr('y', colorSquareSize / 2)
				.text((d) => {
					return d[0];
				})
				.attr('fill', 'black')
				.style('font-size', labelFontSize)
				.attr('dy', '0.35em')
				.attr('alignment-baseline', 'middle');
		}

		// eslint-disable-next-line consistent-return
		return () => {
			simulation.stop();
		};
	}, [
		data,
		width,
		height,
		linkDistance,
		linkFontSize,
		linkFontColor,
		nodeRadius,
		labelColor,
		labelFontSize,
		linkTextColor,
		hideLinkText,
		showLegend,
	]);

	return <svg ref={svgRef} width={width} height={height} />;
};

FlowChart.propTypes = {
	data: PropTypes.shape({
		// eslint-disable-next-line react/forbid-prop-types
		nodes: PropTypes.array.isRequired,
		// eslint-disable-next-line react/forbid-prop-types
		relationships: PropTypes.array.isRequired,
	}).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	linkDistance: PropTypes.number,
	linkFontSize: PropTypes.string,
	nodeRadius: PropTypes.number,
	labelFontSize: PropTypes.string,
	labelColor: PropTypes.string,
	linkTextColor: PropTypes.string,
	hideLinkText: PropTypes.bool,
	showLegend: PropTypes.bool,
};

FlowChart.defaultProps = {
	width: 900,
	height: 600,
	linkDistance: 150,
	linkFontSize: '8px',
	nodeRadius: 16,
	labelFontSize: '8px',
	linkTextColor: 'black',
	labelColor: 'white',
	hideLinkText: false,
	showLegend: false,
};

export default FlowChart;
