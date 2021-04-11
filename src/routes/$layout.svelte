<script lang="ts" context="module">
	export async function load({ fetch }): Promise<any> {
		const res = await fetch('_content/home.json');
		const page: HomePageJson = await res.json();
		return { props: { page } };
	}
</script>

<script lang="ts">
	import '../app.scss';
	import Nav from '$lib/Nav.svelte';
	import { slide } from 'svelte/transition';
	import type { HomePageJson } from '$model';
	import CloseIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';

	export let page: HomePageJson;

	let showNotification = !!page.notificationBarText;
</script>

{#if showNotification}
	<section
		transition:slide
		on:click={() => (showNotification = false)}
		aria-label="Club Alerts"
		class="flex bg-yellow-500 text-white justify-between items-center p-2"
	>
		<p>
			{page.notificationBarText}
		</p>
		<CloseIcon size="32" />
	</section>
{/if}

<Nav />

<main class="relative max-w-4xl p-8 m-auto box-border">
	<slot />
</main>
