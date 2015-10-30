import expect from 'expect';

import { UPDATE_URL, updateUrl } from '../lib';

describe( 'action creator', () => {
  describe( 'updateUrl()', () => {
    it( 'should create an action to update url', () => {
      const url = '/hello-world';

      const expectedAction = {
        type: UPDATE_URL,
        url,
      };

      expect( updateUrl( url )).toEqual( expectedAction );
    });
  });
});
