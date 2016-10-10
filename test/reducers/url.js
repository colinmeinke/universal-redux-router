/* eslint-env mocha */

import expect from 'expect'

import urlReducer from '../../src/reducers/url'
import { UPDATE_URL } from '../../src/constants'

describe('reducer', () => {
  describe('url()', () => {
    it('should return the default state by default', () => {
      expect(urlReducer()).toEqual('/')
    })

    it('should handle update url action type', () => {
      const url = '/hello-world'

      expect(urlReducer('/initial-url', {
        type: UPDATE_URL,
        url
      })).toEqual(url)
    })
  })
})
