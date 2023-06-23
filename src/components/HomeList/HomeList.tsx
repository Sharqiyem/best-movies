import React from 'react';
import {SectionList, FlatList, Text, View, StyleSheet} from 'react-native';
import {Place} from '@src/data/Place';
import {Plot} from '@src/data/Plot';
import {Movie} from '@src/types';
import {MovieItem} from '@src/components';

const homeSections = [
  {title: 'Place', data: [{list: Place}]},
  {title: 'Plot', data: [{list: Plot}]},
];

export const HomeList = (): JSX.Element => {
  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[50%] p-3">
        <MovieItem key={item.title} {...item} />
      </View>
    );
  };

  const renderSection = ({item: listItem}: {item: {list: Movie[]}}) => {
    return (
      <FlatList
        style={styles.list}
        horizontal={false}
        data={listItem.list}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    );
  };

  const renderSectionHeader = ({section}: {section: {title: string}}) => {
    return (
      <Text className="text-2xl font-bold mx-3 bg-gray-100">
        {section.title}
      </Text>
    );
  };

  return (
    <SectionList
      sections={homeSections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderSection}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 50,
  },
});
