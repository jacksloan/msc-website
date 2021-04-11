export interface ContactPage {
	title: string;
	facebookLink: string;
	contacts: Contact[];
}

export interface Contact {
	contactFirstName: string;
	contactLastName: string;
	contactEmail?: string;
	contactPhone?: string;
}
