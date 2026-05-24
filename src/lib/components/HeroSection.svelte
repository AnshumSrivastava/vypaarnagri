<script>
	let {
		headline = '',
		subheadline = '',
		description = '',
		ctaLabel = 'Explore Collections',
		ctaHref = '/',
		secondaryCtaLabel = '',
		secondaryCtaHref = '',
		backgroundImage = '',
		theme = 'tech'
	} = $props();

	const isTech = $derived(theme === 'tech');
</script>

<section
	class="hero {isTech ? 'hero-tech' : 'hero-decor'}"
	aria-label="Hero section"
>
	{#if backgroundImage}
		<div class="hero-bg">
			<img src={backgroundImage} alt="" aria-hidden="true" class="hero-bg-img" loading="eager" />
			<div class="hero-bg-overlay"></div>
		</div>
	{:else}
		<div class="hero-gradient {isTech ? 'gradient-tech' : 'gradient-decor'}"></div>
	{/if}

	<!-- Decorative particles for tech -->
	{#if isTech}
		<div class="particles" aria-hidden="true">
			<div class="particle p1"></div>
			<div class="particle p2"></div>
			<div class="particle p3"></div>
		</div>
	{/if}

	<div class="hero-content">
		{#if subheadline}
			<p class="hero-sub">{subheadline}</p>
		{/if}

		<h1 class="hero-headline">
			{headline}
		</h1>

		{#if description}
			<p class="hero-desc">{description}</p>
		{/if}

		<div class="hero-ctas">
			<a href={ctaHref} class="hero-cta-primary">
				{ctaLabel}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cta-arrow">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
			{#if secondaryCtaLabel}
				<a href={secondaryCtaHref} class="hero-cta-secondary">
					{secondaryCtaLabel}
				</a>
			{/if}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		min-height: 520px;
		display: flex;
		align-items: center;
	}

	@media (min-width: 768px) {
		.hero { min-height: 620px; }
	}

	/* Background */
	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-bg-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(10, 10, 15, 0.85) 0%,
			rgba(10, 10, 15, 0.5) 100%
		);
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.gradient-tech {
		background:
			radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 60%),
			radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
			linear-gradient(135deg, #0a0a0f 0%, #0d0d18 100%);
	}

	.gradient-decor {
		background:
			radial-gradient(ellipse at 30% 60%, rgba(196, 119, 65, 0.12) 0%, transparent 60%),
			radial-gradient(ellipse at 70% 20%, rgba(122, 158, 126, 0.1) 0%, transparent 50%),
			linear-gradient(135deg, #fefaf6 0%, #f5ede0 100%);
	}

	/* Particles */
	.particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent);
		animation: float 8s ease-in-out infinite;
	}

	.p1 { width: 300px; height: 300px; top: -100px; right: 10%; animation-delay: 0s; }
	.p2 { width: 200px; height: 200px; bottom: -50px; left: 20%; animation-delay: -3s; }
	.p3 { width: 150px; height: 150px; top: 30%; right: 30%; animation-delay: -5s; opacity: 0.5; }

	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
		50% { transform: translateY(-30px) scale(1.05); opacity: 0.6; }
	}

	/* Content */
	.hero-content {
		position: relative;
		z-index: 10;
		max-width: 1400px;
		margin: 0 auto;
		padding: 5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 680px;
		width: 100%;
		padding-left: max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem));
	}

	.hero-sub {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #7c3aed;
	}

	.hero-decor .hero-sub {
		color: #c47741;
	}

	.hero-headline {
		font-family: var(--font-tech);
		font-size: clamp(2rem, 6vw, 3.75rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #f8fafc;
	}

	.hero-decor .hero-headline {
		font-family: var(--font-decor);
		color: #3d2b1f;
		font-weight: 700;
	}

	.hero-desc {
		font-size: 1rem;
		line-height: 1.7;
		color: #94a3b8;
		max-width: 480px;
	}

	.hero-decor .hero-desc {
		color: #7a6255;
	}

	/* CTAs */
	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		margin-top: 0.5rem;
	}

	.hero-cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.75rem;
		background: linear-gradient(135deg, #7c3aed, #5b21b6);
		color: white;
		font-weight: 700;
		font-size: 0.9375rem;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.25s ease;
		box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
	}

	.hero-cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(124, 58, 237, 0.55);
	}

	.hero-decor .hero-cta-primary {
		background: linear-gradient(135deg, #c47741, #a86030);
		box-shadow: 0 4px 20px rgba(196, 119, 65, 0.35);
	}

	.hero-decor .hero-cta-primary:hover {
		box-shadow: 0 8px 30px rgba(196, 119, 65, 0.5);
	}

	.cta-arrow {
		width: 18px;
		height: 18px;
		transition: transform 0.2s ease;
	}

	.hero-cta-primary:hover .cta-arrow {
		transform: translateX(3px);
	}

	.hero-cta-secondary {
		display: inline-flex;
		align-items: center;
		padding: 0.875rem 1.5rem;
		border: 1.5px solid rgba(124, 58, 237, 0.4);
		color: #a78bfa;
		font-weight: 600;
		font-size: 0.9375rem;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.25s ease;
		background: rgba(124, 58, 237, 0.05);
	}

	.hero-cta-secondary:hover {
		border-color: #7c3aed;
		background: rgba(124, 58, 237, 0.12);
	}

	.hero-decor .hero-cta-secondary {
		border-color: rgba(196, 119, 65, 0.4);
		color: #c47741;
		background: rgba(196, 119, 65, 0.05);
	}

	.hero-decor .hero-cta-secondary:hover {
		border-color: #c47741;
		background: rgba(196, 119, 65, 0.1);
	}
</style>
