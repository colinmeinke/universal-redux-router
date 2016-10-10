import { connect } from 'react-redux'

import Menu from './Menu/index'

const mapStateToProps = ({ areDishesLoading, country, dishes, isVegetarian }) => ({
  areDishesLoading,
  country,
  dishes,
  isVegetarian
})

export default connect(mapStateToProps, null)(Menu)
