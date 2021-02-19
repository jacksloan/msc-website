<script context="module" lang="ts">
  import marked from "marked";

  type programCategory = "Spring" | "Summer" | "Fall-Winter" | "Race Program";

  interface ProgramContent {
    tabName: string;
    content: string;
    airtableLink?: string;
  }

  interface JuniorsPage {
    title: string;
    seoTitle: string;
    content: string;
    programs: ProgramContent[];
  }

  export async function preload({
    params,
    query,
  }): Promise<{ page: JuniorsPage }> {
    const res = await this.fetch("_content/juniors.json");
    const json: JuniorsPage = await res.json();
    return {
      page: {
        ...json,
        content: marked(json.content),
        programs: json.programs.map((p) => ({
          ...p,
          content: marked(p.content),
        })),
      },
    };
  }
</script>

<script lang="ts">
  import { fly } from "svelte/transition";
  import NavTabs from "../components/NavTabs.svelte";

  export let page: JuniorsPage;

  let tabs = {
    tabs: page.programs.map((p) => p.tabName),
    initialTab: 0,
  };

  let selectedTab: string = "";

  let selectedProgramContent: ProgramContent;

  $: selectedProgramContent = page.programs.find(
    (it) => it.tabName === selectedTab
  ) || {
    tabName: "",
    activities: [],
    content: "",
  };

  $: selectedHasAirtableLink = !!selectedProgramContent?.airtableLink;

  let show = true;

  const change = (selectedTab: string) => {
    show = !show;
  };

  $: change(selectedTab);
</script>

<svelte:head>
  <title>MSC - {page.seoTitle}</title>
</svelte:head>

<h1 class="page-title">{page.title}</h1>

<div class="markdown-content">
  {@html page.content}
</div>

<NavTabs {...tabs} bind:selectedTab />

{#if show}
  <div
    in:fly={{ y: 25, delay: 205, duration: 200 }}
    out:fly={{ y: 75, duration: 200 }}
  >
    {@html selectedProgramContent.content || ""}
    {#if selectedHasAirtableLink}
      <h3>{selectedProgramContent.tabName} Schedule</h3>
      <iframe
        title={selectedProgramContent.tabName + " schedule"}
        class="airtable-embed"
        src={selectedProgramContent.airtableLink}
        frameborder="0"
        width="100%"
        height="533"
        style="background: transparent; border: 1px solid #ccc;"
      />
    {/if}
  </div>
{:else}
  <div
    in:fly={{ y: 25, delay: 205, duration: 200 }}
    out:fly={{ y: 75, duration: 200 }}
  >
    {@html selectedProgramContent.content || ""}
    {#if selectedHasAirtableLink}
      <h3>{selectedProgramContent.tabName} Schedule</h3>
      <iframe
        title={selectedProgramContent.tabName + " schedule"}
        class="airtable-embed"
        src={selectedProgramContent.airtableLink}
        frameborder="0"
        width="100%"
        height="600"
        style="background: transparent; border: 1px solid #ccc;"
      />
    {/if}
  </div>
{/if}
