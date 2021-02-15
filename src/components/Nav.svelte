<script lang="ts">
	import { goto } from "@sapper/app";
	import MscLogo from "./MscLogo.svelte";

	export let segment: string;
	const pages: [string, string][] = [
		[undefined, "HOME"],
		["about", "ABOUT"],
		["blog", "BLOG"],
	];

	function goHome() {
		goto(".");
	}
</script>

<nav class="relative bg-white z-50">
	<ul class="flex flex-row">
		<li class="flex-grow flex flex-row items-center cursor-pointer">
			<div on:click={() => goHome()}>
				<MscLogo size="48px" />
			</div>
			<p on:click={() => goHome()} class="text-2xl ml-2 font-medium">
				MSC
			</p>
		</li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		{#each pages as [link, display]}
			<li>
				<a
					rel={segment === "blog" ? "prefetch" : undefined}
					aria-current={segment === link ? "page" : undefined}
					href={link || "."}>{display}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		@apply border border-b-2 border-gray-200 shadow-sm font-light px-4 py-0;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		content: "";
		width: calc(100% - 1.95rem);
		bottom: -1px;
		@apply bg-blue-400 block absolute h-1;
	}

	a {
		@apply no-underline px-4 py-4 block font-medium text-lg;
	}
</style>
