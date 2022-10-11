import Header from './Header.svelte';

export default {
	title: 'UI/Header',
	component: Header
};

const Template = (args) => ({
	Component: Header,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {
	label: 'Header'
};
