import changePageTo from '../actions/changePageTo'

const popStateListener = dispatch => (
  window.addEventListener('popstate', () => {
    const { hash, pathname, search } = window.location
    const url = pathname + search + hash

    dispatch(changePageTo(url, {
      shouldAddToHistory: false
    }))
  })
)

export default popStateListener
