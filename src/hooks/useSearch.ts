import {API_BASE_URL} from '@src/config/api.config';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const seach = async (searchTerm: string) => {
  if (searchTerm === '') {
    return null;
  }
  console.log('Satrt searching', searchTerm);
  const response = await axios.get(
    `${API_BASE_URL}/site/autocomplete?term=${searchTerm}`,
  );
  return response.data;
};

export const UseSearch = (searchTerm: string) => {
  const {data, isLoading, isRefetching, status, error} = useQuery(
    ['search', searchTerm],
    () => seach(searchTerm),
    {
      onError(err) {
        console.log('error', err);
      },
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
