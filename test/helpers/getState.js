/* eslint-env mocha */

import expect from 'expect'

import { getState, routerReducer } from '../../src'

describe('helper', () => {
  describe('getState()', () => {
    const UPDATE_FOO = 'UPDATE_FOO'
    const UPDATE_BAR = 'UPDATE_BAR'
    const UPDATE_BAZ = 'UPDATE_BAZ'

    const updateFoo = foo => ({ foo, type: UPDATE_FOO })

    const updateBar = bar => new Promise(resolve => {
      setTimeout(() => {
        resolve({ bar, type: UPDATE_BAR })
      }, 5)
    })

    const updateBaz = ({ foo, bar = 'michoacan' }) => new Promise(resolve => {
      setTimeout(() => {
        resolve({ baz: foo + bar, type: UPDATE_BAZ })
      }, 5)
    })

    const fooReducer = (state = 1, action) => {
      switch (action.type) {
        case UPDATE_FOO:
          return parseInt(action.foo, 10)
        default:
          return state
      }
    }

    const barReducer = (state = '', action) => {
      switch (action.type) {
        case UPDATE_BAR:
          return action.bar
        default:
          return state
      }
    }

    const bazReducer = (state = '', action) => {
      switch (action.type) {
        case UPDATE_BAZ:
          return action.baz
        default:
          return state
      }
    }

    it('should return correct state', done => {
      const reducer = routerReducer({ foo: fooReducer })

      const routes = [
        [ 'hello', 'world', { foo: updateFoo } ]
      ]

      const url = '/hello/world?foo=2'

      const expectedState = {
        foo: 2,
        url
      }

      getState(url, routes, reducer).then(state => {
        expect(state).toEqual(expectedState)
        done()
      })
    })

    it('should return correct state with async action creator', done => {
      const reducer = routerReducer({ foo: fooReducer, bar: barReducer })

      const routes = [
        [ 'hello', 'world', { foo: updateFoo, bar: updateBar } ]
      ]

      const url = '/hello/world?foo=3&bar=guanajuato'

      const expectedState = {
        bar: 'guanajuato',
        foo: 3,
        url
      }

      getState(url, routes, reducer).then(state => {
        expect(state).toEqual(expectedState)
        done()
      })
    })

    it('should return correct state with async after action creator', done => {
      const reducer = routerReducer({ foo: fooReducer, baz: bazReducer })

      const routes = [
        [ 'hello', 'world', { foo: updateFoo, after: updateBaz } ]
      ]

      const url = '/hello/world?foo=4'

      const expectedState = {
        baz: '4michoacan',
        foo: 4,
        url
      }

      getState(url, routes, reducer).then(state => {
        expect(state).toEqual(expectedState)
        done()
      })
    })

    it(
      'should return correct state with both async action creator and async after action creator',
      done => {
        const reducer = routerReducer({ foo: fooReducer, bar: barReducer, baz: bazReducer })

        const routes = [
          [ 'hello', 'world', { foo: updateFoo, bar: updateBar, after: updateBaz } ]
        ]

        const url = '/hello/world?foo=5&bar=oaxaca'

        const expectedState = {
          bar: 'oaxaca',
          baz: '5oaxaca',
          foo: 5,
          url
        }

        getState(url, routes, reducer).then(state => {
          expect(state).toEqual(expectedState)
          done()
        })
      }
    )
  })
})
