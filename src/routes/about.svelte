<script context="module" lang="ts">
  import marked from "marked";
  interface AboutPage {
    title: string;
    content: string;
  }

  export async function preload({
    params,
    query,
  }): Promise<{ page: AboutPage }> {
    const res = await this.fetch("_content/about.json");
    const json: AboutPage = await res.json();

    return {
      page: {
        ...json,
        content: marked(json.content),
      },
    };
  }
</script>

<script lang="ts">
  export let page: AboutPage;
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<h1>{page.title}</h1>

{@html page.content}
