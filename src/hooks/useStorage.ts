import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ItemProps} from '@src/types/ItemProps';

export const useStorage = (key: string) => {
  const [storageItem, setStorageItem] = useState<ItemProps[]>([]);

  async function getStorageItem() {
    try {
      const data = await AsyncStorage.getItem(key);
      console.log('getStorageItem data', data);
      if (data) {
        const parsedData: ItemProps[] = JSON.parse(data);
        setStorageItem(parsedData);
      }
    } catch (err) {
      console.log('getStorageItem err: ', err);
    }
  }

  function updateStorageItem(data: string) {
    console.log('updateStorageItem', data);
    try {
      if (typeof data === 'string') {
        AsyncStorage.setItem(key, data);
        setStorageItem(JSON.parse(data));
        console.log('saved');
      }
      return data;
    } catch (err) {
      console.log('ERR: ', err);
    }
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem([]);
  }

  useEffect(() => {
    getStorageItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storageItem, updateStorageItem, clearStorageItem];
};
