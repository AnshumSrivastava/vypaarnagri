<script>
	import { base } from '$app/paths';
	import { getAllCollections, getProductsByCategory } from '$lib/utils/data.js';
	import CollectionCard from '$lib/components/CollectionCard.svelte';
	import MasonryGrid from '$lib/components/MasonryGrid.svelte';

	let { data } = $props();

	const product = $derived(data.product);
	const isTech = $derived(product.category === 'tech');

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
	<title>{product.title} — VypaaNagri</title>
	<meta name="description" content={product.description} />
	<meta property="og:title" content="{product.title} — VypaaNagri" />
	<meta property="og:description" content={product.description} />
	<meta property="og:image" content={product.images[0]} />
	<meta property="og:type" content="product" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={product.images[0]} />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<div class="product-page-container {isTech ? 'theme-tech' : 'theme-decor'}">
	<div class="container">
		<!-- Breadcrumbs -->
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="{base}/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-sep">›</span>
			<a href="{base}/{product.category}" class="breadcrumb-link capitalize">{product.category}</a>
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
							<a href="{base}/search?q={tag}" class="tag-chip">#{tag}</a>
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
						<CollectionCard {collection} theme={product.category} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Related Products -->
		{#if relatedProducts.length > 0}
			<section class="related-section">
				<div class="section-header">
					<h2 class="section-title">More Curated Niche Finds</h2>
					<div class="section-line"></div>
				</div>
				<MasonryGrid products={relatedProducts} theme={product.category} />
			</section>
		{/if}
	</div>
</div>

<style>
	.product-page-container {
		min-height: 90vh;
		padding: 3rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	/* ── Themes ───────────────────────────── */
	.theme-tech {
		background: var(--tech-bg);
		color: var(--tech-text);
		font-family: var(--font-tech);
	}

	.theme-decor {
		background: var(--decor-bg);
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
	}

	.theme-tech .breadcrumb { color: #64748b; }
	.theme-decor .breadcrumb { color: #9e8a7a; }

	.breadcrumb-link {
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.theme-tech .breadcrumb-link:hover { color: #a78bfa; }
	.theme-decor .breadcrumb-link:hover { color: #c47741; }

	.breadcrumb-sep {
		opacity: 0.6;
	}

	.breadcrumb-current {
		font-weight: 600;
	}
	.theme-tech .breadcrumb-current { color: #e2e8f0; }
	.theme-decor .breadcrumb-current { color: #3d2b1f; }

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
		border-radius: 20px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.05);
	}

	.theme-tech .main-image-wrap {
		border: 1px solid #1e1e2e;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
	}

	.theme-decor .main-image-wrap {
		border: 1.5px solid #e8ddd2;
		box-shadow: 0 10px 40px rgba(196, 119, 65, 0.06);
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
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.theme-tech .thumb-btn { border-color: rgba(30, 30, 46, 0.8); }
	.theme-decor .thumb-btn { border-color: rgba(232, 221, 210, 0.8); }

	.theme-tech .thumb-btn.active { border-color: #7c3aed; }
	.theme-decor .thumb-btn.active { border-color: #c47741; }

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
	}

	.theme-tech .subcategory-badge {
		background: rgba(124, 58, 237, 0.15);
		color: #a78bfa;
	}

	.theme-decor .subcategory-badge {
		background: rgba(196, 119, 65, 0.1);
		color: #c47741;
	}

	.product-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 800;
		line-height: 1.15;
	}

	.theme-tech .product-title {
		color: #f8fafc;
	}

	.theme-decor .product-title {
		font-family: var(--font-decor);
		color: #3d2b1f;
		font-weight: 700;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.theme-tech .product-price { color: #a78bfa; }
	.theme-decor .product-price { color: #c47741; }

	.product-desc {
		font-size: 0.9375rem;
		line-height: 1.7;
	}

	.theme-tech .product-desc { color: #94a3b8; }
	.theme-decor .product-desc { color: #5c4a3c; }

	.divider {
		height: 1px;
		width: 100%;
	}

	.theme-tech .divider { background: #1e1e2e; }
	.theme-decor .divider { background: #e8ddd2; }

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
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.25s ease;
		min-width: 160px;
	}

	/* Tech Primary */
	.theme-tech .cta-primary {
		background: linear-gradient(135deg, #7c3aed, #6d28d9);
		color: white;
		box-shadow: 0 4px 16px rgba(124, 58, 237, 0.35);
	}

	.theme-tech .cta-primary:hover {
		background: linear-gradient(135deg, #6d28d9, #5b21b6);
		box-shadow: 0 6px 24px rgba(124, 58, 237, 0.55);
		transform: translateY(-2px);
	}

	/* Decor Primary */
	.theme-decor .cta-primary {
		background: linear-gradient(135deg, #c47741, #a86030);
		color: white;
		box-shadow: 0 4px 16px rgba(196, 119, 65, 0.35);
	}

	.theme-decor .cta-primary:hover {
		background: linear-gradient(135deg, #a86030, #8f5228);
		box-shadow: 0 6px 24px rgba(196, 119, 65, 0.55);
		transform: translateY(-2px);
	}

	/* Tech Secondary */
	.theme-tech .cta-secondary {
		background: rgba(124, 58, 237, 0.08);
		color: #a78bfa;
		border: 1px solid rgba(124, 58, 237, 0.25);
	}

	.theme-tech .cta-secondary:hover {
		background: rgba(124, 58, 237, 0.16);
		border-color: rgba(124, 58, 237, 0.6);
	}

	/* Decor Secondary */
	.theme-decor .cta-secondary {
		background: rgba(196, 119, 65, 0.08);
		color: #c47741;
		border: 1px solid rgba(196, 119, 65, 0.25);
	}

	.theme-decor .cta-secondary:hover {
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
	}

	.theme-tech .affiliate-disclaimer { color: #475569; }
	.theme-decor .affiliate-disclaimer { color: #9e8a7a; }

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
	}

	.theme-tech .tags-label { color: #475569; }
	.theme-decor .tags-label { color: #9e8a7a; }

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
		transition: all 0.2s ease;
	}

	.theme-tech .tag-chip {
		color: #7c3aed;
		background: rgba(124, 58, 237, 0.1);
		border: 1px solid rgba(124, 58, 237, 0.25);
	}

	.theme-tech .tag-chip:hover {
		background: rgba(124, 58, 237, 0.2);
	}

	.theme-decor .tag-chip {
		color: #c47741;
		background: rgba(196, 119, 65, 0.1);
		border: 1px solid rgba(196, 119, 65, 0.25);
	}

	.theme-decor .tag-chip:hover {
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
		font-size: 1.5rem;
		font-weight: 700;
	}

	.theme-tech .section-title {
		font-family: var(--font-tech);
		color: #e2e8f0;
	}

	.theme-decor .section-title {
		font-family: var(--font-decor);
		color: #3d2b1f;
	}

	.section-line {
		height: 3px;
		width: 48px;
		border-radius: 2px;
	}

	.theme-tech .section-line {
		background: linear-gradient(90deg, #7c3aed, #06b6d4);
	}

	.theme-decor .section-line {
		background: linear-gradient(90deg, #c47741, #7a9e7e);
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
</style>
