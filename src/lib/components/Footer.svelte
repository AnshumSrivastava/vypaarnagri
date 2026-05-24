<script>
	const currentYear = new Date().getFullYear();

	const links = {
		explore: [
			{ href: '/', label: 'Home' },
			{ href: '/tech', label: 'Tech Setups' },
			{ href: '/decor', label: 'Home Decor' }
		],
		collections: [
			{ href: '/collections/minimal-creator-setup', label: 'Minimal Creator Setup' },
			{ href: '/collections/cozy-bedroom-sanctuary', label: 'Cozy Bedroom' },
			{ href: '/collections/podcast-streaming-rig', label: 'Podcast Rig' },
			{ href: '/collections/warm-living-room-vibes', label: 'Warm Living Room' }
		]
	};
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<a href="/" class="footer-logo">
				<span class="logo-icon">◈</span>
				<span>Vypaa<span class="accent">Nagri</span></span>
			</a>
			<p class="footer-tagline">
				Discover curated tech setups and home decor inspiration. Browse, explore, and get the look.
			</p>
			<p class="footer-disclaimer">
				* This site contains affiliate links. We may earn a commission if you purchase through our
				links, at no extra cost to you.
			</p>
		</div>

		<div class="footer-links-group">
			<h3 class="footer-heading">Explore</h3>
			<ul role="list">
				{#each links.explore as link}
					<li><a href={link.href} class="footer-link">{link.label}</a></li>
				{/each}
			</ul>
		</div>

		<div class="footer-links-group">
			<h3 class="footer-heading">Collections</h3>
			<ul role="list">
				{#each links.collections as link}
					<li><a href={link.href} class="footer-link">{link.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<p>© {currentYear} VypaaNagri. All rights reserved.</p>
		<p>Made with ♥ for discovery enthusiasts.</p>
	</div>
</footer>

<style>
	.footer {
		background: #060609;
		border-top: 1px solid rgba(30, 30, 46, 0.8);
		margin-top: 6rem;
		font-family: var(--font-body);
	}

	.footer-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 4rem 1.5rem 3rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 640px) {
		.footer-inner { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.footer-inner { grid-template-columns: 2fr 1fr 1fr; }
	}

	.footer-logo {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-tech);
		font-size: 1.25rem;
		font-weight: 700;
		color: #e2e8f0;
		text-decoration: none;
		margin-bottom: 1rem;
	}

	.logo-icon {
		color: #7c3aed;
	}

	.accent {
		color: #7c3aed;
	}

	.footer-tagline {
		font-size: 0.875rem;
		color: #64748b;
		line-height: 1.6;
		max-width: 340px;
		margin-bottom: 1rem;
	}

	.footer-disclaimer {
		font-size: 0.75rem;
		color: #475569;
		line-height: 1.5;
		max-width: 340px;
	}

	.footer-heading {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #475569;
		margin-bottom: 1rem;
	}

	.footer-links-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.footer-link {
		font-size: 0.875rem;
		color: #64748b;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: #a78bfa;
	}

	.footer-bottom {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		border-top: 1px solid rgba(30, 30, 46, 0.5);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #475569;
	}
</style>
