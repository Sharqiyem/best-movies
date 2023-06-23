import React from 'react';
import {FlatList, View} from 'react-native';
import {Movie} from '@src/types';
import {Tags} from '@data/Tags';
import {TagItem} from './TagItem';

export const TagsList = (): JSX.Element => {
  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[50%] p-3">
        <TagItem key={item.title} {...item} />
      </View>
    );
  };

  return (
    <FlatList
      horizontal={false}
      data={Tags}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />
  );
};
