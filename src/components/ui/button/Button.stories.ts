import Button from './Button.svelte';
import { action } from '@storybook/addon-actions';

export default {
	title: 'UI/Button/Button',
	component: Button,
	argsType: {
		onClick: { action: 'onClick' }
	}
};

interface ButtonProps {
	classes: string;
	contentText?: string;
}

const Template = (args: ButtonProps) => ({
	Component: Button,
	props: args,
	on: { onClick: action('onClick') }
});

export const Basic = Template.bind({});
Basic.args = {
	classes: ''
} as ButtonProps;
