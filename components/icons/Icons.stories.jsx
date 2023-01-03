import { ThemedContainer } from '../helpers';
import Text from '../text/Text';
import { CloudIcons } from './Clouds';
import { DatabaseIcons } from './Databases';

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
				<CloudIcons.AWS />
				<CloudIcons.AWS circular />
				<CloudIcons.GCP />
				<CloudIcons.GCP circular />
				<CloudIcons.Azure />
				<CloudIcons.Azure circular />
				<CloudIcons.DigitalOcean />
				<CloudIcons.DigitalOcean circular />
				<CloudIcons.Oracle />
				<CloudIcons.Oracle circular />
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
				<DatabaseIcons.MSSql />
				<DatabaseIcons.MSSql circular />
				<DatabaseIcons.MongoDB />
				<DatabaseIcons.MongoDB circular />
				<DatabaseIcons.MySql />
				<DatabaseIcons.MySql circular />
				<DatabaseIcons.Oracle />
				<DatabaseIcons.Oracle circular />
				<DatabaseIcons.PgSql />
				<DatabaseIcons.PgSql circular />
			</div>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
