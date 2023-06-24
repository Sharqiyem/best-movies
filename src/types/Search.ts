export interface SearchResult {
  label: string;
  url: string;
  thumb?: string;
}

export enum SearchType {
  movie = 'movie',
  tag = 'tag',
}
