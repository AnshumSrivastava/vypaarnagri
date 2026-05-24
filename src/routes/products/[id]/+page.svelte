<script>
	import { base } from '$app/paths';
	import { getAllCollections, getProductsByCategory } from '$lib/utils/data.js';
	import CollectionCard from '$lib/components/CollectionCard.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data } = $props();

	const product = $derived(data.product);

	let activeImageIndex = $state(0);

	// Reset image index when product changes
	$effect(() => {
		if (product) {
			activeImageIndex = 0;
		}
	});

	// Find collections featuring this product
	const featuringCollections = $derived(
		getAllCollections().filter((c) => c.products.includes(product.id))
	);

	// Get related products (same category, excluding current product)
	const relatedProducts = $derived(
		getProductsByCategory(product.category)
			.filter((p) => p.id !== product.id)
			.slice(0, 4)
	);

	const ctaLabels = ['Explore Product', 'View Setup', 'Discover More', 'Get The Look', 'Shop Now'];
	function getCTA(index) {
		return ctaLabels[index % ctaLabels.length];
	}
</script>

<svelte:head>
	<title>{product.title} — VypaaDecor</title>
	<meta name="description" content={product.description} />
	<meta property="og:title" content="{product.title} — VypaaDecor" />
	<meta property="og:description" content={product.description} />
	<meta property="og:image" content={product.images[0]} />
	<meta property="og:type" content="product" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={product.images[0]} />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<div class="product-page-container theme-decor animate-reveal">
	<div class="container">
		<!-- Breadcrumbs -->
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="{base}/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-sep">›</span>
			<a href="{base}/" class="breadcrumb-link capitalize">Decor</a>
			<span class="breadcrumb-sep">›</span>
			<span class="breadcrumb-current">{product.title}</span>
		</nav>

		<!-- Main Product Block -->
		<div class="product-grid">
			<!-- Left: Images -->
			<div class="product-images">
				<div class="main-image-wrap">
					<img
						src={product.images[activeImageIndex]}
						alt={product.title}
						class="main-img"
						onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'; }}
					/>
				</div>
				
				{#if product.images.length > 1}
					<div class="thumbnails" role="group" aria-label="Product thumbnails">
						{#each product.images as img, i}
							<button
								class="thumb-btn"
								class:active={activeImageIndex === i}
								onclick={() => (activeImageIndex = i)}
								aria-label="View image {i + 1}"
							>
								<img src={img} alt="Thumbnail {i + 1}" class="thumb-img" />
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Right: Info Details -->
			<div class="product-info">
				<span class="subcategory-badge">{product.subcategory}</span>
				<h1 class="product-title">{product.title}</h1>
				
				{#if product.price}
					<div class="product-price">{product.price}</div>
				{/if}

				<p class="product-desc">{product.description}</p>

				<div class="divider"></div>

				<!-- Affiliate CTAs -->
				<div class="product-ctas">
					{#each product.affiliateLinks as link, i}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer sponsored"
							class="cta-btn {i === 0 ? 'cta-primary' : 'cta-secondary'}"
						>
							<span>{i === 0 ? getCTA(i) : link.label}</span>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
						</a>
					{/each}
				</div>

				<!-- Disclaimer -->
				<p class="affiliate-disclaimer">
					* Clicking these affiliate links helps support our curations at no extra cost to you. We may earn a small commission.
				</p>

				<!-- Tags -->
				<div class="product-tags">
					<span class="tags-label">Tags:</span>
					<div class="tags-list">
						{#each product.tags as tag}
							<a href="{base}/?q={tag}" class="tag-chip">#{tag}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Featuring Collections -->
		{#if featuringCollections.length > 0}
			<section class="featuring-section">
				<div class="section-header">
					<h2 class="section-title">Featured in Collections</h2>
					<div class="section-line"></div>
				</div>
				<div class="collections-grid">
					{#each featuringCollections as collection}
						<CollectionCard {collection} theme="decor" />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Related Products -->
		{#if relatedProducts.length > 0}
			<section class="related-section">
				<div class="section-header">
					<h2 class="section-title">More Curated Finds</h2>
					<div class="section-line"></div>
				</div>
				<div class="related-products-grid">
					{#each relatedProducts as relatedProd}
						<ProductCard product={relatedProd} theme="decor" />
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.product-page-container {
		min-height: 90vh;
		padding: 3rem 0;
		background: var(--decor-bg);
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
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
		color: var(--decor-text);
	}

	/* ── Product Grid Layout ──────────────── */
	.product-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: start;
	}

	@media (min-width: 900px) {
		.product-grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}

	/* ── Product Images ───────────────────── */
	.product-images {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.main-image-wrap {
		width: 100%;
		aspect-ratio: 4/3;
		border-radius: var(--radius-card);
		overflow: hidden;
		background: var(--decor-surface);
		border: 1.5px solid var(--decor-border);
		box-shadow: var(--shadow-card);
	}

	.main-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.thumbnails {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.thumb-btn {
		width: 72px;
		height: 54px;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		background: none;
		border: 2px solid transparent;
		transition: var(--transition);
		flex-shrink: 0;
		border-color: rgba(232, 221, 210, 0.8);
	}

	.thumb-btn.active { border-color: var(--decor-accent); }

	.thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* ── Product Info ─────────────────────── */
	.product-info {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.subcategory-badge {
		align-self: flex-start;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		background: rgba(196, 119, 65, 0.1);
		color: var(--decor-accent);
	}

	.product-title {
		font-family: var(--font-decor);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		line-height: 1.15;
		color: var(--decor-text);
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--decor-accent);
	}

	.product-desc {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--decor-muted);
	}

	.divider {
		height: 1px;
		width: 100%;
		background: var(--decor-border);
	}

	/* ── CTAs ─────────────────────────────── */
	.product-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 700;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-btn);
		text-decoration: none;
		transition: var(--transition);
		min-width: 160px;
		flex: 1;
	}

	/* Decor Primary */
	.cta-primary {
		background: linear-gradient(135deg, var(--decor-accent), #a86030);
		color: white;
		box-shadow: 0 4px 16px rgba(196, 119, 65, 0.35);
	}

	.cta-primary:hover {
		box-shadow: 0 6px 24px rgba(196, 119, 65, 0.55);
		transform: translateY(-2px);
	}

	/* Decor Secondary */
	.cta-secondary {
		background: rgba(196, 119, 65, 0.08);
		color: var(--decor-accent);
		border: 1px solid rgba(196, 119, 65, 0.25);
	}

	.cta-secondary:hover {
		background: rgba(196, 119, 65, 0.16);
		border-color: rgba(196, 119, 65, 0.6);
	}

	.btn-icon {
		width: 14px;
		height: 14px;
	}

	.affiliate-disclaimer {
		font-size: 0.75rem;
		line-height: 1.5;
		color: var(--decor-muted);
	}

	/* ── Tags ─────────────────────────────── */
	.product-tags {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.tags-label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--decor-muted);
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag-chip {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 0.2rem 0.75rem;
		border-radius: 999px;
		text-decoration: none;
		transition: var(--transition);
		color: var(--decor-accent);
		background: rgba(196, 119, 65, 0.1);
		border: 1px solid rgba(196, 119, 65, 0.25);
	}

	.tag-chip:hover {
		background: rgba(196, 119, 65, 0.2);
	}

	/* ── Sections ─────────────────────────── */
	.featuring-section,
	.related-section {
		margin-top: 4rem;
	}

	.section-header {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.section-title {
		font-family: var(--font-decor);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.section-line {
		height: 3px;
		width: 48px;
		border-radius: 2px;
		background: var(--decor-accent);
	}

	.collections-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.collections-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.collections-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.related-products-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 500px) {
		.related-products-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.related-products-grid { grid-template-columns: repeat(4, 1fr); }
	}
</style>
