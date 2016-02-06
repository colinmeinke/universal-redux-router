import expect from 'expect';

import changePageTo from '../../src/actions/changePageTo';
import { CHANGE_PAGE_TO } from '../../src/constants';

describe( 'action creator', () => {
  describe( 'changePageTo()', () => {
    it( 'should create an action to change page', () => {
      const options = { shouldAddToHistory: false };
      const to = '/hello-world';

      const expectedAction = {
        options,
        to,
        type: CHANGE_PAGE_TO,
      };

      expect( changePageTo( to, options )).toEqual( expectedAction );
    });
  });
});
