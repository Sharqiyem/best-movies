import {BASE_URL} from '@src/config/api.config';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchSimilarMovie = async (id: string) => {
  const url = `${BASE_URL}/movies/similars/${id}`;
  console.log('fetchSimilarMovie', url);
  const response = await axios.get(url);
  return response.data;
};

export const UseGetSimilarMovie = (id: string) => {
  const {data, isLoading, isRefetching, status, error} = useQuery(
    ['UseGetSimilarMovie', id],
    () => fetchSimilarMovie(id),
    {
      onError(err) {
        console.log('UseGetMovie ERROR===', err);
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
  };
};
