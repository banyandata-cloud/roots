/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styles from './FlowChart.module.css';
import { getCrossIcon, getExcludeIcon, getTickIconSvg } from './assets';

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
	displayZoomButtons,
	showLeftLegend,
	leftLegendX,
	leftLegendY,
	rightLegendAdjY,
	rightLegendAdjX,
	containerBackground,
	containerBorderRadius,
	onNodeClick,
}) => {
	const svgRef = useRef(null);
	const containerRef = useRef(null);
	const zoom = useRef(null);
	const [selectedNode, setSelectedNode] = useState(null);

	useEffect(() => {
		const nodes = data?.nodes?.map((node) => {
			return {
				id: node.properties.id || node.properties.name,
				label: node.labels[0],
				timestamp: node.properties.timestamp,
				properties: node.properties,
				level: node.labels[0],
				visibility: 'visible',
				status: node.properties.status, // Extract status
				excluded: node.properties.tag,
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

		svg.append('rect')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('rx', containerBorderRadius) // Border radius
			.attr('ry', containerBorderRadius)
			.attr('fill', containerBackground);

		const svgContainer = svg
			.append('svg')
			.attr('width', Width)
			.attr('height', Height)
			.append('g')
			.attr('transform', `translate(${Width / 3.5},${Height / 2.7})scale(0.36)`);
		const container = svgContainer?.append('g');
		containerRef.current = container;

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
			.on('click', handleClick)
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
			.attr('font-weight', 600)
			.attr('font-size', labelFontSize)
			.attr('dy', -5)
			.text((d) => {
				return d.label;
			});

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

		node.append('g')
			.attr('class', 'status-icon')
			.each(function (d) {
				if (d.status === 'PASS') {
					d3.select(this)
						.append('svg')
						.attr('width', 22)
						.attr('height', 22)
						.html(getTickIconSvg());
				}
			})
			.attr('transform', `translate(${+13}, ${-nodeRadius - 34})`);

		node.append('g')
			.attr('class', 'status-icon')
			.each(function (d) {
				if (d.status === 'FAIL') {
					d3.select(this)
						.append('svg')
						.attr('width', 22)
						.attr('height', 22)
						.html(getCrossIcon());
				}
			})
			.attr('transform', `translate(${+13}, ${-nodeRadius - 34})`);

		node.append('g')
			.attr('class', 'icon')
			.each(function (d) {
				if (d.excluded === 'NO') {
					d3.select(this)
						.append('svg')
						.attr('width', 22)
						.attr('height', 22)
						.html(getExcludeIcon());
				}
			})
			.attr('transform', `translate(${-8}, ${-nodeRadius + 37})`);

		if (selectedNode) {
			const nodeElement = container.selectAll('.node').filter((n) => {
				return n.id === selectedNode.id;
			});
			if (!nodeElement.empty()) {
				const circle = nodeElement.select('circle');
				if (!circle.empty()) {
					nodeElement
						.append('circle')
						.attr('class', 'hover-circle')
						.attr('r', nodeRadius + 39) // Slightly larger radius
						.attr('fill', 'none')
						.attr('stroke', circle.attr('fill'))
						.attr('stroke-width', 2);

					container
						.selectAll('.link')
						.filter((l) => {
							return (
								l.source.id === selectedNode.id || l.target.id === selectedNode.id
							);
						})
						.style('stroke', 'black')
						.style('stroke-width', 4);
				}
			}
		}

		function handleClick(event, d) {
			if (d.status !== 'PASS' && d.status !== 'FAIL') {
				return;
			}
			setSelectedNode(d);
			onNodeClick(d);

			// Remove any existing hover circles
			container.selectAll('.hover-circle').remove();

			// Reset all links to their default styles
			container
				.selectAll('.link')
				.style('stroke', '#999')
				.style('stroke-width', 2.5)
				.attr('stroke-opacity', 0.5);

			// Set the clicked node as the selected node

			// Add hover circle to the clicked node
			const nodeElement = d3.select(event.currentTarget);
			const circle = nodeElement.select('circle');
			if (!circle.empty()) {
				nodeElement
					.append('circle')
					.attr('class', 'hover-circle')
					.attr('r', nodeRadius + 39) // Slightly larger radius
					.attr('fill', 'none')
					.attr('stroke', circle.attr('fill'))
					.attr('stroke-width', 2);
			}

			// Highlight the links connected to the clicked node
			container
				.selectAll('.link')
				.filter((l) => {
					return l.source.id === d.id || l.target.id === d.id;
				})
				.style('stroke', 'black')
				.style('stroke-width', 4);
		}

		function handleMouseOver(event, d) {
			d3.select(this).attr('stroke-width', 2);

			// Show popover
			d3.select(this).append('title').text(d.id);
		}

		function handleMouseOut() {
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

		zoom.current = d3.zoom().scaleExtent([0.1, 7]).on('zoom', zoomed);
		svg.call(zoom.current);

		function zoomed(event) {
			container.attr('transform', event.transform);
		}

		if (showLegend) {
			const legendMargin = rightLegendAdjY; // Margin from the bottom and right edges
			const legendItemHeight = 8; // Height of each legend item
			const colorCircleRadius = 6; // Radius of the color circle
			const innerCircleRadius = 3; // Radius of the inner white circle

			// Create legend container
			const legendContainer = svg
				.append('g')
				.attr('class', 'legend')
				.attr(
					'transform',
					`translate(${width - rightLegendAdjX}, ${height - legendMargin})`
				);

			// Add legend items
			const legendItems = legendContainer
				.selectAll('.legend-item')
				.data(Object.entries(colorMap))
				.enter()
				.append('g')
				.attr('class', 'legend-item')
				.attr('transform', (d, i) => {
					return `translate(0, ${i * (legendItemHeight + 10)})`; // Adjust spacing
				});

			// Add colored circles
			legendItems
				.append('circle')
				.attr('r', colorCircleRadius)
				.attr('cx', colorCircleRadius)
				.attr('cy', legendItemHeight / 2) // Center vertically
				.attr('fill', (d) => {
					return d[1];
				}); // Outer color

			// Add inner white circles
			legendItems
				.append('circle')
				.attr('r', innerCircleRadius)
				.attr('cx', colorCircleRadius)
				.attr('cy', legendItemHeight / 2) // Center vertically
				.attr('fill', 'white'); // Inner circle color

			// Add labels
			legendItems
				.append('text')
				.attr('x', colorCircleRadius * 2 + 5) // Space between circle and text
				.attr('y', legendItemHeight / 2)
				.text((d) => {
					return d[0];
				})
				.attr('fill', 'black')
				.style('font-size', labelFontSize)
				.attr('dy', '0.35em') // Align text vertically in the middle
				.attr('alignment-baseline', 'middle');
		}

		if (showLeftLegend) {
			const legendMargin = 10; // Margin from the top and right edges
			const legendItemHeight = 8; // Height of each legend item

			const excludeLegendContainer = svg
				.append('g')
				.attr('class', 'exclude-legend')
				.attr('transform', `translate(${width - rightLegendAdjX + 130}, ${legendMargin})`);

			// Add exclude icon
			excludeLegendContainer
				.append('rect')
				.attr('x', leftLegendX - 30) // Add padding
				.attr('y', leftLegendY + 1) // Add padding
				.attr('width', 85 + 2 * 9) // Width including padding
				.attr('height', legendItemHeight + 2 * 3) // Height including padding
				.attr('fill', 'white') // Background color
				.attr('rx', 5) // Border radius
				.attr('ry', 5); // Border radius

			excludeLegendContainer
				.append('text')
				.attr('x', leftLegendX - 5) // Space between icon and text
				.attr('y', leftLegendY + 6)
				.text('Exclude Resource')
				.attr('fill', 'black')
				.style('font-size', labelFontSize)
				.attr('dy', '0.35em') // Align text vertically in the middle
				.attr('alignment-baseline', 'middle');

			excludeLegendContainer
				.append('foreignObject')
				.attr('x', leftLegendX - 20) // Adjust position
				.attr('y', leftLegendY + 4)
				.attr('width', 10)
				.attr('height', 10)
				.append('xhtml:div')
				.style('width', '10px')
				.style('height', '10px')
				.style('display', 'flex')
				.style('align-items', 'center')
				.style('justify-content', 'center')
				.html(getExcludeIcon());
		}

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
		displayZoomButtons,
		showLeftLegend,
		leftLegendX,
		leftLegendY,
		containerBackground,
		containerBorderRadius,
		onNodeClick,
		rightLegendAdjY,
		rightLegendAdjX,
	]);

	const zoomIn = () => {
		svgRef.current.__zoom.k *= 1.1;
		d3.select(svgRef.current).call(zoom.current.transform, svgRef.current.__zoom);
	};

	const zoomOut = () => {
		svgRef.current.__zoom.k /= 1.1;
		d3.select(svgRef.current).call(zoom.current.transform, svgRef.current.__zoom);
	};

	return (
		<div
			className={styles['chart-container']}
			style={{
				width,
				height,
			}}>
			<svg ref={svgRef} width={width} height={height} />
			{displayZoomButtons && (
				<div className={styles['zoom-buttons']}>
					<button onClick={zoomIn}>+</button>
					<button onClick={zoomOut}>-</button>
				</div>
			)}
		</div>
	);
};

FlowChart.propTypes = {
	data: PropTypes.shape({
		nodes: PropTypes.array.isRequired,
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
	displayZoomButtons: PropTypes.bool,
	showLeftLegend: PropTypes.bool,
	leftLegendX: PropTypes.number,
	leftLegendY: PropTypes.number,
	containerBackground: PropTypes.string,
	containerBorderRadius: PropTypes.number,
	onNodeClick: PropTypes.func,
	rightLegendAdjY: PropTypes.number,
	rightLegendAdjX: PropTypes.number,
};

FlowChart.defaultProps = {
	width: 900,
	height: 600,
	linkDistance: 150,
	linkFontSize: '8px',
	nodeRadius: 20,
	labelFontSize: '8px',
	linkTextColor: 'black',
	labelColor: 'white',
	hideLinkText: false,
	showLegend: false,
	displayZoomButtons: true,
	showLeftLegend: true,
	containerBackground: '#F7F7F8',
	containerBorderRadius: 14,
	leftLegendX: -110,
	leftLegendY: 8,
	rightLegendAdjY: 178,
	rightLegendAdjX: 140,
	onNodeClick: () => {},
};

export default FlowChart;
