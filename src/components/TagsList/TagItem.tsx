import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

type TagProp = {
  title: string;
  link?: string;
  img: string;
};

export const TagItem = ({title, img}: TagProp) => {
  return (
    <View className="bg-gray-100 rounded-t-xl overflow-hidden min-h-[160]">
      <FastImage
        className="w-full h-[130]"
        source={{
          uri: img,
          priority: FastImage.priority.normal,
        }}
        resizeMode="stretch"
      />
      <Text numberOfLines={2} className="text-gray-600 p-2 text-base font-bold">
        {title}
      </Text>
    </View>
  );
};
