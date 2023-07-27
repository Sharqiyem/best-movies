import {Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 100;

const MainScreen2 = () => {
  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      const diff = event.contentOffset.y - ctx.prevY;

      translateY.value = clamp(translateY.value + diff, 0, HEADER_HEIGHT);
    },
    onBeginDrag: (event: any, ctx: any) => {
      ctx.prevY = event.contentOffset.y;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      translateY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY: interpolateY}],
    };
  });

  const rStyle2 = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      translateY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, statusBarHeight],
      Extrapolate.CLAMP,
    );

    return {
      paddingTop: interpolateY,
    };
  });

  const renderHeader = () => {
    return (
      <Animated.View
        className="bg-red-400 absolute right-0 left-0 z-10"
        style={[{paddingTop: statusBarHeight, height: HEADER_HEIGHT}, rStyle]}>
        <Text className="pt-3 text-xl text-white">Hello</Text>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-red-300">
      {renderHeader()}
      <Animated.View
        className="flex-1"
        style={{
          ...rStyle2,
        }}>
        <Animated.FlatList
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={{
            paddingBottom: HEADER_HEIGHT - statusBarHeight + 30,
          }}
          data={[...Array(100).keys()]}
          renderItem={({item, index}) => (
            <View className="h-10">
              <Text className="" key={index}>
                {item}
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </Animated.View>
    </View>
  );
};

export default MainScreen2;
