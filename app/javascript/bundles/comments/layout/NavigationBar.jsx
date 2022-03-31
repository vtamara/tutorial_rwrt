// eslint-disable new-cap

import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from 'lib/components/BaseComponent'
import * as paths from 'lib/paths';

function NavigationBar(props, railsContext) {
  let pathname = railsContext.pathname
  let commentsCount = props.commentsCount;

  let buildLi = (path, desc, byDefault = false) => {
    let active = path === pathname  ||
      (byDefault && pathname == '/')
    return (
      <li className={active ? 'active' : ''}>
        <a className='nav-link' href={path}>{desc}</a>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-ligth navbar-default">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://www.shakacode.com">
          ShakaCode
        </a>
        <button
          type="button"
          className="navbar-toggler collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#bs-example-navbar-collapse-1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav me-auto">
            {buildLi(paths.SIMPLE_REACT_PATH, 'Simple React', true)}
            {buildLi(paths.RAILS_PATH, 'Classic Rails')}
            <li>
              <a className='nav-link' href="https://github.com/shakacode/react-webpack-rails-tutorial">Source</a>
            </li>
            <li>
              <a className='nav-link' href="https://forum.shakacode.com/c/reactjs">Forum</a>
            </li>
            <li style={{"margin-top": "0.5em", "margin-left": "2em"}}>
              <a id="js-comment-count" href="#">
                Comments: {+commentsCount}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
