import {RouteProp} from '@react-navigation/native';

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Main: undefined;
  Modal: {
    title: string;
    link: string;
    img: string;
  };
};

export type ModalScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Modal'
>;
