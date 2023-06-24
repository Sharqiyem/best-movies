import {BASE_URL} from '@src/config/api.config';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const getAllTags = async ({pageParam = 1}: {pageParam: number}) => {
  console.log('Fetching page', pageParam);
  const response = await axios.get(`${BASE_URL}/tags/${pageParam}`);
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
  } = useInfiniteQuery(['allTags1'], getAllTags, {
    onError(err) {
      console.log('error', err);
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
  };
};
