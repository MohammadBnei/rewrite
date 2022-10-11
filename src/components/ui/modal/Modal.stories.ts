import ModalStory from './ModalStory.svelte';

export default {
	title: 'UI/Modal/Modal',
	component: ModalStory
};

interface ModalProps {
	classes: string;
	contentText?: string;
}

const Template = (args: ModalProps) => ({
	Component: ModalStory,
	props: args
});

export const Basic = Template.bind({});
Basic.args = {
	classes: ''
} as ModalProps;
