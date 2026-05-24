<script>
	import ProductCard from './ProductCard.svelte';

	let { products = [], title = '', theme = 'tech', columns = 3 } = $props();
</script>

{#if title}
	<div class="gallery-header">
		<h2 class="gallery-title {theme === 'decor' ? 'title-decor' : 'title-tech'}">{title}</h2>
		<div class="title-line {theme === 'decor' ? 'line-decor' : 'line-tech'}"></div>
	</div>
{/if}

{#if products.length === 0}
	<div class="gallery-empty">
		<div class="empty-icon">🔍</div>
		<p class="empty-text">No products found.</p>
		<p class="empty-sub">Try adjusting your search or filters.</p>
	</div>
{:else}
	<div class="product-gallery cols-{columns}">
		{#each products as product, i}
			<div class="gallery-item" style="animation-delay: {i * 60}ms">
				<ProductCard {product} {theme} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.gallery-header {
		margin-bottom: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.gallery-title {
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		font-weight: 700;
	}

	.title-tech {
		font-family: var(--font-tech);
		color: #e2e8f0;
	}

	.title-decor {
		font-family: var(--font-decor);
		color: #3d2b1f;
	}

	.title-line {
		height: 3px;
		width: 48px;
		border-radius: 2px;
	}

	.line-tech { background: linear-gradient(90deg, #7c3aed, #06b6d4); }
	.line-decor { background: linear-gradient(90deg, #c47741, #7a9e7e); }

	.product-gallery {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 540px) {
		.product-gallery { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 900px) {
		.cols-3 { grid-template-columns: repeat(3, 1fr); }
		.cols-4 { grid-template-columns: repeat(4, 1fr); }
	}

	@media (min-width: 1280px) {
		.cols-4 { grid-template-columns: repeat(4, 1fr); }
	}

	.gallery-item {
		opacity: 0;
		animation: fadeSlideUp 0.45s ease forwards;
	}

	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* Empty state */
	.gallery-empty {
		text-align: center;
		padding: 5rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.empty-icon {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.empty-text {
		font-size: 1.125rem;
		font-weight: 600;
		color: #64748b;
	}

	.empty-sub {
		font-size: 0.875rem;
		color: #475569;
	}
</style>
