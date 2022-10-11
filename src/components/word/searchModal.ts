import SearchModal from './SearchModal.svelte';

export default {
	title: 'Words/SearchModal',
	component: SearchModal
};

const Template = (args) => ({
	Component: SearchModal,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {};
