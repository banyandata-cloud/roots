import { render } from '@testing-library/react';
import BaseTable from '../BaseTable';

const headerData = [{ id: 'name', title: 'Name' }];

describe('BaseTable — loading skeleton', () => {
	test('shows the skeleton instead of the table while loading', () => {
		const { container } = render(
			<BaseTable headerData={headerData} tableData={[{ name: 'Row' }]} loading />
		);

		expect(container.querySelector('table')).toBeNull();
		// 30 rows of 4 columns
		expect(container.querySelectorAll('[data-elem="skeleton"]')).toHaveLength(120);
	});

	test('renders the table when not loading', () => {
		const { container } = render(
			<BaseTable headerData={headerData} tableData={[{ name: 'Row' }]} />
		);

		expect(container.querySelector('table')).not.toBeNull();
		expect(container.querySelector('[data-elem="skeleton"]')).toBeNull();
	});
});
