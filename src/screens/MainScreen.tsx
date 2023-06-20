import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

function MainScreen(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-orange-500">
      <View className="flex-1 bg-red-200">
        <View>
          <Text className="text-2xl h-11 text-red">Header</Text>
        </View>
        <View className="mt-1 bg-red-200 flex-1 w-full">
          <Text className="mt-2 text-lg text-blue-500">Hello</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;
