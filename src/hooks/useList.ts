import {BASE_URL} from '@src/config/api.config';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const getList = async ({
  pageParam = 1,
  listId,
}: {
  pageParam: number;
  listId: string;
}) => {
  const url = `${BASE_URL}/home/list/${listId}/${pageParam}`;
  console.log('getList url', url);
  const response = await axios.get(url);
  return response.data;
};

export const UseList = (listId: string) => {
  console.log('UseList selectedFilters', listId);

  const {
    data,
    refetch,
    isLoading,
    isRefetching,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    [`list-${listId}`],
    ({pageParam}) => getList({pageParam, listId}),
    {
      onError(err) {
        console.log('UseList ERROR===', err);
      },
      getNextPageParam: lastPage => {
        if (lastPage.hasNextPage) {
          return lastPage.nextPage;
        } else return undefined;
      },
    },
  );
  return {
    data,
    isLoading,
    isRefetching,
    status,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetching,
  };
};
