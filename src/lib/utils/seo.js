/**
 * SEO utilities for VypaaNagri
 * Generates dynamic <title>, meta, and OpenGraph tags per page.
 */

export const SITE_NAME = 'VypaaNagri';
export const SITE_URL = 'https://vypaarnagri.com';
export const SITE_DESCRIPTION =
	'Discover curated tech setups and home decor inspiration. Explore affiliate-linked products through beautiful visual collections.';
export const DEFAULT_OG_IMAGE =
	'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80';

/**
 * Build SEO metadata for a page
 * @param {{ title?: string, description?: string, image?: string, url?: string, type?: string }} opts
 */
export function buildSEO({
	title,
	description = SITE_DESCRIPTION,
	image = DEFAULT_OG_IMAGE,
	url = SITE_URL,
	type = 'website'
} = {}) {
	const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} | Discover & Inspire`;

	return {
		title: fullTitle,
		description,
		openGraph: {
			title: fullTitle,
			description,
			image,
			url,
			type,
			site_name: SITE_NAME
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			image
		}
	};
}

/**
 * Build SEO for a collection page
 * @param {object} collection
 */
export function buildCollectionSEO(collection) {
	return buildSEO({
		title: collection.title,
		description:
			collection.description ||
			`Explore the "${collection.title}" collection on ${SITE_NAME}. Curated affiliate products for your inspiration.`,
		image: collection.coverImage,
		url: `${SITE_URL}/collections/${collection.slug}`,
		type: 'article'
	});
}
