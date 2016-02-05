import { CHANGE_PAGE_TO } from '../constants';

const changePageTo = ( to, { shouldAddToHistory = true } = {}) => ({
  options: { shouldAddToHistory },
  type: CHANGE_PAGE_TO,
  to,
});

export default changePageTo;
