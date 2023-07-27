import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigator} from './RootStackNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <RootStackNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
export default RootNavigator;
