import React from 'react'

import { updateName } from './actions/name'

import About from './components/About'
import Hello from './components/Hello'
import Home from './components/Home'
import NotFound from './components/NotFound'

const routes = [
  [ 'about', <About /> ],
  [ 'hello', { name: updateName }, <Hello /> ],
  [ '/', <Home /> ],
  [ '*', <NotFound /> ]
]

export default routes
