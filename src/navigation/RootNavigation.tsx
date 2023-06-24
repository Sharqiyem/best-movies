import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigator} from './RootStackNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
export default RootNavigator;
