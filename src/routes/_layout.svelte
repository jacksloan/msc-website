<script lang="ts" context="module">
  export async function preload(): Promise<{ page: HomePageJson }> {
    const res = await this.fetch("_content/home.json");
    const page: HomePageJson = await res.json();
    return { page };
  }
</script>

<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import { fade, slide } from "svelte/transition";
  import type { HomePageJson } from "../model/home-page-json.model";
  import CloseIcon from "svelte-feather-icons/src/icons/XIcon.svelte";

  export let page: HomePageJson;

  export let segment: string;

  let showNotification = true;

  let show = true;

  const change = (segment: string) => {
    show = !show;
  };

  $: change(segment);
</script>

<Tailwindcss />

{#if showNotification}
  <section
    transition:slide
    on:click={() => (showNotification = false)}
    aria-label="Club Alerts"
    class="flex bg-yellow-500 text-white justify-between items-center p-2"
  >
    <p>
      {page.notificationBarText}
    </p>
    <CloseIcon size="32" />
  </section>
{/if}

<Nav {segment} />

{#if show}
  <main
    in:fade={{ delay: 205, duration: 200 }}
    out:fade={{ duration: 200 }}
    class="relative max-w-4xl p-8 m-auto box-border"
  >
    <slot />
  </main>
{:else}
  <main
    in:fade={{ delay: 205, duration: 200 }}
    out:fade={{ duration: 200 }}
    class="relative max-w-4xl p-8 m-auto box-border"
  >
    <slot />
  </main>
{/if}
