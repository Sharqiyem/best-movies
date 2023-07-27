export interface SearchResult {
  title: string;
  link: string;
  img: string;
}

export enum SearchType {
  movie = 'movie',
  tag = 'tag',
}
