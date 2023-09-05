import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import {Movie} from '@src/types';
import {MovieItem} from '@src/components';
import {ListScreenRouteProp} from '@src/navigation/types';
import {UseList} from '@src/hooks/useList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ListScreen(): JSX.Element {
  const route = useRoute<ListScreenRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params ?? 'movies';
  const {isLoading, data, fetchNextPage, hasNextPage} = UseList(id);

  const title = id === 'movies' ? 'Top Movies' : 'Top TV-Shows';
  const goBack = () => {
    navigation.goBack();
  };

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more', hasNextPage);
    fetchNextPage?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <View className="flex-1 dark:bg-slate-800">
      <View
        className="absolute z-[55] flex-row justify-between items-center w-full py-3 bg-primary-900"
        style={{
          paddingTop: Platform.OS === 'android' ? 10 : 60,
        }}>
        <TouchableOpacity
          onPress={goBack}
          className=" w-10 h-10  left-3 z-50   rounded-full p-3 justify-center items-center">
          <FontAwesome name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-[16px] flex-1 text-center px-5"
          numberOfLines={1}>
          {title}
        </Text>
        <View />
      </View>
      <FlatList
        className="mt-[120]"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        horizontal={false}
        numColumns={2}
        data={data?.pages?.map(page => page?.data).flat()}
        renderItem={renderItem || []}
        keyExtractor={(item: Movie, index) => item?.title || index.toString()}
        initialNumToRender={5}
        onEndReached={onEndReached}
      />

      {isLoading ? (
        <Text className="top-[90] text-center">Loading...</Text>
      ) : null}
    </View>
  );
}

export default ListScreen;
