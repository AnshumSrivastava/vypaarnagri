<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Navbar />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<style>
	main {
		min-height: calc(100vh - 64px);
	}
</style>
