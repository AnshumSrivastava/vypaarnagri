import { getProductById, getAllProducts } from '$lib/utils/data.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const product = getProductById(params.id);

	if (!product) {
		error(404, {
			message: 'Product not found'
		});
	}

	return {
		product
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	const products = getAllProducts();
	return products.map((product) => ({
		id: product.id
	}));
}
