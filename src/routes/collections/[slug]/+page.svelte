<script>
	import { base } from '$app/paths';
	import MasonryGrid from '$lib/components/MasonryGrid.svelte';

	let { data } = $props();

	const collection = $derived(data.collection);
	const products = $derived(data.products);
</script>

<svelte:head>
	<title>{collection.title} — VypaaDecor</title>
	<meta name="description" content={collection.description || `Explore the ${collection.title} collection on VypaaDecor.`} />
	<meta property="og:title" content="{collection.title} — VypaaDecor" />
	<meta property="og:description" content={collection.description || `Curated affiliate products in the ${collection.title} collection.`} />
	<meta property="og:image" content={collection.coverImage} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={collection.coverImage} />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<div class="page-decor animate-reveal">
	<!-- Collection Hero -->
	<header class="collection-hero">
		<div class="hero-image-wrap">
			<img
				src={collection.coverImage}
				alt={collection.title}
				class="hero-img"
				loading="eager"
				onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80'; }}
			/>
			<div class="hero-overlay"></div>
		</div>

		<div class="hero-content">
			<div class="breadcrumb">
				<a href="{base}/" class="breadcrumb-link">Home</a>
				<span class="breadcrumb-sep">›</span>
				<span class="breadcrumb-current">{collection.title}</span>
			</div>

			<div class="hero-badge">Style Collection</div>
			<h1 class="hero-title">{collection.title}</h1>

			{#if collection.description}
				<p class="hero-desc">{collection.description}</p>
			{/if}

			<div class="hero-meta">
				<span class="meta-item">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon">
						<rect x="3" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" />
						<rect x="3" y="14" width="7" height="7" rx="1" />
					</svg>
					{products.length} handpicked curation{products.length === 1 ? '' : 's'}
				</span>
				<span class="meta-dot">·</span>
				<span class="meta-item">Affiliate links inside</span>
			</div>
		</div>
	</header>

	<!-- Products -->
	<section class="products-section">
		<div class="container">
			{#if products.length === 0}
				<div class="empty">
					<p>This collection has no products yet. Check back soon!</p>
				</div>
			{:else}
				<!-- Intro copy -->
				<div class="intro-copy">
					<p class="intro-text">
						Every product in this collection is curated for its aesthetic warm value, functional craft, and quality. Click any item to explore sizing, pricing, and affiliate checkout options. ✦
					</p>
				</div>

				<MasonryGrid {products} theme="decor" />
			{/if}
		</div>
	</section>

	<!-- Share / Pinterest CTA -->
	<section class="share-section">
		<div class="share-inner">
			<h2 class="share-title">Inspired by this collection?</h2>
			<p class="share-sub">Save it on Pinterest to help others build their cozy home sanctuary.</p>
			<div class="share-btns">
				<a
					href="https://pinterest.com/pin/create/button/?url={encodeURIComponent(`https://anshumsrivastava.github.io/vypaarnagri/collections/${collection.slug}`)}&media={encodeURIComponent(collection.coverImage)}&description={encodeURIComponent(collection.title)}"
					target="_blank"
					rel="noopener noreferrer"
					class="pinterest-btn"
					aria-label="Save to Pinterest"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="pinterest-icon">
						<path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
					</svg>
					Save on Pinterest
				</a>
			</div>
		</div>
	</section>

	<!-- Back nav -->
	<div class="back-nav">
		<div class="container">
			<a href="{base}/" class="back-link">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="back-icon">
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to Shop catalog
			</a>
		</div>
	</div>
</div>

<style>
	.page-decor {
		background: var(--decor-bg);
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	/* ── Collection Hero ──────────────────── */
	.collection-hero {
		position: relative;
		height: clamp(380px, 50vh, 500px);
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		border-bottom: 1px solid var(--decor-border);
	}

	.hero-image-wrap {
		position: absolute;
		inset: 0;
	}

	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(61, 43, 31, 0.95) 0%,
			rgba(61, 43, 31, 0.45) 50%,
			rgba(61, 43, 31, 0.15) 100%
		);
	}

	.hero-content {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: rgba(254, 250, 246, 0.6);
	}

	.breadcrumb-link {
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover {
		color: white;
	}

	.breadcrumb-sep {
		opacity: 0.5;
	}

	.breadcrumb-current {
		color: rgba(254, 250, 246, 0.9);
	}

	.hero-badge {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--decor-accent);
		margin-top: 0.25rem;
	}

	.hero-title {
		font-family: var(--font-decor);
		font-size: clamp(1.75rem, 5vw, 2.75rem);
		font-weight: 700;
		color: white;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.hero-desc {
		font-size: 0.95rem;
		color: rgba(254, 250, 246, 0.75);
		line-height: 1.6;
		max-width: 580px;
	}

	.hero-meta {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.8rem;
		color: rgba(254, 250, 246, 0.55);
		margin-top: 0.25rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.meta-icon {
		width: 13px;
		height: 13px;
	}

	.meta-dot {
		opacity: 0.5;
	}

	/* ── Products ─────────────────────────── */
	.products-section {
		padding: 4rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.intro-copy {
		margin-bottom: 2.5rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-card);
		border-left: 3px solid var(--decor-accent);
		background: rgba(196, 119, 65, 0.05);
	}

	.intro-text {
		font-size: 0.875rem;
		line-height: 1.65;
		color: var(--decor-muted);
		max-width: 720px;
	}

	.empty {
		text-align: center;
		padding: 5rem 2rem;
		color: var(--decor-muted);
	}

	/* ── Share Section ────────────────────── */
	.share-section {
		padding: 4rem 1.5rem;
		background: var(--decor-surface);
		border-top: 1px solid var(--decor-border);
		border-bottom: 1px solid var(--decor-border);
		margin-top: 3rem;
	}

	.share-inner {
		max-width: 480px;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.share-title {
		font-family: var(--font-decor);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.share-sub {
		font-size: 0.875rem;
		color: var(--decor-muted);
	}

	.share-btns {
		margin-top: 0.5rem;
	}

	.pinterest-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: #e60023;
		color: white;
		font-weight: 700;
		font-size: 0.875rem;
		border-radius: var(--radius-btn);
		text-decoration: none;
		transition: var(--transition);
		box-shadow: 0 4px 16px rgba(230, 0, 35, 0.3);
	}

	.pinterest-btn:hover {
		background: #c0001d;
		transform: translateY(-2px);
		box-shadow: 0 6px 24px rgba(230, 0, 35, 0.45);
	}

	.pinterest-icon {
		width: 18px;
		height: 18px;
	}

	/* ── Back nav ─────────────────────────── */
	.back-nav {
		padding: 2rem 0;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--decor-muted);
		text-decoration: none;
		transition: var(--transition);
	}

	.back-link:hover {
		color: var(--decor-accent);
	}

	.back-icon {
		width: 16px;
		height: 16px;
	}
</style>
