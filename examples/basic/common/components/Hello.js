import { connect } from 'react-redux';

import Hello from './Hello/index';

const mapStateToProps = ({ name }) => ({ name });

const HelloContainer = connect( mapStateToProps )( Hello );

export default HelloContainer;
