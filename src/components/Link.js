import React from 'react';
import { connect } from 'react-redux';

import changePageTo from '../actions/changePageTo';
import getLocation from '../helpers/getLocation';

const defaultProps = {
  shouldScrollToTop: true,
};

const scrollToTop = () => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
};

const Link = ({ children, dispatch, shouldScrollToTop, to, ...props }) => {
  const onClick = e => {
    e.preventDefault();

    dispatch( changePageTo( to ));

    if ( shouldScrollToTop ) {
      scrollToTop();
    }
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
