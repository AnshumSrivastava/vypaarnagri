<script>
	import ProductCard from './ProductCard.svelte';

	let { products = [], theme = 'tech', columns = 'auto' } = $props();
</script>

{#if products.length === 0}
	<div class="empty-state">
		<p>No products found. Try adjusting your filters.</p>
	</div>
{:else}
	<div class="masonry-grid">
		{#each products as product, i}
			<div class="masonry-item" style="animation-delay: {i * 50}ms">
				<ProductCard {product} {theme} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.masonry-grid {
		columns: 1;
		column-gap: 1.25rem;
	}

	@media (min-width: 540px) {
		.masonry-grid { columns: 2; }
	}

	@media (min-width: 1024px) {
		.masonry-grid { columns: 3; }
	}

	@media (min-width: 1600px) {
		.masonry-grid { columns: 4; }
	}

	.masonry-item {
		break-inside: avoid;
		margin-bottom: 1.25rem;
		opacity: 0;
		animation: fadeSlideUp 0.5s ease forwards;
	}

	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: #64748b;
		font-size: 1rem;
	}
</style>
