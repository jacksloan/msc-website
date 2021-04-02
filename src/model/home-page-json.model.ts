export interface HomePageJson {
  title: string;
  seoTitle: string;
  subTitle: string;
  notificationBarText: string;
  images: any[];
  cardTitle: string;
  cards: Array<{
    date: string;
    ageGroup: string;
    title: string;
    content: string;
    links: {
      text: string;
      linkTo: string;
      opensNewTab?: boolean;
      disabled?: boolean;
    }[];
  }>;
}
