import React, {memo, useCallback, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {MovieNativeStackNavigationProp} from '@src/navigation/types';
import {API_BASE_URL} from '@src/config/api.config';
import {ItemProps} from '@src/types/ItemProps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {MovieBottomActionModal} from '../MovieBottomActionModal';

const moviePropsAreEqual = (
  prevMovieItem: ItemProps,
  nextMovieItem: ItemProps,
) => {
  return (
    prevMovieItem.title === nextMovieItem.title &&
    prevMovieItem.img === nextMovieItem.img &&
    prevMovieItem.link === nextMovieItem.link &&
    prevMovieItem.rating === nextMovieItem.rating &&
    prevMovieItem.votes === nextMovieItem.votes
  );
};

export const MovieItem = memo(
  ({title, img, link, rating, votes}: ItemProps) => {
    if (!img?.startsWith('http')) {
      img = `${API_BASE_URL}/${img}`;
    }
    const heightClass = 'min-h-[300]';

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
      <>
        <Pressable
          onPress={openMovie}
          className={`${heightClass} rounded-t-xl bg-primary-900/50 overflow-hidden`}>
          <Pressable
            onPress={openActionModal}
            className="absolute top-0 right-0 bg-[#000000a9] p-2 overflow-hidden z-40 rounded-bl-xl">
            <MaterialIcons name="playlist-add" size={20} color={'#fff'} />
          </Pressable>
          <SharedElement id={`item.${link}.photo`}>
            <FastImage
              className={`${heightClass}`}
              source={{
                uri: img,
                priority: FastImage.priority.normal,
              }}
              resizeMode="stretch"
              fallback
              defaultSource={require('../../assets/placeholder-movie.jpeg')}
            />
          </SharedElement>
          <LinearGradient
            end={{x: 1, y: 1}}
            start={{x: 1, y: 0}}
            className={`${heightClass} z-1 absolute bottom-0 left-0 right-0`}
            colors={['#00000000', '#00000060']}
          />
          <View className="p-2 absolute bottom-0 z-10  w-full">
            <SharedElement
              // style={{alignItems: 'flex-start'}}
              id={`item.${link}.title`}>
              <Text
                numberOfLines={2}
                className=" text-white  text-base font-bold">
                {title}
              </Text>
              <View className="flex-row gap-1 items-center">
                <FontAwesome5 name="signal" size={10} color={'#fff'} />
                <Text className="text-white">
                  {rating} ({votes})
                </Text>
              </View>
            </SharedElement>
          </View>
        </Pressable>
        <MovieBottomActionModal
          selectedItem={{title, img, link, rating, votes}}
          ref={bottomSheetModalRef}
        />
      </>
    );
  },
  moviePropsAreEqual,
);
