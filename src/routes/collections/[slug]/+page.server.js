import { getAllCollections } from '$lib/utils/data.js';

export function entries() {
	return getAllCollections().map((c) => ({ slug: c.slug }));
}

export const prerender = true;
