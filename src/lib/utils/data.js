/**
 * Data utilities for VypaaNagri Decor Makeover
 * Centralizes data loading, filtering, search, and dynamic resolver logic.
 */

import decorProducts from '../../data/products/decor.json';
import decorCollections from '../../data/collections/decor.json';
import blogs from '../../data/blogs.json';
import comparisons from '../../data/comparisons.json';

/** @returns {Array} All decor products */
export function getAllProducts() {
	return decorProducts;
}

/** @param {string} category ignored, returns all decor products */
export function getProductsByCategory(category) {
	return decorProducts;
}

/** @returns {Array} Featured products */
export function getFeaturedProducts(limit = 8) {
	return decorProducts
		.filter((p) => p.featured)
		.slice(0, limit);
}

/** @param {string} id */
export function getProductById(id) {
	return decorProducts.find((p) => p.id === id) ?? null;
}

/** @returns {Array} All collections */
export function getAllCollections() {
	return decorCollections;
}

/** @param {string} slug */
export function getCollectionBySlug(slug) {
	return decorCollections.find((c) => c.slug === slug) ?? null;
}

/**
 * Resolve product IDs in a collection to full product objects
 * @param {object} collection
 */
export function resolveCollectionProducts(collection) {
	if (!collection || !collection.products) return [];
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
	const { query, tags, subcategory, featuredOnly } = filters;

	return products.filter((p) => {
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
	return decorCollections
		.filter((c) => c.featured)
		.slice(0, limit);
}

/* ==========================================
   BLOG SERVICES
   ========================================== */

/** @returns {Array} All blog articles */
export function getAllBlogs() {
	return blogs;
}

/** @param {string} slug */
export function getBlogBySlug(slug) {
	return blogs.find((b) => b.slug === slug) ?? null;
}

/** @returns {Array} Featured or latest blog articles */
export function getFeaturedBlogs(limit = 3) {
	return blogs.slice(0, limit);
}

/* ==========================================
   COMPARISON SERVICES
   ========================================== */

/** @returns {Array} All product comparisons */
export function getAllComparisons() {
	return comparisons;
}

/** @param {string} slug */
export function getComparisonBySlug(slug) {
	return comparisons.find((c) => c.slug === slug) ?? null;
}

/** @returns {Array} Featured comparisons */
export function getFeaturedComparisons(limit = 2) {
	return comparisons.slice(0, limit);
}
