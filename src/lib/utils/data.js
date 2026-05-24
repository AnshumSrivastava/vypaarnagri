/**
 * Data utilities for VypaaNagri
 * All data loading + filtering logic lives here.
 * Components stay clean — all business logic is centralized.
 */

import techProducts from '../../data/products/tech.json';
import decorProducts from '../../data/products/decor.json';
import techCollections from '../../data/collections/tech.json';
import decorCollections from '../../data/collections/decor.json';

/** @returns {Array} All products combined */
export function getAllProducts() {
	return [...techProducts, ...decorProducts];
}

/** @param {'tech'|'decor'} category */
export function getProductsByCategory(category) {
	return category === 'tech' ? techProducts : decorProducts;
}

/** @returns {Array} Featured products from all categories */
export function getFeaturedProducts(limit = 8) {
	return getAllProducts()
		.filter((p) => p.featured)
		.slice(0, limit);
}

/** @param {string} id */
export function getProductById(id) {
	return getAllProducts().find((p) => p.id === id) ?? null;
}

/** @returns {Array} All collections combined */
export function getAllCollections() {
	return [...techCollections, ...decorCollections];
}

/** @param {'tech'|'decor'} category */
export function getCollectionsByCategory(category) {
	return category === 'tech' ? techCollections : decorCollections;
}

/** @param {string} slug */
export function getCollectionBySlug(slug) {
	return getAllCollections().find((c) => c.slug === slug) ?? null;
}

/**
 * Resolve product IDs in a collection to full product objects
 * @param {object} collection
 */
export function resolveCollectionProducts(collection) {
	return collection.products
		.map((id) => getProductById(id))
		.filter(Boolean);
}

/**
 * Frontend search + filter
 * @param {Array} products
 * @param {{ query: string, tags: string[], category: string, subcategory: string, featuredOnly: boolean }} filters
 */
export function filterProducts(products, filters) {
	const { query, tags, category, subcategory, featuredOnly } = filters;

	return products.filter((p) => {
		// Category filter
		if (category && p.category !== category) return false;

		// Subcategory filter
		if (subcategory && p.subcategory !== subcategory) return false;

		// Featured filter
		if (featuredOnly && !p.featured) return false;

		// Tag filter (product must have ALL selected tags)
		if (tags && tags.length > 0) {
			const hasAllTags = tags.every((tag) => p.tags.includes(tag));
			if (!hasAllTags) return false;
		}

		// Text search (title, description, tags)
		if (query && query.trim()) {
			const q = query.toLowerCase();
			const searchableText = [p.title, p.description, ...p.tags].join(' ').toLowerCase();
			if (!searchableText.includes(q)) return false;
		}

		return true;
	});
}

/**
 * Get all unique tags from a product array
 * @param {Array} products
 */
export function extractTags(products) {
	const tagSet = new Set();
	products.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
	return [...tagSet].sort();
}

/**
 * Get all unique subcategories from a product array
 * @param {Array} products
 */
export function extractSubcategories(products) {
	const set = new Set();
	products.forEach((p) => set.add(p.subcategory));
	return [...set].sort();
}

/**
 * Get featured collections
 * @param {number} limit
 */
export function getFeaturedCollections(limit = 6) {
	return getAllCollections()
		.filter((c) => c.featured)
		.slice(0, limit);
}
