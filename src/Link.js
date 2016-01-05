import React from 'react';
import { connect } from 'react-redux';
import { updateUrl } from './actions';

const Link = ({ children, url, ...props }) => {
  return <a href={ url } { ...props }>{ children }</a>;
};

const mapDispatchToProps = ( dispatch, { url }) => ({
  onClick: e => {
    e.preventDefault();
    window.history.pushState({}, '', url );
    dispatch( updateUrl( url ));
  },
});

const ConnectedLink = connect(() => ({}), mapDispatchToProps )( Link );

export { Link };
export default ConnectedLink;
