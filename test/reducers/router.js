import expect from 'expect';

import routerReducer from '../../src/reducers/router';
import { CHANGE_PAGE_TO, UPDATE_URL } from '../../src/constants';

describe( 'reducer', () => {
  describe( 'router()', () => {
    const pageReducer = ( state = 1, { page }) => ( parseInt( page || state, 10 ));

    const reducers = {
      page: pageReducer,
    };

    const reducer = routerReducer( reducers );

    it( 'should return default state when no action passed to reducer', () => {
      const expectedState = {
        page: 1,
        url: '/',
      };

      expect( reducer({}, {})).toEqual( expectedState );
    });

    it( 'should run root reducer when not change page to action type', () => {
      const expectedState = {
        page: 5,
        url: '/',
      };

      expect( reducer({}, { page: 5 })).toEqual( expectedState );
    });

    it( 'should run batch reducer when change page to action type', () => {
      const expectedState = {
        page: 1,
        url: '/hello/world',
      };

      expect( reducer({}, {
        actions: [{ type: UPDATE_URL, url: '/hello/world' }, { page: undefined }],
        after: [],
        to: [ 'hello', 'world' ],
        type: CHANGE_PAGE_TO,
      })).toEqual( expectedState );
    });

    it( 'should use after action creator when change page to action type', () => {
      const resultsActionCreator = () => ({
        results: [ 'hello', 'world' ],
      });

      const resultsReducer = ( state = [], { results }) => ( results || state );

      const newReducers = { ...reducers, results: resultsReducer };

      const newReducer = routerReducer( newReducers );

      const expectedState = {
        page: 1,
        results: [ 'hello', 'world' ],
        url: '/hello/world',
      };

      expect( newReducer({}, {
        actions: [{ type: UPDATE_URL, url: '/hello/world' }, { page: undefined }],
        after: [ resultsActionCreator ],
        to: [ 'hello', 'world' ],
        type: CHANGE_PAGE_TO,
      })).toEqual( expectedState );
    });
  });
});
