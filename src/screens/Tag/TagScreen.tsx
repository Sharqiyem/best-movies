import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {getMovieId} from '@src/utils';
import {Movie} from '@src/types';
import {MovieItem} from '@src/components';
import {UseGetTag} from '@src/hooks/useGetTag';
import {TagScreenRouteProp} from '@src/navigation/types';
import {Colors} from '@src/constants/colors';

function TagScreen(): JSX.Element {
  const route = useRoute<TagScreenRouteProp>();
  const navigation = useNavigation();
  const {img, title} = route.params;
  const page = useRef<number>(1);

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const offset = React.useRef(new Animated.ValueXY()).current;

  const headerHeightColor = offset.y.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', Colors.primary[900]],
    extrapolate: 'clamp',
  });

  const headerIconColor = offset.y.interpolate({
    inputRange: [0, 100],
    outputRange: [`${Colors.primary[900]}30`, 'transparent'],
    extrapolate: 'clamp',
  });

  const headerTextOpacity = offset.y.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTextOpacity2 = offset.y.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // const movieId = getMovieId(link);
  const {isLoading, data, hasNextPage, fetchNextPage} = UseGetTag({
    id: title,
  });

  console.log('data', data?.pageParams);
  const goBack = () => {
    navigation.goBack();
  };

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more');
    console.log('isFetchingNextPage', hasNextPage, isLoading, page.current);
    // if (hasNextPage) {
    await fetchNextPage?.({pageParam: ++page.current});
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  const renderHeader = () => {
    return (
      <ScrollView className="pb-10">
        <View>
          <FastImage
            className="w-full h-[400]"
            source={{
              uri: img,
              priority: FastImage.priority.normal,
            }}
            resizeMode="stretch"
          />

          <Animated.View
            className="absolute bottom-0 p-2 w-full bg-[#00000070]"
            style={{
              opacity: headerTextOpacity2,
            }}>
            <Text className="text-lg text-white font-bold capitalize">
              {title}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    );
  };

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="w-[50%] p-3">
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

  return (
    <View className="flex-1 dark:bg-slate-800">
      <Animated.View
        className="absolute z-[55] flex-row justify-between items-center w-full py-3"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: headerHeightColor,
          paddingTop: Platform.OS === 'android' ? 10 : 60,
        }}>
        <AnimatedTouchableOpacity
          onPress={goBack}
          className=" w-10 h-10  left-3 z-50 bg-[#754b4b80] rounded-full p-3 justify-center items-center"
          style={{
            backgroundColor: headerIconColor,
          }}>
          <FontAwesome name="arrow-left" size={16} color="#fff" />
        </AnimatedTouchableOpacity>
        <Animated.Text
          className="text-white text-lg  font-bold capitalize"
          numberOfLines={1}
          style={{
            opacity: headerTextOpacity,
          }}>
          {title}
        </Animated.Text>
        <View />
      </Animated.View>

      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        ListHeaderComponent={renderHeader()}
        data={data?.pages?.map(cPage => cPage?.data).flat()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="top-[90]  text-center">Loading</Text>
        }
        keyExtractor={(item: Movie, index) => item.link + index.toString()}
        initialNumToRender={5}
        bounces={false}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset.y}}}],
          {useNativeDriver: false},
        )}
        onEndReached={onEndReached}
      />

      {isLoading ? (
        <Text className="top-[90] text-center">Loading...</Text>
      ) : null}
    </View>
  );
}

export default TagScreen;
