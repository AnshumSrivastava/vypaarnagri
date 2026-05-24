<script>
	import ImageCarousel from './ImageCarousel.svelte';

	let { product, theme = 'tech' } = $props();

	let currentImage = $state(0);

	const ctaLabels = ['Explore Product', 'View Setup', 'Discover More', 'Get The Look', 'Shop Now'];

	function getCTA(index) {
		return ctaLabels[index % ctaLabels.length];
	}

	const isTech = $derived(theme === 'tech');
</script>

<article
	class="product-card {isTech ? 'card-tech' : 'card-decor'}"
	itemscope
	itemtype="https://schema.org/Product"
>
	<!-- Image Section -->
	<div class="card-image-wrap">
		{#if product.images.length > 1}
			<ImageCarousel images={product.images} alt={product.title} bind:currentImage />
		{:else}
			<div class="single-image">
				<img
					src={product.images[0]}
					alt={product.title}
					loading="lazy"
					class="card-img"
					onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'; }}
				/>
			</div>
		{/if}

		<!-- Tags overlay -->
		{#if product.featured}
			<span class="featured-badge">Featured</span>
		{/if}

		<!-- Category pill -->
		<span class="category-pill">{product.subcategory}</span>
	</div>

	<!-- Content Section -->
	<div class="card-body">
		<div class="card-meta">
			{#each product.tags.slice(0, 3) as tag}
				<a href="/search?q={tag}" class="tag-chip">#{tag}</a>
			{/each}
		</div>

		<h2 class="card-title" itemprop="name">{product.title}</h2>
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
		border-radius: 16px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		position: relative;
	}

	.product-card:hover {
		transform: translateY(-4px);
	}

	/* Tech dark card */
	.card-tech {
		background: #16161f;
		border: 1px solid #1e1e2e;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
	}

	.card-tech:hover {
		box-shadow: 0 12px 40px rgba(124, 58, 237, 0.2);
		border-color: rgba(124, 58, 237, 0.4);
	}

	/* Decor warm card */
	.card-decor {
		background: #ffffff;
		border: 1px solid #e8ddd2;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
	}

	.card-decor:hover {
		box-shadow: 0 12px 40px rgba(196, 119, 65, 0.15);
		border-color: rgba(196, 119, 65, 0.4);
	}

	/* Image area */
	.card-image-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		overflow: hidden;
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
		transform: scale(1.04);
	}

	/* Badges */
	.featured-badge {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		background: linear-gradient(135deg, #7c3aed, #06b6d4);
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		z-index: 10;
	}

	.card-decor .featured-badge {
		background: linear-gradient(135deg, #c47741, #7a9e7e);
	}

	.category-pill {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.65rem;
		font-weight: 500;
		text-transform: capitalize;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		z-index: 10;
	}

	/* Card body */
	.card-body {
		padding: 1.125rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.tag-chip {
		font-size: 0.7rem;
		font-weight: 500;
		color: #7c3aed;
		background: rgba(124, 58, 237, 0.1);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		text-decoration: none;
		transition: background 0.2s ease;
		border: 1px solid rgba(124, 58, 237, 0.2);
	}

	.card-decor .tag-chip {
		color: #c47741;
		background: rgba(196, 119, 65, 0.1);
		border-color: rgba(196, 119, 65, 0.2);
	}

	.tag-chip:hover {
		background: rgba(124, 58, 237, 0.2);
	}

	.card-decor .tag-chip:hover {
		background: rgba(196, 119, 65, 0.2);
	}

	.card-title {
		font-family: var(--font-tech);
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.35;
		color: #e2e8f0;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-decor .card-title {
		font-family: var(--font-decor);
		color: #3d2b1f;
	}

	.card-desc {
		font-size: 0.8125rem;
		color: #64748b;
		line-height: 1.55;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-decor .card-desc {
		color: #9e8a7a;
	}

	.card-price {
		font-size: 0.875rem;
		font-weight: 700;
		color: #a78bfa;
	}

	.card-decor .card-price {
		color: #c47741;
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
		font-size: 0.8125rem;
		font-weight: 600;
		padding: 0.5rem 0.875rem;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.cta-primary {
		background: linear-gradient(135deg, #7c3aed, #6d28d9);
		color: white;
		box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
	}

	.cta-primary:hover {
		background: linear-gradient(135deg, #6d28d9, #5b21b6);
		box-shadow: 0 4px 16px rgba(124, 58, 237, 0.5);
		transform: translateY(-1px);
	}

	.card-decor .cta-primary {
		background: linear-gradient(135deg, #c47741, #a86030);
		box-shadow: 0 2px 8px rgba(196, 119, 65, 0.35);
	}

	.card-decor .cta-primary:hover {
		background: linear-gradient(135deg, #a86030, #8f5228);
		box-shadow: 0 4px 16px rgba(196, 119, 65, 0.5);
	}

	.cta-secondary {
		background: rgba(124, 58, 237, 0.08);
		color: #a78bfa;
		border: 1px solid rgba(124, 58, 237, 0.25);
	}

	.cta-secondary:hover {
		background: rgba(124, 58, 237, 0.15);
		border-color: rgba(124, 58, 237, 0.5);
	}

	.card-decor .cta-secondary {
		background: rgba(196, 119, 65, 0.08);
		color: #c47741;
		border-color: rgba(196, 119, 65, 0.25);
	}

	.card-decor .cta-secondary:hover {
		background: rgba(196, 119, 65, 0.15);
		border-color: rgba(196, 119, 65, 0.5);
	}

	.btn-icon {
		width: 12px;
		height: 12px;
		flex-shrink: 0;
	}
</style>
