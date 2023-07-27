import React from 'react';
import MovieScreen from '@src/screens/Movie/MovieScreen';
import TagScreen from '@src/screens/Tag/TagScreen';
import {RootTabs} from './RootTabs';
import {HomeStackNavigatorParamList} from './types';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import FiltersScreen from '@src/screens/Filters/FiltersScreen';
import ListScreen from '@src/screens/List/ListScreen';
import FavoriteListScreen from '@src/screens/Favorite/FavoriteListScreen';
import {Platform} from 'react-native';

export const Stack =
  createSharedElementStackNavigator<HomeStackNavigatorParamList>();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="Main" component={RootTabs} />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        sharedElements={route => {
          const {link} = route.params;
          if (Platform.OS === 'android') {
            return [];
          }
          return [
            {id: `item.${link}.photo`, resize: 'clip', animation: 'fade'},
            {id: `item.${link}.title`, resize: 'clip', animation: 'fade'},
          ];
        }}
      />
      <Stack.Screen name="Tag" component={TagScreen} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="FavoritesList" component={FavoriteListScreen} />
    </Stack.Navigator>
  );
};
