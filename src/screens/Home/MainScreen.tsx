import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {HomeList} from '@src/components/HomeList';
import Search from '@src/components/Search/Search';
import {SearchType} from '@src/types/Search';
import Config from 'react-native-config';

function MainScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-red-500">
      <SafeAreaView className="flex-1 bg-orange-50">
        <View className="absolute min-h-[70] w-full top-5 z-40">
          <Search type={SearchType.movie} />
        </View>
        <View className="z-10 pt-4  top-[60]">
          <Text>API:{Config.API_URL}</Text>
          <Text>ENV:{Config.ENV}</Text>
          <HomeList />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default MainScreen;
