import qs from 'query-string';
import React from 'react';
import { Link } from '../../../universal-redux-router';

const name = 'Colin';

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to={[ 'hello', { name }]}>
      Hello
    </Link>
  </nav>
);

export default Nav;
