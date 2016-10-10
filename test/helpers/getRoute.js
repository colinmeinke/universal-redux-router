/* eslint-env mocha */

import expect from 'expect'
import React from 'react'

import getRoute, {
  match,
  getActionCreators,
  getComponent,
  getParams
} from '../../src/helpers/getRoute'

describe('helper', () => {
  describe('match()', () => {
    it('should match route paths', () => {
      const pathName = '/'
      const routePath = '/'
      expect(match(pathName, routePath)).toBe(true)
    })

    it('should match multiple part paths', () => {
      const pathName = '/hello/world'
      const routePath = '/hello/world'
      expect(match(pathName, routePath)).toBe(true)
    })

    it('should match multiple part paths when param in route', () => {
      const pathName = '/users/1/followers'
      const routePath = '/users/:id/followers'
      expect(match(pathName, routePath)).toBe(true)
    })

    it('should match multiple part paths when only a single splat in root', () => {
      const pathName = '/hello/world'
      const routePath = '*'
      expect(match(pathName, routePath)).toBe(true)
    })

    it('should match multiple part paths when splat in route', () => {
      const pathName = '/hello/world'
      const routePath = '/hello/*'
      expect(match(pathName, routePath)).toBe(true)
    })

    it('should not match incorrect paths', () => {
      const pathName = '/hello/world'
      const routePath = '/hello/there'
      expect(match(pathName, routePath)).toBe(false)
    })

    it('should not match if route longer than path', () => {
      const pathName = '/hello/crazy'
      const routePath = '/hello/crazy/world'
      expect(match(pathName, routePath)).toBe(false)
    })

    it('should not match if path longer than route', () => {
      const pathName = '/hello/crazy/world'
      const routePath = '/hello/crazy'
      expect(match(pathName, routePath)).toBe(false)
    })
  })

  describe('getActionCreators()', () => {
    it('should work with no actions', () => {
      const actions = {}
      const route = [ '/hello/world', '<p>Hello world</p>' ]
      expect(getActionCreators(route)).toEqual(actions)
    })

    it('should work with a single action', () => {
      const updateFoo = () => ({})
      const actions = { foo: updateFoo }
      const route = [ '/hello/world', actions, '<p>Hello world</p>' ]
      expect(getActionCreators(route)).toEqual(actions)
    })

    it('should work with multiple actions', () => {
      const updateFoo = () => ({})
      const updateBar = () => ({})
      const actions = { foo: updateFoo, bar: updateBar }
      const route = [ '/hello/world', actions, '<p>Hello world</p>' ]
      expect(getActionCreators(route)).toEqual(actions)
    })
  })

  describe('getComponent()', () => {
    it('should return react component', () => {
      const component = <p>Hello world</p>
      const route = [ '/hello/world', component ]
      expect(getComponent(route)).toBe(component)
    })
  })

  describe('getParams()', () => {
    it('should work with no params in route', () => {
      const routePath = '/hello/world'
      const pathName = '/hello/world'
      const expectedParams = {}
      expect(getParams(routePath, pathName)).toEqual(expectedParams)
    })

    it('should work with a single param in route', () => {
      const routePath = '/hello/:foo'
      const pathName = '/hello/world'
      const expectedParams = { foo: 'world' }
      expect(getParams(routePath, pathName)).toEqual(expectedParams)
    })

    it('should work with multiple params in route', () => {
      const routePath = '/:foo/:bar'
      const pathName = '/hello/world'
      const expectedParams = { foo: 'hello', bar: 'world' }
      expect(getParams(routePath, pathName)).toEqual(expectedParams)
    })
  })

  describe('getRoute()', () => {
    const HelloWorld = <p>Hello world</p>
    const Home = <p>Home</p>
    const NotFound = <p>Page not found</p>
    const UserFollowers = <p>User followers</p>

    const updatePage = () => ({})
    const someUserAction = () => ({})
    const updateName = () => ({})

    const helloWorldActions = { name: updateName }
    const userFollowersActions = { id: someUserAction, page: updatePage }

    const routes = [
      [ 'user/:id/followers', userFollowersActions, UserFollowers ],
      [ 'hello', 'world', helloWorldActions, HelloWorld ],
      [ '/', Home ],
      [ '*', NotFound ]
    ]

    it('should get not found route', () => {
      expect(getRoute('/favicon.ico', routes)).toEqual({
        actionCreators: {},
        component: NotFound,
        params: {}
      })
    })

    it('should get not found route', () => {
      expect(getRoute('/favicon.ico', routes)).toEqual({
        actionCreators: {},
        component: NotFound,
        params: {}
      })
    })

    it('should get not found route', () => {
      expect(getRoute('/something/that/does/not/match', routes)).toEqual({
        actionCreators: {},
        component: NotFound,
        params: {}
      })
    })

    it('should get root route', () => {
      expect(getRoute('/', routes)).toEqual({
        actionCreators: {},
        component: Home,
        params: {}
      })
    })

    it('should get route with actions', () => {
      expect(getRoute('/hello/world?name=colin', routes)).toEqual({
        actionCreators: helloWorldActions,
        component: HelloWorld,
        params: {}
      })
    })

    it('should get route with actions and params', () => {
      expect(getRoute('/user/2/followers?page=5', routes)).toEqual({
        actionCreators: userFollowersActions,
        component: UserFollowers,
        params: { id: '2' }
      })
    })
  })
})
