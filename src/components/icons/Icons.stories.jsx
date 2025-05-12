import { ThemedContainer } from '../helpers';
import { MagnifyingGlassIcon } from './MagnifyingGlass';
import { TrashIcon } from './Trash';

export default {
	title: 'Components/Icons',
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'All the icons',
	},
};

const Template = () => {
	return (
		<ThemedContainer theme='light'>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					margin: '1rem 0',
				}}>
				<TrashIcon />
			</div>

			<div
				style={{
					display: 'flex',
					gap: '1rem',
					margin: '1rem 0',
				}}>
				<MagnifyingGlassIcon />
			</div>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
