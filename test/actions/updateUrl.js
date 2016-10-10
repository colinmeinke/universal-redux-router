/* eslint-env mocha */

import expect from 'expect'

import updateUrl from '../../src/actions/updateUrl'
import { UPDATE_URL } from '../../src/constants'

describe('action creator', () => {
  describe('updateUrl()', () => {
    it('should create an action to update url', () => {
      const url = '/hello-world'

      const expectedAction = {
        type: UPDATE_URL,
        url
      }

      expect(updateUrl(url)).toEqual(expectedAction)
    })
  })
})
