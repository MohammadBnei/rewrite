import type { IDeserializable } from './util/deserializable';

export interface IWord {
	word: string;
	lang: string;
	types: ITypes[];
	etymologies: string[];
}

export interface ITypes {
	type: string;
	definitions: IDefinition[];
}

export interface IDefinition {
	definition: string;
	examples: string[];
}

export interface IWordList {
	key: string;
	title: string;
}

export class WordModel implements IDeserializable<IWord>, IWord {
	public word: string;
	public lang: string;
	public types: ITypes[];
	public etymologies: string[];

	deserialize(input: IWord): this {
		Object.assign(this, input);
		return this;
	}
}

export class WordListModel extends Array implements IDeserializable<Array<IWordList>>, Array<IWordList> {
	public key: string;
	public title: string;

	deserialize(input: IWordList[]): this {
		if (input) {
			input.map((v) => this.push({ ...v }));
		}
		return this;
	}
}
