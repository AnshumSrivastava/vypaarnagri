import { writable, derived } from 'svelte/store';
import { filterProducts } from '$lib/utils/data.js';

// ── Filter state ──────────────────────────────────────────────
export const searchQuery = writable('');
export const selectedTags = writable([]);
export const selectedCategory = writable('');
export const selectedSubcategory = writable('');
export const featuredOnly = writable(false);

// ── Source products (set by each page) ───────────────────────
export const sourceProducts = writable([]);

// ── Derived: filtered products ────────────────────────────────
export const filteredProducts = derived(
	[sourceProducts, searchQuery, selectedTags, selectedCategory, selectedSubcategory, featuredOnly],
	([$products, $query, $tags, $category, $subcategory, $featured]) => {
		return filterProducts($products, {
			query: $query,
			tags: $tags,
			category: $category,
			subcategory: $subcategory,
			featuredOnly: $featured
		});
	}
);

// ── Actions ───────────────────────────────────────────────────

export function toggleTag(tag) {
	selectedTags.update((tags) => {
		if (tags.includes(tag)) {
			return tags.filter((t) => t !== tag);
		}
		return [...tags, tag];
	});
}

export function resetFilters() {
	searchQuery.set('');
	selectedTags.set([]);
	selectedSubcategory.set('');
	featuredOnly.set(false);
}
