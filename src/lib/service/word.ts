import { WordListModel, WordModel, type IWord, type IWordList } from '$lib/models/word';
import { WORD_API, get } from './api';

export async function fetchResemblingWord(input: string): Promise<WordListModel> {
	const res = await get({ path: WORD_API + 'suggestion/' + encodeURI(input) });

	if (!res.ok) {
		return [] as unknown as WordListModel;
	}
	const data = (await res.json()) as unknown as [IWordList];
	const resemblingWords = new WordListModel().deserialize(data);
	return resemblingWords;
}

export async function fetchWord(word: string): Promise<WordModel | void> {
	const res = await get({ path: WORD_API + word });
	if (res.ok) {
		const wordModel = new WordModel().deserialize((await res.json()) as unknown as IWord);
		return wordModel;
	}
}
