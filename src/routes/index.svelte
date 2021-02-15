<script lang="ts" context="module">
  interface HomePageJson {
    title: string;
    seoTitle: string;
    subTitle: string;
    cards: Array<{
      date: string;
      ageGroup: string;
      title: string;
      content: string;
      links: {
        text: string;
        linkTo: string;
        opensNewTab?: boolean;
        disabled?: boolean;
      }[];
    }>;
  }

  export async function preload(): Promise<{ page: HomePageJson }> {
    const res = await this.fetch("_content/home.json");
    const page: HomePageJson = await res.json();
    return { page };
  }
</script>

<script lang="ts">
  import ProgramCard from "../components/ProgramCard.svelte";
  import About from "./about.svelte";

  export let page: HomePageJson;
</script>

<svelte:head>
  <title>{page.seoTitle || "MSC - Home"}</title>
</svelte:head>

<section class="mt-4 mb-12">
  <h1 class="mb-4 font-semibold uppercase">{page.title}</h1>
  <p class="text-lg font-semibold">
    {page.subtitle}
  </p>
</section>

<section class="flex flex-col md:flex-row justify-between mb-8">
  {#each page.cards as card}
    <ProgramCard {...card} />
  {/each}
</section>
