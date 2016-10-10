/* eslint-env mocha */

import expect from 'expect'

import getLocation, { getPathName, getQuery, getQueryString } from '../../src/helpers/getLocation'

describe('helper', () => {
  describe('getPathName()', () => {
    it('should work with a root path string', () => {
      const to = '/'
      const expectedPathName = '/'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with a path string', () => {
      const to = '/hello/world'
      const expectedPathName = '/hello/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with a path string including query string', () => {
      const to = '/hello/world?with=a&query=string'
      const expectedPathName = '/hello/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with an array of a single root path', () => {
      const to = [ '/' ]
      const expectedPathName = '/'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with an array of multiple path parts', () => {
      const to = [ 'hello', 'world' ]
      const expectedPathName = '/hello/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with an array of multiple path parts including a numeric value', () => {
      const to = [ 'hello', 1, 'world' ]
      const expectedPathName = '/hello/1/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with an array of multiple path parts including a boolean value', () => {
      const to = [ 'hello', true, 'world' ]
      const expectedPathName = '/hello/true/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })

    it('should work with an array of multiple path parts including a query object', () => {
      const to = [ 'hello', 'world', { with: 'a', query: 'string' } ]
      const expectedPathName = '/hello/world'
      expect(getPathName(to)).toBe(expectedPathName)
    })
  })

  describe('getQuery()', () => {
    it('should work with a root path string', () => {
      const to = '/'
      const expectedQuery = {}
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work with a path string', () => {
      const to = '/hello/world'
      const expectedQuery = {}
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work with a path string including a query string', () => {
      const to = '/hello/world?with=a&query=string'
      const expectedQuery = { with: 'a', query: 'string' }
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work with an array of a single root path', () => {
      const to = [ '/' ]
      const expectedQuery = {}
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work with an array of multiple path parts', () => {
      const to = [ 'hello', 'world' ]
      const expectedQuery = {}
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work with an array of multiple path parts including a query object', () => {
      const to = '/?foo%5B%5D=bar,baz'
      const expectedQuery = { foo: [ 'bar', 'baz' ] }
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work when the query object includes an array', () => {
      const to = '/?foo%5Bbar%5D=baz'
      const expectedQuery = { foo: { bar: 'baz' } }
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should work when the query object includes an object', () => {
      const to = [ 'hello', 'world', { with: 'a', query: 'string' } ]
      const expectedQuery = { with: 'a', query: 'string' }
      expect(getQuery(to)).toEqual(expectedQuery)
    })

    it('should decode special characters', () => {
      const to = '/hello/world?test=Rock+%26+Roll'
      const expectedQuery = { test: 'Rock & Roll' }
      expect(getQuery(to)).toEqual(expectedQuery)
    })
  })

  describe('getQueryString()', () => {
    it('should work with an empty query object', () => {
      const query = {}
      const expectedQueryString = ''
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should work with multiple query items', () => {
      const query = { with: 'a', query: 'string' }
      const expectedQueryString = '?with=a&query=string'
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should work with a query item that is an array', () => {
      const query = { foo: [ 'bar', 'baz' ] }
      const expectedQueryString = '?foo%5B%5D=bar,baz'
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should work with a query item that is an object', () => {
      const query = { foo: { bar: 'baz' } }
      const expectedQueryString = '?foo%5Bbar%5D=baz'
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should work with an query item that has an empty value', () => {
      const query = { foo: '' }
      const expectedQueryString = ''
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should work with an query item that is an object and has an empty value', () => {
      const query = { foo: { bar: '' } }
      const expectedQueryString = ''
      expect(getQueryString(query)).toBe(expectedQueryString)
    })

    it('should encode special characters', () => {
      const query = { test: 'Rock & Roll' }
      const expectedQueryString = '?test=Rock+%26+Roll'
      expect(getQueryString(query)).toBe(expectedQueryString)
    })
  })

  describe('getLocation()', () => {
    it('should work with a path string', () => {
      const to = '/hello/world'
      const expectedLocation = {
        pathName: '/hello/world',
        query: {},
        queryString: '',
        url: '/hello/world'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with a path string including a query string', () => {
      const to = '/hello/world?a=b&c=d'
      const expectedLocation = {
        pathName: '/hello/world',
        query: { a: 'b', c: 'd' },
        queryString: '?a=b&c=d',
        url: '/hello/world?a=b&c=d'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with an array of a single path', () => {
      const to = [ '/hello/world' ]
      const expectedLocation = {
        pathName: '/hello/world',
        query: {},
        queryString: '',
        url: '/hello/world'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with an array of a single path without a slash prefix', () => {
      const to = [ 'hello/world' ]
      const expectedLocation = {
        pathName: '/hello/world',
        query: {},
        queryString: '',
        url: '/hello/world'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with an array of a single path with a query string', () => {
      const to = [ 'hello/world?a=b&c=d' ]
      const expectedLocation = {
        pathName: '/hello/world',
        query: { a: 'b', c: 'd' },
        queryString: '?a=b&c=d',
        url: '/hello/world?a=b&c=d'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with an array of multiple path parts', () => {
      const to = [ 'hello', 'world' ]
      const expectedLocation = {
        pathName: '/hello/world',
        query: {},
        queryString: '',
        url: '/hello/world'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })

    it('should work with an array of multiple path parts including a query object', () => {
      const to = [ 'hello', 'world', { a: 'b', c: 'd' } ]
      const expectedLocation = {
        pathName: '/hello/world',
        query: { a: 'b', c: 'd' },
        queryString: '?a=b&c=d',
        url: '/hello/world?a=b&c=d'
      }

      expect(getLocation(to)).toEqual(expectedLocation)
    })
  })
})
