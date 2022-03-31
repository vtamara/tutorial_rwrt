import React from 'react';
import BaseComponent from 'lib/components/BaseComponent'

import css from './Footer.module.scss';

export default class Footer extends BaseComponent {

  render = () => {

    return (
      <footer>
        <div className="container footer row">
          <div className="col-sm-6">
            <a href="http://www.shakacode.com">
              <div className={css.logo} />
              <div>Example of styling using image-url and Open Sans Light custom font</div>
            </a>
          </div>
          <div className="col-sm-6">
            <a href="https://twitter.com/railsonmaui">
              <div className={css.twitterImage} />
              <div>Rails On Maui on Twitter</div>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
