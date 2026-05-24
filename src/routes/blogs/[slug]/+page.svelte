<script>
	import { base } from '$app/paths';
	import { getProductById } from '$lib/utils/data.js';

	let { data } = $props();

	const blog = $derived(data.blog);

	// Resolve the full product details from the IDs mentioned in the blog post
	const products = $derived(
		blog.featuredProducts.map((id) => getProductById(id)).filter(Boolean)
	);
</script>

<svelte:head>
	<title>{blog.title} — VypaaDecor</title>
	<meta name="description" content={blog.excerpt} />
	<meta property="og:title" content="{blog.title} — VypaaDecor" />
	<meta property="og:description" content={blog.excerpt} />
	<meta property="og:image" content={blog.coverImage} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={blog.coverImage} />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<article class="blog-view animate-reveal">
	<!-- Breadcrumbs -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href="{base}/" class="breadcrumb-link">Home</a>
		<span class="breadcrumb-sep">›</span>
		<a href="{base}/blogs" class="breadcrumb-link">Blogs & Guides</a>
		<span class="breadcrumb-sep">›</span>
		<span class="breadcrumb-current">{blog.title}</span>
	</nav>

	<!-- Blog Hero Header -->
	<header class="blog-hero">
		<div class="blog-meta">
			<span class="blog-category">Style Journal</span>
			<span class="meta-dot">·</span>
			<span class="blog-date">{blog.date}</span>
			<span class="meta-dot">·</span>
			<span class="blog-time">{blog.readTime}</span>
		</div>
		<h1 class="blog-headline">{blog.title}</h1>
		<p class="blog-excerpt">{blog.excerpt}</p>
		
		<div class="author-meta">
			<div class="author-avatar">AS</div>
			<div class="author-info">
				<p class="author-name">Written by {blog.author}</p>
				<p class="author-role">Design Curator</p>
			</div>
		</div>
	</header>

	<!-- Main Cover Image -->
	<div class="cover-image-wrap">
		<img src={blog.coverImage} alt={blog.title} class="cover-img" />
	</div>

	<!-- Two-column Layout (Content + Featured products sidebar) -->
	<div class="blog-content-layout">
		<!-- Left: Article Content -->
		<main class="article-body">
			<!-- Simple parser replacing \n with actual paragraphs -->
			{#each blog.content.split('\n\n') as paragraph}
				{#if paragraph.startsWith('###')}
					<h3 class="article-section-title">{paragraph.replace('###', '').trim()}</h3>
				{:else if paragraph.startsWith('*')}
					<ul class="article-list">
						{#each paragraph.split('\n') as listItem}
							<li>{listItem.replace('*', '').trim()}</li>
						{/each}
					</ul>
				{:else}
					<p class="article-p">{paragraph}</p>
				{/if}
			{/each}
		</main>

		<!-- Right: Sticky Sponsored Products Sidebar -->
		{#if products.length > 0}
			<aside class="sponsored-sidebar">
				<div class="sidebar-card">
					<div class="sidebar-header">
						<span class="sidebar-badge">Curator's Picks</span>
						<h3 class="sidebar-title">Shop This Article</h3>
						<p class="sidebar-desc">Love the aesthetic? We've gathered the exact items from this guide below for quick browsing.</p>
					</div>

					<div class="products-list">
						{#each products as product}
							<div class="product-item">
								<a href="{base}/products/{product.id}" class="prod-img-link">
									<img src={product.images[0]} alt={product.title} class="prod-thumbnail" />
								</a>
								<div class="prod-info">
									<h4 class="prod-title">
										<a href="{base}/products/{product.id}" class="prod-title-link">{product.title}</a>
									</h4>
									<div class="prod-meta">
										<span class="prod-price">{product.price}</span>
										<span class="meta-dot">·</span>
										<span class="prod-subcat">{product.subcategory}</span>
									</div>
									<div class="prod-links">
										<a href={product.affiliateLinks[0].url} target="_blank" rel="noopener noreferrer sponsored" class="quick-buy-btn">
											Shop on {product.affiliateLinks[0].label}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
												<path d="M5 12h14M12 5l7 7-7 7" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						{/each}
					</div>
					
					<p class="sidebar-disclaimer">
						* Features affiliate links. Direct sponsored support details can be viewed on detail pages.
					</p>
				</div>
			</aside>
		{/if}
	</div>

	<!-- Bottom Section: Back to all blogs -->
	<footer class="blog-view-footer">
		<a href="{base}/blogs" class="back-to-blogs-link">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="back-icon">
				<path d="m15 18-6-6 6-6" />
			</svg>
			Back to Design Blogs & Guides
		</a>
	</footer>
</article>

<style>
	.blog-view {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	/* ── Breadcrumb ───────────────────────── */
	.breadcrumb {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--decor-muted);
	}

	.breadcrumb-link {
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover { color: var(--decor-accent); }

	.breadcrumb-sep {
		opacity: 0.6;
	}

	.breadcrumb-current {
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 250px;
	}

	/* ── Hero Header ──────────────────────── */
	.blog-hero {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.blog-meta {
		display: flex;
		align-items: center;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--decor-muted);
	}

	.blog-category {
		color: var(--decor-accent);
	}

	.meta-dot {
		margin: 0 0.5rem;
		opacity: 0.6;
	}

	.blog-headline {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5vw, 3.25rem);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
	}

	.blog-excerpt {
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--decor-muted);
	}

	/* Author info */
	.author-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.author-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--decor-accent);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 700;
	}

	.author-info {
		display: flex;
		flex-direction: column;
		line-height: 1.35;
	}

	.author-name {
		font-size: 0.85rem;
		font-weight: 700;
	}

	.author-role {
		font-size: 0.75rem;
		color: var(--decor-muted);
	}

	/* ── Cover Image ──────────────────────── */
	.cover-image-wrap {
		width: 100%;
		aspect-ratio: 16/9;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--decor-border);
		box-shadow: var(--shadow-card);
		background: var(--decor-surface);
	}

	.cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* ── Content Layout ───────────────────── */
	.blog-content-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3.5rem;
		align-items: start;
	}

	@media (min-width: 960px) {
		.blog-content-layout {
			grid-template-columns: 1fr 340px;
		}
	}

	/* Left: Article text */
	.article-body {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 760px;
	}

	.article-p {
		font-size: 1.05rem;
		line-height: 1.75;
		color: #4c3c32;
	}

	.article-section-title {
		font-family: var(--font-decor);
		font-size: 1.45rem;
		font-weight: 700;
		color: var(--decor-text);
		margin-top: 1.5rem;
		line-height: 1.3;
	}

	.article-list {
		padding-left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1.05rem;
		color: #4c3c32;
		line-height: 1.7;
	}

	/* Right: Sticky Products Sidebar */
	.sponsored-sidebar {
		position: sticky;
		top: 100px;
	}

	.sidebar-card {
		background: var(--decor-surface);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		box-shadow: var(--shadow-card);
	}

	.sidebar-header {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.sidebar-badge {
		align-self: flex-start;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: rgba(196, 119, 65, 0.1);
		color: var(--decor-accent);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.sidebar-title {
		font-family: var(--font-decor);
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.sidebar-desc {
		font-size: 0.775rem;
		line-height: 1.5;
		color: var(--decor-muted);
	}

	/* Products listing */
	.products-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.product-item {
		display: flex;
		gap: 0.875rem;
		align-items: center;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid rgba(232, 221, 210, 0.6);
	}

	.product-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.prod-img-link {
		width: 64px;
		height: 64px;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;
		border: 1px solid var(--decor-border);
		background: white;
	}

	.prod-thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.prod-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		flex: 1;
	}

	.prod-title {
		font-family: var(--font-body);
		font-size: 0.825rem;
		font-weight: 700;
		line-height: 1.3;
		color: var(--decor-text);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.prod-title-link {
		color: inherit;
		text-decoration: none;
		transition: var(--transition);
	}

	.prod-title-link:hover {
		color: var(--decor-accent);
	}

	.prod-meta {
		display: flex;
		align-items: center;
		font-size: 0.725rem;
		color: var(--decor-muted);
		font-weight: 600;
	}

	.prod-price {
		color: var(--decor-accent);
	}

	.prod-subcat {
		text-transform: capitalize;
	}

	.prod-links {
		margin-top: 0.2rem;
	}

	.quick-buy-btn {
		font-size: 0.725rem;
		font-weight: 700;
		color: var(--decor-accent);
		display: inline-flex;
		align-items: center;
		gap: 0.15rem;
		transition: var(--transition);
	}

	.quick-buy-btn:hover {
		color: #a86030;
	}

	.quick-buy-btn .arrow-icon {
		width: 11px;
		height: 11px;
		transition: transform 0.2s ease;
	}

	.quick-buy-btn:hover .arrow-icon {
		transform: translateX(2px);
	}

	.sidebar-disclaimer {
		font-size: 0.65rem;
		color: var(--decor-muted);
		line-height: 1.4;
		opacity: 0.8;
	}

	/* ── Blog View Footer ─────────────────── */
	.blog-view-footer {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--decor-border);
	}

	.back-to-blogs-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--decor-muted);
		transition: var(--transition);
	}

	.back-to-blogs-link:hover {
		color: var(--decor-accent);
	}

	.back-icon {
		width: 16px;
		height: 16px;
	}
</style>
