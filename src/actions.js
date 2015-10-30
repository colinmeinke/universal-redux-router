import { UPDATE_URL } from './constants';

const updateUrl = url => {
  return { type: UPDATE_URL, url };
};

export { updateUrl };
