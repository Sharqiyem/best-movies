export interface ItemProps {
  title: string;
  link: string;
  img: string;
  rating?: number;
  votes?: string;
}
export interface SearchResultsProps {
  title: string;
  link: string;
  img: string;
  rating?: number;
  votes?: string;
  country: string[];
  genre: string[];
}
