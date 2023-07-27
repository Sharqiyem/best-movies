import {BASE_URL} from '@src/config/api.config';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchMovie = async (id: string) => {
  const url = `${BASE_URL}/movies/${id}`;
  console.log('fetch Movie', url);
  const response = await axios.get(url);
  return response.data;
};

export const UseGetMovie = (id: string) => {
  const {data, isLoading, isRefetching, status, error} = useQuery(
    ['GetMovie', id],
    () => fetchMovie(id),
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
