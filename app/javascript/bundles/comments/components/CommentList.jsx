import _ from 'lodash';
import Alert from 'react-bootstrap/Alert';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BaseComponent from 'lib/components/BaseComponent.jsx';
import Comment from './Comment.jsx';

export default class CommentList extends BaseComponent {
  static propTypes = {
    $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
    // TODO: Update error propType
    error: PropTypes.string,
    cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.object]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  errorWarning = () => {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return null;
    return (
      <Alert className="danger" key="commentFetchError">
        <strong>Comments could not be retrieved. </strong>A server error prevented loading comments. Please
        try again.
      </Alert>
    );
  }

  render = () => {
    const { $$comments, cssTransitionGroupClassNames } = this.props;
    const commentNodes = $$comments.map(($$comment, index) => (
      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      <Comment
        key={$$comment.get('id') || index}
        author={$$comment.get('author')}
        text={$$comment.get('text')}
      />
    ));

    // For animation with ReactCSSTransitionGroup
    //   https://facebook.github.io/react/docs/animation.html
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/comments/components/CommentBox/CommentBox.module.scss:6

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.errorWarning()}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className="commentList"
          component="div"
        >
        {commentNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
