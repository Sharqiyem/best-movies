import {useRoute} from '@react-navigation/native';
import {ModalScreenRouteProp} from '@src/navigation/types';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MovieData} from '@data/Movie';

function ModalScreen(): JSX.Element {
  const route = useRoute<ModalScreenRouteProp>();
  const {title, img} = route.params;

  const keys = Object.keys(MovieData);

  return (
    <View className="flex-1 bg-red-500">
      <ScrollView className="flex-1 bg-orange-50">
        <View>
          <FastImage
            className="w-full h-[400]"
            source={{
              uri: img,
              priority: FastImage.priority.normal,
            }}
            resizeMode="stretch"
          />
          <View className="absolute bottom-0 p-2 w-full bg-[#00000070]">
            <Text className=" text-lg text-white font-bold">{title}</Text>
          </View>
        </View>
        <View className="p-2 w-full">
          {keys.map(item => (
            <View
              key={item}
              className="flex-1 flex-row items-center py-3  text-white gap-1 border-b-orange-100 border-b-2">
              <Text className="capitalize text-blue-500 font-semibold">
                {item}:{' '}
              </Text>
              <Text className="text-sm text-white-600 flex-1">
                {MovieData[item]}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default ModalScreen;
