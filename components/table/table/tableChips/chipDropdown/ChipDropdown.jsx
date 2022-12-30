import { Dropdown, DropdownItem } from '../../../../input';
import styles from './ChipDropdown.module.css';

function ChipDropdown(props) {
	const { options, onChange, value, formatter } = props;

	return (
		<Dropdown
			className={styles.root}
			popperClassName={styles.popper}
			onChange={onChange}
			placeholder={null}
			multi
			value={value}
			formatter={formatter}>
			{options?.map((option) => {
				const { title, value: optionValue } = option;
				return (
					<DropdownItem
						title={title}
						value={optionValue}
						key={`${title}-${optionValue}`}
						variant='checkbox'
					/>
				);
			})}
		</Dropdown>
	);
}

ChipDropdown.defaultProps = {
	placeholder: 'Select an option',
	formatter: (total) => {
		return `${total} options selected`;
	},
};

export default ChipDropdown;
