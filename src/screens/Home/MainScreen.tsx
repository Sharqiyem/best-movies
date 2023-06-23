import React, {useState} from 'react';
import {SafeAreaView, View, TextInput, StatusBar} from 'react-native';
import {HomeList} from '@src/components/HomeList';

function MainScreen(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View className="flex-1 bg-red-500">
      <SafeAreaView className="flex-1 bg-orange-50">
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#772ea2"
          translucent={true}
        />
        <View className="w-full p-2 h-[60]">
          <TextInput
            className="text-sm w-full bg-gray-200  py-3 px-5 rounded-full"
            placeholder="Enter movie title"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        {/* <Button
          title="heee"
          onPress={() => {
            navigation.navigate('Modal');
          }}
        /> */}

        <View>
          <HomeList />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default MainScreen;
