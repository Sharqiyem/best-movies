import React, {useContext} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import {MovieItem} from '@src/components';
import {ItemProps} from '@src/types/ItemProps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FavoritesListScreenRouteProp} from '@src/navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

function FavoriteListScreen(): JSX.Element {
  const {
    params: {listId},
  } = useRoute<FavoritesListScreenRouteProp>();

  const {lists} = useContext(StoreContext) as StoreContextType;
  const listItems = lists.find(l => l.key === listId);

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const renderItem = ({item}: {item: ItemProps}) => {
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
    <SafeAreaView className="flex-1  dark:bg-slate-800">
      <View className="z-10 mt-4 flex-row items-center px-3">
        <Pressable onPress={goBack} className="w-7 h-7  justify-center">
          <Ionicons
            name="arrow-back"
            size={24}
            className="dark:text-white/70 text-black/70"
          />
        </Pressable>
        <Text className="text-3xl mx-3 font-bold dark:text-white capitalize">
          {listItems?.label}
        </Text>
      </View>

      <View className="flex-1">
        <FlatList
          nestedScrollEnabled
          contentContainerStyle={styles.mainFlatListContentContainerStyle}
          data={listItems?.items}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainFlatListContentContainerStyle: {
    paddingBottom: 30,
  },
});

export default FavoriteListScreen;
