import React from 'react';
import ModalScreen from '@src/screens/Modal/ModalScreen';
import {Stack, RootTabs} from './RootTabs';

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={RootTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
