import ClickableText from './ClickableText.svelte';

export default {
	title: 'Words/ClickableText',
	component: ClickableText
};

interface ClickableTextProps {
	text: string;
}

const Template = (args: ClickableTextProps) => ({
	Component: ClickableText,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {
	text: 'Ici un text aléatoire avec pour but de vérifier la clicabilité.'
} as ClickableTextProps;
