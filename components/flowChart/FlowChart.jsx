/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
	apiUrl,
	width,
	height,
	linkDistance,
	linkFontSize,
	linkFontColor,
	nodeRadius,
	labelColor,
	labelFontSize,
}) => {
	const [data, setData] = useState(null);
	const svgRef = useRef(null);
	const [displayedLevel, setDisplayedLevel] = useState(3);

	const [clickedNodes, setClickedNodes] = useState(new Set());

	const handleNodeClick = useCallback(
		async (node) => {
			try {
				if (clickedNodes.has(node.id)) {
					console.log('Node already clicked:', node.id);
					return;
				}

				const response = await fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						clicked_id: node.id,
						timestamp: node.timestamp,
					}),
				});

				if (response.ok) {
					const responseData = await response.json();

					setData((prevData) => {
						const updatedNodes = prevData.nodes.map((n) => {
							return n.id === node.id
								? {
										...n,
										properties: responseData.data.properties,
								  }
								: n;
						});

						const allNodes = [
							...updatedNodes,
							...responseData.data.nodes.filter((n) => {
								return n.id !== node.id;
							}),
						];

						const allRelationships = [
							...prevData.relationships,
							...responseData.data.relationships,
						];

						return {
							nodes: allNodes,
							relationships: allRelationships,
						};
					});

					setDisplayedLevel((prevLevel) => {
						return prevLevel + 1;
					});
					setClickedNodes((prevClickedNodes) => {
						return new Set(prevClickedNodes).add(node.id);
					});
				} else {
					console.error('Error in API response:', response.statusText);
				}
			} catch (error) {
				console.error('Error making API request:', error);
			}
		},
		[apiUrl, clickedNodes]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl);
				const jsonData = await response.json();
				setData(jsonData.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [apiUrl]);

	useEffect(() => {
		if (!data || !data.nodes || !data.relationships) {
			console.warn('Invalid data format.');
			return;
		}

		const uniqueLabels = Array.from(
			new Set(
				data.nodes.map((node) => {
					return node.labels[0];
				})
			)
		);

		const labelToLevel = Object.fromEntries(
			uniqueLabels.map((label) => {
				const labelStr = label.replace(/[^a-zA-Z]/g, '');
				if (labelStr === 'AzuSubscription') {
					return [label, 1];
				}
				if (labelStr === 'AzuResourceGroup') {
					return [label, 2];
				}
				if (labelStr === 'AzuVirtualNetwork' || labelStr === 'AzuVirtualMachine') {
					return [label, 3];
				}
				if (labelStr === 'AzuSubnet' || labelStr === 'AzuNetworkInterface') {
					return [label, 4];
				}
				if (labelStr.includes('AzuDisk')) {
					return [label, 2];
				}
				return [label, 4];
			})
		);

		const nodes = data.nodes.map((node) => {
			return {
				id: node.properties.id || node.properties.name,
				label: node.labels[0],
				timestamp: node.properties.timestamp,
				properties: node.properties,
				level: labelToLevel[node.labels[0]],
				visibility: 'visible',
			};
		});

		const links = data.relationships.map((relationship) => {
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

		const svg = d3.select(svgRef.current);
		svg.selectAll('*').remove();

		const svgContainer = svg.append('svg').attr('Width', Width).attr('Height', Height);
		const container = svgContainer.append('g');

		const colorScale = d3
			.scaleOrdinal()
			.domain([0, 1, 2])
			.range(['#e31a1c', '#ff7f0e', '#1f78b4']);

		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => {
						return d.id;
					})
					.distance(linkDistance)
			)
			.force('charge', d3.forceManyBody().strength(-100))
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

		const defs = svgContainer.append('defs');

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
			.attr('fill', linkFontColor)
			.style('visibility', (d) => {
				return d.source.visibility !== 'hidden' && d.target.visibility !== 'hidden'
					? 'visible'
					: 'hidden';
			});

		const nodesToDisplay = nodes.filter((node) => {
			return node.level <= displayedLevel;
		});

		const node = container
			.selectAll('.node')
			.data(nodesToDisplay, (d) => {
				return d.id;
			})
			.enter()
			.append('circle')
			.attr('class', (d) => {
				return `node-level-${d.level}`;
			})
			.attr('r', (d) => {
				return calculateRadius(d.label);
			})
			.attr('fill', (d) => {
				const labelStr = d.label.replace(/[^a-zA-Z]/g, '');

				if (labelStr === 'AzuVirtualMachine') {
					return '#33a02c';
				}
				if (labelStr === 'AzuDisk') {
					return '#ff00c9';
				}
				if (labelStr === 'AzuNetworkInterface') {
					return 'gray';
				}
				if (labelStr === 'AzuSubscription') {
					return '#BEBB00';
				}
				return colorScale(d.level);
			})
			.attr('stroke', (d) => {
				return d3
					.color(
						// eslint-disable-next-line no-nested-ternary
						d.label === 'AzuVirtualMachine'
							? '#33a02c'
							: d.label === 'AzuDisk'
							? '#ff00c9'
							: d.label === 'AzuNetworkInterface'
							? 'gray'
							: d.label === 'AzuSubscription'
							? '#BEBB00'
							: colorScale(d.level)
					)
					.darker(1);
			})
			.attr('opacity', 0.9)
			.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))
			.on('click', (event, d) => {
				event.stopPropagation();
				if (d.level === displayedLevel) {
					handleNodeClick(d);
				} else {
					setDisplayedLevel(d.level);
				}
				d3.select(this).on('click', null);
			});

		function calculateRadius(label) {
			const defaultRadius = nodeRadius;
			const labelLength = label.length;
			const maxLength = 7;
			const scale = d3.scaleLinear().domain([0, maxLength]).range([1, 2]);
			return defaultRadius * scale(Math.min(labelLength, maxLength)) + 13;
		}

		const labels = container
			.selectAll('.label')
			.data(nodesToDisplay)
			.enter()
			.append('text')
			.attr('class', 'label')
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.attr('fill', labelColor)
			.style('font-size', labelFontSize)
			.text((d) => {
				const labelStr = d.label.replace(/[^a-zA-Z]/g, '');
				return labelStr;
			});

		simulation.on('tick', () => {
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
			node.attr('cx', (d) => {
				return d.x;
			}).attr('cy', (d) => {
				return d.y;
			});
			labels
				.attr('x', (d) => {
					return d.x;
				})
				.attr('y', (d) => {
					return d.y;
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

		// eslint-disable-next-line consistent-return
		return () => {
			simulation.stop();
		};
	}, [
		data,
		displayedLevel,
		handleNodeClick,
		width,
		height,
		linkDistance,
		linkFontSize,
		linkFontColor,
		nodeRadius,
		labelColor,
		labelFontSize,
	]);

	return <svg ref={svgRef} width={width} height={height} />;
};

FlowChart.propTypes = {
	apiUrl: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	linkDistance: PropTypes.number,
	linkFontSize: PropTypes.string,
	nodeRadius: PropTypes.number,
	labelFontSize: PropTypes.string,
	labelColor: PropTypes.string,
	linkFontColor: PropTypes.string,
};

FlowChart.defaultProps = {
	width: 900,
	height: 600,
	linkDistance: 150,
	linkFontSize: '8px',
	nodeRadius: 13,
	labelFontSize: '8px',
	linkFontColor: 'black',
	labelColor: 'white',
};

export default FlowChart;
