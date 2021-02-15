<script lang="ts">
	export let segment: string;
	const pages: [string, string][] = [
		[undefined, "HOME"],
		["about", "ABOUT"],
		["blog", "BLOG"],
	];
</script>

<nav class="relative z-50">
	<ul class="flex flex-row">
		<li class="a flex-grow">LOGO GOES HERE</li>
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
		@apply border border-b-2 border-gray-200 shadow-md font-light px-4 py-0;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		content: "";
		width: calc(100% - 1em);
		bottom: -1px;
		@apply bg-blue-400 block absolute h-1;
	}

	.a {
		@apply no-underline px-4 py-4 block font-medium text-lg;
	}

	a {
		@apply no-underline px-4 py-4 block font-medium text-lg;
	}
</style>
