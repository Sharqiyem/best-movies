import {TagsApi} from '@src/services/tags';
import {useInfiniteQuery} from '@tanstack/react-query';

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
  } = useInfiniteQuery(
    ['UseGetTag', id],
    () => TagsApi.fetchTag({id, pageParam}),
    {
      onError(err) {
        console.log('useGetTag ERROR===', err);
      },

      cacheTime: 1000 * 60 * 60 * 24,
    },
  );
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
