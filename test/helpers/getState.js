import expect from 'expect';

import { getState, routerReducer } from '../../src';

describe( 'helper', () => {
  describe( 'getState()', () => {
    it( 'should return correct state', () => {
      const updatePage = page => ({ page, type: 'UPDATE_PAGE' });

      const pageReducer = ( state = 1, { page }) => ( parseInt( page || state, 10 ));

      const reducer = routerReducer({ page: pageReducer });

      const routes = [
        [ 'hello', 'world', { page: updatePage }],
      ];

      const url = '/hello/world?page=2';

      const expectedState = {
        page: 2,
        url,
      };

      expect( getState( url, routes, reducer )).toEqual( expectedState );
    });
  });
});
