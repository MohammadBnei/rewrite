import type { IDeserializable } from './seo';

export interface User {
	id: string;
	email: string;
	username: string;
	createdAt: {
		nanos: number;
		seconds: number;
	};
}

export class UserModel implements IDeserializable<User> {
	public id: string;
	public email: string;
	public username: string;
	public createdAt: Date;

	deserialize(input: User): this {
		const d = new Date(0);
		d.setSeconds(input.createdAt.seconds);
		Object.assign(this, { ...input, createdAt: d });
		return this;
	}
}
