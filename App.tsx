import React, {useEffect} from 'react';
import RootNavigator from '@src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import {LogBox} from 'react-native';
import {StoreContextProvider} from '@src/store/StoreContext';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed from React Native',
]);

const queryClient = new QueryClient();

function App(): JSX.Element {
  useEffect(() => {
    LottieSplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContextProvider>
        <RootNavigator />
      </StoreContextProvider>
    </QueryClientProvider>
  );
}

export default App;
