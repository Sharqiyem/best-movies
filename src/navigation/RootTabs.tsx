import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MainScreen from '@src/screens/Home/MainScreen';
import TagsScreen from '@src/screens/Tags/TagsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';

const Tab = createBottomTabNavigator();
export const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const TabIcon = ({
  size,
  color,
  name,
}: {
  focused: boolean;
  size: number;
  color: string;
  name: string;
}) => {
  let iconName = '';
  if (name === 'Home') {
    iconName = 'home';
  } else if (name === 'Tags') {
    iconName = 'tags';
  } else if (name === 'Favorites') {
    iconName = 'heart';
  }
  return <FontAwesome name={iconName} size={size} color={color} />;
};

export const RootTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: props => <TabIcon {...props} name={route.name} />,
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Tags" component={TagsScreen} />
      <Tab.Screen name="Favorites" component={MainScreen} />
    </Tab.Navigator>
  );
};
