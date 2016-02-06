import { CHANGE_PAGE_TO } from '../constants';

const changePageTo = ( to, { shouldAddToHistory = true, shouldScrollToTop = true } = {}) => ({
  options: { shouldAddToHistory, shouldScrollToTop },
  type: CHANGE_PAGE_TO,
  to,
});

export default changePageTo;
