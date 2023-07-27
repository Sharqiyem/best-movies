import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useDebounce} from '@src/hooks/useDebounce';
import {UseSearch} from '@src/hooks/useSearch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import {Movie} from '@src/types';
import {useNavigation} from '@react-navigation/native';
import {Filters, FiltersNativeStackNavigationProp} from '@src/navigation/types';
import {SearchResultMovieItem} from './SearchResultMovieItem';
import {Text} from 'react-native';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import {Colors} from '@src/constants/colors';

export const Search = () => {
  const page = useRef<number>(1);

  const {isDark} = useContext(StoreContext) as StoreContextType;

  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const navigation = useNavigation<FiltersNativeStackNavigationProp>();

  const [searchTerm, setSearchTerm] = useState('');
  const [firstRun, setFirstRun] = useState(true);
  const debouncedValue = useDebounce<string>(searchTerm, 1000);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = UseSearch(selectedFilters);

  // console.log('Isloading data', isLoading, data?.pageParams);

  useEffect(() => {
    if (!firstRun) {
      const vals: Filters = {...selectedFilters, title: searchTerm};
      vals.title = searchTerm;
      setSelectedFilters(vals);
      page.current = 1;
    }
    setFirstRun(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const reset = () => {
    setSearchTerm('');
  };

  const onRefresh = () => {
    refetch?.();
  };

  const onEndReached = React.useCallback(async () => {
    console.log('fetching more', hasNextPage);
    fetchNextPage?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = () => {
    if (isFetchingNextPage)
      return (
        <View className="p-3 justify-center items-center flex-row">
          <ActivityIndicator color={Colors.primary[900]} className="m-3" />
        </View>
      );
  };

  const openFilters = () => {
    navigation.navigate('Filters', {
      selectedFilters,
      onGoBack: (vals: Filters) => {
        console.log('vals', vals);
        vals.title = searchTerm;
        setSelectedFilters(vals);
        page.current = 1;
      },
    });
  };

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <View className="p-3">
        <SearchResultMovieItem
          key={item.title}
          {...item}
          // openModal={handlePresentModalPress}
        />
      </View>
    );
  };

  const renderSearchResults = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={data?.pages?.map(cPage => cPage?.data).flat()}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.link}-${index}`}
        initialNumToRender={10}
        onEndReached={onEndReached}
        contentContainerStyle={styles.mainFlatListContentContainerStyle}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            tintColor={'#fff'}
            colors={['#fff']}
            refreshing={isRefetching}
            onRefresh={onRefresh}
          />
        }
      />
    );
  };

  return (
    <View className=" flex-1 ">
      <View className="px-3 mt-4">
        <View className="w-full  p-2 h-[50] rounded-xl bg-gray-200 dark:bg-slate-700">
          <View className="absolute top-4 left-4 z-50">
            <FontAwesome
              name="search"
              size={16}
              color={isDark ? '#ffffff70' : '#00000070'}
            />
          </View>

          <TextInput
            className="text-sm py-0 mt-[-11] px-9 pr-[75] h-[49] rounded-xl dark:text-white"
            placeholder="Enter movie title"
            placeholderTextColor={isDark ? '#ffffff70' : '#00000070'}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={openFilters}
            className="absolute top-4 right-4 z-50">
            <FontAwesome
              name="sliders"
              size={20}
              color={isDark ? '#ffffff70' : '#00000070'}
            />
          </TouchableOpacity>
          {searchTerm !== '' ? (
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              onPress={reset}
              className="absolute top-4 right-[55] z-50">
              <FontAwesome
                name="close"
                size={20}
                color={isDark ? '#ffffff70' : '#00000070'}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {error ? (
        <View className="flex-1 justify-center items-center ">
          <Lottie
            style={{width: 200, height: 200}}
            source={require('../../assets/anim/connection.json')}
            autoPlay
            loop
          />

          <Text className="text-red-600 absolute bottom-20">
            {(error as {message: string})?.message}
          </Text>
        </View>
      ) : null}

      {/* {isLoading ? (
        <View className="flex-1 justify-center items-center ">
          <Lottie
            style={{width: 200, height: 200}}
            source={require('../../assets/anim/loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : null} */}
      {data?.pages ? (
        <View className="flex-1">{renderSearchResults()}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainFlatListContentContainerStyle: {
    paddingBottom: 120,
  },
});
