<script lang="ts" context="module">
  export async function preload(): Promise<{ page: HomePageJson }> {
    const res = await this.fetch("_content/home.json");
    const page: HomePageJson = await res.json();
    return { page };
  }
</script>

<script lang="ts">
  import ProgramCard from "../components/ProgramCard.svelte";
  import Carousel from "@beyonk/svelte-carousel";
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";
  import type { HomePageJson } from "../model/home-page-json.model";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  export let page: HomePageJson;
  let hasImages = (page?.images?.length || 0) > 0;

  onMount(() => {
    const hash = window.location.hash || "";
    const hashParts = hash.split("#invite_token=");
    if (hashParts.length === 2) {
      goto(`/admin/${hash}`);
    }

    if ((window as any).netlifyIdentity) {
      (window as any).netlifyIdentity.on("init", (user) => {
        if (!user) {
          (window as any).netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <title>{page.seoTitle || "MSC - Home"}</title>
  <meta name="description" content={"MSC - " + page.seoTitle} />
</svelte:head>

<section class="mt-4 mb-12 text-center">
  <h1 class="mb-4 font-semibold uppercase">{page.title}</h1>
  <p class="text-lg font-semibold">
    {page.subTitle}
  </p>

  {#if page.callToAction}
    <p class="text-lg font-medium">
      {page.callToAction}
    </p>
  {/if}

  {#if !!page.callToActionLink && !!page.callToActionLinkText}
    <div class="w-full mt-4 flex flex-row justify-center">
      <a
        class="text-md font-medium text-white bg-indigo-500 px-8 py-3 block rounded-md"
        href={page.callToActionLink}
        target="_blank"
        >{page.callToActionLinkText}
      </a>
    </div>
  {/if}

  {#if hasImages}
    <div class="pt-8">
      <Carousel perPage={1}>
        {#each page.images as { image }, index}
          <div>
            <img
              class="object-cover h-96 w-full"
              src={image}
              alt={`carousel image ${index}`}
            />
          </div>
        {/each}
        <span class="control" slot="left-control">
          <ChevronLeftIcon />
        </span>
        <span class="control" slot="right-control">
          <ChevronRightIcon />
        </span>
      </Carousel>
    </div>
  {/if}
</section>

<div class="w-full my-4">
  <hr />
</div>

<section>
  <h2 class="text-3xl font-medium">{page.cardTitle}</h2>
  <div class="flex flex-col md:flex-row flex-wrap justify-between mb-8">
    {#each page.cards as card}
      <ProgramCard {...card} />
    {/each}
  </div>
</section>

<style>
  .control :global(svg) {
    @apply border-white border-2 rounded-full h-full w-full text-white;
  }
</style>
