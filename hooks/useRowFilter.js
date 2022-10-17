import { useEffect, useState } from 'react';
import { cloneDeep } from '../utils';

const useRowFilter = (props) => {
	const { initialState = {}, length = 0, tableData } = props;

	const [filters, setFilters] = useState(() => {
		return [...Array(length).keys()].fill(initialState);
	});

	useEffect(() => {
		setFilters([...Array(length).keys()].fill(initialState));
	}, [initialState, length, tableData]);

	/**
	 *
	 * @param {number} index - row index
	 * @param {string} name - filter name / column id
	 * @param {Array} value - filter value / checked items
	 */
	const applyFilter = (index, name, value = []) => {
		setFilters((prevFilters) => {
			const newFilters = cloneDeep(prevFilters);
			newFilters.splice(index, 1, {
				...newFilters[index],
				[name]: value,
			});
			return newFilters;
		});
	};

	return {
		filters,
		applyFilter,
	};
};

export default useRowFilter;
