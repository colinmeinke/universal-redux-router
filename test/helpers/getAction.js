import expect from 'expect';
import React from 'react';

import getAction from '../../src/helpers/getAction';
import updateUrl from '../../src/actions/updateUrl';
import { CHANGE_PAGE_TO } from '../../src/constants';

describe( 'helper', () => {
  describe( 'getAction()', () => {
    it( 'should get to url and associated route actions', () => {
      const actionFoo = () => ({ type: 'FOO' });
      const actionBar = () => ({ type: 'BAR' });

      const to = [ 'hello', 'world' ];

      const routes = [
        [ 'hello', 'world', { foo: actionFoo, bar: actionBar }, <p>Hello world</p> ],
      ];

      const url = '/hello/world';

      const expectedAction = {
        actions: [ updateUrl( url ), actionFoo(), actionBar() ],
        type: CHANGE_PAGE_TO,
        url,
      };

      expect( getAction( to, routes )).toEqual( expectedAction );
    });
  });
});
