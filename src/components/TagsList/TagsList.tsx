import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {TagItem} from './TagItem';
import {Tag} from '@src/types/Tag';
import {UseGetAllTags} from '@src/hooks/getAllTags';

export const TagsList = (): JSX.Element => {
  const {isLoading, error, data, hasNextPage, fetchNextPage} = UseGetAllTags();

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more');
    console.log('isFetchingNextPage', hasNextPage, isLoading);
    if (hasNextPage) {
      await fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  const renderItem = ({item}: {item: Tag}) => {
    return (
      <View className="w-[50%] p-3">
        <TagItem key={item.title} {...item} />
      </View>
    );
  };

  return (
    <>
      {isLoading ? <Text className="text-center">Loading...</Text> : null}
      {!isLoading && error ? (
        <Text className="text-center">{error?.message}</Text>
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
        />
      ) : null}
    </>
  );
};
