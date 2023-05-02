import { useState } from 'react';
import { inputHelper } from '../../../../../utils';
import { TableChip } from '../../tableChips/TableChip.class';
import { DropdownItem } from '../../../../input';

const useTableSearch = ({ filters = [], onApply } = {}) => {
	// render: PropTypes.func,
	// middlewareOptions: PropTypes.shape({
	// offset: PropTypes.object,
	// shift: PropTypes.object,
	// flip: PropTypes.object,
	// }),
	const [selectedFilters, setSelectedFilters] = useState([]);

	const setFieldValue = (fieldValue, type, id = null, lock = false) => {
		if (selectedFilters?.length > 0) {
			const clonedFilters = [...selectedFilters];
			const current = clonedFilters?.[(clonedFilters?.length ?? 0) - 1];
			current[type] = fieldValue;
			current[`${type}Search`] = !lock;
			current[`${type}Id`] = id;
			if (type === 'label') {
				current.icon =
					filters.find((fil) => {
						return fil.id === id;
					})?.icon ?? null;
			}
			setSelectedFilters(clonedFilters);
			// the chip is about to be locked
			if (lock && type === 'value') {
				onApply?.(clonedFilters);
			}
		}
	};

	// onSearch will be fired on change of chip input
	function onSearch(event) {
		const { fieldValue, dataset } = inputHelper(event);
		const { search } = dataset;
		if (search === 'label') {
			setFieldValue(fieldValue, 'label');
		} else if (search === 'value') {
			setFieldValue(fieldValue, 'value');
		}
	}

	const onRemove = (chip, index) => {
		const clonedFilters = [...selectedFilters];
		clonedFilters.splice(index, 1);
		setSelectedFilters(clonedFilters);
	};

	// onFocus we will add an empty chip
	// that chip will have dropdown options from all filters provided through options
	const onFocus = () => {
		const clonedFilters = [...selectedFilters];
		const current = clonedFilters?.slice()?.[0];
		// if the search is off, the chip is completed
		// add a new one
		if (clonedFilters?.length === 0 || (!current?.labelSearch && !current?.valueSearch)) {
			const newChip = new TableChip({
				labelSearch: true,
				valueSearch: true,
				autocompleteOptions: {
					// open: autocompleteOpen,
					// setOpen: setAutocompleteOpen,
					middlewareOptions: {
						offset: {
							mainAxis: 10,
						},
					},
					predicate: () => {
						return true;
					},
					// render: ({ name, value }) => {
					// const currentFilterChip = selectedFilters?.at(-1);
					// let filtersDOM = [];
					// console.log(selectedFilters);
					// if (name === 'label') {
					// filtersDOM = FILTERS.filter((fil) => {
					// return fil.title.indexOf(currentFilterChip?.label) !== -1;
					// }).map((fil) => {
					// return (
					// <DropdownItem key={fil.id} value={fil.id} title={fil.title} />
					// );
					// });
					// }
					// return <div>{filtersDOM}</div>;
					// },
					placement: 'bottom-start',
				},
			});
			clonedFilters.push(newChip);
			setSelectedFilters(clonedFilters);
		}
	};

	// onBlur will remove the incomplete chip
	const onBlur = () => {
		if (selectedFilters?.length > 0) {
			const clonedFilters = [...selectedFilters];
			if (clonedFilters?.at(-1)?.labelSearch && clonedFilters?.at(-1)?.valueSearch) {
				clonedFilters?.pop();
			}
			setSelectedFilters(clonedFilters);
		}
	};

	// the autocomplete options which get rendered
	// and set the state on selection
	const renderAutocomplete = ({ name, value }) => {
		let filtersDOM = [];
		if (name === 'label') {
			filtersDOM = filters
				?.filter((fil) => {
					return fil?.title.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1;
				})
				?.map((fil) => {
					return (
						<DropdownItem
							key={fil.id}
							value={fil.id}
							title={fil.title}
							onClick={() => {
								setFieldValue(fil.title, 'label', fil.id, true);
							}}
						/>
					);
				});
		}
		if (name === 'value') {
			const currentFilter = selectedFilters?.at(-1)?.labelId;
			filtersDOM = filters
				?.find((fil) => {
					return fil.id === currentFilter;
				})
				?.options?.map((option) => {
					return (
						<DropdownItem
							key={option}
							value={option}
							title={option}
							onClick={() => {
								setFieldValue(option, 'value', option, true);
							}}
						/>
					);
				});
		}
		return filtersDOM;
	};

	return {
		onFocus,
		// onBlur,
		onSearch,
		onRemove,
		renderAutocomplete,
		selectedFilters,
	};
};

export default useTableSearch;
