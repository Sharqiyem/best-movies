import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import {useContext, useEffect} from 'react';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import {useColorScheme} from 'nativewind';
import {IS_MOCK} from '@src/config/global';
import {UseFakeGetHome, UseGetHome} from '@src/hooks/getHome';
import {useNavigation} from '@react-navigation/native';
import {ListNativeStackNavigationProp} from '@src/navigation/types';

const HEADER_HEIGHT = 120;

export const useMainScreenLogic = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

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

  const {curColorScheme, saveColorScheme, isDark} = useContext(
    StoreContext,
  ) as StoreContextType;

  const {colorScheme, toggleColorScheme, setColorScheme} = useColorScheme();

  const {isLoading, data, error, isRefetching, refetch, isError} = IS_MOCK
    ? UseFakeGetHome()
    : UseGetHome();

  const navigation = useNavigation<ListNativeStackNavigationProp>();

  const onToggleColorScheme = () => {
    saveColorScheme?.(colorScheme === 'dark' ? 'light' : 'dark');
    toggleColorScheme();
  };

  const onRefresh = () => {
    refetch?.();
  };

  useEffect(() => {
    if (curColorScheme !== colorScheme) {
      setColorScheme(curColorScheme);
    }
  }, [colorScheme, curColorScheme, setColorScheme]);

  const navigateToList = (id: 'movies' | 'tvshows') => {
    navigation.navigate('List', {id});
  };
  return {
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
  };
};
