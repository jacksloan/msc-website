<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import { fade } from "svelte/transition";

  export let segment: string;

  let show = true;

  const change = (segment: string) => {
    show = !show;
  };

  $: change(segment);
</script>

<Tailwindcss />

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
