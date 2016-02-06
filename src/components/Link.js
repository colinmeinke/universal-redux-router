import React from 'react';
import { connect } from 'react-redux';

import changePageTo from '../actions/changePageTo';
import getLocation from '../helpers/getLocation';

const defaultProps = {
  shouldAddToHistory: true,
  shouldScrollToTop: true,
};

const Link = ({ children, dispatch, shouldAddToHistory, shouldScrollToTop, to, ...props }) => {
  const onClick = e => {
    e.preventDefault();
    dispatch( changePageTo( to, { shouldAddToHistory, shouldScrollToTop }));
  };

  return (
    <a href={ getLocation( to ).url } onClick={ onClick } { ...props }>
      { children }
    </a>
  );
};

Link.defaultProps = defaultProps;

const LinkContainer = connect()( Link );

export { Link };
export default LinkContainer;
