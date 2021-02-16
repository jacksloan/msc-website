<script context="module" lang="ts">
  import marked from "marked";

  type programCategory = "Spring" | "Summer" | "Fall-Winter" | "Race Program";

  interface ProgramContent {
    tabName: string;
    content: string;
    activities: Array<{
      day?: string;
      dateRange?: string;
      ageGroup?: string;
      time?: string;
      location?: string;
      content: string;
      price?: string;
    }>;
  }

  interface JuniorsPage {
    title: string;
    seoTitle: string;
    content: string;
    programs: ProgramContent[];
  }

  export async function preload({
    params,
    query,
  }): Promise<{ page: JuniorsPage }> {
    try {
      const res = await this.fetch("_content/juniors.json");
      const json: JuniorsPage = await res.json();
      return {
        page: {
          ...json,
          content: marked(json.content),
        },
      };
    } catch {
      return {
        page: {
          title: "MSC Youth and Junior Programs",
          seoTitle: "Juniors",
          content: marked(""),
          programs: [
            {
              tabName: "Spring",
              content: marked("### Spring Stuff Goes Here"),
              activities: [
                {
                  dateRange: "May 1 - June 1",
                  ageGroup: "Youth/Junior",
                  day: "Monday AM",
                  content: "Technique and Distance",
                  location: "Battle Creek",
                  time: "7:00 AM - 9:00 AM",
                },
              ],
            },
            {
              tabName: "Summer",
              content: marked("### Summer Stuff Goes Here"),
              activities: [
                {
                  dateRange: "June 1 - April 2",
                  ageGroup: "Youth/Junior",
                  day: "Monday AM",
                  content: "Technique and Distance",
                  location: "Battle Creek",
                  time: "7:00 AM - 9:00 AM",
                },
                {
                  dateRange: "June 1 - April 2",
                  ageGroup: "Youth/Junior",
                  day: "Monday AM",
                  content: "Technique and Distance",
                  location: "Battle Creek",
                  time: "7:00 AM - 9:00 AM",
                },
                {
                  dateRange: "June 1 - April 2",
                  ageGroup: "Youth/Junior",
                  day: "Monday AM",
                  content: "Technique and Distance",
                  location: "Battle Creek",
                  time: "7:00 AM - 9:00 AM",
                },
                {
                  dateRange: "June 1 - April 2",
                  ageGroup: "Youth/Junior",
                  day: "Monday AM",
                  content: "Technique and Distance",
                  location: "Battle Creek",
                  time: "7:00 AM - 9:00 AM",
                },
              ],
            },
            {
              tabName: "Fall-Winter",
              content: marked("### Fall/Winter 2021-2022 Programming\n\nFollow [MSC on Facebook](https://www.facebook.com) to know when the fall and winter schedule is posted"),
              activities: [],
            },
            {
              tabName: "Race Program",
              content: marked("### Advanced Racing Program (Year Round)"),
              activities: [],
            },
          ],
        },
      };
    }
  }
</script>

<script lang="ts">
  import { fly } from "svelte/transition";
  import NavTabs from "../components/NavTabs.svelte";
  import ProgramCard from "../components/ProgramCard.svelte";

  export let page: JuniorsPage;

  let tabs = {
    tabs: page.programs.map((p) => p.tabName),
    initialTab: 0,
  };

  let selectedTab: string = "";

  let selectedProgramContent: ProgramContent;

  $: selectedProgramContent = page.programs.find(
    (it) => it.tabName === selectedTab
  ) || {
    tabName: "",
    activities: [],
    content: "",
  };

  let show = true;

  const change = (selectedTab: string) => {
    show = !show;
  };

  $: change(selectedTab);
</script>

<svelte:head>
  <title>MSC - {page.seoTitle}</title>
</svelte:head>

<h1 class="page-title">{page.title}</h1>

<div class="markdown-content">
  {@html page.content}
</div>

<NavTabs {...tabs} bind:selectedTab />

{#if show}
  <div
    in:fly={{ y: 25, delay: 205, duration: 200 }}
    out:fly={{ y: 75, duration: 200 }}
  >
    {@html selectedProgramContent.content}

    <div class="flex flex-col flex-wrap md:gap-7 md:flex-row">
      {#each selectedProgramContent.activities as activity}
        <ProgramCard
          location={activity.location}
          title={activity.day}
          ageGroup={activity.ageGroup}
          date={activity.dateRange}
          time={activity.time}
          content="Strength, Technique, and Distance"
        />
      {/each}
    </div>
  </div>
{:else}
  <div
    in:fly={{ y: 25, delay: 205, duration: 200 }}
    out:fly={{ y: 75, duration: 200 }}
  >
    {@html selectedProgramContent.content || ""}

    <div class="flex flex-col md:flex-row">
      {#each selectedProgramContent.activities || [] as activity}
        <ProgramCard
          location={activity.location}
          title={activity.day}
          ageGroup={activity.ageGroup}
          date={activity.dateRange}
          time={activity.time}
          content="Strength, Technique, and Distance"
        />
      {/each}
    </div>
  </div>
{/if}
