import { useState } from 'react';
import { inputHelper } from '../../../../../utils';
import { TableChip } from '../../tableChips/TableChip.class';
import { DropdownItem } from '../../../../input';

const useTableSearch = ({ filters = [], onApply } = {}) => {
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [autocompleteOpen, setAutocompleteOpen] = useState(false);
	const [value, setValue] = useState('');

	const onChange = (event, newValue) => {
		setValue(newValue);
	};

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
			// the chip is about to be locked
			if (lock && type === 'value') {
				onApply?.(clonedFilters);
				current.temp = true;
			}
			setSelectedFilters(clonedFilters);
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

	const onLock = (event, index) => {
		if (event.keyCode === 13) {
			const current = selectedFilters?.[index];
			if (current && current?.value?.length > 0) {
				setFieldValue(current.value, 'value', current.value, true);
			}
		}
	};

	// on selecting searchbar option we will add an empty chip
	// that chip will have dropdown options from all filters provided through options
	const onAdd = (fil) => {
		const clonedFilters = [...selectedFilters];
		const newChip = new TableChip({
			labelSearch: false,
			label: fil.title,
			labelId: fil.id,
			icon: fil.icon,
			valueSearch: true,
			autocompleteOptions: {
				middlewareOptions: {
					offset: {
						mainAxis: 10,
					},
				},
				predicate: () => {
					return true;
				},
				placement: 'bottom-start',
			},
		});
		clonedFilters.push(newChip);
		setSelectedFilters(clonedFilters);
		setValue('');
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

	// the autocomplete options which get rendered for table searchbar
	// call the onAdd method on selection of an option
	const renderAutocomplete = ({ value: inputValue }) => {
		return filters
			?.filter((fil) => {
				return fil?.title.toLowerCase()?.indexOf(inputValue?.toLowerCase()) !== -1;
			})
			?.map((fil) => {
				const disabled =
					fil.deps?.every?.((dep) => {
						return (
							selectedFilters?.find((sFil) => {
								return sFil?.labelId === dep && sFil.temp;
							}) != null
						);
					}) === false;
				return (
					<DropdownItem
						key={fil.id}
						value={fil.id}
						title={fil.title}
						disabled={disabled}
						onClick={() => {
							if (!disabled) {
								onAdd(fil);
								setAutocompleteOpen(false);
							}
						}}
					/>
				);
			});
	};

	// the autocomplete options which get rendered for a chip
	// and set the state on selection
	const renderChipAutocomplete = ({ name, value: inputValue }) => {
		let filtersDOM = [];
		if (name === 'label') {
			filtersDOM = filters
				?.filter((fil) => {
					return fil?.title.toLowerCase()?.indexOf(inputValue?.toLowerCase()) !== -1;
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
				?.options?.filter((option) => {
					return option?.toLowerCase()?.indexOf(inputValue?.toLowerCase()) !== -1;
				})
				?.map((option) => {
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
		onAdd,
		onBlur,
		onSearch,
		onRemove,
		onLock,
		searchbarOptions: {
			value,
			onChange,
			autocomplete: true,
			autocompleteOptions: {
				open: autocompleteOpen,
				setOpen: setAutocompleteOpen,
				render: renderAutocomplete,
				predicate: () => {
					return true;
				},
			},
		},
		renderChipAutocomplete,
		selectedFilters,
	};
};

export default useTableSearch;
