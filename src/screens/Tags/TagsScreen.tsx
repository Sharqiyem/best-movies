import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TagsList} from '@src/components';

function TagsScreen(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <View className="z-10 flex-1 mt-4">
        <Text className="text-3xl mx-3 font-bold dark:text-white">Tags</Text>
        <View className="flex-1">
          <TagsList />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TagsScreen;
