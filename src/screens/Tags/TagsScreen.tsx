import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TagsList} from '@src/components/TagsList';

function TagsScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-red-500">
      <SafeAreaView className="flex-1 bg-orange-50">
        <Text className="text-3xl mx-3 my-2 font-bold">Tags</Text>
        <TagsList />
      </SafeAreaView>
    </View>
  );
}

export default TagsScreen;
