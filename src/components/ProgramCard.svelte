<script lang="ts">
  export let date: string = "";
  export let ageGroup: string = "";
  export let title: string = "";
  export let content: string = "";
  export let location: string = "";
  export let time: string = "";
  export let wrapperClasses: string = "";
  export let links: {
    text: string;
    linkTo: string;
    opensNewTab?: boolean;
    disabled?: boolean;
  }[] = [];
  let hasLinks = links?.length ?? 0 > 0;
  import ArrowRightIcon from "svelte-feather-icons/src/icons/ArrowRightIcon.svelte";
  import CalendarIcon from "svelte-feather-icons/src/icons/CalendarIcon.svelte";
  import UserIcon from "svelte-feather-icons/src/icons/UserIcon.svelte";
  import MapIcon from "svelte-feather-icons/src/icons/MapIcon.svelte";
  import ClockIcon from "svelte-feather-icons/src/icons/ClockIcon.svelte";
</script>

<div
  class="relative shadow-lg hover:shadow-2xl w-full md:w-64 my-4 md:my-0 rounded-lg p-6 pt-4 pb-20 transition-shadow duration-300 bg-white {wrapperClasses}"
>
  <p class="mb-2 font-medium text-lg">{title}</p>

  {#if date}
    <div class="icon-container">
      <CalendarIcon size="16" />
      <p class="ml-2">{date}</p>
    </div>
  {/if}

  {#if ageGroup}
    <div class="icon-container">
      <UserIcon size="16" />
      <p class="ml-2">{ageGroup}</p>
    </div>
  {/if}

  {#if location}
    <div class="icon-container">
      <MapIcon size="16" />
      <p class="ml-2">{location}</p>
    </div>
  {/if}

  {#if time}
    <div class="icon-container">
      <ClockIcon size="16" />
      <p class="ml-2">{time}</p>
    </div>
  {/if}

  <p class="mt-4">{content}</p>

  {#if hasLinks}
    <div class="absolute right-4 bottom-4 flex flex-row gap-2">
      {#each links as b}
        <a
          disabled={b.disabled}
          target={b.opensNewTab ? "_blank" : ""}
          aria-label={b.text}
          href={b.linkTo}
          class="btn btn-blue flex flex-row gap-1 items-center"
        >
          <p class="text-sm">{b.text}</p>
          <ArrowRightIcon size="16" />
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .btn {
    @apply px-2 py-1 border-2 rounded-md bg-white focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-blue {
    @apply border-indigo-600 text-indigo-600;
  }

  .btn-green {
    @apply border-green-600 text-green-600;
  }

  .icon-container {
    @apply my-1 opacity-60 flex flex-row text-sm items-center;
  }
</style>
