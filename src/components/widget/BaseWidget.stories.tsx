import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../buttons';
import { ThemedContainer } from '../helpers';
import { FilterIcon } from '../icons';
import { DropdownItemv2, Dropdownv2 } from '../input';
import { Toggle } from '../toggle';
import BaseWidget from './BaseWidget';

const meta: Meta<typeof BaseWidget> = {
	title: 'Components/Widget',
	component: BaseWidget,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof BaseWidget>;

export const Default: Story = {
	render: () => {
		const [dropValue, setDropValue] = useState('Option 1');
		const [headerToggle, setHeaderToggle] = useState('Option Test');

		const Body = ({ toggle }: any) => <div onClick={toggle}>Filter Body</div>;

		return (
			<ThemedContainer style={{ height: '100%', width: '100%' }}>
				<BaseWidget
					title='Compliance by Control Domain'
					titleDesc='Compliance & non-compliance score by control domain category'
					onBack={() => alert('This will bring you back')}
					onReload={() => alert('Reload')}
					body={Body}
					headerOptions={[
						{
							id: 'toggle',
							options: [
								{ id: '1', title: 'Option Test', value: 'Option Test' },
								{ id: '2', title: 'Option 2', value: 'Option 2' },
							],
							value: headerToggle,
							onChange: setHeaderToggle,
						},
					]}
					rightActions={({ toggleDrawer }: any) => (
						<>
							<Toggle
								v2
								options={[
									{ id: '1', title: 'Option 1', value: 'Option 1' },
									{ id: '2', title: 'Option 2', value: 'Option 2' },
								]}
								value={dropValue}
								onChange={setDropValue}
							/>

							<Dropdownv2
								placeholder='Region'
								value='1'
								onChange={(cb, data) => cb(data)}>
								{['India', 'USA', 'UAE', 'UK'].map((title, i) => (
									<DropdownItemv2 key={i} title={title} value={String(i + 1)} />
								))}
							</Dropdownv2>

							<Button
								title='Filter'
								variant='outlined'
								onClick={() => toggleDrawer({ data: { index: 0 } })}
								leftComponent={() => <FilterIcon v2 />}
							/>
						</>
					)}
				/>
			</ThemedContainer>
		);
	},
};

export const WithTitleOptions: Story = {
	render: () => {
		const [selectedValue, setSelectedValue] = useState('Option 1');

		return (
			<ThemedContainer style={{ height: '100%', width: '100%' }}>
				<BaseWidget
					title='Widget Title'
					subtitle='7 Services'
					showBack
					onBack={() => alert('Back')}
					onReload={() => alert('Reload')}
					titleOptions='Hello There'
					options={[
						{
							id: 'toggle',
							options: [
								{ id: '1', title: 'Option 1', value: 'Option 1' },
								{ id: '2', title: 'Option 2', value: 'Option 2' },
							],
							value: selectedValue,
							onChange: setSelectedValue,
						},
					]}
				/>
			</ThemedContainer>
		);
	},
};

export const WithFallback: Story = {
	render: () => (
		<ThemedContainer style={{ height: '100%', width: '100%' }}>
			<BaseWidget
				title='Widget Title'
				subtitle='7 Services'
				showFallback
				onReload={() => alert('Reload')}
			/>
		</ThemedContainer>
	),
};

export const LightTheme: Story = {
	render: () => {
		const [selectedValue, setSelectedValue] = useState('Option 1');

		return (
			<ThemedContainer style={{ height: '100%', width: '100%' }}>
				<BaseWidget
					title='Widget Title'
					subtitle='7 Services'
					titleDesc='Test Description'
					theme='light'
					toggle={{
						options: [
							{ id: '1', title: 'Option 1', value: 'Option 1' },
							{ id: '2', title: 'Option 2', value: 'Option 2' },
						],
						value: selectedValue,
						onChange: setSelectedValue,
					}}
				/>
			</ThemedContainer>
		);
	},
};
