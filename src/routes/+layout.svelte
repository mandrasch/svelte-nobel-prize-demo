<script>
	// import from node_modules/
	import 'simpledotcss';
	import '$styles/global.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Svelte Nobel Prize Demo</title>
	<meta name="description" content="Search & filter demo with Svelte v5 & SvelteKit." />
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />
