<script>
	import {
		selectedTags,
		selectedSubcategory,
		featuredOnly,
		resetFilters,
		toggleTag
	} from '$lib/stores/filters.js';
	import { extractTags, extractSubcategories } from '$lib/utils/data.js';

	let { products = [], theme = 'tech' } = $props();

	const allTags = $derived(extractTags(products));
	const subcategories = $derived(extractSubcategories(products));

	const isTech = $derived(theme === 'tech');
</script>

<aside class="filter-sidebar {isTech ? 'sidebar-tech' : 'sidebar-decor'}" aria-label="Product filters">
	<div class="sidebar-header">
		<h2 class="sidebar-title">Filters</h2>
		<button class="reset-btn" onclick={resetFilters} aria-label="Reset all filters">
			Reset all
		</button>
	</div>

	<!-- Featured toggle -->
	<div class="filter-section">
		<label class="toggle-label" for="featured-toggle">
			<span>Featured only</span>
			<div class="toggle-wrap">
				<input
					type="checkbox"
					id="featured-toggle"
					class="toggle-input"
					bind:checked={$featuredOnly}
				/>
				<span class="toggle-track {$featuredOnly ? 'checked' : ''}">
					<span class="toggle-thumb"></span>
				</span>
			</div>
		</label>
	</div>

	<!-- Subcategory filter -->
	{#if subcategories.length > 0}
		<div class="filter-section">
			<h3 class="filter-heading">Category</h3>
			<div class="filter-pills">
				<button
					class="filter-pill {$selectedSubcategory === '' ? 'active' : ''}"
					onclick={() => selectedSubcategory.set('')}
				>
					All
				</button>
				{#each subcategories as sub}
					<button
						class="filter-pill {$selectedSubcategory === sub ? 'active' : ''}"
						onclick={() => selectedSubcategory.set($selectedSubcategory === sub ? '' : sub)}
					>
						{sub}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Tags filter -->
	{#if allTags.length > 0}
		<div class="filter-section">
			<h3 class="filter-heading">Tags</h3>
			<div class="filter-pills">
				{#each allTags as tag}
					<button
						class="filter-pill {$selectedTags.includes(tag) ? 'active' : ''}"
						onclick={() => toggleTag(tag)}
						aria-pressed={$selectedTags.includes(tag)}
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Active filter count -->
	{#if $selectedTags.length > 0 || $selectedSubcategory || $featuredOnly}
		<div class="active-count">
			{[$selectedTags.length, $selectedSubcategory ? 1 : 0, $featuredOnly ? 1 : 0].reduce((a, b) => a + b)} filter{[$selectedTags.length, $selectedSubcategory ? 1 : 0, $featuredOnly ? 1 : 0].reduce((a, b) => a + b) !== 1 ? 's' : ''} active
		</div>
	{/if}
</aside>

<style>
	.filter-sidebar {
		padding: 1.25rem;
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.sidebar-tech {
		background: #111118;
		border: 1px solid #1e1e2e;
	}

	.sidebar-decor {
		background: #f9f3ec;
		border: 1px solid #e8ddd2;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sidebar-title {
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #64748b;
	}

	.sidebar-decor .sidebar-title {
		color: #9e8a7a;
	}

	.reset-btn {
		font-size: 0.75rem;
		color: #7c3aed;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 600;
		padding: 0;
		transition: opacity 0.2s ease;
	}

	.sidebar-decor .reset-btn {
		color: #c47741;
	}

	.reset-btn:hover {
		opacity: 0.7;
	}

	.filter-section {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.filter-heading {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: #475569;
	}

	.sidebar-decor .filter-heading {
		color: #9e8a7a;
	}

	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.filter-pill {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 0.3rem 0.625rem;
		border-radius: 999px;
		border: 1px solid rgba(30, 30, 46, 1);
		background: transparent;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
		text-transform: capitalize;
	}

	.sidebar-tech .filter-pill {
		border-color: #1e1e2e;
		color: #64748b;
	}

	.sidebar-tech .filter-pill:hover {
		border-color: #7c3aed;
		color: #a78bfa;
	}

	.sidebar-tech .filter-pill.active {
		background: rgba(124, 58, 237, 0.15);
		border-color: #7c3aed;
		color: #a78bfa;
	}

	.sidebar-decor .filter-pill {
		border-color: #e8ddd2;
		color: #9e8a7a;
	}

	.sidebar-decor .filter-pill:hover {
		border-color: #c47741;
		color: #c47741;
	}

	.sidebar-decor .filter-pill.active {
		background: rgba(196, 119, 65, 0.12);
		border-color: #c47741;
		color: #c47741;
	}

	/* Toggle */
	.toggle-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		color: #94a3b8;
	}

	.sidebar-decor .toggle-label {
		color: #6b5e54;
	}

	.toggle-wrap {
		position: relative;
	}

	.toggle-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-track {
		display: flex;
		align-items: center;
		width: 40px;
		height: 22px;
		border-radius: 999px;
		background: #1e1e2e;
		transition: background 0.2s ease;
		padding: 2px;
		cursor: pointer;
	}

	.toggle-track.checked {
		background: #7c3aed;
	}

	.sidebar-decor .toggle-track.checked {
		background: #c47741;
	}

	.toggle-thumb {
		width: 18px;
		height: 18px;
		background: white;
		border-radius: 50%;
		transition: transform 0.2s ease;
		box-shadow: 0 1px 3px rgba(0,0,0,0.3);
	}

	.toggle-track.checked .toggle-thumb {
		transform: translateX(18px);
	}

	.active-count {
		font-size: 0.75rem;
		color: #7c3aed;
		font-weight: 600;
		padding: 0.375rem 0.625rem;
		background: rgba(124, 58, 237, 0.08);
		border-radius: 6px;
		text-align: center;
	}

	.sidebar-decor .active-count {
		color: #c47741;
		background: rgba(196, 119, 65, 0.08);
	}
</style>
