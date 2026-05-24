<script>
	import { base } from '$app/paths';

	const currentYear = new Date().getFullYear();

	const links = {
		explore: [
			{ href: `${base}/`, label: 'Shop Decor' },
			{ href: `${base}/blogs`, label: 'Design Blogs' },
			{ href: `${base}/comparisons`, label: 'Buying Guides' }
		],
		collections: [
			{ href: `${base}/collections/cozy-bedroom-sanctuary`, label: 'Cozy Bedroom Sanctuary' },
			{ href: `${base}/collections/warm-living-room-vibes`, label: 'Warm Living Room Vibes' },
			{ href: `${base}/collections/earthy-shelf-styling`, label: 'Earthy Shelf Styling' },
			{ href: `${base}/collections/japandi-study-nook`, label: 'Japandi Study Nook' }
		]
	};
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<a href="{base}/" class="footer-logo">
				<span class="logo-icon">◈</span>
				<span>Vypaa<span class="accent">Decor</span></span>
			</a>
			<p class="footer-tagline">
				Curating spaces that help you slow down, breathe, and find calm. Discover premium Wabi-Sabi, Japandi, and cozy modern interior pieces.
			</p>
			<p class="footer-disclaimer">
				* VypaaDecor is a visual curation portal. We feature handpicked collections with sponsored affiliate links. If you purchase through our links, we may earn a small commission at no additional cost to you.
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
			<h3 class="footer-heading">Style Collections</h3>
			<ul role="list">
				{#each links.collections as link}
					<li><a href={link.href} class="footer-link">{link.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<p>© {currentYear} VypaaDecor. Crafted for intentional living and visual inspiration.</p>
		<p>Curated with passion ✦</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--decor-surface);
		border-top: 1px solid var(--decor-border);
		margin-top: 6rem;
		font-family: var(--font-body);
		color: var(--decor-text);
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
		font-family: var(--font-decor);
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--decor-text);
		text-decoration: none;
		margin-bottom: 1rem;
	}

	.logo-icon {
		color: var(--decor-accent);
	}

	.accent {
		color: var(--decor-accent);
	}

	.footer-tagline {
		font-size: 0.875rem;
		color: var(--decor-muted);
		line-height: 1.6;
		max-width: 420px;
		margin-bottom: 1.25rem;
	}

	.footer-disclaimer {
		font-size: 0.725rem;
		color: var(--decor-muted);
		line-height: 1.5;
		max-width: 440px;
		opacity: 0.8;
	}

	.footer-heading {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--decor-muted);
		margin-bottom: 1.25rem;
	}

	.footer-links-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-link {
		font-size: 0.875rem;
		color: var(--decor-muted);
		text-decoration: none;
		transition: var(--transition);
	}

	.footer-link:hover {
		color: var(--decor-accent);
		padding-left: 0.15rem;
	}

	.footer-bottom {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1.5rem 1.5rem;
		border-top: 1px solid rgba(232, 221, 210, 0.6);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--decor-muted);
	}
</style>
