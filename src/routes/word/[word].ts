import { fetchWord } from '$lib/service/word';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const word = await fetchWord(params.word);
	return {
		body: word,
		maxage: 60 * 10
	};
};
