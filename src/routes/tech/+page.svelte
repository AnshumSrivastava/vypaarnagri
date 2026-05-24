<script>
	import { getProductsByCategory, getCollectionsByCategory } from '$lib/utils/data.js';
	import { filteredProducts, sourceProducts, resetFilters } from '$lib/stores/filters.js';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import FeaturedSection from '$lib/components/FeaturedSection.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterSidebar from '$lib/components/FilterSidebar.svelte';
	import MasonryGrid from '$lib/components/MasonryGrid.svelte';
	import { onMount, onDestroy } from 'svelte';

	const allProducts = getProductsByCategory('tech');
	const collections = getCollectionsByCategory('tech');

	onMount(() => {
		sourceProducts.set(allProducts);
		resetFilters();
	});

	onDestroy(() => {
		resetFilters();
	});

	let sidebarOpen = $state(false);
</script>

<svelte:head>
	<title>Tech Setups — VypaaNagri</title>
	<meta name="description" content="Discover the best tech setups, creator rigs, minimal desks, and productivity gear. Curated affiliate collections for tech enthusiasts." />
	<meta property="og:title" content="Tech Setups — VypaaNagri" />
	<meta property="og:description" content="Browse curated tech setup collections. Creator rigs, desk setups, audio gear, and more." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80" />
</svelte:head>

<div class="theme-tech">
	<HeroSection
		headline="Build Your Perfect Setup."
		subheadline="Tech Setups"
		description="Minimal desks, creator rigs, and productivity gear — curated for makers, remote workers, and digital artists."
		ctaLabel="Browse Collections"
		ctaHref="#collections"
		secondaryCtaLabel="View All Products"
		secondaryCtaHref="#products"
		theme="tech"
	/>

	<!-- Collections -->
	<section id="collections" class="section">
		<div class="container">
			<FeaturedSection
				{collections}
				title="Setup Collections"
				theme="tech"
			/>
		</div>
	</section>

	<!-- Products with filter -->
	<section id="products" class="section products-section">
		<div class="container">
			<div class="products-header">
				<h2 class="products-title">All Tech Products</h2>
				<div class="products-controls">
					<SearchBar theme="tech" />
					<button
						class="filter-toggle"
						onclick={() => (sidebarOpen = !sidebarOpen)}
						aria-expanded={sidebarOpen}
						id="filter-toggle-btn"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="filter-icon">
							<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
						</svg>
						Filters
					</button>
				</div>
			</div>

			<div class="products-layout">
				{#if sidebarOpen}
					<aside class="sidebar-wrap">
						<FilterSidebar products={allProducts} theme="tech" />
					</aside>
				{/if}

				<div class="products-main">
					<p class="result-count">
						{$filteredProducts.length} product{$filteredProducts.length !== 1 ? 's' : ''}
					</p>
					<MasonryGrid products={$filteredProducts} theme="tech" />
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.theme-tech {
		background: var(--tech-bg);
		color: var(--tech-text);
		font-family: var(--font-tech);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.section {
		padding: 5rem 0;
	}

	.products-section {
		background: #0d0d14;
	}

	.products-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.products-title {
		font-family: var(--font-tech);
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		font-weight: 700;
		color: #e2e8f0;
	}

	.products-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.filter-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: rgba(22, 22, 31, 0.9);
		border: 1px solid #1e1e2e;
		border-radius: 8px;
		color: #94a3b8;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: var(--font-tech);
	}

	.filter-toggle:hover {
		border-color: #7c3aed;
		color: #a78bfa;
	}

	.filter-icon {
		width: 15px;
		height: 15px;
	}

	.products-layout {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 900px) {
		.products-layout {
			grid-template-columns: 240px 1fr;
			align-items: start;
		}
	}

	.sidebar-wrap {
		position: sticky;
		top: 80px;
	}

	.result-count {
		font-size: 0.8125rem;
		color: #475569;
		margin-bottom: 1rem;
	}
</style>
