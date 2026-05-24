import { getBlogBySlug, getAllBlogs } from '$lib/utils/data.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const blog = getBlogBySlug(params.slug);

	if (!blog) {
		error(404, {
			message: 'Article not found'
		});
	}

	return {
		blog
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	const blogs = getAllBlogs();
	return blogs.map((blog) => ({
		slug: blog.slug
	}));
}
