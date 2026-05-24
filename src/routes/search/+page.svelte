<script>
	import { page } from '$app/stores';
	import { getAllProducts } from '$lib/utils/data.js';
	import MasonryGrid from '$lib/components/MasonryGrid.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { searchQuery, sourceProducts, filteredProducts, resetFilters } from '$lib/stores/filters.js';
	import { onMount, onDestroy } from 'svelte';

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
	<title>Search — VypaaNagri</title>
	<meta name="description" content="Search curated tech and home decor products on VypaaNagri." />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="search-page">
	<div class="container">
		<div class="search-header">
			<h1 class="search-title">Search Products</h1>
			<SearchBar theme="tech" navigateOnEnter={false} placeholder="Search tech, decor, tags..." />
		</div>

		{#if $searchQuery}
			<p class="search-context">
				Results for "<span class="query-text">{$searchQuery}</span>" —
				{$filteredProducts.length} {$filteredProducts.length === 1 ? 'product' : 'products'} found
			</p>
		{:else}
			<p class="search-context">Enter a search term above to find products.</p>
		{/if}

		<MasonryGrid products={$filteredProducts} theme="tech" />
	</div>
</div>

<style>
	.search-page {
		min-height: 80vh;
		background: var(--tech-bg);
		padding: 4rem 0;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.search-header {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 640px;
	}

	.search-title {
		font-family: var(--font-tech);
		font-size: 2rem;
		font-weight: 800;
		color: #e2e8f0;
	}

	.search-context {
		font-size: 0.875rem;
		color: #64748b;
	}

	.query-text {
		color: #a78bfa;
		font-weight: 600;
	}
</style>
