import AsyncStorage from '@react-native-async-storage/async-storage';
import {ItemProps} from '@src/types/ItemProps';
import {ColorSchemeName} from 'nativewind/dist/style-sheet/color-scheme';
import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

const COLOR_SCHEME = 'COLOR_SCHEME1';
const LIST_KEY = 'LIST_KEY_5';
const LIST_DEFAULT_KEYS = ['favorite', 'watch', 'watched'];

type ListItem = {
  items: ItemProps[];
  order?: number;
  key: string;
  label: string;
};

export type StoreContextType = {
  lists: ListItem[];
  updateList?: (item: ItemProps, listId: string) => void;
  curColorScheme: ColorSchemeName;
  saveColorScheme?: (val: ColorSchemeName) => void;
  isDark: boolean;
  addNewList?: (name: string, item: ItemProps) => void;
  editListName?: (key: string, label: string) => void;
  deleteList?: (name: string) => void;
};

export const StoreContext = createContext<StoreContextType | null>({
  lists: [],
  curColorScheme: 'light',
  isDark: false,
});

export const StoreContextProvider = ({children}: {children: JSX.Element}) => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [curColorScheme, setCurColorScheme] = useState<ColorSchemeName>('');

  const isDark = curColorScheme === 'dark';

  async function getStorageItem(key: string) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (err) {
      console.log('getStorageItem err: ', key, err);
    }
  }

  function updateStorageItem(key: string, data: string) {
    try {
      if (typeof data === 'string') {
        AsyncStorage.setItem(key, data);

        console.log('saved');
      }
      return data;
    } catch (err) {
      console.log('ERR: ', err);
    }
  }

  const load = async () => {
    const allItemsRaw = await getStorageItem(LIST_KEY);
    let allItems: ListItem[] = [];
    if (allItemsRaw) {
      allItems = JSON.parse(allItemsRaw);
    } else {
      if (Object.keys(allItems).length === 0) {
        LIST_DEFAULT_KEYS.map((key, index) => {
          allItems.push({
            label: key,
            order: index,
            items: [],
            key: key,
          });
        });
      }
    }

    // console.log('load first', JSON.stringify(allItems, null, 2));
    setLists(allItems);

    const colorSheme = await getStorageItem(COLOR_SCHEME);
    console.log('getStorageItem colorSheme', colorSheme);
    if (colorSheme) {
      setCurColorScheme(colorSheme as ColorSchemeName);
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateList = (item: ItemProps, listId: string) => {
    console.log('listId', listId);

    const newlists: ListItem[] = [...lists];

    const selectedListIndex = newlists.findIndex(list => list.key === listId);

    const isSaved =
      newlists[selectedListIndex]?.items?.findIndex?.(
        s => s.link === item?.link,
      ) !== -1;

    if (isSaved) {
      const newSavedItems = newlists[selectedListIndex]?.items?.filter(
        s => s.link !== item.link,
      );
      newlists[selectedListIndex] = {
        ...newlists[selectedListIndex],
        items: [...newSavedItems],
      };

      updateStorageItem?.(LIST_KEY, JSON.stringify([...newlists]));
      setLists([...newlists]);
    } else {
      newlists[selectedListIndex].items = [
        ...newlists[selectedListIndex].items,
        item,
      ];
      updateStorageItem?.(LIST_KEY, JSON.stringify([...newlists]));
      setLists([...newlists]);
    }
  };

  const addNewList = (name: string, item: ItemProps) => {
    const newlists = [...lists];
    newlists.push({
      key: name,
      label: name,
      items: [item],
    });

    updateStorageItem?.(LIST_KEY, JSON.stringify([...newlists]));
    setLists([...newlists]);
  };

  const deleteList = (key: string) => {
    Alert.alert('Delete list', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        style: 'default',
        onPress: () => {
          let newlists = [...lists];
          newlists = newlists.filter(list => list.key !== key);
          updateStorageItem?.(LIST_KEY, JSON.stringify([...newlists]));
          setLists([...newlists]);
        },
      },
    ]);
  };

  const editListName = (key: string, label: string) => {
    Alert.prompt(
      'Edit list name',
      'Enter the list name:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (newName?: string | undefined) => {
            if (newName) {
              console.log('first', key, newName);
              const newlists = [...lists];
              const selectedListIndex = newlists.findIndex(
                list => list.key === key,
              );

              newlists[selectedListIndex].label = newName;

              updateStorageItem?.(LIST_KEY, JSON.stringify([...newlists]));
              setLists([...newlists]);
            }
          },
        },
      ],
      undefined,
      label,
    );
  };

  const saveColorScheme = (val: ColorSchemeName) => {
    setCurColorScheme(val);
    updateStorageItem(COLOR_SCHEME, val);
  };

  return (
    <StoreContext.Provider
      value={{
        lists,
        updateList,
        curColorScheme,
        saveColorScheme,
        isDark,
        addNewList,
        deleteList,
        editListName,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
