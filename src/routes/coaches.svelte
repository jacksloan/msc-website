<script context="module" lang="ts">
	import marked from 'marked';

	export async function load({ fetch }): Promise<{ props: { page: CoachesPage } }> {
		const res = await fetch('_content/coaches.json');
		const json: CoachesPage = await res.json();
		return {
			props: {
				page: {
					...json,
					intro: json.intro ? marked(json.intro) : '',
					coaches: json.coaches.map((c) => {
						return {
							...c,
							bio: c.bio ? marked(c.bio) : c.bio
						};
					})
				}
			}
		};
	}
</script>

<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import type { CoachesPage, CoachBio } from '$model';
	export let page: CoachesPage;
	let showModal: boolean = false;
	let currentCoach: CoachBio;

	function viewCoachModal(coach: CoachBio) {
		showModal = true;
		currentCoach = coach;
	}
</script>

<svelte:head>
	<title>MSC - {page.title}</title>
	<meta name="description" content={'MSC - ' + page.title} />
</svelte:head>

<h1 class="page-title">
	{page.title}
</h1>
{#if page.intro}
	{@html page.intro}
{/if}

<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-7 gap-y-24">
	{#each page.coaches as coach}
		<button
			aria-label={coach.name + ' Bio'}
			class="w-full md:w-40 h-40"
			on:click={() => viewCoachModal(coach)}
		>
			<figure class="group hover:cursor-pointer relative text-center flex flex-col items-center">
				<img
					class="w-40 h-40 rounded-full transform transition-transform duration-300 hover:scale-110"
					src={coach.photo || page.fallBackImage}
					alt={coach.name}
				/>

				<figcaption class="font-medium mt-2">
					<div class="group-hover:underline text-blue-400">
						{coach.name}
					</div>
					{#if coach.position}
						<div class="text-gray-500">{coach.position}</div>
					{/if}
				</figcaption>
			</figure>
		</button>
	{/each}
</div>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<figure class="text-center">
			<img
				class="mx-auto w-64 h-64 rounded-full"
				src={currentCoach.photo || page.fallBackImage}
				alt={currentCoach.name}
			/>

			<figcaption>
				<h3 class="text-blue-400 mt-2">{currentCoach.name}</h3>
			</figcaption>
		</figure>
		<hr />
		<div>
			{#if currentCoach.bio}
				{@html currentCoach.bio}
			{/if}
		</div>
	</Modal>
{/if}
