import { getComparisonBySlug, getAllComparisons } from '$lib/utils/data.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const comparison = getComparisonBySlug(params.slug);

	if (!comparison) {
		error(404, {
			message: 'Comparison guide not found'
		});
	}

	return {
		comparison
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	const comparisons = getAllComparisons();
	return comparisons.map((guide) => ({
		slug: guide.slug
	}));
}
