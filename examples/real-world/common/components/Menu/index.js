import React from 'react';
import { changePageTo, Link } from '../../../../../src';
import getLocation from '../../../../../src/helpers/getLocation';

import { countries } from '../../config';

const Menu = ({ areDishesLoading, country, dishes, dispatch, isVegetarian }) => (
  <div>
    <h2>Dishes by country:</h2>
    <ul>
      { countries.map(( c, i ) => (
        <li key={ i }>
          <Link
            style={{
              fontWeight: c === country ? 'bold' : undefined,
              textTransform: 'capitalize',
            }}
            to={[ 'menu', c, { isVegetarian }]}
          >
            { c }
          </Link>
        </li>
      ))}
    </ul>
    <form
      action={ getLocation([ 'menu', country ]).url }
      method="GET"
    >
      <label htmlFor="isVegetarian">
        <input
          checked={ isVegetarian }
          defaultChecked={ isVegetarian }
          defaultValue="true"
          id="isVegetarian"
          onChange={ e => {
            dispatch(
              changePageTo([ 'menu', country, { isVegetarian: e.target.checked }])
            );
          }}
          name="isVegetarian"
          type="checkbox"
        />
        Only show vegetarian dishes
      </label>
      <button type="submit">
        Update
      </button>
    </form>
    <h2>Dishes:</h2>
    { areDishesLoading ? <p>loading ...</p> : (
      <ul>
      { dishes.map(({ name }, i ) => (
        <li key={ i }>
          <h3>{ name }</h3>
        </li>
      ))}
      </ul>
    )}
  </div>
);

export default Menu;
