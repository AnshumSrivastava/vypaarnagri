<script>
	import { searchQuery } from '$lib/stores/filters.js';
	import { goto } from '$app/navigation';

	let { placeholder = 'Search products, tags, setups...', navigateOnEnter = false, theme = 'tech' } = $props();

	let localValue = $state('');

	function handleInput(e) {
		localValue = e.currentTarget.value;
		if (!navigateOnEnter) {
			searchQuery.set(localValue);
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			if (navigateOnEnter && localValue.trim()) {
				goto(`/search?q=${encodeURIComponent(localValue.trim())}`);
			} else {
				searchQuery.set(localValue);
			}
		}
		if (e.key === 'Escape') {
			localValue = '';
			searchQuery.set('');
		}
	}

	function clearSearch() {
		localValue = '';
		searchQuery.set('');
	}
</script>

<div class="search-bar {theme === 'decor' ? 'search-decor' : 'search-tech'}">
	<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.35-4.35" />
	</svg>

	<input
		type="search"
		value={localValue}
		oninput={handleInput}
		onkeydown={handleKeydown}
		{placeholder}
		class="search-input"
		aria-label="Search products"
		id="product-search"
		autocomplete="off"
	/>

	{#if localValue}
		<button class="clear-btn" onclick={clearSearch} aria-label="Clear search">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6 6 18M6 6l12 12" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.search-bar {
		position: relative;
		width: 100%;
		max-width: 560px;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		pointer-events: none;
		z-index: 1;
	}

	.search-tech .search-icon { color: #64748b; }
	.search-decor .search-icon { color: #9e8a7a; }

	.search-input {
		width: 100%;
		padding: 0.875rem 3rem 0.875rem 2.75rem;
		border-radius: 12px;
		font-size: 0.9375rem;
		font-family: var(--font-body);
		outline: none;
		transition: all 0.25s ease;
	}

	.search-tech .search-input {
		background: rgba(22, 22, 31, 0.9);
		border: 1.5px solid rgba(30, 30, 46, 1);
		color: #e2e8f0;
	}

	.search-tech .search-input::placeholder { color: #475569; }

	.search-tech .search-input:focus {
		border-color: #7c3aed;
		box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
		background: rgba(22, 22, 31, 1);
	}

	.search-decor .search-input {
		background: #ffffff;
		border: 1.5px solid #e8ddd2;
		color: #3d2b1f;
	}

	.search-decor .search-input::placeholder { color: #b0a090; }

	.search-decor .search-input:focus {
		border-color: #c47741;
		box-shadow: 0 0 0 4px rgba(196, 119, 65, 0.1);
	}

	.clear-btn {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		color: #64748b;
		padding: 0.25rem;
		border-radius: 4px;
		display: flex;
		align-items: center;
		transition: color 0.2s ease;
	}

	.clear-btn:hover { color: #94a3b8; }

	.clear-btn svg {
		width: 16px;
		height: 16px;
	}
</style>
