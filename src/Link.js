import React from 'react';
import { connect } from 'react-redux';
import { updateUrl } from './actions';

const scrollToTop = () => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
};

const Link = ({ children, url, ...props }) => (
  <a href={ url } { ...props }>{ children }</a>
);

const mapDispatchToProps = ( dispatch, { onClick = null, shouldScrollToTop = true, url }) => ({
  onClick: e => {
    e.preventDefault();

    if ( onClick ) {
      onClick( e, dispatch );
    }

    window.history.pushState({}, '', url );

    dispatch( updateUrl( url ));

    if ( shouldScrollToTop ) {
      scrollToTop();
    }
  },
});

const ConnectedLink = connect(() => ({}), mapDispatchToProps )( Link );

export { Link };
export default ConnectedLink;
