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
		}
	}

	const navLinks = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/tech`, label: 'Tech Setups' },
		{ href: `${base}/decor`, label: 'Home Decor' }
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
			<span class="logo-text">Vypaa<span class="logo-accent">Nagri</span></span>
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
					placeholder="Search products..."
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
		<div class="mobile-menu">
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
					placeholder="Search products..."
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
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(30, 30, 46, 0.8);
	}

	.navbar-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 64px;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.navbar-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-tech);
		font-size: 1.25rem;
		font-weight: 700;
		text-decoration: none;
		flex-shrink: 0;
	}

	.logo-icon {
		color: #7c3aed;
		font-size: 1.4rem;
	}

	.logo-text {
		color: #e2e8f0;
	}

	.logo-accent {
		color: #7c3aed;
	}

	.navbar-links {
		display: none;
		list-style: none;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
	}

	@media (min-width: 768px) {
		.navbar-links { display: flex; }
	}

	.nav-link {
		display: block;
		padding: 0.4rem 0.875rem;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #94a3b8;
		text-decoration: none;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.nav-link:hover,
	.nav-link.active {
		color: #e2e8f0;
		background: rgba(124, 58, 237, 0.15);
	}

	.nav-link.active {
		color: #a78bfa;
	}

	.navbar-search {
		flex: 1;
		max-width: 320px;
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
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		width: 16px;
		height: 16px;
		color: #64748b;
	}

	.search-input {
		width: 100%;
		background: rgba(22, 22, 31, 0.8);
		border: 1px solid rgba(30, 30, 46, 1);
		border-radius: 8px;
		padding: 0.5rem 0.75rem 0.5rem 2.25rem;
		font-size: 0.875rem;
		color: #e2e8f0;
		outline: none;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
		font-family: var(--font-body);
	}

	.search-input::placeholder {
		color: #475569;
	}

	.search-input:focus {
		border-color: #7c3aed;
		box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
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

	@media (min-width: 768px) {
		.hamburger { display: none; }
	}

	.bar {
		display: block;
		width: 22px;
		height: 2px;
		background: #94a3b8;
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	/* Mobile menu */
	.mobile-menu {
		background: rgba(10, 10, 15, 0.97);
		border-top: 1px solid rgba(30, 30, 46, 0.8);
		padding: 1rem 1.5rem;
	}

	.mobile-menu ul {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
	}

	.mobile-nav-link {
		display: block;
		padding: 0.75rem 0;
		font-size: 1rem;
		font-weight: 500;
		color: #94a3b8;
		text-decoration: none;
		border-bottom: 1px solid rgba(30, 30, 46, 0.5);
		transition: color 0.2s ease;
	}

	.mobile-nav-link:hover {
		color: #a78bfa;
	}

	.mobile-search-input {
		width: 100%;
		background: rgba(22, 22, 31, 0.8);
		border: 1px solid rgba(30, 30, 46, 1);
		border-radius: 8px;
		padding: 0.625rem 1rem;
		font-size: 0.875rem;
		color: #e2e8f0;
		outline: none;
		font-family: var(--font-body);
	}

	.mobile-search-input::placeholder {
		color: #475569;
	}
</style>
