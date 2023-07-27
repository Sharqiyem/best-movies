import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MainScreen from '@src/screens/Home/MainScreen';
import TagsScreen from '@src/screens/Tags/TagsScreen';
import {RootTabNavigatorParamList} from './types';
import GenresScreen from '@src/screens/Genres/GenresScreen';
import FavoriteScreen from '@src/screens/Favorite/FavoriteScreen';
import SearchScreen from '@src/screens/Search/SearchScreen';
import {Colors} from '@src/constants/colors';
import {Platform} from 'react-native';
import {useColorScheme} from 'nativewind';

const Tab = createBottomTabNavigator<RootTabNavigatorParamList>();

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
  } else if (name === 'Genres') {
    iconName = 'list';
  } else if (name === 'Favorites') {
    iconName = 'heart';
  } else if (name === 'Search') {
    iconName = 'search';
  }
  return <FontAwesome name={iconName} size={size} color={color} />;
};

export const RootTabs = () => {
  const {colorScheme} = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.primary[900],

        headerShown: false,
        tabBarStyle: {
          minHeight: Platform.OS === 'android' ? 50 : 90,
          backgroundColor: colorScheme === 'dark' ? '#000000e6' : '#ffffffe6',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontWeight: '700',
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: props => <TabIcon {...props} name={route.name} />,
      })}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{title: 'Explore'}}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Tags" component={TagsScreen} />
      <Tab.Screen name="Genres" component={GenresScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};
