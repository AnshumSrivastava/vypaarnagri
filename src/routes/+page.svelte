<script>
	import { base } from '$app/paths';
	import { getAllProducts, extractTags, extractSubcategories } from '$lib/utils/data.js';
	import { 
		filteredProducts, 
		sourceProducts, 
		searchQuery, 
		selectedTags, 
		selectedSubcategory, 
		featuredOnly, 
		toggleTag, 
		resetFilters 
	} from '$lib/stores/filters.js';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { onMount, onDestroy } from 'svelte';

	const products = getAllProducts();
	const tags = extractTags(products);
	const subcategories = extractSubcategories(products);

	onMount(() => {
		sourceProducts.set(products);
		resetFilters();
	});

	onDestroy(() => {
		resetFilters();
	});

	function handleTagClick(tag) {
		toggleTag(tag);
	}
</script>

<svelte:head>
	<title>Curated Home Decor Sanctuary | VypaaDecor</title>
	<meta name="description" content="Discover curated minimal interior styling products, cozy throw blankets, travertine stone tables, and unglazed ceramics. Click affiliate links to shop." />
	<meta property="og:title" content="Curated Home Decor Sanctuary | VypaaDecor" />
	<meta property="og:description" content="Intentional living caskets. Browse simple minimal decor, clay ceramics, and organic accents." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" />
	<meta property="og:type" content="website" />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<div class="shop-container animate-reveal">
	<!-- Catalog Welcome Header -->
	<header class="catalog-header">
		<span class="eyebrow">Intentional Living Curation</span>
		<h1 class="catalog-title">Your Calm, Cozy Sanctuary</h1>
		<p class="catalog-desc">
			We handpick minimal, rustic, and organic modern home decor items to help you create spaces that invite slow living. Click any item to explore details and affiliate shopping options. ✦
		</p>
	</header>

	<!-- Simple E-commerce Controls -->
	<section class="controls-section">
		<!-- Simple Non-techy Search Box -->
		<div class="search-box-wrap">
			<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.35-4.35" />
			</svg>
			<input
				type="search"
				placeholder="Search warm lighting, cozy rugs, organic stoneware..."
				bind:value={$searchQuery}
				class="catalog-search"
				aria-label="Search decor items"
			/>
		</div>

		<!-- Horizontal Subcategory Tabs -->
		<div class="filter-group">
			<span class="group-label">Style Categories</span>
			<div class="tabs-scroll" role="tablist">
				<button
					class="tab-btn {$selectedSubcategory === '' ? 'active' : ''}"
					onclick={() => selectedSubcategory.set('')}
					role="tab"
					aria-selected={$selectedSubcategory === ''}
				>
					All Curations
				</button>
				{#each subcategories as sub}
					<button
						class="tab-btn {$selectedSubcategory === sub ? 'active' : ''}"
						onclick={() => selectedSubcategory.set($selectedSubcategory === sub ? '' : sub)}
						role="tab"
						aria-selected={$selectedSubcategory === sub}
					>
						{sub}
					</button>
				{/each}
			</div>
		</div>

		<!-- Inline Tag Chips -->
		<div class="filter-group">
			<span class="group-label">Filter by Tag</span>
			<div class="tags-scroll">
				{#each tags as tag}
					<button
						class="tag-pill {$selectedTags.includes(tag) ? 'active' : ''}"
						onclick={() => handleTagClick(tag)}
						aria-pressed={$selectedTags.includes(tag)}
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>

		<!-- Featured Toggle & Reset -->
		<div class="controls-meta">
			<label class="featured-toggle" for="catalog-featured">
				<input
					type="checkbox"
					id="catalog-featured"
					bind:checked={$featuredOnly}
				/>
				<span class="toggle-text">Show Featured Curation Only</span>
			</label>

			{#if $selectedTags.length > 0 || $selectedSubcategory || $featuredOnly || $searchQuery}
				<button class="clear-filters-btn" onclick={resetFilters}>
					Clear all filters ✕
				</button>
			{/if}
		</div>
	</section>

	<!-- Unified Product Grid -->
	<main class="products-container">
		<div class="results-meta">
			<p class="results-count">
				Found {$filteredProducts.length} curated find{$filteredProducts.length !== 1 ? 's' : ''}
			</p>
		</div>

		{#if $filteredProducts.length === 0}
			<div class="catalog-empty">
				<div class="empty-emoji">🔍</div>
				<h3 class="empty-title">No matching curations found</h3>
				<p class="empty-text">Try clearing your filters or entering a different search phrase.</p>
				<button class="reset-link-btn" onclick={resetFilters}>Reset filters and show all</button>
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
	</main>
</div>

<style>
	.shop-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	/* ── Catalog Header ───────────────────── */
	.catalog-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--decor-accent);
	}

	.catalog-title {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.15;
	}

	.catalog-desc {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--decor-muted);
	}

	/* ── Controls Section (Basic E-commerce) ── */
	.controls-section {
		background: var(--decor-surface);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		box-shadow: var(--shadow-card);
	}

	/* Simple non-techy Search Box */
	.search-box-wrap {
		position: relative;
		width: 100%;
		max-width: 680px;
		margin: 0 auto;
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

	/* Filters group */
	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.group-label {
		font-size: 0.725rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--decor-muted);
	}

	/* Subcategory tabs horizontal */
	.tabs-scroll {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
		scrollbar-width: none; /* Hide standard Firefox scroll */
	}

	.tabs-scroll::-webkit-scrollbar {
		display: none; /* Hide Chrome/Safari scroll */
	}

	.tab-btn {
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.45rem 1.15rem;
		border-radius: 99px;
		border: 1px solid var(--decor-border);
		background: var(--decor-card);
		color: var(--decor-text);
		cursor: pointer;
		white-space: nowrap;
		transition: var(--transition);
		text-transform: capitalize;
	}

	.tab-btn:hover {
		border-color: var(--decor-accent);
		color: var(--decor-accent);
	}

	.tab-btn.active {
		background: var(--decor-accent);
		border-color: var(--decor-accent);
		color: white;
		font-weight: 600;
	}

	/* Tag pills horizontal */
	.tags-scroll {
		display: flex;
		gap: 0.375rem;
		flex-wrap: wrap;
	}

	.tag-pill {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 0.3rem 0.75rem;
		border-radius: 99px;
		border: 1px solid var(--decor-border);
		background: var(--decor-card);
		color: var(--decor-muted);
		cursor: pointer;
		transition: var(--transition);
	}

	.tag-pill:hover {
		border-color: var(--decor-accent);
		color: var(--decor-accent);
	}

	.tag-pill.active {
		background: rgba(196, 119, 65, 0.12);
		border-color: var(--decor-accent);
		color: var(--decor-accent);
		font-weight: 600;
	}

	/* Controls meta (featured & reset) */
	.controls-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.5rem;
		border-top: 1px solid rgba(232, 221, 210, 0.5);
		padding-top: 1rem;
	}

	.featured-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--decor-text);
		cursor: pointer;
	}

	.featured-toggle input[type="checkbox"] {
		accent-color: var(--decor-accent);
		width: 15px;
		height: 15px;
		cursor: pointer;
	}

	.clear-filters-btn {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--decor-accent);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: opacity 0.2s ease;
	}

	.clear-filters-btn:hover {
		opacity: 0.75;
	}

	/* ── Products Container ─────────────────── */
	.products-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.results-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.results-count {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--decor-muted);
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
	.catalog-empty {
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
