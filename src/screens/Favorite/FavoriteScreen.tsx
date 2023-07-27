import React, {useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import {MovieItem} from '@src/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ItemProps} from '@src/types/ItemProps';
import {Colors} from '@src/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {FavoritesListNativeStackNavigationProp} from '@src/navigation/types';

function FavoriteScreen(): JSX.Element {
  const {lists, curColorScheme} = useContext(StoreContext) as StoreContextType;
  const navigation = useNavigation<FavoritesListNativeStackNavigationProp>();

  console.log('FavoriteScreen curColorScheme', curColorScheme);

  const sharedListProps = {
    contentContainerStyle: styles.childFlatListContentContainerStyle,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  };

  const navigateTo = (listId: string) => {
    navigation.navigate('FavoritesList', {listId});
  };
  const renderListHeader = (key: string, title: string) => {
    return (
      <View
        key={`Top-${title}`}
        className="flex-row justify-between items-center px-4 pt-2 mt-4   ">
        <View className="flex-1">
          <Text className="text-lg font-semibold dark:text-white capitalize">
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigateTo(key);
          }}
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

  const renderItem = ({item}: {item: ItemProps}) => {
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

  const renderLists = () => {
    return lists.map(list => {
      return [
        <View key={list.key}>
          {renderListHeader(list.key, `${list.label}`)}
        </View>,
        <FlatList
          key={`${list.key}-List`}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${list.key}-List-${index.toString()}`}
          data={list.items}
          ListEmptyComponent={<Text className="text-white/70">Empty list</Text>}
          {...sharedListProps}
        />,
      ];
    });
  };

  return (
    <SafeAreaView className="flex-1  dark:bg-slate-800">
      <View className="z-10 mt-4">
        <Text className="text-3xl mx-3 font-bold dark:text-white">
          Favorites
        </Text>
      </View>

      <View className="flex-1">
        <FlatList
          nestedScrollEnabled
          contentContainerStyle={styles.mainFlatListContentContainerStyle}
          data={[renderLists()]}
          renderItem={({item}) => item}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainFlatListContentContainerStyle: {
    paddingBottom: 80,
  },
  childFlatListContentContainerStyle: {
    gap: 20,
    paddingHorizontal: 16,
    marginTop: 10,
  },
});

export default FavoriteScreen;
