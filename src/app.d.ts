/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { UserModel } from '$lib/models/user';

declare global {
	interface ImportMetaEnv {
		VITE_API_URL: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}

	declare namespace App {
		interface Locals {
			USER_API?: string;
			WORD_API?: string;
			ASSOC_API?: string;
			user?: UserModel;
			refreshToken?: boolean;
			fetch?: Record<unknown>;
			jwt?: string;
		}

		interface Session {
			user?: UserModel;
		}
	}
}
