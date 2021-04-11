<script context="module" lang="ts">
	interface ContactPage {
		title: string;
		facebookLink: string;
		contacts: Contact[];
	}

	interface Contact {
		contactFirstName: string;
		contactLastName: string;
		contactEmail?: string;
		contactPhone?: string;
	}

	export async function load({ fetch }): Promise<{ props: { page: ContactPage } }> {
		const res = await fetch('_content/contact.json');
		const page: ContactPage = await res.json();
		return { props: { page } };
	}
</script>

<script lang="ts">
	export let page: ContactPage;
	import FacebookIcon from 'svelte-feather-icons/src/icons/FacebookIcon.svelte';
	import EmailIcon from 'svelte-feather-icons/src/icons/MailIcon.svelte';
	import PhoneIcon from 'svelte-feather-icons/src/icons/PhoneIcon.svelte';

	let emailsAndPhone = (page.contacts || []).reduce((acc, curr, index) => {
		return {
			...acc,
			[index]: {
				phone: '',
				email: ''
			}
		};
	}, {});

	function setPhoneAndEmail(contact: Contact, index: number) {
		emailsAndPhone = {
			...emailsAndPhone,
			[index]: {
				phone: contact.contactPhone.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, ''),
				email: contact.contactEmail.replace(' at ', '@').replace(' dot ', '.')
			}
		};
	}
</script>

<svelte:head>
	<title>MSC - {page.title}</title>
	<meta name="description" content={'MSC - ' + page.title} />
</svelte:head>

<h1 class="page-title">
	{page.title}
</h1>

<a
	href={page.facebookLink}
	target="_blank"
	aria-label="Minneapolis Ski Club Facebook"
	class="flex flex-row items-center rounded-md border-gray-300 border shadow-sm p-2 mt-2 w-full bg-white"
>
	<FacebookIcon class="text-blue-500" size="48" />
	<span class="ml-4 text-2xl font-semibold text-blue-500">Minneapolis Ski Club Facebook Page</span>
</a>

<section aria-label="Contacts" class="mt-8 flex flex-row flex-wrap gap-3">
	{#each page.contacts || [] as c, index}
		<div
			aria-label="Contact"
			class="p-12 shadow-sm rounded-lg border-gray-300 border bg-white w-full md:w-96"
		>
			<h4 aria-label="Contact Name" class="p-0 m-0 mb-12 font-medium">
				{c.contactFirstName}
				{c.contactLastName}
			</h4>

			{#if c.contactPhone}
				<div class="mt-2 flex flex-row">
					<PhoneIcon size="24" class="text-blue-500" />
					<a
						aria-label="Contact Phone"
						on:mouseover={() => setPhoneAndEmail(c, index)}
						class="ml-3 text-blue-500"
						href={'tel:' + emailsAndPhone[index].phone}>{c.contactPhone}</a
					>
				</div>
			{/if}

			{#if c.contactEmail}
				<div class="mt-2 flex flex-row">
					<EmailIcon size="24" class="text-blue-500" />
					<a
						aria-label="Contact Phone"
						class="ml-3 text-blue-500"
						on:mouseover={() => setPhoneAndEmail(c, index)}
						href={'mailto:' + emailsAndPhone[index].email}>{c.contactEmail}</a
					>
				</div>
			{/if}
		</div>
	{/each}

	<br />
</section>
