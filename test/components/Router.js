import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Router } from '../../src/components/Router';

describe( 'component', () => {
  describe( '<Router />', () => {
    const renderer = TestUtils.createRenderer();

    const routes = [
      [ 'hello', 'world', <h1>Hello world</h1> ],
      [ '*', <h1>Not found</h1> ],
    ];

    it( 'should render correct markup for default route', () => {
      renderer.render(
        <Router routes={ routes } url="/an/unknown/path" />
      );

      const page = renderer.getRenderOutput();

      expect( page.type ).toBe( 'h1' );
      expect( page.props.children ).toEqual( 'Not found' );
    });

    it( 'should render correct markup for matched route', () => {
      renderer.render(
        <Router routes={ routes } url="/hello/world" />
      );

      const page = renderer.getRenderOutput();

      expect( page.type ).toBe( 'h1' );
      expect( page.props.children ).toEqual( 'Hello world' );
    });
  });
});
