import expect from 'expect';

import urlReducer from '../../src/reducers/url';
import { UPDATE_URL } from '../../src/constants';

describe( 'reducer', () => {
  describe( 'urlReducer()', () => {
    it( 'should return the default state by default', () => {
      expect( urlReducer()).toEqual( '/' );
    });

    it( 'should handle UPDATE_URL action type', () => {
      const url = '/hello-world';

      expect( urlReducer( '/initial-url', {
        type: UPDATE_URL,
        url,
      })).toEqual( url );
    });
  });
});
