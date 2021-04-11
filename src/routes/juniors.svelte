<script context="module" lang="ts">
	import marked from 'marked';

	interface ProgramContent {
		tabName: string;
		content: string;
		airtableLink?: string;
		signupLink?: string;
		signupText?: string;
	}

	interface JuniorsPage {
		title: string;
		seoTitle: string;
		content: string;
		programs: ProgramContent[];
	}

	export async function load({ fetch }): Promise<{ props: { page: JuniorsPage } }> {
		const res = await fetch('_content/juniors.json');
		const json: JuniorsPage = await res.json();
		return {
			props: {
				page: {
					...json,
					content: marked(json.content),
					programs: json.programs.map((p) => ({
						...p,
						content: marked(p.content)
					}))
				}
			}
		};
	}
</script>

<script lang="ts">
	import NavTabs from '$lib/NavTabs.svelte';

	export let page: JuniorsPage;

	let tabs = {
		tabs: page.programs.map((p) => p.tabName),
		initialTab: 0
	};

	let selectedTab: string = '';

	let selectedProgramContent: ProgramContent;

	$: selectedProgramContent = page.programs.find((it) => it.tabName === selectedTab) || {
		tabName: '',
		activities: [],
		content: ''
	};

	$: selectedHasAirtableLink = !!selectedProgramContent?.airtableLink;
	$: selectedHasSignupLink = !!selectedProgramContent?.signupLink;
</script>

<svelte:head>
	<title>MSC - {page.seoTitle}</title>
	<meta name="description" content={'MSC - ' + page.seoTitle} />
</svelte:head>

<h1 class="page-title">{page.title}</h1>

<div class="markdown-content">
	{@html page.content}
</div>

<NavTabs {...tabs} bind:selectedTab />

{@html selectedProgramContent.content || ''}
{#if selectedHasSignupLink}
	<a href={selectedProgramContent.signupLink} target="_blank" class="signmeup-link">
		{selectedProgramContent.signupText || 'Sign Up'}
	</a>
{/if}
{#if selectedHasAirtableLink}
	<h3>{selectedProgramContent.tabName} Schedule</h3>
	<iframe
		title={selectedProgramContent.tabName + ' schedule'}
		class="airtable-embed"
		src={selectedProgramContent.airtableLink}
		frameborder="0"
		width="100%"
		height="533"
		style="background: transparent; border: 1px solid #ccc;"
	/>
{/if}
