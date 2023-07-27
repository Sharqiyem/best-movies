import React, {useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MovieItem, TagsSeletor} from '@src/components';
import {genres} from '@src/data/filterData';
import {Movie} from '@src/types';
import {UseSearch} from '@src/hooks/useSearch';
import {Filters} from '@src/navigation/types';
import {ActivityIndicator} from 'react-native';
import {Colors} from '@src/constants/colors';

function GenresScreen(): JSX.Element {
  const page = useRef<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<
    {key: string; value: string}[]
  >([]);

  const selectedFilters: Filters = {
    genres: selectedGenres.map(s => s.value),
  };

  const {
    data,
    isRefetching,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = UseSearch(selectedFilters);

  console.log('selectedTagIndexs', selectedGenres);
  // console.log('data', JSON.stringify(data, null, 2));

  const onTagPress = (tag: {key: string; value: string}) => {
    if (!selectedGenres.find(f => f.key === tag.key)) {
      setSelectedGenres([...selectedGenres, tag]);
    } else {
      setSelectedGenres(selectedGenres.filter(i => i.key !== tag.key));
    }
    page.current = 1;
  };

  const onRefresh = () => {
    refetch?.();
  };

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more', hasNextPage);
    fetchNextPage?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = () => {
    if (isFetchingNextPage)
      return (
        <View className="p-3 justify-center items-center flex-row">
          <ActivityIndicator color={Colors.primary[900]} className="m-3" />
        </View>
      );
  };

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[50%] p-3">
        <MovieItem
          key={item.title}
          title={item.title}
          img={item.img}
          link={item.link}
          rating={item.rating}
          votes={item.votes}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <View className="z-10 mt-4">
        <Text className="text-3xl mx-3 font-bold dark:text-white">Genres</Text>
      </View>
      {/* tabs */}
      <View className="mx-[16] my-[8] min-h-[20] py-1">
        <TagsSeletor
          selectedIndex={selectedGenres}
          tags={genres}
          onPress={onTagPress}
        />
      </View>

      {error ? (
        <View className="flex-1 justify-center items-center ">
          <Text className="text-red-600">
            {(error as {message: string})?.message}
          </Text>
        </View>
      ) : null}

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={Colors.primary[900]} />
        </View>
      ) : null}
      {data?.pages ? (
        <FlatList
          contentContainerStyle={styles.mainFlatListContentContainerStyle}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          horizontal={false}
          numColumns={2}
          data={data?.pages?.map(cPage => cPage?.data).flat()}
          renderItem={renderItem}
          keyExtractor={(item: Movie, index) => item.title + index.toString()}
          initialNumToRender={5}
          onEndReached={onEndReached}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              tintColor={'#fff'}
              colors={['#fff']}
              refreshing={isRefetching}
              onRefresh={onRefresh}
            />
          }
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainFlatListContentContainerStyle: {
    paddingBottom: 80,
  },
});

export default GenresScreen;
