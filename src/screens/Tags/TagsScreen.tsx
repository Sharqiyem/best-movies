import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TagsList} from '@src/components/TagsList';
import Search from '@src/components/Search/Search';
import {SearchType} from '@src/types/Search';

function TagsScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-red-500">
      <SafeAreaView className="flex-1 bg-orange-50">
        <View className="absolute min-h-[70] w-full top-5 z-40">
          <Search type={SearchType.tag} />
        </View>
        <View className="z-10 pt-4 top-[60]">
          <Text className="text-3xl mx-3 font-bold">Tags</Text>

          <TagsList />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default TagsScreen;
