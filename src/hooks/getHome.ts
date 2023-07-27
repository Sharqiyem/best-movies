import {BASE_URL} from '@src/config/api.config';
import {Place} from '@src/data/Place';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchHome = async () => {
  console.log('fetch Home', BASE_URL);
  const response = await axios.get(`${BASE_URL}/home`);
  return response.data;
};

export const UseGetHome = () => {
  const {data, isLoading, isRefetching, status, error, refetch, isError} =
    useQuery(['home'], fetchHome, {
      onError(err) {
        console.log('UseGetHome ERROR===', err);
      },
      cacheTime: 1000 * 60 * 60 * 24,
    });
  return {
    data,
    isLoading,
    isRefetching,
    status,
    error,
    refetch,
    isError,
  };
};

export const UseFakeGetHome = () => {
  return {
    isLoading: false,
    error: null,
    refetch: null,
    isRefetching: false,
    data: [
      {title: 'Movies', data: [{list: Place}]},
      {title: 'TV - shows', data: [{list: Place}]},
    ],
    isError: false,
  };
};
