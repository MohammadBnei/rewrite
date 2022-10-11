import TextConverter from './TextConverter.svelte';

export default {
	title: 'Shared/TextConverter',
	component: TextConverter
};

interface ConverterProps {
	rawText: string;
}

const Template = (args: ConverterProps) => ({
	Component: TextConverter,
	props: args
});

export const Basic = Template.bind({});
Basic.args = {
	rawText: 'The word b/bold should be in bold'
} as ConverterProps;
