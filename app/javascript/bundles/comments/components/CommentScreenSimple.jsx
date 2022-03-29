// eslint-disable-next-line max-classes-per-file
import React from 'react';
import request from 'axios';
import Immutable from 'immutable';
import _ from 'lodash';
import ReactOnRails from 'react-on-rails';
import BaseComponent from 'lib/components/BaseComponent';

import CommentBoxSimple from './CommentBoxSimple';
import css from './CommentScreen.module.scss';

class CommentScreenSimple extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      $$comments: Immutable.fromJS([]),
      isSaving: false,
      fetchCommentsError: null,
      submitCommentError: null,
    };

    _.bindAll(this, 'fetchComments', 'handleCommentSubmit');
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    return request
      .get('comments.json', { responseType: 'json' })
      .then((res) => {
        this.setState({ $$comments: Immutable.fromJS(res.data) })
      })
      .catch((error) => this.setState({ fetchCommentsError: error }));
  }

  handleCommentSubmit(comment) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return request
      .post('comments.json', { comment }, requestConfig)
      .then(() => {
        const { $$comments } = this.state;
        // We need to find an id greather than the existing and use it,
        // otherwise the order of comments will be scrambled, 
        // see
        // https://github.com/shakacode/react-webpack-rails-tutorial/issues/494
        let maxId = 0
        if ($$comments.size  > 0) {
          maxId = $$comments.max((a, b) => a.get('id') > b.get('id')).get('id')
        }
        comment['id'] = maxId + 1
        let $$comment = Immutable.fromJS(comment);
        this.setState({
          $$comments: $$comments.unshift($$comment),
          submitCommentError: null,
          isSaving: false,
        });
      })
      .catch((error) => {
        this.setState({
          submitCommentError: error,
          isSaving: false,
        });
      });
  }

  render() {
    const { handleSetLocale, locale } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    return (<CommentBoxSimple
      actions={{ 
        setLocale: handleSetLocale,
          submitComment: this.handleCommentSubmit 
      }}
      data={{
        $$comments: this.state.$$comments,
          cssTransitionGroupClassNames: cssTransitionGroupClassNames,
          fetchCommentsError: this.state.fetchCommentsError,
          isSaving: this.state.isSaving,
          locale: locale,
          submitCommentError: this.state.submitCommentError,
      }}
      >
      </CommentBoxSimple>
    );
  }
}

export default CommentScreenSimple;
