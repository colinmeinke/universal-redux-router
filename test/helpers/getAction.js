/* eslint-env mocha */

import expect from 'expect'
import React from 'react'

import getAction from '../../src/helpers/getAction'
import updateUrl from '../../src/actions/updateUrl'
import { CHANGE_PAGE_TO } from '../../src/constants'

describe('helper', () => {
  describe('getAction()', () => {
    it('should get to url and associated route actions', done => {
      const actionFoo = () => ({ type: 'FOO' })
      const actionBar = () => ({ type: 'BAR' })
      const actionBaz = () => ({ type: 'BAZ' })

      const to = [ 'hello', 'world' ]

      const routes = [
        [
          'hello',
          'world',
          { foo: actionFoo, bar: actionBar, after: [ actionBaz ] },
          // eslint-disable-next-line react/jsx-indent
          <p>Hello world</p>
        ]
      ]

      const url = '/hello/world'

      const expectedAction = {
        actions: [ updateUrl(url), actionFoo(), actionBar() ],
        after: [ actionBaz ],
        type: CHANGE_PAGE_TO,
        url
      }

      getAction(to, routes).then(action => {
        expect(action).toEqual(expectedAction)
        done()
      })
    })
  })
})
