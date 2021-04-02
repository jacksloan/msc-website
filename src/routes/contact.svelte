<script context="module" lang="ts">
  interface ContactPage {
    title: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail?: string;
    contactPhone?: string;
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
  let emailHref: string = "";
  let phoneHref: string = "";

  function setEmailHref() {
    emailHref = page.contactEmail.replace(" at ", "@");
    emailHref = emailHref.replace(" dot ", ".");
  }

  function setPhoneHref() {
    emailHref = page.contactPhone.replace(".", "");
  }
</script>

<svelte:head>
  <title>MSC - {page.title}</title>
  <meta name="description" content={"MSC - " + page.title} />
</svelte:head>

<h1 class="page-title">
  {page.title}
</h1>

<section aria-label="Kevin Contact Info">
  <h5>
    {page.contactFirstName}
    {page.contactLastName}
  </h5>

  {#if page.contactPhone}
    <p>
      Phone: <a
        on:mouseover={setPhoneHref}
        class="ml-2 text-blue-500 underline"
        href={"tel:" + phoneHref}>{page.contactPhone}</a
      >
    </p>
  {/if}

  {#if page.contactEmail}
    <p class="mt-2">
      Email: <a
        class="ml-2 text-blue-500 underline"
        on:mouseover={setEmailHref}
        href={"mailto:" + emailHref}>{page.contactEmail}</a
      >
    </p>
  {/if}

  <br />

  <a
    href={page.facebookLink}
    target="_blank"
    aria-label="Minneapolis Ski Club Facebook Link 2"
    class="flex flex-row items-center rounded-md border-blue-500 border-2 p-2 mt-4 w-96"
  >
    <FacebookIcon class="text-blue-500" size="48" />
    <span class="ml-4 text-2xl font-semibold text-blue-500"
      >Minneapolis Ski Club Facebook Page</span
    >
  </a>
</section>
