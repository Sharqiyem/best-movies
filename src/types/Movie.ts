export interface Movie {
  title: string;
  link: string;
  img: string;
  attributes?: {
    duration: string;
    audience: string;
    time: string;
    genre: string;
    story: string;
    country: string;
    keyword: string;
    place: string;
    plot: string;
    style: string;
  };
}
