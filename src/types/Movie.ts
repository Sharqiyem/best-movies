export interface Movie {
  title: string;
  link: string;
  img: string;
  duration: string;
  audience: string;
  time: string;
  genre: string[];
  story: string;
  country: string[];
  keyword: string;
  place: string;
  plot: string;
  style: string;
  video?: string;
  rating?: number;
  votes?: string;
}

export interface MovieDetails
  extends Omit<Movie, 'title' | 'link' | 'img' | 'video' | 'rating'> {}
