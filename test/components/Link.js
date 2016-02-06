import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Link } from '../../src/components/Link';

describe( 'component', () => {
  describe( '<Link />', () => {
    const props = {
      children: 'Hello world',
      style: { backgroundColor: 'rgb( 30, 30, 30 )' },
      to: '/hello-world',
    };

    const renderer = TestUtils.createRenderer();

    renderer.render( <Link { ...props } /> );

    const link = renderer.getRenderOutput();

    it( 'should render correct markup', () => {
      expect( link.type ).toBe( 'a' );
      expect( link.props.children ).toEqual( props.children );
    });

    it( 'should pass through custom props', () => {
      expect( link.props.style ).toEqual( props.style );
    });
  });
});