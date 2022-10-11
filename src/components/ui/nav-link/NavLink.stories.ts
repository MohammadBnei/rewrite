import NavLink from './NavLink.svelte';

export default {
	title: 'UI/NavLink',
	component: NavLink
};

interface NavLinkProps {
	href?: string;
}

const Template = (args: NavLinkProps) => ({
	Component: NavLink,
	props: args
});

export const Primary = Template.bind({});
Primary.args = {
	href: 'https://voconsteroid.com',
	label: 'NavLink'
};
