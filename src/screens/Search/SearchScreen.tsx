import React from 'react';
import {SafeAreaView} from 'react-native';
import {Search} from '@src/components';

function SearchScreen(): JSX.Element {
  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <Search />
    </SafeAreaView>
  );
}

export default SearchScreen;
