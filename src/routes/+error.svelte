<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>404 — Page Not Found | VypaaNagri</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="not-found">
	<div class="nf-inner">
		<div class="nf-code">404</div>
		<h1 class="nf-title">Page Not Found</h1>
		<p class="nf-desc">
			This collection or page doesn't exist yet. Explore our curated categories instead.
		</p>
		<div class="nf-links">
			<a href="/" class="nf-btn-primary">← Back to Home</a>
			<a href="/tech" class="nf-btn-secondary">Tech Setups</a>
			<a href="/decor" class="nf-btn-secondary">Home Decor</a>
		</div>
	</div>
</div>

<style>
	.not-found {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--tech-bg);
		padding: 2rem;
	}

	.nf-inner {
		text-align: center;
		max-width: 480px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.nf-code {
		font-family: var(--font-tech);
		font-size: 7rem;
		font-weight: 800;
		line-height: 1;
		background: linear-gradient(135deg, #7c3aed, #06b6d4);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.nf-title {
		font-family: var(--font-tech);
		font-size: 1.75rem;
		font-weight: 700;
		color: #e2e8f0;
	}

	.nf-desc {
		font-size: 0.9375rem;
		color: #64748b;
		line-height: 1.6;
	}

	.nf-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 0.5rem;
	}

	.nf-btn-primary {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #7c3aed, #5b21b6);
		color: white;
		font-weight: 700;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.nf-btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
	}

	.nf-btn-secondary {
		padding: 0.75rem 1.25rem;
		border: 1px solid #1e1e2e;
		color: #94a3b8;
		font-weight: 500;
		border-radius: 10px;
		text-decoration: none;
		background: rgba(22, 22, 31, 0.8);
		transition: all 0.2s ease;
		font-size: 0.875rem;
	}

	.nf-btn-secondary:hover {
		border-color: #7c3aed;
		color: #a78bfa;
	}
</style>
