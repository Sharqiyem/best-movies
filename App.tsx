import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-red-400 ">
      <View className="flex-1 p-4">
        <View>
          <Text className="text-2xl h-11 text-red">Hello</Text>
        </View>
        <View className="mt-1 bg-red-200 flex-1 w-full">
          <Text className="mt-2 text-lg text-blue-500">Hello</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
