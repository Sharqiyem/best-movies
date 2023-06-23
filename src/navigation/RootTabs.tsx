import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MainScreen from '@src/screens/Home/MainScreen';
import TagsScreen from '@src/screens/Tags/TagsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';
import ModalScreen from '@src/screens/Modal/ModalScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

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
  let iconName = 'user';
  if (name === 'Home') {
    iconName = 'home';
  } else if (name === 'Tags') {
    iconName = 'tags';
  } else if (name === 'Profile') {
    iconName = 'user';
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
      <Tab.Screen
        name="Home"
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <FontAwesome name="home" color={color} size={size} />
        //   ),
        // }}
        component={MainScreen}
      />
      <Tab.Screen
        name="Tags"
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <FontAwesome name="tags" color={color} size={size} />
        //   ),
        // }}
        component={TagsScreen}
      />
      <Tab.Screen
        name="Prpfile"
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <FontAwesome name="user" color={color} size={size} />
        //   ),
        // }}
        component={MainScreen}
      />
    </Tab.Navigator>
  );
};

export const HomeStackNavigator = () => {
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
