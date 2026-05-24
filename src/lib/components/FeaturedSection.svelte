<script>
	import CollectionCard from './CollectionCard.svelte';

	let { collections = [], title = 'Featured Collections', theme = 'tech' } = $props();
</script>

<section class="featured-section">
	{#if title}
		<div class="section-header">
			<h2 class="section-title {theme === 'decor' ? 'title-decor' : 'title-tech'}">{title}</h2>
			<div class="title-underline {theme === 'decor' ? 'underline-decor' : 'underline-tech'}"></div>
		</div>
	{/if}

	<div class="collections-grid">
		{#each collections as collection, i}
			<div class="grid-item" style="animation-delay: {i * 80}ms">
				<CollectionCard {collection} {theme} />
			</div>
		{/each}
	</div>
</section>

<style>
	.featured-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.section-title {
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		font-weight: 700;
		line-height: 1.2;
	}

	.title-tech {
		font-family: var(--font-tech);
		color: #e2e8f0;
	}

	.title-decor {
		font-family: var(--font-decor);
		color: #3d2b1f;
	}

	.title-underline {
		height: 3px;
		width: 48px;
		border-radius: 2px;
	}

	.underline-tech {
		background: linear-gradient(90deg, #7c3aed, #06b6d4);
	}

	.underline-decor {
		background: linear-gradient(90deg, #c47741, #7a9e7e);
	}

	.collections-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 540px) {
		.collections-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.collections-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-width: 1280px) {
		.collections-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.grid-item {
		opacity: 0;
		animation: fadeSlideUp 0.5s ease forwards;
	}

	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
