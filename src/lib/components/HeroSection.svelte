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
		theme = 'decor'
	} = $props();
</script>

<section class="hero-decor" aria-label="Hero section">
	{#if backgroundImage}
		<div class="hero-bg">
			<img src={backgroundImage} alt="" aria-hidden="true" class="hero-bg-img" loading="eager" />
			<div class="hero-bg-overlay"></div>
		</div>
	{:else}
		<div class="hero-gradient"></div>
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
	.hero-decor {
		position: relative;
		overflow: hidden;
		min-height: 480px;
		display: flex;
		align-items: center;
		background-color: var(--decor-bg);
		border-bottom: 1px solid var(--decor-border);
	}

	@media (min-width: 768px) {
		.hero-decor { min-height: 580px; }
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
		object-position: center;
	}

	.hero-bg-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to right,
			rgba(254, 250, 246, 0.95) 0%,
			rgba(254, 250, 246, 0.75) 50%,
			rgba(254, 250, 246, 0.25) 100%
		);
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		z-index: 0;
		background:
			radial-gradient(ellipse at 15% 70%, rgba(196, 119, 65, 0.1) 0%, transparent 60%),
			radial-gradient(ellipse at 85% 20%, rgba(122, 158, 126, 0.08) 0%, transparent 50%),
			linear-gradient(135deg, #fefaf6 0%, #f5ede0 100%);
	}

	/* Content */
	.hero-content {
		position: relative;
		z-index: 10;
		max-width: 720px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;
		padding-left: max(1.5rem, calc((100vw - 1400px) / 2 + 1.5rem));
	}

	.hero-sub {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--decor-accent);
	}

	.hero-headline {
		font-family: var(--font-decor);
		font-size: clamp(2rem, 5.5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--decor-text);
	}

	.hero-desc {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--decor-muted);
		max-width: 520px;
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
		background: linear-gradient(135deg, var(--decor-accent), #a86030);
		color: white;
		font-weight: 700;
		font-size: 0.9375rem;
		border-radius: var(--radius-btn);
		text-decoration: none;
		transition: var(--transition);
		box-shadow: 0 4px 16px rgba(196, 119, 65, 0.25);
	}

	.hero-cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 22px rgba(196, 119, 65, 0.4);
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
		border: 1.5px solid rgba(196, 119, 65, 0.35);
		color: var(--decor-accent);
		font-weight: 600;
		font-size: 0.9375rem;
		border-radius: var(--radius-btn);
		text-decoration: none;
		transition: var(--transition);
		background: rgba(196, 119, 65, 0.04);
	}

	.hero-cta-secondary:hover {
		border-color: var(--decor-accent);
		background: rgba(196, 119, 65, 0.1);
	}
</style>
