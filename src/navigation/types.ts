import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Item {
  title: string;
  link: string;
  img: string;
}

export enum MOVIE_TYPE {
  ALL = 'all',
  MOVIES = 'movies',
  TV_SHOWS = 'tv-shows',
}
export interface Filters {
  title?: string;
  countries?: string[];
  genres?: string[];
  rating?: [from: number, to: number];
  years?: [from: number, to: number];
  type: MOVIE_TYPE;
}

export type RootTabNavigatorParamList = {
  Home: HomeStackNavigatorParamList;
  Tags: undefined;
  Genres: undefined;
  Favorites: undefined;
  Search: undefined;
};

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Main: undefined;
  Movie: Item;
  Tag: Item;
  Filters: {
    selectedFilters: Filters;
    onGoBack: (vals: Filters) => void;
  };
  List: {
    id: 'movies' | 'tvshows';
  };
  FavoritesList: {
    listId: string;
  };
};

// NavigationProps

export type MovieNativeStackNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Movie'
>;

export type TagNativeStackNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Tag'
>;

export type FiltersNativeStackNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Filters'
>;

export type ListNativeStackNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'List'
>;

export type FavoritesListNativeStackNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'FavoritesList'
>;

// RouteProps
export type MovieScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Movie'
>;

export type ListScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'List'
>;

export type FiltersScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Filters'
>;

export type FavoritesListScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'FavoritesList'
>;

export type TagScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'Tag'>;
