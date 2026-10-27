interface PropsTableTypes {
	data: Record<string, string>[];
}

const PropsTable = ({ data = [] }: PropsTableTypes) => {
	return (
		<table style={{ width: '100%' }}>
			<thead>
				<tr>
					<th>Props</th>
					<th>Type</th>
					<th>Description</th>
					<th>Default</th>
				</tr>
			</thead>
			<tbody>
				{data.map((datum) => {
					return (
						<tr key={datum.prop}>
							<td>
								<code>
									<strong>{datum.prop}</strong>
								</code>
							</td>
							<td>
								<code>{datum.type}</code>
							</td>
							<td>{datum.description}</td>
							<td>{datum.default}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default PropsTable;
