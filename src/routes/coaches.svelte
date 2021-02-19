<script context="module" lang="ts">
  import marked from "marked";

  interface CoachBio {
    name: string;
    photo: string;
    bio: string;
  }

  interface CoachesPage {
    title: string;
    intro?: string;
    coaches: CoachBio[];
  }

  export async function preload({
    params,
    query,
  }): Promise<{ page: CoachesPage }> {
    const res = await this.fetch("_content/coaches.json");
    const json: CoachesPage = await res.json();
    return {
      page: {
        ...json,
        intro: json.intro ? marked(json.intro) : "",
        coaches: json.coaches.map((c) => {
          return {
            ...c,
            bio: marked(c.bio),
          };
        }),
      },
    };
  }
</script>

<script lang="ts">
  export let page: CoachesPage;
</script>

<h1 class="page-title">
  {page.title}
</h1>
{#if page.intro}
  {@html page.intro}
{/if}

<div class="flex flex-col md:flex-row md:flex-wrap">
  {#each page.coaches as coach}
    <div class="w-full md:w-40 h-40">
      <figure class="group hover:cursor-pointer relative text-center">
        <div class="w-full md:w-40 h-40 rounded-full  overflow-hidden">
          <img
            class="w-40 h-40 rounded-full mx-auto transform transition-transform duration-300 hover:scale-110"
            src={coach.photo}
            alt={coach.name}
          />
        </div>
        <figcaption class="font-medium mt-2">
          <div class="group-hover:underline text-blue-400">
            {coach.name}
          </div>
          <div class="text-gray-500">Head Coach</div>
        </figcaption>
      </figure>
    </div>
  {/each}
</div>
