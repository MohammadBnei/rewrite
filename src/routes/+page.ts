export const load: LoadPage = async ({ fetch, session }) => {
    try {
        await fetch('/sitemap.xml');
        return {
            props: {
                user: session.user
            }
        };
    } catch (error) {
        console.error(error);
    }
};