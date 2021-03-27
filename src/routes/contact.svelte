<script context="module" lang="ts">
  interface ContactPage {
    title: string;
    contactFirstName: string;
    contactLastName: string;
    facebookLink: string;
  }

  export async function preload(): Promise<{ page: ContactPage }> {
    const res = await this.fetch("_content/contact.json");
    const page: ContactPage = await res.json();
    return { page };
  }
</script>

<script lang="ts">
  export let page: ContactPage;
  import FacebookIcon from "svelte-feather-icons/src/icons/FacebookIcon.svelte";
</script>

<svelte:head>
  <title>MSC - {page.title}</title>
  <meta name="description" content={"MSC - " + page.title} />
</svelte:head>

<h1 class="page-title">
  {page.title}
</h1>

<section aria-label="Preferred Contact Method">
  <h4>Preferred Contact Method</h4>
  <p>
    For all questions, please contact {page.contactFirstName}
    {page.contactLastName}.
    <br />
    {page.contactFirstName}'s email and phone can be found on the Minneapolis
    Ski Club facebook page from the link below.
  </p>
  <a
    href={page.facebookLink}
    target="_blank"
    class="flex flex-row items-center rounded-md border-blue-500 border-2 p-2 mt-4 w-96"
  >
    <FacebookIcon class="text-blue-500" size="48" />
    <span class="ml-4 text-2xl font-semibold text-blue-500"
      >Minneapolis Ski Club Facebook Page</span
    >
  </a>
</section>
