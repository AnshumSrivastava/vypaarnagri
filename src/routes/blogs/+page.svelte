<script>
	import { base } from '$app/paths';
	import { getAllBlogs } from '$lib/utils/data.js';

	const blogs = getAllBlogs();
</script>

<svelte:head>
	<title>Design Blogs & Styling Guides | VypaaDecor</title>
	<meta name="description" content="Explore Wabi-Sabi styling, Japandi design guides, lighting rules, and rustic interior curations to make your home a cozy haven." />
	<meta property="og:title" content="Design Blogs & Styling Guides | VypaaDecor" />
	<meta property="og:description" content="Curated insights for slow living and cozy aesthetics. Step-by-step room styling guides." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" />
</svelte:head>

<div class="blogs-page animate-reveal">
	<header class="blogs-header">
		<span class="eyebrow">Aesthetic Insights</span>
		<h1 class="page-title">Design Blogs & Curation Guides</h1>
		<p class="page-desc">
			Explore our intentional, slow-living guides to bring rustic Scandinavian charm, peaceful Japanese minimalism, and warm light textures into your everyday spaces.
		</p>
	</header>

	<main class="blogs-grid">
		{#each blogs as blog, i}
			<article class="blog-card" style="animation-delay: {i * 80}ms">
				<a href="{base}/blogs/{blog.slug}" class="image-link" aria-label="Read: {blog.title}">
					<img src={blog.coverImage} alt={blog.title} class="blog-img" loading="lazy" />
				</a>
				
				<div class="blog-body">
					<div class="blog-meta">
						<span class="blog-date">{blog.date}</span>
						<span class="meta-dot">·</span>
						<span class="blog-time">{blog.readTime}</span>
					</div>

					<h2 class="blog-title">
						<a href="{base}/blogs/{blog.slug}" class="title-link">{blog.title}</a>
					</h2>

					<p class="blog-excerpt">{blog.excerpt}</p>

					<div class="blog-footer">
						<div class="blog-tags">
							{#each blog.tags.slice(0, 2) as tag}
								<span class="tag-badge">#{tag}</span>
							{/each}
						</div>

						<a href="{base}/blogs/{blog.slug}" class="read-more-link">
							Read Article
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</main>
</div>

<style>
	.blogs-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
	}

	.blogs-header {
		text-align: center;
		max-width: 680px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--decor-accent);
	}

	.page-title {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5vw, 2.75rem);
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.15;
	}

	.page-desc {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--decor-muted);
	}

	/* Blogs Feed List */
	.blogs-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 680px) {
		.blogs-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.blog-card {
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-card);
		transition: var(--transition);
	}

	.blog-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		border-color: rgba(196, 119, 65, 0.2);
	}

	.image-link {
		width: 100%;
		aspect-ratio: 16/10;
		overflow: hidden;
		display: block;
		background: var(--decor-surface);
	}

	.blog-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.blog-card:hover .blog-img {
		transform: scale(1.03);
	}

	.blog-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		flex: 1;
	}

	.blog-meta {
		display: flex;
		align-items: center;
		font-size: 0.75rem;
		color: var(--decor-muted);
		font-weight: 500;
	}

	.meta-dot {
		margin: 0 0.4rem;
		opacity: 0.6;
	}

	.blog-title {
		font-family: var(--font-decor);
		font-size: 1.15rem;
		font-weight: 700;
		line-height: 1.35;
		color: var(--decor-text);
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		transition: var(--transition);
	}

	.title-link:hover {
		color: var(--decor-accent);
	}

	.blog-excerpt {
		font-size: 0.875rem;
		color: var(--decor-muted);
		line-height: 1.6;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.blog-footer {
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid rgba(232, 221, 210, 0.5);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.blog-tags {
		display: flex;
		gap: 0.35rem;
	}

	.tag-badge {
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--decor-muted);
		background: var(--decor-surface);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.read-more-link {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--decor-accent);
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		transition: var(--transition);
	}

	.read-more-link:hover {
		color: #a86030;
	}

	.arrow-icon {
		width: 14px;
		height: 14px;
		transition: transform 0.2s ease;
	}

	.read-more-link:hover .arrow-icon {
		transform: translateX(3px);
	}
</style>
