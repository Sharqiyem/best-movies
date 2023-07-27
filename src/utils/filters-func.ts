import {Filters} from '@src/navigation/types';

type TKeys = keyof Filters;

export const getFiltersAsString = (filters: Filters) => {
  const keys = Object.keys(filters).sort();
  let resHash = [];
  for (let k of keys) {
    const cVal = filters[k as TKeys];
    if (typeof cVal === 'object') {
      resHash.push(`{key: ${k}, val: ${cVal.sort().join()}}`);
    } else {
      resHash.push(`{key: ${k}, val: ${cVal}}`);
    }
  }
  return resHash.join(',');
};
