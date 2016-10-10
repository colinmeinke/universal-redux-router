const DISHES_LOADED = 'DISHES_LOADED'
const DISHES_LOADING = 'DISHES_LOADING'

const dishesLoaded = () => ({ type: DISHES_LOADED })

const dishesLoading = () => ({ type: DISHES_LOADING })

export { DISHES_LOADED, DISHES_LOADING, dishesLoaded, dishesLoading }
