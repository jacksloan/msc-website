export interface AdultsProgramContent {
	tabName: string;
	content: string;
	airtableLink?: string;
}

export interface AdultsPage {
	title: string;
	seoTitle: string;
	content: string;
	programs: AdultsProgramContent[];
}
