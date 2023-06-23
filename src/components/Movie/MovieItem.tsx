import {useNavigation} from '@react-navigation/native';
import {ModalScreenRouteProp} from '@src/navigation/types';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

type MovieProps = {
  title: string;
  link?: string;
  img: string;
};

export const MovieItem = ({title, img}: MovieProps) => {
  const navigation = useNavigation<ModalScreenRouteProp>();

  const openMovie = () => {
    navigation.navigate('Modal', {title, img, link: ''});
  };

  return (
    <TouchableOpacity
      onPress={openMovie}
      className="bg-gray-100 rounded-t-xl overflow-hidden min-h-[260]">
      <FastImage
        className="w-full h-[200]"
        source={{
          uri: img,
          priority: FastImage.priority.normal,
        }}
        resizeMode="stretch"
      />
      <Text numberOfLines={2} className="text-gray-600 p-2 text-base font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
