<script>
	import ArrowRightCircleIcon from "svelte-feather-icons/src/icons/ArrowRightCircleIcon.svelte";
	import CalendarIcon from "svelte-feather-icons/src/icons/CalendarIcon.svelte";
	import MapPinIcon from "svelte-feather-icons/src/icons/MapPinIcon.svelte";
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1 class="mt-4 mb-12">Great success!</h1>

<div class="flex flex-col md:flex-row justify-between mb-8">
	<div class="card bg-white">
		<h6 class="mb-2">Spring Sessions</h6>
		<div class="icon-container">
			<CalendarIcon size="16" />
			<p class="ml-2">May 1 - June 6</p>
		</div>
		<div class="icon-container">
			<MapPinIcon size="16" />
			<p class="ml-2">Theodore Wirth</p>
		</div>
		<p class=mt-4>The spring training schedule is now active</p>
		<button class="btn btn-blue flex flex-row">
			<p class="mr-1">Sign up now</p>
			<ArrowRightCircleIcon size="24" />
		</button>
	</div>

	<div class="card bg-green-200">
		<h6 class="mb-2">Spring Sessions</h6>
		<div class="icon-container">
			<CalendarIcon size="16" />
			<p class="ml-2">May 1 - June 6</p>
		</div>
		<div class="icon-container">
			<MapPinIcon size="16" />
			<p class="ml-2">Theodore Wirth</p>
		</div>
		<p>The spring training schedule is now active</p>
	</div>

	<div class="card bg-yellow-200">
		<h6 class="mb-2">Fall</h6>
		<div class="icon-container">
			<CalendarIcon size="16" />
			<p class="ml-2">May 1 - June 6</p>
		</div>
		<div class="icon-container">
			<MapPinIcon size="16" />
			<p class="ml-2">Theodore Wirth</p>
		</div>
		<p>Check back later</p>
	</div>
</div>

<figure>
	<img alt="Success Kid" src="images/successkid.jpg" />
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p>
	<strong
		>Try editing this file (src/routes/index.svelte) to test live reloading.</strong
	>
</p>

<style>
	.icon-container {
		@apply my-1 text-gray-400 flex flex-row text-sm items-center;
	}

	.card {
		@apply relative shadow-md hover:shadow-lg w-full md:w-64 my-4 md:my-0 h-64 rounded-lg p-4 pt-2 transition-shadow duration-300;
	}

	.btn {
		@apply px-2 py-1 border-2 rounded-md bg-white absolute right-2 bottom-2 focus:ring-2;
	}

	.btn-blue {
		@apply border-indigo-600 text-indigo-600;
	}
</style>
