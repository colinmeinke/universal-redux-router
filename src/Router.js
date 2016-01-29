import { connect } from 'react-redux';

const Router = ({ routes, url }) => routes( url );

const mapStateToProps = ({ url }) => ({ url });

const ConnectedRouter = connect( mapStateToProps )( Router );

export { Router };
export default ConnectedRouter;
