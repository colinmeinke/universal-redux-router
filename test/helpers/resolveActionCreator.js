import expect from 'expect';

import {
  resolveActionCreator,
  getResolvedActionCreators,
} from '../../src/helpers/resolveActionCreator';

describe( 'helper', () => {
  describe( 'resolveActionCreator()', () => {
    const action = { type: 'HELLO_WORLD' };
    const actionCreator = () => action;

    it( 'should return a promise', () => {
      expect( resolveActionCreator( actionCreator, undefined )).toBeA( Promise );
    });

    it( 'should return an action once resolved', done => {
      resolveActionCreator( actionCreator, undefined ).then( a => {
        expect( a ).toEqual( action );
        done();
      });
    });

    it( 'should pass data as arguments to action creator', done => {
      const FOO = 'FOO';

      const fooActionCreator = foo => ({
        foo,
        type: FOO,
      });

      const expectedAction = {
        foo: 'bar',
        type: FOO,
      };

      resolveActionCreator( fooActionCreator, 'bar' ).then( a => {
        expect( a ).toEqual( expectedAction );
        done();
      });
    });

    it( 'should work with an async action creator', done => {
      const asyncActionCreator = () => new Promise( resolve => {
        setTimeout(() => {
          resolve( action );
        }, 5 );
      });

      resolveActionCreator( asyncActionCreator, undefined ).then( a => {
        expect( a ).toEqual( action );
        done();
      });
    });
  });

  describe( 'getResolvedActionCreators()', () => {
    const FOO = 'FOO';
    const BAR = 'BAR';

    const fooAction = { type: FOO };
    const barAction = { type: BAR };

    const expectedActions = [ fooAction, barAction ];

    const fooActionCreator = () => fooAction;
    const barActionCreator = () => barAction;

    it( 'should return an empty array by default', () => {
      expect( getResolvedActionCreators( new Map())).toEqual([]);
    });

    it( 'should return an array of promises', () => {
      const actionCreatorsMap = new Map();

      actionCreatorsMap.set( fooActionCreator, undefined );
      actionCreatorsMap.set( barActionCreator, undefined );

      getResolvedActionCreators( actionCreatorsMap ).forEach( promise => {
        expect( promise ).toBeA( Promise );
      });
    });

    it( 'should return an array of actions once resolved', done => {
      const actionCreatorsMap = new Map();

      actionCreatorsMap.set( fooActionCreator, undefined );
      actionCreatorsMap.set( barActionCreator, undefined );

      Promise.all( getResolvedActionCreators( actionCreatorsMap )).then( actions => {
        expect( actions ).toEqual( expectedActions );
        done();
      });
    });

    it( 'should pass data as arguments to each action creator', done => {
      const fooWithArgsActionCreator = type => ({ type });
      const barWithArgsActionCreator = type => ({ type });

      const actionCreatorsMap = new Map();

      actionCreatorsMap.set( fooWithArgsActionCreator, FOO );
      actionCreatorsMap.set( barWithArgsActionCreator, BAR );

      Promise.all( getResolvedActionCreators( actionCreatorsMap )).then( actions => {
        expect( actions ).toEqual( expectedActions );
        done();
      });
    });

    it( 'should work with an async action creator', done => {
      const asyncActionCreator = () => new Promise( resolve => {
        setTimeout(() => {
          resolve( barAction );
        }, 5 );
      });

      const actionCreatorsMap = new Map();

      actionCreatorsMap.set( fooActionCreator, undefined );
      actionCreatorsMap.set( asyncActionCreator, undefined );

      Promise.all( getResolvedActionCreators( actionCreatorsMap )).then( actions => {
        expect( actions ).toEqual( expectedActions );
        done();
      });
    });
  });
});
