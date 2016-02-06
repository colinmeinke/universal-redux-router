# Universal Redux Router

A router that turns URL params into first-class Redux state.

---

![Test status](https://img.shields.io/travis/colinmeinke/universal-redux-router.svg)
![Dependencies status](https://img.shields.io/david/colinmeinke/universal-js.svg)

## Motivation

If you're a good web citizen each part of your app can be
linked to with a URL. These URLs often contain state either
as part of the path name or within the query string.

```
/users/782/posts?page=2&tags%5B%5D=coding,making
```

*Note*: The `%5B%5D` part is encoded square brackets `[]`
that we use to denote that a query param is an array.

In the above example, we have the following state:

```js
{
  id: 782,
  page: 2,
  tags: [ 'coding', 'making' ],
  url: '/users/782/posts?page=2&tags%5B%5D=coding,making',
}
```

Wouldn't it be cool if this state could automatically be
extracted from the URL and added as first-class state to your
Redux store?

**Enter Universal Redux Router**.

It achieves this by allowing you to attach Redux action
creators to your routes.

```js
const routes = [
  [ 'users/:id/posts', { id: updateId, page: updatePage, tags: updateTags }, <UsersPosts /> ],
];
```

In the above example, we have one route defined that will
match `/users/<anything>/posts`. It has three Redux action
creators attached `updateId`, `updatePage` and `updateTags`.

When a user navigates to a URL, the action creators associated
with the matching route are called with either the appropriate
part of the path name or the matching value of the query
string.

The returned actions are then batched and dispatched, updating
the state of the Redux store.

## Installation

```
npm install universal-redux-router
```

## Usage

### Router

The `Router` component handles which component will be
displayed by taking the `url` property of your Redux store and
your routes array.

It matches a route and returns the component defined within
that route.

```js
import { Router } from 'universal-redux-router';

const Root = () => (
  <Provider store={ store }>
    <Router routes={ routes } />
  </Provider>
);
```

### routerMiddleware

You must use `routerMiddleware` in your Redux middleware
stack. This listens for the `CHANGE_PAGE_TO` action, matches a
route and then makes a list of additional actions we need to
dispatch.

It also includes a few conveniences like updating scroll
position on navigation and handling browser history.

```js
import { routerMiddleware } from 'universal-redux-router';

const middleware = applyMiddleware( routerMiddleware( routes ));

return createStore( reducer, state, middleware );
```

### routerReducer

Instead of using Redux's `combineReducers` to create your
root reducer, you must use `routerReducer`. It has the same
API as `combineReducers`.

`routerReducer` uses `combineReducers` under the hood for all
incoming actions apart from `CHANGE_PAGE_TO`. When it receives
`CHANGE_PAGE_TO` it iterates over the list of associated
actions to calculate state.

```js
import { routerReducer } from 'universal-redux-router';

const reducer = routerReducer( reducers );
```

### changePageTo

The `changePageTo` Redux action creator creates the
`CHANGE_PAGE_TO` action. It is how we navigate using Universal
Redux Router.

It can either take an array of data, or a URL string.

```js
import { changePageTo } from 'universal-redux-router';

store.dispatch(
  changePageTo([ 'users', id, 'posts', { page, tags }])
);

store.dispatch(
  changePageTo( `/users/${ id }/string?page=${ page }&tags[]=${ tags.join( ',' )}` )
);
```

### Link

The `Link` component is used to create an HTML anchor element
that has `changePageTo` handling built in. This means you
don't have to worry about `onClick` events or having to
directly call `changePageTo`.

Like `changePageTo` it accepts both an array of data or a URL
string as its `to` prop.

```js
import { Link } from 'universal-redux-router';

<Link to={[ 'users', id, 'posts', { page, tags }]}>
  User posts
</Link>

<Link to={ `/users/${ id }/string?page=${ page }&tags[]=${ tags.join( ',' )}` }>
  User posts
</Link>
```

### getState

The `getState` helper means you don't have to pass initial
state between server and client.

It calculates initial state that you can use when creating
your Redux store.

```js
import { getState } from 'universal-redux-router';

const state = getState( url, routes, reducer );

const store = createStore( reducer, state, middleware );
```

## Help make this better

[Issues](https://github.com/colinmeinke/universal-redux-router/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## Thanks to

- [Henrik Joreteg](https://twitter.com/HenrikJoreteg)'s [article on minimalist routing](https://gist.github.com/HenrikJoreteg/530c1da6a5e0ff9bd9ad)
- [React Router](https://github.com/rackt/react-router) (specifically for the [Link API](https://github.com/rackt/react-router/blob/master/modules/Link.js))
- [Luke Morton](https://twitter.com/lukemorton) for discussions around routing and [Republic](https://github.com/lukemorton/republic)

## License

[ISC](./LICENSE.md).
