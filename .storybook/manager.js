import { addons } from 'storybook/manager-api';
import { banyanTheme } from './banyanTheme';

addons.setConfig({
	theme: banyanTheme,
});
