import { connect } from 'react-redux';

const Router = ({ routes, url }) => {
  return routes( url );
};

const mapStateToProps = state => ({
  url: state.url,
});

const ConnectedRouter = connect( mapStateToProps )( Router );

export { Router };
export default ConnectedRouter;
