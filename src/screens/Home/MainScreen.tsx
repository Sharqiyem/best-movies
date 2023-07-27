import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList as RNFlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styled} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
import {TagItem} from '@src/components';
import {Colors} from '@src/constants/colors';
import {ListNativeStackNavigationProp} from '@src/navigation/types';
import {MovieItem} from '@src/components';
import {Movie} from '@src/types';

import Animated from 'react-native-reanimated';
import {useMainScreenLogic} from './useMainScreenLogic';

const HEADER_HEIGHT = 120;

export const FlatList = styled(RNFlatList as new () => RNFlatList, {
  props: {
    contentContainerStyle: true,
  },
});

const MainScreen: React.FC = () => {
  const {
    statusBarHeight,
    scrollHandler,
    rStyle,
    rStyle2,
    isDark,
    isLoading,
    data,
    error,
    isRefetching,
    isError,
    navigateToList,
    onToggleColorScheme,
    onRefresh,
  } = useMainScreenLogic();

  const sharedListProps = {
    contentContainerStyle: styles.childFlatListContentContainerStyle,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  };

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[200]">
        <MovieItem
          key={item.title}
          title={item.title}
          img={item.img}
          link={item.link}
          rating={item.rating}
          votes={item.votes}
        />
      </View>
    );
  };

  const renderTagItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[200]">
        <TagItem
          key={item.title}
          title={item.title}
          img={item.img}
          link={item.link}
        />
      </View>
    );
  };

  const renderListHeader = (title: string, first = false) => {
    let className = 'flex-row justify-between items-center px-3 pt-6 ';
    if (first) {
      className = className + 'pt-2';
    }

    return (
      <View key={`Top-${title}`} className={className}>
        <View className="flex-1">
          <Text className="text-lg font-semibold dark:text-white">{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigateToList(title === 'Top Movies' ? 'movies' : 'tvshows')
          }
          className="flex-row items-center">
          <Text className="text-base font-semibold text-primary-900">All</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.primary['900']}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <Animated.View
        className="flex-row justify-between items-center absolute right-0 top-0 left-0 z-10 px-3"
        style={[{paddingTop: statusBarHeight, height: HEADER_HEIGHT}, rStyle]}>
        <Text className="text-4xl text-primary-900">
          Best
          <Text className="text-black/80 dark:text-white/80">.</Text>
        </Text>
        <MaterialCommunityIcons
          onPress={onToggleColorScheme}
          name={'theme-light-dark'}
          color={Colors.primary[900]}
          size={24}
        />
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 dark:bg-slate-800">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {isLoading ? (
        <View className="flex-1 justify-center items-center dark:bg-slate-800">
          <ActivityIndicator color={Colors.primary[900]} />
        </View>
      ) : null}
      {isError ? (
        <View className="flex-1 justify-center items-center dark:bg-slate-800">
          <Text className="text-red-600">
            {(error as {message: string})?.message}
          </Text>
        </View>
      ) : null}
      {!isLoading && !isError ? (
        <Animated.View
          className="flex-1"
          style={{
            ...rStyle2,
          }}>
          <Animated.FlatList
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            nestedScrollEnabled
            contentContainerStyle={styles.mainFlatListContentContainerStyle}
            data={[
              renderListHeader('Top Movies', true),
              <FlatList
                key="Top-Movies-List"
                renderItem={renderItem}
                keyExtractor={(_, index) =>
                  `Top-Movies-List-${index.toString()}`
                }
                data={data?.[0]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
              renderListHeader('Top TV-Shows'),
              <FlatList
                key="Top-TV-Shows-List"
                renderItem={renderItem}
                keyExtractor={(_, index) =>
                  `Top-TV-Shows-List-${index.toString()}`
                }
                data={data?.[1]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
              renderListHeader('Top Styles'),
              <FlatList
                key="Top-Styles-List"
                renderItem={renderTagItem}
                keyExtractor={(_, index) =>
                  `Top-Styles-List-${index.toString()}`
                }
                data={data?.[2]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
              renderListHeader('Top Plots'),
              <FlatList
                key="Top-Plots-List"
                renderItem={renderTagItem}
                keyExtractor={(_, index) =>
                  `Top-Plots-List-${index.toString()}`
                }
                data={data?.[3]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
              renderListHeader('Top Times'),
              <FlatList
                key="Top-Times-List"
                renderItem={renderTagItem}
                keyExtractor={(_, index) =>
                  `Top-Times-List-${index.toString()}`
                }
                data={data?.[4]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
              renderListHeader('Top Places'),
              <FlatList
                key="Top-Places-List"
                renderItem={renderTagItem}
                keyExtractor={(_, index) =>
                  `Top-Places-List-${index.toString()}`
                }
                data={data?.[5]?.data?.[0]?.list?.data}
                {...sharedListProps}
              />,
            ]}
            renderItem={({item}) => item}
            refreshControl={
              <RefreshControl
                tintColor={'#fff'}
                colors={['#fff']}
                refreshing={isRefetching}
                onRefresh={onRefresh}
              />
            }
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainFlatListContentContainerStyle: {
    paddingBottom: 100,
  },
  childFlatListContentContainerStyle: {
    gap: 20,
    paddingHorizontal: 16,
    marginTop: 10,
  },
});
export default MainScreen;
