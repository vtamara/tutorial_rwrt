import DOMPurify from 'dompurify';
import {marked} from 'marked';
import PropTypes from 'prop-types';
import React from 'react';

import BaseComponent from 'lib/components/BaseComponent';

import css from './Comment.module.scss';

export default class Comment extends BaseComponent {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props)
  }

  render = () => {
    const { author, text } = this.props;
    const rawMarkup = DOMPurify.sanitize(marked(text, { gfm: true }));

    /* eslint-disable react/no-danger */
    return (
      <div className={css.comment}>
        <h2 className={`${css.commentAuthor} js-comment-author`}>{author}</h2>
        <span dangerouslySetInnerHTML={{ __html: rawMarkup }} className="js-comment-text" />
      </div>
    );
  }
}
