<script>
	import { base } from '$app/paths';
	import { getAllComparisons } from '$lib/utils/data.js';

	const comparisons = getAllComparisons();
</script>

<svelte:head>
	<title>Curated Buying Guides & Comparisons | VypaaDecor</title>
	<meta name="description" content="Read our unbiased home decor head-to-head aesthetic comparisons. Find the perfect accent chairs, warm lamps, and rugs." />
	<meta property="og:title" content="Curated Buying Guides & Comparisons | VypaaDecor" />
	<meta property="og:description" content="Side-by-side aesthetic scorecards, pro/con tables, and shopping verdicts." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=80" />
</svelte:head>

<div class="comparisons-page animate-reveal">
	<header class="page-header">
		<span class="eyebrow">Aesthetic Scorecards</span>
		<h1 class="page-title">Curated Buying Guides & Comparisons</h1>
		<p class="page-desc">
			Confused between two beautiful items? We compare popular trending home decor pieces side-by-side on comfort, build quality, style, and value to help you invest wisely.
		</p>
	</header>

	<main class="guides-list">
		{#each comparisons as guide, i}
			<article class="guide-card" style="animation-delay: {i * 80}ms">
				<div class="guide-image-wrap">
					<img src={guide.coverImage} alt={guide.title} class="guide-img" loading="lazy" />
					<div class="vs-badge">VS</div>
				</div>

				<div class="guide-body">
					<span class="guide-badge">Head-to-Head Review</span>
					<h2 class="guide-title">
						<a href="{base}/comparisons/{guide.slug}" class="title-link">{guide.title}</a>
					</h2>
					<p class="guide-desc">{guide.description}</p>
					
					<div class="guide-items-snippet">
						<span class="snippet-label">Comparing:</span>
						<div class="snippet-pills">
							{#each guide.items as item}
								<span class="item-pill">{item.name}</span>
							{/each}
						</div>
					</div>

					<div class="guide-footer">
						<a href="{base}/comparisons/{guide.slug}" class="view-guide-btn">
							View Side-by-Side Review
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-arrow">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</main>
</div>

<style>
	.comparisons-page {
		max-width: 1000px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	.page-header {
		text-align: center;
		max-width: 680px;
		margin: 0 auto;
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

	.page-title {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5vw, 2.75rem);
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.15;
	}

	.page-desc {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--decor-muted);
	}

	/* Guides List */
	.guides-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.guide-card {
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		box-shadow: var(--shadow-card);
		transition: var(--transition);
	}

	@media (min-width: 720px) {
		.guide-card {
			grid-template-columns: 320px 1fr;
		}
	}

	.guide-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		border-color: rgba(196, 119, 65, 0.2);
	}

	.guide-image-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 220px;
		background: var(--decor-surface);
		overflow: hidden;
	}

	.guide-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.guide-card:hover .guide-img {
		transform: scale(1.03);
	}

	.vs-badge {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 48px;
		height: 48px;
		background: var(--decor-accent);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		box-shadow: 0 4px 10px rgba(196, 119, 65, 0.3);
		border: 2px solid var(--decor-bg);
	}

	.guide-body {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.guide-badge {
		align-self: flex-start;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: rgba(122, 158, 126, 0.12);
		color: var(--decor-accent-2);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.guide-title {
		font-family: var(--font-decor);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.3;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		transition: var(--transition);
	}

	.title-link:hover {
		color: var(--decor-accent);
	}

	.guide-desc {
		font-size: 0.875rem;
		color: var(--decor-muted);
		line-height: 1.6;
	}

	.guide-items-snippet {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.8rem;
		border-top: 1px dashed var(--decor-border);
		padding-top: 0.85rem;
		margin-top: 0.25rem;
	}

	.snippet-label {
		font-weight: 700;
		color: var(--decor-muted);
	}

	.snippet-pills {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.item-pill {
		font-size: 0.75rem;
		background: var(--decor-surface);
		padding: 0.15rem 0.6rem;
		border-radius: 4px;
		color: var(--decor-text);
		font-weight: 600;
		border: 1px solid var(--decor-border);
	}

	.guide-footer {
		margin-top: auto;
		padding-top: 0.5rem;
	}

	.view-guide-btn {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--decor-accent);
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		transition: var(--transition);
	}

	.view-guide-btn:hover {
		color: #a86030;
	}

	.btn-arrow {
		width: 15px;
		height: 15px;
		transition: transform 0.2s ease;
	}

	.view-guide-btn:hover .btn-arrow {
		transform: translateX(3px);
	}
</style>
