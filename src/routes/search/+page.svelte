<script>
	import { page } from '$app/stores';
	import { getAllProducts } from '$lib/utils/data.js';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { searchQuery, sourceProducts, filteredProducts, resetFilters } from '$lib/stores/filters.js';
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';

	const allProducts = getAllProducts();

	onMount(() => {
		sourceProducts.set(allProducts);
		// Pick up ?q= query param
		const q = $page.url.searchParams.get('q') || '';
		searchQuery.set(q);
	});

	onDestroy(() => {
		resetFilters();
	});
</script>

<svelte:head>
	<title>Search Decor Curations — VypaaDecor</title>
	<meta name="description" content="Search curated home decor, cozy accessories, and styling objects on VypaaDecor." />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="search-page animate-reveal">
	<div class="container">
		<div class="search-header">
			<span class="eyebrow">Visual Discovery Search</span>
			<h1 class="search-title">Search Decor Curations</h1>
			
			<div class="search-box-wrap">
				<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<input
					type="search"
					placeholder="Search plaster vases, wool rugs, textured sheets..."
					bind:value={$searchQuery}
					class="catalog-search"
					aria-label="Search decor items"
				/>
			</div>
		</div>

		{#if $searchQuery}
			<p class="search-context">
				Results for "<span class="query-text">{$searchQuery}</span>" —
				Found {$filteredProducts.length} curated design find{$filteredProducts.length === 1 ? '' : 's'}
			</p>
		{:else}
			<p class="search-context">Enter a search term above to find beautiful home accents.</p>
		{/if}

		{#if $filteredProducts.length === 0}
			<div class="search-empty">
				<div class="empty-emoji">🔍</div>
				<h3 class="empty-title">No matching curations found</h3>
				<p class="empty-text">Try typing a different keyword like "rug", "linen", "clay", or "lamp".</p>
				<button class="reset-link-btn" onclick={resetFilters}>Clear search</button>
			</div>
		{:else}
			<div class="decor-products-grid">
				{#each $filteredProducts as product, i}
					<div class="grid-item" style="animation-delay: {i * 40}ms">
						<ProductCard {product} theme="decor" />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.search-page {
		min-height: 80vh;
		background: var(--decor-bg);
		padding: 4rem 0;
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

	.search-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 680px;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--decor-accent);
	}

	.search-title {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5vw, 2.75rem);
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.15;
	}

	/* Simple non-techy Search Box */
	.search-box-wrap {
		position: relative;
		width: 100%;
		margin-top: 0.5rem;
	}

	.search-icon {
		position: absolute;
		left: 1.15rem;
		top: 50%;
		transform: translateY(-50%);
		width: 16px;
		height: 16px;
		color: var(--decor-muted);
		pointer-events: none;
	}

	.catalog-search {
		width: 100%;
		padding: 0.8rem 1.5rem 0.8rem 2.85rem;
		font-size: 0.95rem;
		color: var(--decor-text);
		background: var(--decor-card);
		border: 1.5px solid var(--decor-border);
		border-radius: 99px;
		outline: none;
		transition: var(--transition);
		font-family: var(--font-body);
	}

	.catalog-search::placeholder {
		color: var(--decor-muted);
		opacity: 0.8;
	}

	.catalog-search:focus {
		border-color: var(--decor-accent);
		box-shadow: 0 0 0 4px rgba(196, 119, 65, 0.08);
	}

	.search-context {
		font-size: 0.875rem;
		color: var(--decor-muted);
		font-weight: 500;
	}

	.query-text {
		color: var(--decor-accent);
		font-weight: 700;
	}

	/* 3-4 column grid */
	.decor-products-grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 540px) {
		.decor-products-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.decor-products-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-width: 1400px) {
		.decor-products-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.grid-item {
		opacity: 0;
		animation: fadeSlideUp 0.45s ease forwards;
	}

	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* Empty state */
	.search-empty {
		text-align: center;
		padding: 5rem 2rem;
		background: var(--decor-surface);
		border-radius: var(--radius-card);
		border: 1px solid var(--decor-border);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.empty-emoji {
		font-size: 2.5rem;
	}

	.empty-title {
		font-family: var(--font-decor);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.empty-text {
		font-size: 0.875rem;
		color: var(--decor-muted);
	}

	.reset-link-btn {
		margin-top: 0.75rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: white;
		background: var(--decor-accent);
		border: none;
		border-radius: 6px;
		padding: 0.45rem 1rem;
		cursor: pointer;
		transition: var(--transition);
	}

	.reset-link-btn:hover {
		background: #a86030;
	}
</style>
