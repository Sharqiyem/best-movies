import React, {useCallback, useContext, useMemo} from 'react';
import {Text, View, Pressable, ScrollView, Alert} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {ItemProps} from '@src/types/ItemProps';
import {styled} from 'nativewind';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

export const RNBottomSheetModal = styled(BottomSheetModal, {
  props: {
    containerStyle: true,
    style: true,
    backgroundStyle: true,
  },
});

type MovieBottomActionModalProps = {
  selectedItem?: ItemProps;
};

export const MovieBottomActionModal = React.forwardRef<
  BottomSheetModal,
  MovieBottomActionModalProps
>(({selectedItem}: {selectedItem?: ItemProps}, ref) => {
  const {lists, updateList, addNewList, editListName, deleteList} = useContext(
    StoreContext,
  ) as StoreContextType;

  const keys = Object.keys(lists);

  const snapPoints = useMemo(() => ['38%', '38%'], []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const saveItem = (key: string) => {
    if (selectedItem) updateList?.(selectedItem, key);
  };

  const editListNameOnPress = (key: string, label: string) => {
    editListName?.(key, label);
  };

  const deleteListOnPress = (name: string) => {
    deleteList?.(name);
  };

  const addNewListOnPress = () => {
    Alert.prompt('Add new list', 'Enter the list name:', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: (name?: string | undefined) => {
          if (name && selectedItem) {
            addNewList?.(name, selectedItem);
          }
        },
      },
    ]);
  };

  return (
    <>
      <RNBottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle="dark:bg-slate-800">
        <View className="flex-1">
          <View className="flex-row px-4 mb-3 items-center gap-2">
            <FastImage
              className="h-10 w-10 rounded-md"
              source={{
                uri: selectedItem?.img,
                priority: FastImage.priority.normal,
              }}
              resizeMode="stretch"
              fallback
              defaultSource={require('../../assets/placeholder-movie.jpeg')}
            />
            <View className="flex-1">
              <Text className="text-lg dark:text-white" numberOfLines={1}>
                {selectedItem?.title}
              </Text>
              <Text className="dark:text-white/70">
                {selectedItem?.rating} ({selectedItem?.votes})
              </Text>
            </View>
          </View>
          <ScrollView className="px-4 gap-2 pb-[150] mb-[80] divide-y divide-slate-100/10">
            {lists?.map((listItem, index) => {
              const items = listItem.items;
              const key = listItem.key;
              const label = listItem.label;

              if (!items) return;
              const isWatched =
                items?.findIndex?.(s => s.link === selectedItem?.link) !== -1;
              return (
                <View
                  key={key + index}
                  className="flex-row justify-between items-center">
                  <Pressable
                    onPress={() => saveItem(key)}
                    className={
                      index !== keys.length - 1
                        ? 'flex-row items-center bg-green-0 py-2 border-b-gray-500 '
                        : 'flex-row items-center bg-green-0 py-2 border-b-gray-500'
                    }>
                    <Ionicons
                      name="bookmark"
                      size={20}
                      color={isWatched ? 'grey' : 'red'}
                    />
                    <Text className="text-black/75 text-lg  dark:text-white/75 pl-2">
                      {isWatched ? `Remove from ${label}` : `Add to ${label}`}
                    </Text>
                  </Pressable>
                  <View className="flex-row gap-3">
                    <AntDesign
                      onPress={() => editListNameOnPress(key, label)}
                      name="edit"
                      size={18}
                      color={'#fff'}
                    />
                    <AntDesign
                      onPress={() => deleteListOnPress(key)}
                      name="delete"
                      size={18}
                      color={'#fff'}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <Pressable
            onPress={addNewListOnPress}
            className="absolute bottom-6 flex-row items-center justify-center gap-1 bg-primary-900 p-2 w-[90%]  self-center rounded-full">
            <Feather name="plus" size={18} color={'#fff'} />
            <Text className="text-base dark:text-white ">Create New List</Text>
          </Pressable>
        </View>
      </RNBottomSheetModal>
    </>
  );
});
