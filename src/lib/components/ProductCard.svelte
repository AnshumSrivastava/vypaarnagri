<script>
	import { base } from '$app/paths';
	import ImageCarousel from './ImageCarousel.svelte';

	let { product, theme = 'decor' } = $props();

	let currentImage = $state(0);

	const ctaLabels = ['Explore Product', 'View Setup', 'Discover More', 'Get The Look', 'Shop Now'];

	function getCTA(index) {
		return ctaLabels[index % ctaLabels.length];
	}
</script>

<article
	class="product-card"
	itemscope
	itemtype="https://schema.org/Product"
>
	<!-- Image Section -->
	<div class="card-image-wrap">
		{#if product.images.length > 1}
			<a href="{base}/products/{product.id}" class="img-link" aria-label="View {product.title} details">
				<ImageCarousel images={product.images} alt={product.title} bind:currentImage />
			</a>
		{:else}
			<a href="{base}/products/{product.id}" class="img-link single-image" aria-label="View {product.title} details">
				<img
					src={product.images[0]}
					alt={product.title}
					loading="lazy"
					class="card-img"
					onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'; }}
				/>
			</a>
		{/if}

		<!-- Tags overlay -->
		{#if product.featured}
			<span class="featured-badge">Featured Curation</span>
		{/if}

		<!-- Category pill -->
		<span class="category-pill">{product.subcategory}</span>
	</div>

	<!-- Content Section -->
	<div class="card-body">
		<div class="card-meta">
			{#each product.tags.slice(0, 3) as tag}
				<a href="{base}/?q={tag}" class="tag-chip">#{tag}</a>
			{/each}
		</div>

		<h2 class="card-title" itemprop="name">
			<a href="{base}/products/{product.id}" class="title-link">{product.title}</a>
		</h2>
		
		<p class="card-desc" itemprop="description">{product.description}</p>

		{#if product.price}
			<p class="card-price" itemprop="offers">{product.price}</p>
		{/if}

		<!-- Affiliate CTA Buttons -->
		<div class="card-ctas">
			{#each product.affiliateLinks as link, i}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer sponsored"
					class="cta-btn {i === 0 ? 'cta-primary' : 'cta-secondary'}"
					aria-label="{getCTA(i)} — {product.title} on {link.label}"
				>
					{i === 0 ? getCTA(i) : link.label}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
						<polyline points="15 3 21 3 21 9" />
						<line x1="10" y1="14" x2="21" y2="3" />
					</svg>
				</a>
			{/each}
		</div>
	</div>
</article>

<style>
	.product-card {
		border-radius: var(--radius-card);
		overflow: hidden;
		transition: var(--transition);
		position: relative;
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		box-shadow: var(--shadow-card);
	}

	.product-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		border-color: rgba(196, 119, 65, 0.25);
	}

	/* Image area */
	.card-image-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		overflow: hidden;
		background: var(--decor-surface);
	}

	.single-image {
		width: 100%;
		height: 100%;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.product-card:hover .card-img {
		transform: scale(1.03);
	}

	/* Badges */
	.featured-badge {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		background: linear-gradient(135deg, var(--decor-accent), #7a9e7e);
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		z-index: 10;
		box-shadow: 0 2px 6px rgba(196, 119, 65, 0.2);
	}

	.category-pill {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: rgba(254, 250, 246, 0.85);
		backdrop-filter: blur(4px);
		color: var(--decor-text);
		border: 1px solid var(--decor-border);
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: capitalize;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		z-index: 10;
	}

	/* Card body */
	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.tag-chip {
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--decor-accent);
		background: rgba(196, 119, 65, 0.08);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		text-decoration: none;
		transition: var(--transition);
		border: 1px solid rgba(196, 119, 65, 0.15);
	}

	.tag-chip:hover {
		background: rgba(196, 119, 65, 0.16);
	}

	.card-title {
		font-family: var(--font-decor);
		font-size: 0.95rem;
		font-weight: 700;
		line-height: 1.35;
		color: var(--decor-text);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		transition: var(--transition);
	}

	.title-link:hover {
		color: var(--decor-accent);
	}

	.card-desc {
		font-size: 0.8125rem;
		color: var(--decor-muted);
		line-height: 1.55;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-price {
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--decor-accent);
	}

	/* CTA Buttons */
	.card-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8rem;
		font-weight: 700;
		padding: 0.45rem 0.875rem;
		border-radius: var(--radius-btn);
		text-decoration: none;
		transition: var(--transition);
		white-space: nowrap;
		flex: 1;
		justify-content: center;
	}

	.cta-primary {
		background: linear-gradient(135deg, var(--decor-accent), #a86030);
		color: white;
		box-shadow: 0 2px 8px rgba(196, 119, 65, 0.2);
	}

	.cta-primary:hover {
		box-shadow: 0 4px 16px rgba(196, 119, 65, 0.35);
		transform: translateY(-1px);
	}

	.cta-secondary {
		background: rgba(196, 119, 65, 0.06);
		color: var(--decor-accent);
		border: 1px solid rgba(196, 119, 65, 0.2);
	}

	.cta-secondary:hover {
		background: rgba(196, 119, 65, 0.12);
		border-color: rgba(196, 119, 65, 0.4);
	}

	.btn-icon {
		width: 11px;
		height: 11px;
		flex-shrink: 0;
	}

	.img-link {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}
</style>
