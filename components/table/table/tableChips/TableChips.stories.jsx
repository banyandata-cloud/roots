import ThemedContainer from '../../../helpers/themedContainer/ThemedContainer';
import { CalenderIcon, CopyIcon, ServerIcon } from '../../../icons';
import ChipDropdown from './chipDropdown/ChipDropdown';
import { TableChip } from './TableChip.class';
import TableChips from './TableChips';

export default {
	title: 'Components/Table/TableTop/Chips',
	component: TableChips,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

const Template = (args) => {
	return (
		<ThemedContainer {...args}>
			<TableChips {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

const CHIP_OPTIONS = ['Option A', 'Option B'];

Default.args = {
	showBack: true,
	chips: [
		new TableChip({
			key: 'something',
			icon: ServerIcon,
			label: 'DB Tech',
			value: 'PgSQL',
			search: true,
		}),
		new TableChip({
			key: 'something',
			icon: ServerIcon,
			label: 'DB Tech',
			value: 'MySQL',
			disabled: true,
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <CopyIcon {...iconProps} />;
			},
			label: 'Cloud',
			value: 'Google',
		}),
		new TableChip({
			id: 'reg',
			icon: CalenderIcon,
			label: 'Regulations',
			value: '',
			rightComponent: () => {
				return (
					<ChipDropdown
						options={CHIP_OPTIONS?.map((option) => {
							return {
								title: option,
								value: option,
							};
						})}
						value={' '}
						formatter={() => {
							return null;
						}}
					/>
				);
			},
		}),
		new TableChip({
			key: 'something',
			icon: (iconProps) => {
				return <CalenderIcon {...iconProps} />;
			},
			label: 'Hidden',
			value: null,
			disabled: true,
		}),
	],
};

Default.parameters = {};

export const HiddenOnNull = Template.bind({});

HiddenOnNull.args = {
	showBack: true,
	chips: Default.args.chips.map((chip) => {
		return {
			...chip,
			value: null,
		};
	}),
};
