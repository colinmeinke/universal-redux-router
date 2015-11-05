# Universal Redux Router

An very simple router for [Redux](https://github.com/rackt/redux)
and [React](https://github.com/facebook/react) that works on
both server and client.

All credit goes to
[this article on minimalist routing in Redux](https://gist.github.com/HenrikJoreteg/530c1da6a5e0ff9bd9ad),
[React Router](https://github.com/rackt/react-router),
[Redux Router](https://github.com/rackt/redux-router) and
[Redux Tiny Router](https://github.com/Agamennon/redux-tiny-router).
Pretty much every idea here is stolen from the above.

## Installation

```
npm install universal-redux-router
```

## Basic example

```javascript
import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, updateUrl, urlReducer as url } from 'universal-redux-router';

const reducer = combineReducers({ url });

const routes = url => {
  switch ( url ) {
    case '/hello-world':
      return <h1>Hello world</h1>;
    default:
      return <h1>Not found</h1>;
  }
}

const store = createStore( reducer );

store.dispatch( updateUrl( '/hello-world' ));

const app = (
  <Provider store={ store }>
    <Router routes={ routes } />
  </Provider>
);
```

For a more complete example please look in
[the example directory](./example/).

## API

### Actions

#### `UPDATE_URL`

### Action creators

#### `updateUrl( '/hello-world' )`

An action creator for `UPDATE_URL`

### Components

#### `<Router routes={ routes } />`
#### `<Link url="/hello-world">Hola</Link>`

### Reducers

#### `urlReducer( '/old-url', { type: UPDATE_URL, url: '/new-url' })`

## License

[ISC](./LICENSE.md).

---

![Test status](https://img.shields.io/travis/colinmeinke/universal-redux-router.svg)

