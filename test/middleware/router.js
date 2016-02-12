import expect from 'expect';
import React from 'react';

import routerMiddleware from '../../src/middleware/router';
import updateUrl from '../../src/actions/updateUrl';
import { CHANGE_PAGE_TO } from '../../src/constants';

describe( 'middleware', () => {
  describe( 'router()', () => {
    const dispatch = () => ({});

    const next = action => action;

    const updatePage = page => ({ type: 'UPDATE_PAGE', page });

    const routes = [
      [ 'hello', 'world', { page: updatePage }, <p>Hello world</p> ],
    ];

    const router = routerMiddleware( routes, { isServer: true });

    it( 'should not alter action that is not change page to', () => {
      const action = {
        type: 'HELLO_WORLD',
      };

      expect( router({ dispatch })( next )( action )).toEqual( action );
    });

    it( 'should add correct actions and url props to change page to action', done => {
      const action = {
        options: { shouldAddToHistory: false },
        to: [ 'hello', 'world' ],
        type: CHANGE_PAGE_TO,
      };

      const url = '/hello/world';

      const actions = [ updateUrl( url ), updatePage( undefined ) ];

      const result = router({ dispatch })( next )( action );

      setTimeout(() => {
        result.then(({ a, u }) => {
          expect( a ).toEqual( actions );
          expect( u ).toEqual( url );
        });

        done();
      }, 0 );
    });
  });
});
