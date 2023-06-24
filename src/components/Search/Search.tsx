import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {useDebounce} from '@src/hooks/useDebounce';
import {UseSearch} from '@src/hooks/useSearch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SearchResult, SearchType} from '@src/types/Search';

function Search({type}: {type: SearchType}): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce<string>(searchTerm, 1000);
  const {data, isLoading} = UseSearch(debouncedValue);
  console.log('Isloading data', isLoading, JSON.stringify(data, null, 2));

  const reset = () => {
    setSearchTerm('');
  };
  const renderSearchResults = () => {
    const reslut = type === SearchType.tag ? data?.tag : data?.movie;

    return (
      <View className="p-2">
        {reslut?.map((item: SearchResult) => {
          return (
            <View key={item.label} className="p-2">
              <Text>{item.label}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View className="px-3">
      <View className="w-full p-2 h-[50] rounded-full bg-gray-200">
        <View className="absolute top-4 left-6 z-50">
          <FontAwesome name="search" size={16} color="gray" />
        </View>

        <TextInput
          className="text-sm py-0 mt-[-10] px-11 h-[50] bg-red-0"
          placeholder="Enter movie title"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm !== '' ? (
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={reset}
            className="absolute top-4 right-6 z-50">
            <FontAwesome onPress={reset} name="close" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
      {data?.movie && (
        <View className="absolute left-3 right-3 top-[50] z-[100000] bg-orange-50">
          {renderSearchResults()}
        </View>
      )}
    </View>
  );
}

export default Search;
