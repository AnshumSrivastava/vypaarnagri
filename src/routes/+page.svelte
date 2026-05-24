<script>
	import { getFeaturedCollections, getFeaturedProducts } from '$lib/utils/data.js';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import FeaturedSection from '$lib/components/FeaturedSection.svelte';
	import ProductGallery from '$lib/components/ProductGallery.svelte';

	const featuredCollections = getFeaturedCollections(8);
	const techCollections = featuredCollections.filter((c) => c.category === 'tech');
	const decorCollections = featuredCollections.filter((c) => c.category === 'decor');
	const featuredProducts = getFeaturedProducts(6);
</script>

<svelte:head>
	<title>VypaaNagri | Discover Tech Setups & Home Decor</title>
	<meta name="description" content="Discover curated tech setups and home decor inspiration. Explore affiliate-linked products through beautiful visual collections." />
	<meta property="og:title" content="VypaaNagri | Discover & Inspire" />
	<meta property="og:description" content="Curated tech and home decor discovery. Browse inspiration collections and get the look." />
	<meta property="og:image" content="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="pinterest-rich-pin" content="true" />
</svelte:head>

<!-- HERO: Split landing with dual niche CTAs -->
<section class="homepage-hero">
	<div class="hero-bg-mesh" aria-hidden="true"></div>
	<div class="particles" aria-hidden="true">
		<div class="particle p1"></div>
		<div class="particle p2"></div>
		<div class="particle p3"></div>
	</div>

	<div class="hero-content">
		<p class="hero-eyebrow">Discover • Inspire • Get the Look</p>
		<h1 class="hero-headline">
			Your Aesthetic.<br />
			<span class="gradient-text">Curated for You.</span>
		</h1>
		<p class="hero-desc">
			Browse inspiration-driven collections of tech setups and home decor. Find products you'll love.
		</p>

		<div class="niche-cards">
			<!-- Tech niche card -->
			<a href="/tech" class="niche-card niche-tech" aria-label="Explore Tech Setups">
				<div class="niche-icon">⚡</div>
				<div class="niche-info">
					<h2 class="niche-title">Tech Setups</h2>
					<p class="niche-desc">Creator rigs, minimal desks, and productivity gear.</p>
				</div>
				<svg class="niche-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>

			<!-- Decor niche card -->
			<a href="/decor" class="niche-card niche-decor" aria-label="Explore Home Decor">
				<div class="niche-icon">🏡</div>
				<div class="niche-info">
					<h2 class="niche-title">Home Decor</h2>
					<p class="niche-desc">Cozy rooms, warm aesthetics, and curated pieces.</p>
				</div>
				<svg class="niche-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- TECH COLLECTIONS -->
<section class="page-section">
	<div class="container">
		<div class="section-label tech-label">⚡ Tech</div>
		<FeaturedSection
			collections={techCollections}
			title="Creator Setups"
			theme="tech"
		/>
		<div class="view-all-wrap">
			<a href="/tech" class="view-all-btn view-all-tech">View all Tech Collections →</a>
		</div>
	</div>
</section>

<!-- DECOR COLLECTIONS -->
<section class="page-section decor-section">
	<div class="container">
		<div class="section-label decor-label">🏡 Home Decor</div>
		<FeaturedSection
			collections={decorCollections}
			title="Cozy Spaces"
			theme="decor"
		/>
		<div class="view-all-wrap">
			<a href="/decor" class="view-all-btn view-all-decor">View all Decor Collections →</a>
		</div>
	</div>
</section>

<!-- FEATURED PRODUCTS STRIP -->
<section class="page-section">
	<div class="container">
		<div class="section-label">✦ Handpicked</div>
		<ProductGallery
			products={featuredProducts}
			title="Featured Products"
			theme="tech"
			columns={3}
		/>
	</div>
</section>

<!-- CTA BANNER -->
<section class="cta-banner">
	<div class="cta-inner">
		<h2 class="cta-headline">Ready to Build Your Dream Setup?</h2>
		<p class="cta-sub">Browse curated collections and discover products that spark inspiration.</p>
		<div class="cta-btns">
			<a href="/tech" class="cta-btn-primary">Explore Tech</a>
			<a href="/decor" class="cta-btn-secondary">Explore Decor</a>
		</div>
	</div>
</section>

<style>
	/* ── Hero ──────────────────────────────── */
	.homepage-hero {
		position: relative;
		overflow: hidden;
		min-height: 600px;
		display: flex;
		align-items: center;
		background: #0a0a0f;
	}

	@media (min-width: 768px) {
		.homepage-hero { min-height: 700px; }
	}

	.hero-bg-mesh {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at 15% 50%, rgba(124, 58, 237, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse at 85% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 80%, rgba(196, 119, 65, 0.08) 0%, transparent 50%);
	}

	.particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		animation: float 10s ease-in-out infinite;
	}

	.p1 { width: 350px; height: 350px; top: -120px; right: 5%; background: radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent); animation-delay: 0s; }
	.p2 { width: 250px; height: 250px; bottom: -80px; left: 10%; background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent); animation-delay: -4s; }
	.p3 { width: 180px; height: 180px; top: 40%; left: 60%; background: radial-gradient(circle, rgba(196, 119, 65, 0.15), transparent); animation-delay: -7s; opacity: 0.6; }

	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-24px) scale(1.04); }
	}

	.hero-content {
		position: relative;
		z-index: 10;
		max-width: 1400px;
		margin: 0 auto;
		padding: 5rem 1.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.hero-eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: #7c3aed;
	}

	.hero-headline {
		font-family: var(--font-tech);
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: #f8fafc;
		max-width: 600px;
	}

	.gradient-text {
		background: linear-gradient(135deg, #7c3aed, #06b6d4, #c47741);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 200% auto;
		animation: gradientShift 4s ease infinite;
	}

	@keyframes gradientShift {
		0% { background-position: 0% center; }
		50% { background-position: 100% center; }
		100% { background-position: 0% center; }
	}

	.hero-desc {
		font-size: 1.0625rem;
		color: #94a3b8;
		line-height: 1.7;
		max-width: 480px;
	}

	/* Niche cards */
	.niche-cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		max-width: 640px;
		margin-top: 0.5rem;
	}

	@media (min-width: 500px) {
		.niche-cards { grid-template-columns: repeat(2, 1fr); }
	}

	.niche-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem;
		border-radius: 14px;
		text-decoration: none;
		transition: all 0.25s ease;
		position: relative;
		overflow: hidden;
	}

	.niche-tech {
		background: rgba(22, 22, 31, 0.9);
		border: 1px solid #1e1e2e;
		color: #e2e8f0;
	}

	.niche-tech:hover {
		border-color: rgba(124, 58, 237, 0.5);
		box-shadow: 0 8px 30px rgba(124, 58, 237, 0.2);
		transform: translateY(-2px);
	}

	.niche-decor {
		background: rgba(254, 250, 246, 0.08);
		border: 1px solid rgba(254, 250, 246, 0.1);
		color: #e2e8f0;
	}

	.niche-decor:hover {
		border-color: rgba(196, 119, 65, 0.5);
		box-shadow: 0 8px 30px rgba(196, 119, 65, 0.2);
		transform: translateY(-2px);
	}

	.niche-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.niche-info {
		flex: 1;
	}

	.niche-title {
		font-family: var(--font-tech);
		font-size: 0.9375rem;
		font-weight: 700;
		margin-bottom: 0.2rem;
	}

	.niche-desc {
		font-size: 0.8rem;
		color: #64748b;
		line-height: 1.4;
	}

	.niche-decor .niche-desc {
		color: #94a3b8;
	}

	.niche-arrow {
		width: 18px;
		height: 18px;
		color: #475569;
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	.niche-card:hover .niche-arrow {
		transform: translateX(4px);
		color: #a78bfa;
	}

	.niche-decor:hover .niche-arrow {
		color: #f4c08a;
	}

	/* ── Sections ──────────────────────────── */
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.page-section {
		padding: 5rem 0;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.decor-section {
		background: linear-gradient(180deg, #fefaf6 0%, #f5ede0 100%);
	}

	.section-label {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #475569;
		margin-bottom: -1rem;
	}

	.tech-label { color: #7c3aed; }
	.decor-label { color: #c47741; }

	.view-all-wrap {
		margin-top: 1rem;
		text-align: center;
	}

	.view-all-btn {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		padding: 0.625rem 1.5rem;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.view-all-tech {
		color: #a78bfa;
		border: 1px solid rgba(124, 58, 237, 0.3);
		background: rgba(124, 58, 237, 0.05);
	}

	.view-all-tech:hover {
		background: rgba(124, 58, 237, 0.12);
		border-color: rgba(124, 58, 237, 0.6);
	}

	.view-all-decor {
		color: #c47741;
		border: 1px solid rgba(196, 119, 65, 0.3);
		background: rgba(196, 119, 65, 0.05);
	}

	.view-all-decor:hover {
		background: rgba(196, 119, 65, 0.12);
		border-color: rgba(196, 119, 65, 0.6);
	}

	/* ── CTA Banner ─────────────────────────── */
	.cta-banner {
		background: linear-gradient(135deg, #16161f 0%, #1a1a2e 100%);
		border-top: 1px solid #1e1e2e;
		border-bottom: 1px solid #1e1e2e;
		padding: 5rem 1.5rem;
	}

	.cta-inner {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.cta-headline {
		font-family: var(--font-tech);
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		font-weight: 800;
		color: #f8fafc;
		line-height: 1.2;
	}

	.cta-sub {
		font-size: 0.9375rem;
		color: #64748b;
		line-height: 1.6;
	}

	.cta-btns {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.cta-btn-primary {
		padding: 0.75rem 1.75rem;
		background: linear-gradient(135deg, #7c3aed, #5b21b6);
		color: white;
		font-weight: 700;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow: 0 4px 16px rgba(124, 58, 237, 0.35);
	}

	.cta-btn-primary:hover {
		box-shadow: 0 6px 24px rgba(124, 58, 237, 0.5);
		transform: translateY(-2px);
	}

	.cta-btn-secondary {
		padding: 0.75rem 1.75rem;
		background: rgba(196, 119, 65, 0.1);
		color: #f4c08a;
		font-weight: 600;
		border-radius: 10px;
		text-decoration: none;
		border: 1px solid rgba(196, 119, 65, 0.3);
		transition: all 0.2s ease;
	}

	.cta-btn-secondary:hover {
		background: rgba(196, 119, 65, 0.18);
		border-color: rgba(196, 119, 65, 0.6);
	}
</style>
