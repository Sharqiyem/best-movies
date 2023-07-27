import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import {UseGetMovie} from '@src/hooks/useGetMovie';
import {getMovieId} from '@src/utils';
import {Movie} from '@src/types';
import {MovieItem} from '@src/components';
import {MovieScreenRouteProp} from '@src/navigation/types';
import {SharedElement} from 'react-navigation-shared-element';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MovieBottomActionModal} from '@src/components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {UseGetSimilarMovie} from '@src/hooks/useGetSimilarMovie';
import {Colors} from '@src/constants/colors';

const icons = {
  duration: 'time-outline',
  audience: 'people-outline',
  time: 'ios-time-outline',
  genre: 'list',
  story: 'analytics',
  country: 'earth',
  place: 'earth',
  plot: 'film',
  style: 'aperture',
};

function MovieScreen(): JSX.Element {
  const route = useRoute<MovieScreenRouteProp>();
  const navigation = useNavigation();
  const {title, link, img} = route.params;
  const movieId = getMovieId(link);
  const {isLoading, data} = UseGetMovie(movieId);
  const {data: similars} = UseGetSimilarMovie(movieId);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedItem, setSelectedItem] = useState();
  const [isPlay, setIsPlay] = useState(false);

  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const offsetX = React.useRef(new Animated.Value(0)).current;

  const headerHeightColor = offsetX.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', Colors.primary[900]],
    extrapolate: 'clamp',
  });

  const headerIconColor = offsetX.interpolate({
    inputRange: [0, 100],
    outputRange: [`${Colors.primary[900]}99`, 'transparent'],
    extrapolate: 'clamp',
  });

  const headerTextOpacity = offsetX.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTextOpacity2 = offsetX.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageY = offsetX.interpolate({
    inputRange: [-1000, 0],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  const imageScale = offsetX.interpolate({
    inputRange: [-3000, 0],
    outputRange: [20, 1],
    extrapolate: 'clamp',
  });

  const play = () => {
    setIsPlay(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handlePresentModalPress = useCallback((item: any) => {
    setSelectedItem(item);

    bottomSheetModalRef.current?.present(item);
  }, []);

  const getText = (item: any) => {
    if (typeof item === 'object') {
      return item.join(', ');
    }
    return item;
  };

  const renderCurMovie = () => {
    const movieFull = data as Movie;

    const keys = [
      'audience',
      'time',
      'genre',
      'country',
      'place',
      'plot',
      'style',
      'story',
    ];

    return (
      <>
        {!isPlay ? (
          <Animated.View>
            <SharedElement id={`item.${link}.photo`}>
              <AnimatedFastImage
                className="h-[400]"
                style={{
                  transform: [
                    {
                      translateY: imageY,
                    },
                    {
                      scale: imageScale,
                    },
                  ],
                }}
                source={{
                  uri: img,
                  priority: FastImage.priority.normal,
                  // cache: 'web',
                }}
                resizeMode="stretch"
              />
            </SharedElement>
          </Animated.View>
        ) : null}
        {isPlay ? (
          <YoutubePlayer
            videoId={movieFull.video}
            height={400}
            // video height -> screen width
            // video width -> screen height
            // width={400}
            // prevent aspect ratio auto sizing
            play={isPlay}
            onChangeState={event => {
              if (event === 'ended' || event === 'paused') setIsPlay(false);
            }}
            webViewProps={{
              injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          `,
            }}
          />
        ) : null}
        {!isPlay ? (
          <TouchableOpacity
            onPress={play}
            className="absolute top-[180] left-[180] w-[40] h-[40] bg-[#00000030] rounded-full justify-center items-center">
            <Ionicons name="play" size={20} color={Colors.primary[900]} />
          </TouchableOpacity>
        ) : null}
        <View>
          {!isPlay ? (
            <Animated.View
              className="absolute bottom-0 p-2 w-full bg-[#00000070]"
              style={{
                opacity: headerTextOpacity2,
              }}>
              <SharedElement
                id={`item.${link}.title`}
                // style={{alignItems: 'flex-start'}}
              >
                <Text className=" text-lg text-white font-bold">{title}</Text>
              </SharedElement>
            </Animated.View>
          ) : null}
        </View>

        <ScrollView className="">
          <View className="flex-1 flex-row justify-between items-center px-10 pt-5">
            <View className="gap-1 items-center">
              <FontAwesome5
                name="signal"
                size={20}
                color={Colors.primary[900]}
              />
              <Text className="text-xs text-gray-600 dark:text-white/70">
                Rating
              </Text>
              <Text className="text-lg dark:text-white/90">
                {movieFull?.rating ?? ''}
              </Text>
            </View>
            <View className="gap-1 items-center">
              <FontAwesome name="users" size={20} color={Colors.primary[900]} />
              <Text className="text-xs text-gray-600 dark:text-white/70">
                Votes
              </Text>
              <Text className="text-lg dark:text-white/90">
                {movieFull?.votes ?? ''}
              </Text>
            </View>
            <View className="gap-1 items-center">
              <Ionicons name="time" size={20} color={Colors.primary[900]} />
              <Text className="text-xs text-gray-600 dark:text-white/70">
                duration
              </Text>
              <Text className="text-lg dark:text-white/90">
                {movieFull?.duration ?? ''}
              </Text>
            </View>
          </View>
          {movieFull ? (
            <View className="p-2 w-full">
              {keys?.map(item => {
                const content = getText(
                  movieFull[item as keyof typeof movieFull],
                );
                if (content === '') return null;

                return (
                  <View
                    key={item}
                    className="flex-1 flex-row    py-3  text-white gap-2">
                    {icons[item as keyof typeof icons] !== '' ? (
                      <Ionicons
                        name={icons[item as keyof typeof icons]}
                        size={16}
                        color={Colors.primary[900]}
                      />
                    ) : null}
                    <Text className="capitalize text-blue-500 font-semibold min-w-[60]">
                      {item}
                    </Text>

                    <Text
                      selectable={true}
                      selectionColor="orange"
                      className="text-sm text-white-600 dark:text-white/70 flex-1">
                      {content}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          {similars?.length > 0 ? (
            <Text className="text-2xl font-bold mx-3 text-primary-900 flex-1">
              Top similars movies
            </Text>
          ) : null}
        </ScrollView>
      </>
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
      {/* <Text>ddddd</Text> */}
      <Animated.View
        className="absolute  z-[55] flex-row justify-between items-center w-full py-3"
        style={{
          backgroundColor: headerHeightColor,
          paddingTop: Platform.OS === 'android' ? 10 : 60,
        }}>
        <AnimatedTouchableOpacity
          onPress={goBack}
          className=" w-10 h-10  left-3 z-50 rounded-full p-3 justify-center items-center"
          style={{
            backgroundColor: headerIconColor,
          }}>
          <FontAwesome name="arrow-left" size={16} color="#fff" />
        </AnimatedTouchableOpacity>
        <Animated.Text
          className="text-white text-[16px] flex-1 px-5"
          numberOfLines={1}
          style={{
            opacity: headerTextOpacity,
          }}>
          {title}
        </Animated.Text>
        <AnimatedTouchableOpacity
          onPress={() => handlePresentModalPress(data)}
          className=" w-10 h-10  right-3 z-50 rounded-full p-3 justify-center items-center"
          style={{
            backgroundColor: headerIconColor,
          }}>
          <MaterialIcons name="playlist-add" size={20} color={'#fff'} />
        </AnimatedTouchableOpacity>
      </Animated.View>
      <View className="flex-1">
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offsetX}}}],
            {useNativeDriver: false},
          )}
          horizontal={false}
          numColumns={2}
          ListHeaderComponent={renderCurMovie()}
          data={similars?.slice(0, 18)}
          renderItem={renderItem || []}
          keyExtractor={(item: Movie, index) => item?.title || index.toString()}
          initialNumToRender={5}
        />
      </View>

      <MovieBottomActionModal
        selectedItem={selectedItem}
        ref={bottomSheetModalRef}
      />
      {isLoading ? (
        <Text className="top-[90] text-center">Loading...</Text>
      ) : null}
    </View>
  );
}

export default MovieScreen;
