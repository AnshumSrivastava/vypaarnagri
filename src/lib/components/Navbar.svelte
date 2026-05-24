<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let mobileMenuOpen = $state(false);
	let searchValue = $state('');

	function handleSearch(e) {
		if (e.key === 'Enter' && searchValue.trim()) {
			goto(`${base}/search?q=${encodeURIComponent(searchValue.trim())}`);
			searchValue = '';
			mobileMenuOpen = false;
		}
	}

	const navLinks = [
		{ href: `${base}/`, label: 'Shop Decor' },
		{ href: `${base}/blogs`, label: 'Design Blogs' },
		{ href: `${base}/comparisons`, label: 'Buying Guides' }
	];

	function isLinkActive(href) {
		const path = $page.url.pathname;
		if (href === `${base}/`) {
			return path === base || path === `${base}/`;
		}
		return path === href || path === `${href}/`;
	}
</script>

<nav class="navbar" aria-label="Main navigation">
	<div class="navbar-inner">
		<!-- Logo -->
		<a href="{base}/" class="navbar-logo" aria-label="VypaaNagri Home">
			<span class="logo-icon">◈</span>
			<span class="logo-text">Vypaa<span class="logo-accent">Decor</span></span>
		</a>

		<!-- Desktop nav links -->
		<ul class="navbar-links" role="list">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="nav-link {isLinkActive(link.href) ? 'active' : ''}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Search -->
		<div class="navbar-search">
			<div class="search-wrap">
				<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<input
					type="search"
					placeholder="Search styling, products..."
					bind:value={searchValue}
					onkeydown={handleSearch}
					class="search-input"
					aria-label="Search products"
					id="navbar-search"
				/>
			</div>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="hamburger"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-expanded={mobileMenuOpen}
			aria-label="Toggle navigation menu"
			id="hamburger-btn"
		>
			<span class="bar {mobileMenuOpen ? 'open' : ''}"></span>
			<span class="bar {mobileMenuOpen ? 'open' : ''}"></span>
			<span class="bar {mobileMenuOpen ? 'open' : ''}"></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu animate-reveal">
			<ul role="list">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="mobile-nav-link"
							onclick={() => (mobileMenuOpen = false)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
			<div class="mobile-search">
				<input
					type="search"
					placeholder="Search decor, blogs..."
					bind:value={searchValue}
					onkeydown={handleSearch}
					class="mobile-search-input"
					aria-label="Search products mobile"
					id="mobile-search"
				/>
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(254, 250, 246, 0.85);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(232, 221, 210, 0.7);
		font-family: var(--font-body);
	}

	.navbar-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 70px;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.navbar-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-decor);
		font-size: 1.35rem;
		font-weight: 700;
		text-decoration: none;
		flex-shrink: 0;
	}

	.logo-icon {
		color: var(--decor-accent);
		font-size: 1.4rem;
	}

	.logo-text {
		color: var(--decor-text);
	}

	.logo-accent {
		color: var(--decor-accent);
	}

	.navbar-links {
		display: none;
		list-style: none;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
	}

	@media (min-width: 860px) {
		.navbar-links { display: flex; }
	}

	.nav-link {
		display: block;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--decor-muted);
		text-decoration: none;
		transition: var(--transition);
		white-space: nowrap;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--decor-text);
		background: rgba(196, 119, 65, 0.08);
	}

	.nav-link.active {
		color: var(--decor-accent);
		font-weight: 600;
	}

	.navbar-search {
		flex: 1;
		max-width: 300px;
		margin-left: auto;
		display: none;
	}

	@media (min-width: 640px) {
		.navbar-search { display: block; }
	}

	.search-wrap {
		position: relative;
	}

	.search-icon {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		width: 15px;
		height: 15px;
		color: var(--decor-muted);
	}

	.search-input {
		width: 100%;
		background: var(--decor-surface);
		border: 1px solid var(--decor-border);
		border-radius: 20px;
		padding: 0.45rem 0.75rem 0.45rem 2.25rem;
		font-size: 0.875rem;
		color: var(--decor-text);
		outline: none;
		transition: var(--transition);
		font-family: var(--font-body);
	}

	.search-input::placeholder {
		color: var(--decor-muted);
		opacity: 0.75;
	}

	.search-input:focus {
		border-color: var(--decor-accent);
		box-shadow: 0 0 0 3px rgba(196, 119, 65, 0.08);
		background: var(--decor-card);
	}

	/* Mobile hamburger */
	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		margin-left: auto;
	}

	@media (min-width: 860px) {
		.hamburger { display: none; }
	}

	.bar {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--decor-text);
		border-radius: 2px;
		transition: var(--transition);
	}

	.bar.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.bar.open:nth-child(2) {
		opacity: 0;
	}

	.bar.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile menu */
	.mobile-menu {
		background: var(--decor-bg);
		border-top: 1px solid var(--decor-border);
		padding: 1rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-shadow: 0 10px 20px rgba(61, 43, 31, 0.04);
	}

	.mobile-menu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-nav-link {
		display: block;
		padding: 0.75rem 0;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--decor-text);
		text-decoration: none;
		border-bottom: 1px solid rgba(232, 221, 210, 0.4);
		transition: var(--transition);
	}

	.mobile-nav-link:hover {
		color: var(--decor-accent);
		padding-left: 0.25rem;
	}

	.mobile-search-input {
		width: 100%;
		background: var(--decor-surface);
		border: 1px solid var(--decor-border);
		border-radius: 20px;
		padding: 0.6rem 1rem;
		font-size: 0.875rem;
		color: var(--decor-text);
		outline: none;
		font-family: var(--font-body);
	}

	.mobile-search-input::placeholder {
		color: var(--decor-muted);
	}
</style>
