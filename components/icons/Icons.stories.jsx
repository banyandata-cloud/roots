import { ThemedContainer } from '../helpers';
import Text from '../text/Text';
import { MagnifyingGlassIcon } from './MagnifyingGlass';
import { TrashIcon } from './Trash';

export default {
	title: 'Components/Icons',
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'All the icons',
	},
};

const Template = () => {
	return (
		<ThemedContainer theme='light'>
			<Text variant='h2' stroke='medium'>
				Clouds
			</Text>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					margin: '1rem 0',
				}}>
				<TrashIcon />
			</div>
			<Text variant='h2' stroke='medium'>
				Databases
			</Text>
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
