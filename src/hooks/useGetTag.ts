import {BASE_URL} from '@src/config/api.config';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchTag = async ({
  id,
  pageParam = 1,
}: {
  id: string;
  pageParam?: number;
}) => {
  const url = `${BASE_URL}/movies/tag/${id}/${pageParam}`;
  console.log('fetch tag movies', url);
  const response = await axios.get(url);
  return response.data;
};

export const UseGetTag = ({
  id,
  pageParam = 1,
}: {
  id: string;
  pageParam?: number;
}) => {
  const {
    data,
    isLoading,
    isRefetching,
    status,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['UseGetTag', id], () => fetchTag({id, pageParam}), {
    onError(err) {
      console.log('useGetTag ERROR===', err);
    },
    // getNextPageParam: lastPage => {
    //   const nextPage =
    //     lastPage?.page_total !== lastPage?.page ? +lastPage?.page + 1 : false;
    //   console.log('next', nextPage);
    //   return nextPage;
    // },
    cacheTime: 1000 * 60 * 60 * 24,
  });
  return {
    data,
    isLoading,
    isRefetching,
    status,
    error,
    hasNextPage,
    fetchNextPage,
  };
};
