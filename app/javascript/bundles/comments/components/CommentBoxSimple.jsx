import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import _ from 'lodash';
import BaseComponent from 'lib/components/BaseComponent';
import CommentFormStacked from './CommentFormStacked';
import CommentList, { commentPropTypes } from './CommentList';
import css from './CommentBox.module.scss';

class CommentBoxSimple extends BaseComponent {
  static propTypes = {
    // TODO: Update error propType
    actions: PropTypes.shape({
      setLocale: PropTypes.func,
      submitComment: PropTypes.func,
    }),
    data: PropTypes.shape({
      $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
      cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.object]).isRequired,
      fetchCommentError: PropTypes.string,
      isSaving: PropTypes.bool,
      submitCommentError: PropTypes.string,
    }).isRequired,
  };

  constructor() {
    super();
    _.bindAll(this); //, ['refreshComments']);
  }

  render() {
    const { actions, data } = this.props;

    /* eslint-disable no-script-url */

    return (
      <div className="commentBox container">
        <h2>Comments</h2>
        <ul>
          <li>Text supports Github Flavored Markdown.</li>
          <li>Comments older than 24 hours are deleted.</li>
          <li>Name is preserved. Text is reset, between submits.</li>
        </ul>
        <CommentFormStacked
          isSaving={data.isSaving}
          actions={{ submitComment: actions.submitComment}}
          error={data.submitCommentError}
          cssTransitionGroupClassNames={data.cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={data.$$comments}
          error={data.fetchCommentsError}
          cssTransitionGroupClassNames={data.cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}

export default CommentBoxSimple;
