<script context="module" lang="ts">
  import marked from "marked";

  interface CoachBio {
    name: string;
    photo?: string;
    bio?: string;
  }

  interface CoachesPage {
    title: string;
    intro?: string;
    fallBackImage: string;
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
            bio: c.bio ? marked(c.bio) : c.bio,
          };
        }),
      },
    };
  }
</script>

<script lang="ts">
  import Modal from "../components/Modal.svelte";
  export let page: CoachesPage;
  let showModal: boolean = false;
  let currentCoach: CoachBio;

  function viewCoachModal(coach: CoachBio) {
    showModal = true;
    currentCoach = coach;
  }
</script>

<h1 class="page-title">
  {page.title}
</h1>
{#if page.intro}
  {@html page.intro}
{/if}

<div class="flex flex-col gap-7 gap-y-24 md:flex-row md:flex-wrap">
  {#each page.coaches as coach}
    <div class="w-full md:w-40 h-40" on:click={() => viewCoachModal(coach)}>
      <figure class="group hover:cursor-pointer relative text-center">
        <div class="w-full md:w-40 h-40 rounded-full  overflow-hidden">
          <img
            class="w-40 h-40 rounded-full mx-auto transform transition-transform duration-300 hover:scale-110"
            src={coach.photo || page.fallBackImage}
            alt={coach.name}
          />
        </div>
        <figcaption class="font-medium mt-2">
          <div class="group-hover:underline text-blue-400">
            {coach.name}
          </div>
          <!-- <div class="text-gray-500">Head Coach</div> -->
        </figcaption>
      </figure>
    </div>
  {/each}
</div>

{#if showModal}
  <Modal on:close={() => (showModal = false)}>
    <figure class="text-center">
      <img
        class="mx-auto w-64 h-64 rounded-full"
        src={currentCoach.photo || page.fallBackImage}
        alt={currentCoach.name}
      />

      <figcaption>
        <h3 class="text-blue-400 mt-2">{currentCoach.name}</h3>
      </figcaption>
    </figure>
    <hr />
    <div>
      {#if currentCoach.bio}
        {@html currentCoach.bio}
      {/if}
    </div>
  </Modal>
{/if}
