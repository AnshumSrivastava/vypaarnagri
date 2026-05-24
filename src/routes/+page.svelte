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

	let mobileFiltersOpen = $state(false);

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

	function closeOnOverlayClick(e) {
		if (e.target === e.currentTarget) {
			mobileFiltersOpen = false;
		}
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

	<div class="catalog-body">
		<!-- Left: Unified Product Grid -->
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

		<!-- Right on PC, Bottom Slide Drawer on Mobile: Controls -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<aside 
			class="controls-sidebar {mobileFiltersOpen ? 'mobile-open' : ''}" 
			onclick={closeOnOverlayClick}
		>
			<div class="controls-inner">
				<div class="drawer-header">
					<span class="drawer-title">Search & Filter</span>
					<button class="close-drawer-btn" onclick={() => mobileFiltersOpen = false} aria-label="Close filters">
						✕
					</button>
				</div>

				<!-- Simple Non-techy Search Box -->
				<div class="search-box-wrap">
					<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.35-4.35" />
					</svg>
					<input
						type="search"
						placeholder="Search warm lighting, cozy rugs..."
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
						<span class="toggle-text">Show Featured Curation</span>
					</label>

					{#if $selectedTags.length > 0 || $selectedSubcategory || $featuredOnly || $searchQuery}
						<button class="clear-filters-btn" onclick={resetFilters}>
							Clear all filters ✕
						</button>
					{/if}
				</div>
			</div>
		</aside>
	</div>

	<!-- Mobile Floating Action Button (FAB) -->
	<button 
		class="mobile-filter-fab" 
		onclick={() => mobileFiltersOpen = true} 
		aria-label="Open search and filters"
	>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fab-icon">
			<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
		</svg>
		<span>Search & Filters</span>
		{#if $selectedTags.length > 0 || $selectedSubcategory || $featuredOnly || $searchQuery}
			<span class="active-badge-dot"></span>
		{/if}
	</button>
</div>

<style>
	.shop-container {
		max-width: 1400px;
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
		margin: 0 auto 0.5rem;
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

	/* ── Catalog Grid Layout (Sticky sidebar on right on PC) ── */
	.catalog-body {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.catalog-body {
			display: grid;
			grid-template-columns: 1fr 340px;
			gap: 2.5rem;
			align-items: start;
		}
	}

	.products-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Sidebar Controls Box */
	.controls-sidebar {
		background: var(--decor-surface);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		box-shadow: var(--shadow-card);
	}

	@media (min-width: 1024px) {
		.controls-sidebar {
			position: sticky;
			top: 100px;
			max-height: calc(100vh - 140px);
			overflow-y: auto;
		}
	}

	.drawer-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.25rem;
	}

	@media (min-width: 1024px) {
		.drawer-header {
			display: none; /* Hide header on PC sidebar */
		}
	}

	.drawer-title {
		font-family: var(--font-decor);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.close-drawer-btn {
		font-size: 1.15rem;
		background: none;
		border: none;
		color: var(--decor-muted);
		cursor: pointer;
		padding: 0.25rem;
	}

	.controls-inner {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Simple non-techy Search Box */
	.search-box-wrap {
		position: relative;
		width: 100%;
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
		padding: 0.75rem 1.5rem 0.75rem 2.85rem;
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
		scrollbar-width: none;
	}

	.tabs-scroll::-webkit-scrollbar {
		display: none;
	}

	.tab-btn {
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.4rem 1.15rem;
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

	/* ── Mobile Floating Drawer overlay ────── */
	@media (max-width: 1023px) {
		.controls-sidebar {
			position: fixed;
			inset: 0;
			z-index: 150;
			background: rgba(61, 43, 31, 0.5);
			backdrop-filter: blur(4px);
			border: none;
			border-radius: 0;
			padding: 0;
			box-shadow: none;
			display: none;
			align-items: flex-end;
			justify-content: center;
		}

		.controls-sidebar.mobile-open {
			display: flex;
		}

		.controls-inner {
			background: var(--decor-bg);
			width: 100%;
			max-height: 80vh;
			overflow-y: auto;
			border-top-left-radius: 24px;
			border-top-right-radius: 24px;
			padding: 2.25rem 1.5rem 3rem;
			border-top: 1px solid var(--decor-border);
			box-shadow: 0 -10px 30px rgba(61, 43, 31, 0.15);
			animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		}

		@keyframes slideUp {
			from { transform: translateY(100%); }
			to { transform: translateY(0); }
		}
	}

	/* ── Floating Action Button (FAB) ──────── */
	.mobile-filter-fab {
		display: none;
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 120;
		background: linear-gradient(135deg, var(--decor-accent), #a86030);
		color: white;
		border: none;
		padding: 0.85rem 1.6rem;
		border-radius: 99px;
		font-weight: 700;
		font-size: 0.9rem;
		box-shadow: 0 8px 24px rgba(196, 119, 65, 0.4);
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: var(--transition);
	}

	@media (max-width: 1023px) {
		.mobile-filter-fab {
			display: inline-flex;
		}
	}

	.mobile-filter-fab:hover {
		transform: scale(1.02);
		box-shadow: 0 10px 28px rgba(196, 119, 65, 0.55);
	}

	.fab-icon {
		width: 16px;
		height: 16px;
	}

	.active-badge-dot {
		width: 8px;
		height: 8px;
		background: #22c55e; /* Green */
		border-radius: 50%;
		display: inline-block;
	}

	/* ── Products list grid ───────────────── */
	.results-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.25rem;
	}

	.results-count {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--decor-muted);
	}

	/* 3 column grid for left container on PC */
	.decor-products-grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 480px) {
		.decor-products-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 768px) {
		.decor-products-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-width: 1200px) {
		.decor-products-grid { grid-template-columns: repeat(3, 1fr); }
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
