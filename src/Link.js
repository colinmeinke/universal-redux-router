import React from 'react';
import { connect } from 'react-redux';
import { updateUrl } from './actions';

const Link = ({ children, url, ...props }) => {
  return <a href={ url } { ...props }>{ children }</a>;
};

const ConnectedLink = connect(() => ({}), dispatch => ({
  onClick: e => {
    e.preventDefault();
    const { hash, pathname, search } = e.target;
    const url = pathname + search + hash;
    window.history.pushState({}, '', url );
    dispatch( updateUrl( url ));
  },
}))( Link );

export { Link };
export default ConnectedLink;
