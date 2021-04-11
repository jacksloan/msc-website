export interface JuniorsProgramContent {
	tabName: string;
	content: string;
	airtableLink?: string;
	signupLink?: string;
	signupText?: string;
}

export interface JuniorsPage {
	title: string;
	seoTitle: string;
	content: string;
	programs: JuniorsProgramContent[];
}
