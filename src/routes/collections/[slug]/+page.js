import { getCollectionBySlug, resolveCollectionProducts } from '$lib/utils/data.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const collection = getCollectionBySlug(params.slug);

	if (!collection) {
		error(404, `Collection "${params.slug}" not found`);
	}

	const products = resolveCollectionProducts(collection);

	return { collection, products };
}

export const prerender = true;
