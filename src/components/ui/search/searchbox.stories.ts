import { action } from '@storybook/addon-actions';
import SearchBox from './SearchBox.svelte';

export default {
	title: 'UI/SearchBox',
	component: SearchBox
};

interface SearchBoxProps {
	value?: string;
	options?: { label: string; link: string }[];
	keys?: Record<string, string>[];
}

const Template = (args: SearchBoxProps) => ({
	Component: SearchBox,
	props: args,
	on: { type: action('type'), pick: action('pick') }
});

export const Primary = Template.bind({});
Primary.args = {
	options: [
		{ label: 'Example', link: '/' },
		{ label: 'Search with fuzzy', link: '/also' },
		{ label: 'Bolds the text', link: '/in' },
		{ label: 'Other example', link: '/the-link' }
	]
} as SearchBoxProps;
