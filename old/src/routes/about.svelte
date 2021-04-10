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
  <title>MSC - {page.title}</title>
  <meta name="description" content="{'MSC - ' + page.title}"/>
</svelte:head>

<h1 class="mt-4 mb-8">{page.title}</h1>

<div class="markdown-content">
  {@html page.content}
</div>
