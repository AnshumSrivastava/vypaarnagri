<script>
	let { tabs = [], active = '', onSelect = () => {}, theme = 'tech' } = $props();
</script>

<div class="category-tabs {theme === 'decor' ? 'tabs-decor' : 'tabs-tech'}" role="tablist" aria-label="Category filters">
	{#each tabs as tab}
		<button
			class="tab-btn {active === tab.value ? 'active' : ''}"
			role="tab"
			aria-selected={active === tab.value}
			onclick={() => onSelect(tab.value)}
			id="tab-{tab.value}"
		>
			{#if tab.icon}
				<span class="tab-icon">{tab.icon}</span>
			{/if}
			{tab.label}
			{#if tab.count !== undefined}
				<span class="tab-count">{tab.count}</span>
			{/if}
		</button>
	{/each}
</div>

<style>
	.category-tabs {
		display: flex;
		gap: 0.375rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
		scrollbar-width: none;
	}

	.category-tabs::-webkit-scrollbar {
		display: none;
	}

	.tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		flex-shrink: 0;
	}

	/* Tech theme */
	.tabs-tech .tab-btn {
		background: rgba(22, 22, 31, 0.8);
		border: 1px solid #1e1e2e;
		color: #64748b;
	}

	.tabs-tech .tab-btn:hover {
		color: #a78bfa;
		border-color: rgba(124, 58, 237, 0.4);
	}

	.tabs-tech .tab-btn.active {
		background: linear-gradient(135deg, #7c3aed, #6d28d9);
		color: white;
		border-color: transparent;
		box-shadow: 0 2px 12px rgba(124, 58, 237, 0.35);
	}

	/* Decor theme */
	.tabs-decor .tab-btn {
		background: white;
		border: 1.5px solid #e8ddd2;
		color: #9e8a7a;
	}

	.tabs-decor .tab-btn:hover {
		border-color: #c47741;
		color: #c47741;
	}

	.tabs-decor .tab-btn.active {
		background: linear-gradient(135deg, #c47741, #a86030);
		color: white;
		border-color: transparent;
		box-shadow: 0 2px 12px rgba(196, 119, 65, 0.3);
	}

	.tab-icon {
		font-size: 1rem;
	}

	.tab-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 18px;
		padding: 0 0.3rem;
		border-radius: 999px;
		font-size: 0.65rem;
		font-weight: 700;
		background: rgba(255, 255, 255, 0.15);
		color: inherit;
	}

	.tab-btn:not(.active) .tab-count {
		background: rgba(124, 58, 237, 0.1);
		color: #7c3aed;
	}

	.tabs-decor .tab-btn:not(.active) .tab-count {
		background: rgba(196, 119, 65, 0.1);
		color: #c47741;
	}
</style>
