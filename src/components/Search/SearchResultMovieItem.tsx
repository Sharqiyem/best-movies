import React, {memo, useCallback, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
import {MovieNativeStackNavigationProp} from '@src/navigation/types';
import {API_BASE_URL} from '@src/config/api.config';
import {SearchResultsProps} from '@src/types/ItemProps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {MovieBottomActionModal} from '../MovieBottomActionModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '@src/constants/colors';

const moviePropsAreEqual = (
  prevMovieItem: SearchResultsProps,
  nextMovieItem: SearchResultsProps,
) => {
  return (
    prevMovieItem.title === nextMovieItem.title &&
    prevMovieItem.img === nextMovieItem.img &&
    prevMovieItem.link === nextMovieItem.link &&
    prevMovieItem.rating === nextMovieItem.rating &&
    prevMovieItem.votes === nextMovieItem.votes &&
    prevMovieItem.country?.length === nextMovieItem.votes?.length &&
    prevMovieItem.genre?.length === nextMovieItem.genre?.length
  );
};

export const SearchResultMovieItem = memo(
  ({title, img, link, rating, votes, country, genre}: SearchResultsProps) => {
    if (!img?.startsWith('http')) {
      img = `${API_BASE_URL}/${img}`;
    }

    const navigation = useNavigation<MovieNativeStackNavigationProp>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback((item: any) => {
      bottomSheetModalRef.current?.present(item);
    }, []);

    const openMovie = () => {
      navigation.push('Movie', {title, img, link});
    };

    const openActionModal = () => {
      const itemToSave = {title, img, link};
      handlePresentModalPress(itemToSave);
    };

    return (
      <Pressable
        onPress={openMovie}
        className="h-[130] flex-row rounded-t-xl bg-primary-900/5 overflow-hidden">
        <View className="w-[100]">
          <SharedElement id={`item.${link}.photo`}>
            <FastImage
              className="h-full"
              source={{
                uri: img,
                priority: FastImage.priority.normal,
              }}
              resizeMode="stretch"
              fallback
              defaultSource={require('../../assets/placeholder-movie.jpeg')}
            />
          </SharedElement>
        </View>
        <View className="flex-1 p-2">
          <Text
            numberOfLines={2}
            className="text-gray-700 text-sm font-bold dark:text-white/80">
            {title}
          </Text>
          <Text
            numberOfLines={2}
            className="text-gray-400 pt-1 text-xs font-bold">
            {country?.join(',')}
          </Text>
          <Text
            numberOfLines={2}
            className="text-gray-400 pt-1 text-xs font-bold">
            {genre?.join(',')}
          </Text>
        </View>
        <View className="">
          <View className="  flex-row pr-2 items-center justify-end">
            <Text
              className={`text-[${Colors.primary[900]}] p-2 text-sm font-bold dark:text-white/60`}>
              {rating}
            </Text>
            <FontAwesome5 name="signal" size={16} color={Colors.primary[900]} />
          </View>
          <View className="  flex-row pr-2 items-center justify-end">
            <Text
              className={`text-[${Colors.primary[900]}] p-2 text-sm font-bold dark:text-white/60`}>
              {votes}
            </Text>
            <FontAwesome
              name="thumbs-o-up"
              size={16}
              color={Colors.primary[900]}
            />
          </View>
        </View>

        <Pressable
          onPress={openActionModal}
          className="absolute top-0 left-0 bg-[#000000a9] p-2 overflow-hidden z-40 rounded-br-xl">
          <MaterialIcons name="playlist-add" size={20} color={'#fff'} />
        </Pressable>
        <MovieBottomActionModal
          selectedItem={{title, img, link, rating, votes}}
          ref={bottomSheetModalRef}
        />
      </Pressable>
    );
  },
  moviePropsAreEqual,
);
