import React from 'react';
import { Link } from '../../../universal-redux-router';

const NotFound = () => (
  <div>
    <h1>Not found</h1>
    <Link to="/menu">
      Please go to the <strong>menu page</strong>
    </Link>
  </div>
);

export default NotFound;
