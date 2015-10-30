import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Router } from '../lib/Router';

describe( 'component', () => {
  describe( '<Router />', () => {
    const renderer = TestUtils.createRenderer();

    const routes = url => {
      switch ( url ) {
        case '/hello-world':
          return <h1>Hello world</h1>;
        default:
          return <h1>Not found</h1>;
      }
    };

    it( 'should render correct markup for default route', () => {
      renderer.render(
        <Router routes={ routes } />
      );

      const page = renderer.getRenderOutput();

      expect( page.type ).toBe( 'h1' );
      expect( page.props.children ).toEqual( 'Not found' );
    });

    it( 'should render correct markup for matched route', () => {
      renderer.render(
        <Router routes={ routes } url="/hello-world" />
      );

      const page = renderer.getRenderOutput();

      expect( page.type ).toBe( 'h1' );
      expect( page.props.children ).toEqual( 'Hello world' );
    });
  });
});
