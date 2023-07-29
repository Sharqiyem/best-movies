import {BASE_URL} from '@src/config/api.config';
import axios from 'axios';

export const TagsApi = {
  getAllTags: async ({pageParam = 1}: {pageParam?: number}) => {
    const url = `${BASE_URL}/tags/${pageParam}`;
    console.log('Fetching tags page', url);
    const response = await axios.get(url);
    return response.data;
  },

  fetchTag: async ({id, pageParam = 1}: {id: string; pageParam?: number}) => {
    const url = `${BASE_URL}/movies/tag/${id}/${pageParam}`;
    console.log('fetch tag movies', url);
    const response = await axios.get(url);
    return response.data;
  },
};
