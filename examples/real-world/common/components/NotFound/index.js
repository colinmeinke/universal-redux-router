import React from 'react';
import { Link } from '../../../universal-redux-router';

const NotFound = () => (
  <div>
    <h1>Not found</h1>
    <Link to="/menu">
      <span>
        Please go to the <strong>menu page</strong>
      </span>
    </Link>
  </div>
);

export default NotFound;
