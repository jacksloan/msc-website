<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import { fly } from "svelte/transition";
  import { expoInOut } from "svelte/easing";

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
    in:fly={{ y: 25, duration: 250, delay: 255, easing: expoInOut }}
    out:fly={{ y: 75, duration: 250, easing: expoInOut }}
    class="relative max-w-4xl p-8 m-auto box-border"
  >
    <slot />
  </main>
{:else}
  <main
    in:fly={{ y: 25, duration: 250, delay: 255, easing: expoInOut }}
    out:fly={{ y: 75, duration: 250, easing: expoInOut }}
    class="relative max-w-4xl p-8 m-auto box-border"
  >
    <slot />
  </main>
{/if}
