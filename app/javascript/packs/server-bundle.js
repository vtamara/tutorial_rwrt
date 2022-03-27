import ReactOnRails from 'react-on-rails';

import Footer from '../bundles/comments/layout/Footer';
import HelloWorld from '../bundles/HelloWorld/components/HelloWorldServer';
import NavigationBar from '../bundles/comments/layout/NavigationBar';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Footer,
  HelloWorld,
  NavigationBar,
});
