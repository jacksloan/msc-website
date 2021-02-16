<script lang="ts">
  import { goto } from "@sapper/app";
  import MscLogo from "./MscLogo.svelte";
  import MenuIcon from "svelte-feather-icons/src/icons/MenuIcon.svelte";
  import { slide } from "svelte/transition";

  export let segment: string;
  const pages: [string, string][] = [
    [undefined, "HOME"],
    ["juniors", "JUNIORS"],
    ["about", "ABOUT"],
    // ["blog", "BLOG"],
  ];

  function goHome() {
    goto(".");
  }

  let showDropdownNav = false;
  function toggleSideNav() {
    showDropdownNav = !showDropdownNav;
  }
</script>

<div class="relative">
  <nav
    class="relative bg-white z-50 border border-b-2 border-gray-200 shadow-sm font-light px-4 py-0"
  >
    <ul class="flex flex-row">
      <li class="flex-grow flex flex-row items-center cursor-pointer">
        <div on:click={() => goHome()}>
          <MscLogo size="48px" />
        </div>
        <p on:click={() => goHome()} class="text-2xl ml-2 font-medium">MSC</p>
      </li>
      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->

      {#each pages as [link, display]}
        <li class="hidden md:inline">
          <a
            class="no-underline px-4 py-4 block font-medium text-lg"
            rel={segment === "blog" ? "prefetch" : undefined}
            aria-current={segment === link ? "page" : undefined}
            href={link || "."}>{display}</a
          >
        </li>
      {/each}

      <li class="md:hidden flex flex-row items-center py-4 px-2">
        <button on:click={() => toggleSideNav()}>
          <MenuIcon size="24" />
        </button>
      </li>
    </ul>
  </nav>
  {#if showDropdownNav}
    <div class="relative w-full bg-white shadow-xl z-50" transition:slide>
      {#each pages as [link, display]}
        <ul>
          <li on:click={toggleSideNav}>
            <a
              class="no-underline px-4 py-6 block font-medium text-lg"
              rel={segment === "blog" ? "prefetch" : undefined}
              aria-current={segment === link ? "page" : undefined}
              href={link || "."}>{display}</a
            >
          </li>
        </ul>
      {/each}
    </div>
  {/if}
</div>

<style>
  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    content: "";
    width: calc(100% - 1.95rem);
    bottom: -1px;
    @apply bg-indigo-400 block absolute h-1;
  }
</style>
