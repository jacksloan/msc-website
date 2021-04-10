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
	import { fade, slide } from 'svelte/transition';
	import type { HomePageJson } from '../model/home-page-json.model';
	import CloseIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';

	export let page: HomePageJson;

	export let segment: string;

	let showNotification = !!page.notificationBarText;

	let show = true;

	const change = (segment: string) => {
		show = !show;
	};

	$: change(segment);
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

<Nav {segment} />

{#if show}
	<main
		in:fade={{ delay: 205, duration: 200 }}
		out:fade={{ duration: 200 }}
		class="relative max-w-4xl p-8 m-auto box-border"
	>
		<slot />
	</main>
{:else}
	<main
		in:fade={{ delay: 205, duration: 200 }}
		out:fade={{ duration: 200 }}
		class="relative max-w-4xl p-8 m-auto box-border"
	>
		<slot />
	</main>
{/if}
