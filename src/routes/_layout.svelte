<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Tailwindcss from "../components/Tailwindcss.svelte";

  export let segment: string;
</script>

<Tailwindcss />

<Nav {segment} />

<main class="relative max-w-4xl p-8 m-auto box-border">
  <slot />
</main>
