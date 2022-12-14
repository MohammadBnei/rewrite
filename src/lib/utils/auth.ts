import * as cookie from 'cookie';
import { Buffer } from 'buffer';
import { UserModel, type User } from '$lib/models/user';

export interface AuthData {
	user?: User;
	jwt?: string;
	refreshToken?: string;
}

export const getAuthCookies = (authResponse: AuthData): string[] => {
	const jwt = authResponse.jwt
		? cookie.serialize('jwt', authResponse.jwt, {
				httpOnly: true,
				path: '/',
				expires: new Date(Date.now() + 5 * 60 * 1000)
		  })
		: '';

	const refreshToken = authResponse.refreshToken
		? cookie.serialize('refreshToken', authResponse.refreshToken, {
				httpOnly: true,
				path: '/',
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
		  })
		: '';

	const user = authResponse.user
		? cookie.serialize(
				'user',
				Buffer.from(JSON.stringify(new UserModel().deserialize(authResponse.user))).toString('base64'),
				{
					httpOnly: true,
					path: '/',
					expires: new Date(Date.now() + 5 * 60 * 1000)
				}
		  )
		: '';

	return [jwt, refreshToken, user].filter((c) => c !== '');
};

export const deleteCookies = [
	'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'refreshToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
];
