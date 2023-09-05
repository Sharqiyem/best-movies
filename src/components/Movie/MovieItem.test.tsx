/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {MovieItem} from '@src/components';
import {MovieData} from '@src/data/Movie';

jest.mock('../MovieBottomActionModal/MovieBottomActionModal', () => {
  const {forwardRef} = jest.requireActual('react');
  return {
    // __esModule: true,
    MovieBottomActionModal: forwardRef((props, ref) => <div ref={ref} />),
  };
});

it('renders correctly', () => {
  renderer.create(
    <MovieItem
      title={MovieData.title}
      img={MovieData.img}
      link={MovieData.link}
      rating={MovieData.rating}
      vote={MovieData.votes}
    />,
  );
});
