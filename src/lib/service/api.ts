import { browser, dev } from '$app/env';
import { addToast } from '$stores/toast';
import { ToastTypes } from '$lib/models/util/toast';
import { addFetching, removeFetching } from '$stores/fetching';

const VITE_API_URL = 'https://api.voconsteroid.com/';

export const WORD_API = VITE_API_URL + 'api/words/';

interface Opts {
	method: string;
	data?: unknown;
	path?: string;
	token?: string;
	cookies?: string;
	endpointFetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	headers?: Record<string, string>;
}

const fetchOptions = {
	timeout: 5000,
	endpointUri: '/endpoint/'
};

export const deleteCookies = [
	'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'refreshToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
];

const { endpointUri, timeout } = fetchOptions;

async function send({ method, path: uri, data, endpointFetch, token, cookies, headers }: Opts): Promise<Response> {
	const fetchId = addFetching();
	const opts: RequestInit = { method, headers: {} };
	opts.headers['Accept'] = 'application/json';

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = 'Bearer ' + token;
	}

	if (cookies) {
		opts.headers['cookie'] = cookies;
	}

	if (headers) {
		for (const [key, value] of Object.entries(headers)) {
			opts.headers[key] = value;
		}
	}

	let id;
	if (browser) {
		const abortController = new AbortController();
		id = setTimeout(() => {
			abortController.abort();
			addToast({
				dismissable: true,
				message: 'Something is wrong with the server, try again later',
				type: ToastTypes.Error
			});
		}, timeout);
		opts.signal = abortController.signal;
	}

	const url = uri.startsWith('http') ? uri : `${endpointUri}${uri}`;
	const res = endpointFetch ? endpointFetch(url, opts) : fetch(url, opts);

	try {
		if ((await res).status === 401) {
			await put({ data: {}, path: 'logout' });
			const unauthorizedResponse = new Response('Disconnected', {
				status: 401
			});
			deleteCookies.map((c) => unauthorizedResponse.headers.append('set-cookie', c));
			return unauthorizedResponse;
		}
		return res;
	} catch (error) {
		return new Response(error, {
			status: 500
		});
	} finally {
		id && clearTimeout(id);
		removeFetching(fetchId);
	}
}

interface Get {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	token?: string;
	cookies?: string;
	headers?: Record<string, string>;
}

export function get(opts: Get): Promise<Response> {
	return send({ ...opts, method: 'GET', endpointFetch: fetch });
}

interface Post extends Get {
	data: unknown;
}

export function del(opts: Post): Promise<Response> {
	return send({ method: 'DELETE', ...opts, endpointFetch: fetch });
}

export function post(opts: Post): Promise<Response> {
	return send({ method: 'POST', ...opts, endpointFetch: fetch });
}

export function put(opts: Post): Promise<Response> {
	return send({ method: 'PUT', ...opts, endpointFetch: fetch });
}

export async function handleRes(res: Response, loggerInstance?: string): Promise<Record<string, string> | unknown> {
	try {
		const data = await res.json();

		if (!res.ok) {
			let errMsg: string = data?.message || 'Something went wrong';
			if (errMsg.startsWith('rpc error')) {
				errMsg = errMsg.split(' = ').pop() as string;
			}
			browser && addToast({ dismissable: true, message: errMsg, type: ToastTypes.Error });
			// eslint-disable-next-line no-console
			console.error(errMsg);
		}

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		dev && loggerInstance && console.error(error);
		return error;
	}
}

export const handleResponseCookies = (res: Response, ...cookies: string[]) => {
	const setCookie = res.headers.raw()['set-cookie'] || [];

	setCookie.push(...cookies);

	if (setCookie && !!setCookie.length) {
		return {
			headers: {
				'set-cookie': setCookie
			}
		};
	}

	return {};
};

interface loadedFetchI {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	data?: Record<string, string>;
}

export const loadedFetch = (opts: { cookies?: string; token?: string; headers?: Record<string, string> }) => ({
	get: ({ path, fetch }: loadedFetchI) => get({ path, fetch, ...opts }),
	del: ({ path, fetch, data }: loadedFetchI) => del({ path, fetch, data, ...opts }),
	post: ({ path, fetch, data }: loadedFetchI) => post({ path, fetch, data, ...opts }),
	put: ({ path, fetch, data }: loadedFetchI) => put({ path, fetch, data, ...opts })
});

export const getBody = async (request: Request) => {
	const clRequest = request.clone();
	let body;
	try {
		body = await clRequest.json();
	} catch (error) {
		body = await request.json();
	}

	return body;
};
