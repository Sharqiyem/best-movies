import React from 'react';
import {SectionList, FlatList, Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Movie} from '@src/types';
import {MovieItem} from '@src/components';
import {UseFakeGetHome, UseGetHome} from '@src/hooks/getHome';
import {IS_MOCK} from '@src/config/global';

export const HomeList = (): JSX.Element => {
  const {isLoading, data, error} = IS_MOCK ? UseFakeGetHome() : UseGetHome();

  console.log('HomeList data', JSON.stringify(data, null, 2));

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
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={listItem.list}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        initialNumToRender={5}
      />
    );
  };

  const renderSectionHeader = ({section}: {section: {title: string}}) => {
    return (
      <LinearGradient
        className="mx-3"
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#808080ff', '#192f6a00']}>
        <Text className="text-3xl mx-3 text-white font-bold ">
          {section.title}
        </Text>
      </LinearGradient>
    );
  };

  if (isLoading) {
    return <Text className="top-[40] text-center">Loading</Text>;
  }

  if (!isLoading && error) {
    return <Text className="top-[40] text-center">{error?.message}</Text>;
  }

  return (
    <>
      <SectionList
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        sections={data || []}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSection}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 60,
  },
});
