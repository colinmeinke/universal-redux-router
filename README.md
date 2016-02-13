# Universal Redux Router

A router that turns URL params into first-class Redux state
and runs action creators on navigation.

---

![Test status](https://img.shields.io/travis/colinmeinke/universal-redux-router.svg)
![Dependencies status](https://img.shields.io/david/colinmeinke/universal-js.svg)

## Navigation

- [Motivation](#motivation)
- [Features](#features)
  - [Extracts state from URLs](#extracts-state-from-urls)
  - [Runs action creators *after* calculating new state](#runs-action-creators-after-calculating-new-state)
  - [Handles async action creators](#handles-async-action-creators)
  - [Routing on server and client](#routing-on-server-and-client)
- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
  - [Router](#router)
  - [routerMiddleware](#routermiddleware)
  - [routerReducer](#routerreducer)
  - [changePageTo](#changepageto)
  - [Link](#link)
  - [getState](#getstate)
- [Help make this better](#help-make-this-better)
- [Thanks](#thanks)
- [License](#license)

## Motivation

If you're a good web citizen each part of your app can be
linked to with a URL. These URLs often contain state either
as part of the path name or within the query string.

```
/users/782/posts?page=2&tags[]=coding,making
```

In the above example, we have the following state:

```js
{
  id: 782,
  page: 2,
  tags: [ 'coding', 'making' ],
}
```

**I want that state in my Redux store!**

## Features

### Extracts state from URLs

Universal Redux Router extracts state from a URL and adds it
as first-class state to your Redux store.

It achieves this by allowing you to attach Redux action
creators to your routes.

```js
const routes = [
  [
    'users/:id/posts',
    {
      id: updateId,
      page: updatePage,
      tags: updateTags,
    },
    <UsersPosts />,
  ],
];
```

In the above example, we have one route defined that will
match `/users/<anything>/posts`. It has three Redux action
creators attached `updateId`, `updatePage` and `updateTags`.

When a user navigates to a URL, the action creators associated
with the matching route are called with the appropriate part
of the URL.

For example, navigating to
`/users/782/posts?page=2&tags[]=coding,making` will result in
the following function calls:

- `updateId( '782' )`
- `updatePage( '2' )`
- `updateTags([ 'coding', 'making' ])`

The returned actions are then used to calculate the new state
of the Redux store.

### Runs action creators *after* calculating new state

On top of running action creators to extract state from URL
params, Universal Redux Router allows you to define action
creators to run *after* the new state has been calculated.

```js
const routes = [
  [
    'users/:id/posts',
    {
      id: updateId,
      page: updatePage,
      tags: updateTags,
      after: [ postsUpdating, getPosts, postsUpdated ],
    },
    <UsersPosts />,
  ],
];
```

In the above example the action creators `updateId`, `updatePage`
and `updateTags` are run first. The returned actions are used to
calculate the new state.

The `after` action creators are then run in sequence, each called
in turn with the updated state.

### Handles async action creators

Both URL param action creators and `after` action creators can
return promises.

The `after` action creators will not be called until all URL
param action creators have resolved and the new state has been
calculated.

Each one of the `after` action creators will not be called
until the previous `after` action creator has been resolved
and the new state calculated.

### Routing on server and client

As the name implies, Universal Redux Router is designed
specifically to work the same on both server and client.

No need for environment specific code. Phew!

## Examples

- The [basic example](./examples/basic) in the examples
  directory of this repository.
- The [real world example](./examples/real-world) in the
  examples directory of this repository.
- [My React/Redux starter kit](https://github.com/colinmeinke/universal-js).
- [My blog](https://github.com/colinmeinke/colinmeinke).

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

getState( url, routes, reducer ).then( state => {
  const store = createStore( reducer, state, middleware );
});
```

## Help make this better

[Issues](https://github.com/colinmeinke/universal-redux-router/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## Thanks

- [Henrik Joreteg](https://twitter.com/HenrikJoreteg)'s [article on minimalist routing](https://gist.github.com/HenrikJoreteg/530c1da6a5e0ff9bd9ad)
- [React Router](https://github.com/rackt/react-router) (specifically for the [Link API](https://github.com/rackt/react-router/blob/master/modules/Link.js))
- [Luke Morton](https://twitter.com/lukemorton) for discussions around routing and [Republic](https://github.com/lukemorton/republic)

## License

[ISC](./LICENSE.md).
