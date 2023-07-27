import React from 'react';
import {Pressable, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {TagNativeStackNavigationProp} from '@src/navigation/types';
import {ItemProps} from '@src/types/ItemProps';
import {API_BASE_URL} from '@src/config/api.config';

export const TagItem = ({title, img, link}: ItemProps) => {
  // console.log('TagItem', {title, img, link});
  if (!img?.startsWith('http')) {
    img = `${API_BASE_URL}/${img}`;
  }

  const navigation = useNavigation<TagNativeStackNavigationProp>();

  const heightClass = 'min-h-[170]';

  const openTag = () => {
    navigation.push('Tag', {title, img, link});
  };

  return (
    <Pressable
      onPress={openTag}
      className={`${heightClass} rounded-t-xl overflow-hidden bg-primary-900/50`}>
      <FastImage
        className={`${heightClass} rounded-t-xl w-full ]`}
        source={{
          uri: img,
          priority: FastImage.priority.normal,
        }}
        resizeMode="stretch"
        fallback
        defaultSource={require('../../assets/placeholder-movie.jpeg')}
      />
      <LinearGradient
        end={{x: 1, y: 1}}
        start={{x: 1, y: 0}}
        className={`${heightClass} z-1 absolute bottom-0 left-0 right-0`}
        colors={['#00000000', '#00000060']}
      />
      <Text
        numberOfLines={2}
        className="absolute bottom-0 z-10 text-white p-2 text-base font-bold capitalize">
        {title}
      </Text>
    </Pressable>
  );
};
