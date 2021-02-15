<script lang="ts" context="module">
  interface HomePageJson {
    title: string;
    seoTitle: string;
    subtitle: string;
    cards: Array<{
      date: string;
      ageGroup: string;
      title: string;
      content: string;
      links: {
        text: string;
        linkTo: string;
        target?: string;
        disabled?: boolean;
      }[];
    }>;
  }

  export async function preload({
    params,
    query,
  }): Promise<{ page: HomePageJson }> {
    try {
      const res = await this.fetch("_content/home.json");
      const page: HomePageJson = await res.json();
      return { page };
    } catch (e) {
      return {
        page: {
          title: "Minneapolis Ski Club",
          seoTitle: "MSC - Home",
          subtitle:
            "Year round nordic ski training programs for junior and youth skiers of all ability",
          cards: [
            {
              title: "Spring 2021",
              date: "May - Jun",
              ageGroup: "Junior/Youth",
              links: [
                {
                  linkTo: "https://signmeup.com",
                  text: "Register",
                  target: "_blank",
                },
                {
                  linkTo: "about",
                  text: "Schedule",
                },
              ],
              content: "The spring program schedule for 2021 is now available",
            },
            {
              title: "Summer 2021",
              date: "June - August",
              ageGroup: "Junior/Youth",
              links: [
                {
                  linkTo: "https://signmeup.com",
                  text: "Sign Up",
                },
              ],
              content: "The spring program schedule for 2021 is now available",
            },
            {
              title: "Fall/Winter 2021-2022",
              date: "September - March",
              ageGroup: "Junior/Youth",
              links: [
                {
                  linkTo: "https://signmeup.com",
                  text: "Sign Up",
                  disabled: true,
                },
              ],
              content: "The spring program schedule for 2021 is now available",
            },
          ],
        },
      };
    }
  }
</script>

<script lang="ts">
  import ProgramCard from "../components/ProgramCard.svelte";
  import About from "./about.svelte";

  export let page: HomePageJson;
</script>

<svelte:head>
  <title>{page.seoTitle || "MSC - Home"}</title>
</svelte:head>

<section class="mt-4 mb-12">
  <h1 class="mb-4 font-semibold uppercase">{page.title}</h1>
  <p class="text-lg font-semibold">
    {page.subtitle}
  </p>
</section>

<section class="flex flex-col md:flex-row justify-between mb-8">
  {#each page.cards as card}
    <ProgramCard {...card} />
  {/each}
</section>
