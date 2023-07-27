import {BASE_URL} from '@src/config/api.config';
import {Filters} from '@src/navigation/types';
import {getFiltersAsString} from '@src/utils/filters-func';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const seach = async ({
  selectedFilters,
  pageParam = 1,
}: {
  selectedFilters: Filters;
  pageParam: number;
}) => {
  const url = `${BASE_URL}/movies/search/${pageParam}`;
  console.log('Satrt searching', url);
  const response = await axios.post(url, {
    ...selectedFilters,
  });
  return response.data;
};

export const UseSearch = (selectedFilters: Filters) => {
  // console.log(
  //   'UseSearch selectedFilters',
  //   JSON.stringify(selectedFilters),
  // );

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
    isFetchingNextPage,
  } = useInfiniteQuery(
    [`search-${getFiltersAsString(selectedFilters)}`],
    ({pageParam}) => seach({selectedFilters, pageParam}),
    {
      // enabled: false,
      onError(err) {
        console.log('UseSearch ERROR===', err);
      },
      getNextPageParam: lastPage => {
        if (lastPage.hasNextPage) {
          return lastPage.nextPage;
        } else return undefined;

        // const nextPage =
        //   lastPage?.page_total !== lastPage?.page ? +lastPage?.page + 1 : false;
        // console.log(
        //   'next',
        //   lastPage.nextPage,
        //   lastPage.total,
        //   lastPage.limit,
        //   lastPage.totalPages,
        //   lastPage.page,
        //   lastPage.pagingCounter,
        //   lastPage.hasPrevPage,
        //   lastPage.hasNextPage,
        //   lastPage.prevPage,
        //   lastPage.nextPage,
        // );
        // return nextPage;
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
    isFetchingNextPage,
  };
};
