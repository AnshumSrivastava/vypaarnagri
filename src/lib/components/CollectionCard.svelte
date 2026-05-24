<script>
	import { base } from '$app/paths';
	let { collection, theme = 'tech' } = $props();

	const isTech = $derived(theme === 'tech');
	const productCount = $derived(collection.products?.length ?? 0);
</script>

<a
	href="{base}/collections/{collection.slug}"
	class="collection-card {isTech ? 'card-tech' : 'card-decor'}"
	aria-label="View {collection.title} collection"
>
	<!-- Cover image -->
	<div class="cover-wrap">
		<img
			src={collection.coverImage}
			alt={collection.title}
			loading="lazy"
			class="cover-img"
			onerror={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'; }}
		/>
		<div class="cover-overlay"></div>

		<!-- Bottom content on overlay -->
		<div class="cover-content">
			<span class="collection-tag">{collection.category}</span>
			<h2 class="collection-title">{collection.title}</h2>
			{#if collection.description}
				<p class="collection-desc">{collection.description}</p>
			{/if}
			<div class="collection-meta">
				<span class="product-count">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="count-icon">
						<rect x="3" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" />
						<rect x="3" y="14" width="7" height="7" rx="1" />
					</svg>
					{productCount} {productCount === 1 ? 'product' : 'products'}
				</span>
				<span class="explore-cta">
					Explore
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</span>
			</div>
		</div>
	</div>
</a>

<style>
	.collection-card {
		display: block;
		border-radius: 16px;
		overflow: hidden;
		text-decoration: none;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		position: relative;
	}

	.collection-card:hover {
		transform: translateY(-5px);
	}

	.card-tech:hover {
		box-shadow: 0 16px 48px rgba(124, 58, 237, 0.25);
	}

	.card-decor:hover {
		box-shadow: 0 16px 48px rgba(196, 119, 65, 0.2);
	}

	.cover-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 3/2;
		overflow: hidden;
	}

	.cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.collection-card:hover .cover-img {
		transform: scale(1.06);
	}

	.cover-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
		transition: background 0.3s ease;
	}

	.collection-card:hover .cover-overlay {
		background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%);
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.collection-tag {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.6);
	}

	.card-tech .collection-tag {
		color: #a78bfa;
	}

	.card-decor .collection-tag {
		color: #f4c08a;
	}

	.collection-title {
		font-family: var(--font-tech);
		font-size: 1.125rem;
		font-weight: 700;
		color: white;
		line-height: 1.3;
	}

	.card-decor .collection-title {
		font-family: var(--font-decor);
	}

	.collection-desc {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.65);
		line-height: 1.5;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.collection-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.375rem;
	}

	.product-count {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.55);
	}

	.count-icon {
		width: 13px;
		height: 13px;
	}

	.explore-cta {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: white;
		opacity: 0.8;
		transition: opacity 0.2s ease, gap 0.2s ease;
	}

	.collection-card:hover .explore-cta {
		opacity: 1;
		gap: 0.4rem;
	}

	.arrow-icon {
		width: 14px;
		height: 14px;
	}
</style>
