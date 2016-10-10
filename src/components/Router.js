import { connect } from 'react-redux'

import getRoute from '../helpers/getRoute'

const Router = ({ routes, url }) => getRoute(url, routes).component

const mapStateToProps = ({ url }) => ({ url })

const RouterContainer = connect(mapStateToProps)(Router)

export { Router }
export default RouterContainer
