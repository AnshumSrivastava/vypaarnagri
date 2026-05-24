<script>
	import { base } from '$app/paths';

	let { data } = $props();

	const guide = $derived(data.comparison);
</script>

<svelte:head>
	<title>{guide.title} — VypaaDecor</title>
	<meta name="description" content={guide.description} />
	<meta property="og:title" content="{guide.title} — VypaaDecor" />
	<meta property="og:description" content={guide.description} />
	<meta property="og:image" content={guide.coverImage} />
	<meta property="og:type" content="article" />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<div class="guide-view-page animate-reveal">
	<!-- Breadcrumbs -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href="{base}/" class="breadcrumb-link">Home</a>
		<span class="breadcrumb-sep">›</span>
		<a href="{base}/comparisons" class="breadcrumb-link">Buying Guides</a>
		<span class="breadcrumb-sep">›</span>
		<span class="breadcrumb-current">{guide.title}</span>
	</nav>

	<!-- Guide Header -->
	<header class="guide-hero-header">
		<span class="eyebrow">Aesthetic Comparison Guide</span>
		<h1 class="guide-title">{guide.title}</h1>
		<p class="guide-desc">{guide.description}</p>
	</header>

	<!-- Comparison Showcase Card Grid -->
	<section class="items-showcase-grid">
		{#each guide.items as item, idx}
			<div class="item-showcase-card">
				<div class="card-image-wrap">
					<img src={item.imageUrl} alt={item.name} class="item-img" />
					<span class="vs-corner-badge">Item {idx + 1}</span>
				</div>

				<div class="card-body">
					<div class="item-brand-meta">
						<span class="brand-name">{item.brand}</span>
						<span class="price-badge">{item.price}</span>
					</div>

					<h2 class="item-name">{item.name}</h2>
					
					<div class="rating-strip">
						<span class="rating-val">{item.rating}</span>
						<span class="stars">
							{#each Array(5) as _, i}
								<span class="star {i < Math.floor(item.rating) ? 'filled' : ''}">★</span>
							{/each}
						</span>
						<span class="rating-lbl">Expert Score</span>
					</div>

					<!-- Direct shop button -->
					<a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" class="aff-buy-btn">
						Shop on {item.brand || 'Store'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							<polyline points="15 3 21 3 21 9" />
							<line x1="10" y1="14" x2="21" y2="3" />
						</svg>
					</a>
				</div>
			</div>
		{/each}
	</section>

	<!-- Side-by-Side Specifications Table -->
	<section class="specs-table-section">
		<div class="section-title-wrap">
			<h3 class="section-title">Scorecard Breakdown</h3>
			<p class="section-subtitle">Comparing key interior styling performance metrics side-by-side.</p>
		</div>

		<div class="table-scroll-wrap">
			<table class="specs-table">
				<thead>
					<tr>
						<th>Performance Metrics</th>
						{#each guide.items as item}
							<th>{item.name}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each guide.metrics as metric, metricIdx}
						<tr>
							<td class="metric-name">{metric}</td>
							{#each guide.items as item}
								<td>
									<div class="score-row">
										<div class="score-bar-wrap">
											<div class="score-bar" style="width: {item.scores[metricIdx] * 20}%"></div>
										</div>
										<span class="score-num">{item.scores[metricIdx]}/5</span>
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Detailed Pros & Cons Section -->
	<section class="pros-cons-grid">
		{#each guide.items as item}
			<div class="pros-cons-card">
				<h3 class="card-title">{item.name} — Pros & Cons</h3>
				
				<div class="sheet-grid">
					<!-- Pros -->
					<div class="sheet-col pros-col">
						<h4 class="sheet-heading text-green">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="sheet-icon">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Key Advantages
						</h4>
						<ul class="sheet-list">
							{#each item.pros as pro}
								<li>{pro}</li>
							{/each}
						</ul>
					</div>

					<!-- Cons -->
					<div class="sheet-col cons-col">
						<h4 class="sheet-heading text-red">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="sheet-icon">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
							Considerations
						</h4>
						<ul class="sheet-list">
							{#each item.cons as con}
								<li>{con}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</section>

	<!-- Final Verdict Banner -->
	<section class="verdict-banner">
		<div class="verdict-icon">✦</div>
		<div class="verdict-body">
			<h3 class="verdict-title">The Curation Verdict</h3>
			<p class="verdict-text">{guide.verdict}</p>
		</div>
	</section>

	<!-- Back navigation -->
	<footer class="guide-view-footer">
		<a href="{base}/comparisons" class="back-link">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="back-icon">
				<path d="m15 18-6-6 6-6" />
			</svg>
			Back to Buying Guides
		</a>
	</footer>
</div>

<style>
	.guide-view-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
		color: var(--decor-text);
		font-family: var(--font-body);
	}

	/* ── Breadcrumb ───────────────────────── */
	.breadcrumb {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--decor-muted);
	}

	.breadcrumb-link {
		color: inherit;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover { color: var(--decor-accent); }

	.breadcrumb-sep {
		opacity: 0.6;
	}

	.breadcrumb-current {
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 250px;
	}

	/* ── Header ───────────────────────────── */
	.guide-hero-header {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--decor-accent);
	}

	.guide-title {
		font-family: var(--font-decor);
		font-size: clamp(1.75rem, 5vw, 2.75rem);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
	}

	.guide-desc {
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--decor-muted);
	}

	/* ── Items Showcase Grid ──────────────── */
	.items-showcase-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 640px) {
		.items-showcase-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.item-showcase-card {
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		overflow: hidden;
		box-shadow: var(--shadow-card);
		transition: var(--transition);
		display: flex;
		flex-direction: column;
	}

	.item-showcase-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		border-color: rgba(196, 119, 65, 0.25);
	}

	.card-image-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 16/10;
		overflow: hidden;
		background: var(--decor-surface);
	}

	.item-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.vs-corner-badge {
		position: absolute;
		bottom: 0.75rem;
		left: 0.75rem;
		background: rgba(61, 43, 31, 0.85);
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
	}

	.card-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		flex: 1;
	}

	.item-brand-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.brand-name {
		color: var(--decor-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.price-badge {
		color: var(--decor-accent);
		background: rgba(196, 119, 65, 0.08);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.item-name {
		font-family: var(--font-decor);
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--decor-text);
		line-height: 1.25;
	}

	.rating-strip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.rating-val {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--decor-text);
	}

	.stars {
		display: flex;
		color: rgba(232, 221, 210, 1);
		font-size: 1.15rem;
	}

	.star.filled {
		color: #f59e0b; /* Amber */
	}

	.rating-lbl {
		font-size: 0.725rem;
		font-weight: 600;
		color: var(--decor-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.aff-buy-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 700;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-btn);
		color: white;
		background: linear-gradient(135deg, var(--decor-accent), #a86030);
		transition: var(--transition);
		box-shadow: 0 4px 12px rgba(196, 119, 65, 0.2);
		text-decoration: none;
		margin-top: auto;
	}

	.aff-buy-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(196, 119, 65, 0.35);
	}

	.arrow-icon {
		width: 14px;
		height: 14px;
	}

	/* ── Specs Table Scorecard ─────────────── */
	.specs-table-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.section-title-wrap {
		border-left: 3px solid var(--decor-accent);
		padding-left: 1rem;
	}

	.section-title {
		font-family: var(--font-decor);
		font-size: 1.5rem;
		font-weight: 700;
	}

	.section-subtitle {
		font-size: 0.85rem;
		color: var(--decor-muted);
	}

	.table-scroll-wrap {
		overflow-x: auto;
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}

	.specs-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: 0.9rem;
	}

	.specs-table th,
	.specs-table td {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid var(--decor-border);
	}

	.specs-table th {
		background: var(--decor-surface);
		font-family: var(--font-decor);
		font-weight: 700;
		color: var(--decor-text);
	}

	.specs-table th:first-child {
		font-family: var(--font-body);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.75rem;
		color: var(--decor-muted);
	}

	.metric-name {
		font-weight: 700;
		color: var(--decor-text);
	}

	.score-row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.score-bar-wrap {
		flex: 1;
		height: 8px;
		background: var(--decor-surface);
		border-radius: 99px;
		overflow: hidden;
		max-width: 160px;
		border: 1px solid var(--decor-border);
	}

	.score-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--decor-accent-2), var(--decor-accent));
		border-radius: 99px;
	}

	.score-num {
		font-weight: 700;
		color: var(--decor-text);
		font-size: 0.85rem;
	}

	/* ── Pros & Cons Grid ─────────────────── */
	.pros-cons-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 860px) {
		.pros-cons-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.pros-cons-card {
		background: var(--decor-card);
		border: 1px solid var(--decor-border);
		border-radius: var(--radius-card);
		padding: 2rem;
		box-shadow: var(--shadow-card);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.pros-cons-card .card-title {
		font-family: var(--font-decor);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--decor-text);
		border-bottom: 1px dashed var(--decor-border);
		padding-bottom: 0.75rem;
	}

	.sheet-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 500px) {
		.sheet-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.sheet-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.sheet-heading {
		font-size: 0.85rem;
		font-weight: 700;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.text-green { color: #15803d; }
	.text-red { color: #b91c1c; }

	.sheet-icon {
		width: 14px;
		height: 14px;
	}

	.sheet-list {
		padding-left: 1.15rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.825rem;
		line-height: 1.5;
		color: var(--decor-muted);
	}

	/* ── Verdict Banner ───────────────────── */
	.verdict-banner {
		background: linear-gradient(135deg, var(--decor-surface) 0%, #f0e4d7 100%);
		border: 1.5px solid var(--decor-accent);
		border-radius: var(--radius-card);
		padding: 2rem;
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
		box-shadow: var(--shadow-card);
	}

	.verdict-icon {
		font-size: 2rem;
		color: var(--decor-accent);
		line-height: 1;
	}

	.verdict-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.verdict-title {
		font-family: var(--font-decor);
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--decor-text);
	}

	.verdict-text {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--decor-text);
	}

	/* ── Footer ───────────────────────────── */
	.guide-view-footer {
		padding-top: 2rem;
		border-top: 1px solid var(--decor-border);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--decor-muted);
		transition: var(--transition);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--decor-accent);
	}

	.back-icon {
		width: 16px;
		height: 16px;
	}
</style>
