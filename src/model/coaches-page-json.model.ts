export interface CoachBio {
	name: string;
	position?: string;
	photo?: string;
	bio?: string;
}

export interface CoachesPage {
	title: string;
	intro?: string;
	fallBackImage: string;
	coaches: CoachBio[];
}
