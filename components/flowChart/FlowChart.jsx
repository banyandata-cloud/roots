import React, { useEffect } from 'react';
import * as d3 from 'd3';
import neo4j from 'neo4j-driver';
import PropTypes from 'prop-types';

/**
 * Renders a FlowChart that visualizes data as a chart from neo4j Database.
 *
 * @param {string} url - The base url for connecting to a Neo4j DataBase.
 * @param {string} user - The neo4j database userName.
 * @param {string} password - Password to access Data in Neo4j DataBase.
 * @param {string} query - Cypher Query to query data from the Neo4j database and display only the information that is required.
 * @param {number} width - Width allow you to manually adjust the width of the Graph screen.
 * @param {number} height - Height allow you to manually adjust the height of the Graph screen.
 * @param {number} linkDistance - linkDistance adjust the distance of the link connected between the nodes.
 * @param {number} linkWidth - linkWidth adjust the width of the link connected between the nodes.
 * @param {string} linkFontSize - linkFontSize adjust the font size of relation label displayed on link connected between the nodes.
 * @param {string} labelFontSize - labelFontSize adjust the size of label displayed on the nodes.
 * @param {number} nodeRadius - nodeRadius is radius of node.
 * @param {string} labelColor - labelColor to modify the color of label displayed on the nodes.
 * @param {string} textLinkColor - textLinkColor to modify the color of relation label displayed on the link.
 * @returns {JSX.Element} - The rendered FlowChart component.
 */

const FlowChart = ({
	url,
	user,
	password,
	query,
	width,
	height,
	linkDistance,
	linkWidth,
	linkFontSize,
	nodeRadius,
	labelFontSize,
	labelColor,
	textLinkColor,
}) => {
	useEffect(() => {
		// Establish Neo4j driver connection
		const driver = neo4j.driver(url, neo4j.auth.basic(user, password));

		const handleErrors = (error) => {
			console.error('Neo4j error:', error);
		};

		// Clear existing SVG content
		const svgContainer = d3.select('#graph-2d');
		svgContainer.selectAll('*').remove();

		// Create SVG and container for the graph
		const svg = svgContainer.append('svg').attr('width', width).attr('height', height);
		const container = svg.append('g');

		// Color scale for node levels
		const colorScale = d3
			.scaleOrdinal()
			.domain([0, 1, 2])
			.range(['#e31a1c', '#33a02c', '#1f78b4']);

		// Function to update the graph based on nodes and links
		const updateGraph = (nodes, links) => {
			const simulation = d3
				.forceSimulation(nodes)
				.force(
					'link',
					d3
						.forceLink(links)
						.id((d) => d.id)
						.distance(linkDistance)
				)
				.force('charge', d3.forceManyBody().strength(-100))
				.force('center', d3.forceCenter(width / 2, height / 2));

			// Drag functions for nodes
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
				.append('g')
				.selectAll('line')
				.data(links)
				.enter()
				.append('line')
				.attr('stroke', '#999')
				.attr('stroke-width', linkWidth)
				.attr('stroke-opacity', 0.5);

			const defs = svg.append('defs');

			const linkPaths = defs
				.selectAll('path')
				.data(links)
				.enter()
				.append('path')
				.attr('id', (d, i) => `linkPath${i}`)
				.attr('d', (d) => {
					const startX = d.source.x;
					const startY = d.source.y;
					const endX = d.target.x;
					const endY = d.target.y;
					return `M${startX},${startY}L${endX},${endY}`;
				});

			const linkText = container
				.append('g')
				.selectAll('.link-label')
				.data(links)
				.enter()
				.append('text')
				.attr('class', 'link-label')
				.append('textPath')
				.attr('href', (d, i) => `#linkPath${i}`)
				.text((d) => d.relationshipType)
				.attr('startOffset', '50%')
				.attr('font-size', linkFontSize)
				.attr('fill', textLinkColor)
				.style('text-anchor', 'middle');

			const node = container
				.append('g')
				.selectAll('g')
				.data(nodes)
				.enter()
				.append('g')
				.attr('class', (d) => `node-level-${d.level}`)
				.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

			const circles = node
				.append('circle')
				.attr('r', (d) => calculateRadius(d.label))
				.attr('fill', (d) => {
					if (d.level === 1) {
						if (d.label === 'AzuVirtualNetwork') {
							return '#33a02c';
						} else {
							return '#ff7f0e';
						}
					} else {
						return colorScale(d.level);
					}
				});

			const labels = node
				.append('text')
				.text((d) => d.label)
				.attr('dy', 4)
				.style('text-anchor', 'middle')
				.attr('fill', labelColor)
				.style('font-size', labelFontSize)
				.attr('y', (d) => d.y - d.r / 2)
				.attr('x', (d) => d.x - calculateRadius(d.label));

			function calculateRadius(label) {
				const defaultRadius = nodeRadius;
				const labelLength = label.length;
				const maxLength = 7;
				const scale = d3.scaleLinear().domain([0, maxLength]).range([1, 2]);

				return defaultRadius * scale(Math.min(labelLength, maxLength)) + nodeRadius;
			}

			node.append('title').text((d) => `${d.label} - ${JSON.stringify(d.properties)}`);

			simulation.on('tick', () => {
				link.attr('x1', (d) => d.source.x)
					.attr('y1', (d) => d.source.y)
					.attr('x2', (d) => d.target.x)
					.attr('y2', (d) => d.target.y);

				linkPaths.attr('d', (d) => {
					const startX = d.source.x;
					const startY = d.source.y;
					const endX = d.target.x;
					const endY = d.target.y;
					return `M${startX},${startY}L${endX},${endY}`;
				});

				linkText
					.attr('x', (d) => (d.source.x + d.target.x) / 2)
					.attr('y', (d) => (d.source.y + d.target.y) / 2)
					.text((d) => d.relationshipType);

				circles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
				labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
			});

			// Zoom functionality
			const zoom = d3.zoom().scaleExtent([0.1, 10]).on('zoom', zoomed);
			svg.call(zoom);
			svg.call(zoom.transform, d3.zoomIdentity.scale(0.7));

			function zoomed(event) {
				container.attr('transform', event.transform);
			}
		};

		// Function to assign node levels based on links
		const assignNodeLevels = (nodes, links) => {
			const nodeHierarchy = {};

			links.forEach((link) => {
				nodeHierarchy[link.target] = (nodeHierarchy[link.source] || 0) + 1;
			});

			nodes.forEach((node) => {
				node.level = nodeHierarchy[node.id] || 0;
			});
		};

		// Create a Neo4j session and fetch data
		const session = driver.session({ database: 'neo4j' });
		session
			.run(query)
			.then(function (result) {
				const nodes = [];
				const links = [];
				const nodeSet = new Set();

				if (result.records.length === 0) {
					console.warn('No data returned from Neo4j query.');
				} else {
					result.records.forEach((record) => {
						const startNode = record.get('n');
						const endNode = record.get('m');
						const relationship = record.get('r');

						if (!nodeSet.has(startNode.identity.toNumber())) {
							nodes.push({
								id: startNode.identity.toNumber(),
								label: startNode.labels[0],
								properties: startNode.properties,
							});
							nodeSet.add(startNode.identity.toNumber());
						}

						if (!nodeSet.has(endNode.identity.toNumber())) {
							nodes.push({
								id: endNode.identity.toNumber(),
								label: endNode.labels[0],
								properties: endNode.properties,
							});
							nodeSet.add(endNode.identity.toNumber());
						}

						links.push({
							source: startNode.identity.toNumber(),
							target: endNode.identity.toNumber(),
							relationshipType: relationship.type,
						});
					});

					assignNodeLevels(nodes, links);
					updateGraph(nodes, links);
				}

				session.close();
			})
			.catch(handleErrors);

		// Cleanup resources on component unmount
		return () => {
			session.close();
			driver.close();
		};
	}, [
		url,
		user,
		password,
		width,
		height,
		linkDistance,
		linkWidth,
		linkFontSize,
		nodeRadius,
		labelFontSize,
		labelColor,
		textLinkColor,
		query,
	]);

	return <div id='graph-2d'></div>;
};

FlowChart.propTypes = {
	url: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	query: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	linkDistance: PropTypes.number.isRequired,
	linkWidth: PropTypes.number.isRequired,
	linkFontSize: PropTypes.string.isRequired,
	nodeRadius: PropTypes.number.isRequired,
	labelFontSize: PropTypes.string.isRequired,
	labelColor: PropTypes.string,
	textLinkColor: PropTypes.string,
};
FlowChart.defaultProps = {
	linkDistance: 120,
	linkWidth: 2,
	linkFontSize: '8px',
	nodeRadius: 13,
	labelFontSize: '8px',
	width: 950,
	height: 600,
	textLinkColor: 'black',
	labelColor: 'white',
	user: 'neo4j',
};

export default FlowChart;
