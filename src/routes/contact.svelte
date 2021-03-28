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
  import LinkIcon from "svelte-feather-icons/src/icons/ExternalLinkIcon.svelte";
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
    For all questions, please contact
    <a
      href={page.facebookLink}
      target="_blank"
      aria-label="Minneapolis Ski Club Facebook Link 1"
      class="flex-row text-blue-500 inline-flex"
    >
      <span>
        {page.contactFirstName}
        {page.contactLastName}
      </span>

      <LinkIcon size="24" class="ml-2" />
    </a>

    <br />
    {page.contactFirstName}'s email and phone can be found on the Minneapolis
    Ski Club facebook page.
  </h5>
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

<section aria-label="Contact Form">
  <h4>Or send us a message</h4>
  <form class="w-full max-w-lg" name="contact" data-netlify="true">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          First Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-first-name"
          name="firstName"
          type="text"
          required
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Last Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          name="lastName"
          type="text"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          E-mail
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          type="email"
          name="email"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Message
        </label>
        <textarea
          class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
          id="message"
          name="message"
          required
        />
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3">
        <button
          class="shadow bg-blue-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Send
        </button>
      </div>
      <div class="md:w-2/3" />
    </div>
  </form>
</section>
