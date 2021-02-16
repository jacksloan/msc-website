<script lang="ts">
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";
  export let tabs: string[];
  export let initialTab: number = 0;
  export let selectedTab = "";
  const { page } = stores();

  $: path = $page.path;
  $: tabQueryParam = $page.query.tab;
  $: {
    selectedTab = tabQueryParam;
  }

  function getTabPath(index: number) {
    return path + "?tab=" + tabs[index];
  }

  function goToTab(index: number) {
    goto(getTabPath(index));
  }

  onMount(() => {
    if (!tabQueryParam) {
      goToTab(initialTab);
    }
  });
</script>

<ul
  class="bg-white flex flex-col md:flex-row items-center flex-wrap border-2 border-indigo-400 rounded-md shadow-md"
>
  {#each tabs as tab, index}
    <li class="w-full md:w-1/{tabs.length} text-center flex flex-col">
      <a
        class:active={tabQueryParam === tab}
        class="w-full h-full tracking-wide flex-grow text-sm block relative px-4 py-2 uppercase font-medium transition-colors duration-300"
        href={getTabPath(index)}
      >
        {tab}
      </a>
    </li>
  {/each}
</ul>

<style>
  .active {
    @apply bg-indigo-400 text-white;
  }
</style>
