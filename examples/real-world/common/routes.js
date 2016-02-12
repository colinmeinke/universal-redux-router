import React from 'react';

import {
  dishesLoaded,
  dishesLoading,
  getDishes,
  updateCountry,
  updateIsVegetarian,
} from './actions';

import Menu from './components/Menu';
import NotFound from './components/NotFound';

const routes = [
  [
    'menu/:country',
    {
      country: updateCountry,
      isVegetarian: updateIsVegetarian,
      after: [ dishesLoading, getDishes, dishesLoaded ],
    },
    <Menu />
  ],
  [ '*', <NotFound /> ],
];

export default routes;
