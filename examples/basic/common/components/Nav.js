import qs from 'query-string';
import React from 'react';
import { Link } from '../../../../src';

const Nav = () => (
  <nav>
    <Link url="/">Home</Link>
    <Link url="/about">About</Link>
    <Link url={ `/hello?${ qs.stringify({ name: 'Colin' }) }` }>
      Hello
    </Link>
  </nav>
);

export default Nav;

