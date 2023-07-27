import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {TagItem} from './TagItem';
import {Tag} from '@src/types/Tag';
import {UseFakeGetAllTags, UseGetAllTags} from '@src/hooks/getAllTags';
import {IS_MOCK} from '@src/config/global';
import {Colors} from '@src/constants/colors';

export const TagsList = (): JSX.Element => {
  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = IS_MOCK ? UseFakeGetAllTags() : UseGetAllTags();

  console.log('DTAA_____', JSON.stringify(data, null, 2));

  const onRefresh = () => {
    refetch?.();
  };

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more');
    console.log('isFetchingNextPage', hasNextPage, isLoading);
    if (hasNextPage) {
      await fetchNextPage?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  const renderFooter = () => {
    if (isFetchingNextPage)
      return (
        <View className="p-3 justify-center items-center flex-row">
          <ActivityIndicator color={Colors.primary[900]} className="m-3" />
        </View>
      );
  };

  const renderItem = ({item}: {item: Tag}) => {
    return (
      <View className="w-[50%] p-3">
        <TagItem key={item.title} {...item} />
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <View className="flex-1  justify-center items-center">
          <ActivityIndicator color={Colors.primary[900]} />
        </View>
      ) : null}
      {!isLoading && error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600">
            {(error as {message: string})?.message}
          </Text>
        </View>
      ) : null}
      {!isLoading && data?.pages?.[0].data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={data?.pages?.map(page => page?.data).flat()}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          initialNumToRender={5}
          contentContainerStyle={styles.list}
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
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 90,
  },
});
