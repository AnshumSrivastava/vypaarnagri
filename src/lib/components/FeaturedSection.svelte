<script>
	import CollectionCard from './CollectionCard.svelte';

	let { collections = [], title = 'Featured Collections', theme = 'decor' } = $props();
</script>

<section class="featured-section">
	{#if title}
		<div class="section-header">
			<h2 class="section-title">{title}</h2>
			<div class="title-underline"></div>
		</div>
	{/if}

	<div class="collections-grid">
		{#each collections as collection, i}
			<div class="grid-item" style="animation-delay: {i * 80}ms">
				<CollectionCard {collection} theme="decor" />
			</div>
		{/each}
	</div>
</section>

<style>
	.featured-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.section-title {
		font-family: var(--font-decor);
		font-size: clamp(1.25rem, 3vw, 1.6rem);
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.2;
	}

	.title-underline {
		height: 3px;
		width: 36px;
		border-radius: 2px;
		background: var(--decor-accent);
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
