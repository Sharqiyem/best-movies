import {BASE_URL} from '@src/config/api.config';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Place} from '@data/Place';

const getAllTags = async ({pageParam = 1}: {pageParam?: number}) => {
  const url = `${BASE_URL}/tags/${pageParam}`;
  console.log('Fetching tags page', url);
  const response = await axios.get(url);
  return response.data;
};

export const UseGetAllTags = () => {
  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery(['allTags'], getAllTags, {
    onError(err) {
      console.log('UseGetAllTags ERROR===', err);
    },

    getNextPageParam: lastPage => {
      const nextPage =
        lastPage?.page_total !== lastPage?.page ? +lastPage?.page + 1 : false;
      console.log('next', nextPage);
      return nextPage;
    },
  });
  return {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    status,
    error,
    refetch,
  };
};

export const UseFakeGetAllTags = () => {
  return {
    isLoading: false,
    error: 'null',
    hasNextPage: false,
    fetchNextPage: null,
    data: {pages: [{data: Place[0]}]},
    refetch: null,
    isFetchingNextPage: false,
    isRefetching: false,
  };
};
