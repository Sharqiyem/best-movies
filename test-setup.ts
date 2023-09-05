jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});

jest.mock('react-navigation-shared-element', () => ({
  createSharedElementStackNavigator: jest.fn(),
  SharedElement: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));

jest.mock('react-native-youtube-iframe', () => 'react-native-youtube-iframe');
jest.mock('react-native-linear-gradient', () => 'linear-gradient');
jest.mock(
  '@react-native-async-storage/async-storage',
  () => '@react-native-async-storage/async-storage',
);

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);

jest.mock('@gorhom/bottom-sheet', () => {
  return () => ({});
});

jest.mock('react-native-ratings', () => {
  return () => ({});
});
