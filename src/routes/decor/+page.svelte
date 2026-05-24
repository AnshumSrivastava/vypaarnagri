<script>
	import { getProductsByCategory, getCollectionsByCategory } from '$lib/utils/data.js';
	import { filteredProducts, sourceProducts, resetFilters } from '$lib/stores/filters.js';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import FeaturedSection from '$lib/components/FeaturedSection.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterSidebar from '$lib/components/FilterSidebar.svelte';
	import MasonryGrid from '$lib/components/MasonryGrid.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';

	const allProducts = getProductsByCategory('decor');
	const collections = getCollectionsByCategory('decor');

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
	<title>Home Decor — VypaaNagri</title>
	<meta name="description" content="Discover cozy home decor inspiration. Curated collections of warm lighting, soft textiles, ceramics, and earthy accessories for Pinterest-worthy spaces." />
	<meta property="og:title" content="Home Decor — VypaaNagri" />
	<meta property="og:description" content="Pinterest-inspired home decor collections. Cozy rooms, warm aesthetics, and curated pieces." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" />
</svelte:head>

<div class="theme-decor">
	<HeroSection
		headline="Create Your Cozy Corner."
		subheadline="Home Decor"
		description="Warm lighting, soft textures, and earthy tones — a curated sanctuary of inspiration for your home."
		ctaLabel="Browse Collections"
		ctaHref="#collections"
		secondaryCtaLabel="Explore Products"
		secondaryCtaHref="#products"
		theme="decor"
	/>

	<!-- Collections -->
	<section id="collections" class="section collections-section">
		<div class="container">
			<FeaturedSection
				{collections}
				title="Cozy Spaces"
				theme="decor"
			/>
		</div>
	</section>

	<!-- Products with filter -->
	<section id="products" class="section products-section">
		<div class="container">
			<div class="products-header">
				<h2 class="products-title">All Decor Products</h2>
				<div class="products-controls">
					<SearchBar theme="decor" />
					<button
						class="filter-toggle"
						onclick={() => (sidebarOpen = !sidebarOpen)}
						aria-expanded={sidebarOpen}
						id="decor-filter-toggle"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="filter-icon">
							<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
						</svg>
						Filters
					</button>
				</div>
			</div>

			<div class="products-layout {sidebarOpen ? 'has-sidebar' : ''}">
				{#if sidebarOpen}
					<aside class="sidebar-wrap">
						<FilterSidebar products={allProducts} theme="decor" />
					</aside>
				{/if}

				<div class="products-main">
					<p class="result-count">
						{$filteredProducts.length} product{$filteredProducts.length !== 1 ? 's' : ''}
					</p>
					<MasonryGrid products={$filteredProducts} theme="decor" />
				</div>
			</div>
		</div>
	</section>

	<!-- Pinterest-style mood quote -->
	<section class="mood-quote">
		<blockquote>
			<p>"A home should tell the story of who you are,<br />and be a collection of what you love."</p>
			<cite>— Nate Berkus</cite>
		</blockquote>
	</section>
</div>

<style>
	.theme-decor {
		background: var(--decor-bg);
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.section {
		padding: 5rem 0;
	}

	.collections-section {
		background: #f5ede0;
	}

	.products-section {
		background: #fefaf6;
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
		font-family: var(--font-decor);
		font-size: clamp(1.25rem, 3vw, 1.875rem);
		font-weight: 600;
		color: #3d2b1f;
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
		background: white;
		border: 1.5px solid #e8ddd2;
		border-radius: 8px;
		color: #9e8a7a;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: var(--font-body);
	}

	.filter-toggle:hover {
		border-color: #c47741;
		color: #c47741;
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
		.products-layout.has-sidebar {
			grid-template-columns: 240px 1fr;
			align-items: start;
		}
		.products-layout:not(.has-sidebar) {
			grid-template-columns: 1fr;
		}
	}

	.sidebar-wrap {
		position: sticky;
		top: 80px;
	}

	.result-count {
		font-size: 0.8125rem;
		color: #9e8a7a;
		margin-bottom: 1rem;
	}

	/* Mood quote */
	.mood-quote {
		background: linear-gradient(135deg, #f0e4d7 0%, #e8ddd2 100%);
		border-top: 1px solid #e8ddd2;
		padding: 5rem 1.5rem;
		text-align: center;
	}

	.mood-quote blockquote {
		max-width: 600px;
		margin: 0 auto;
	}

	.mood-quote p {
		font-family: var(--font-decor);
		font-size: clamp(1.125rem, 3vw, 1.625rem);
		font-style: italic;
		line-height: 1.6;
		color: #5c3d2e;
	}

	.mood-quote cite {
		display: block;
		margin-top: 1rem;
		font-size: 0.875rem;
		font-style: normal;
		color: #9e8a7a;
		font-weight: 600;
	}
</style>
