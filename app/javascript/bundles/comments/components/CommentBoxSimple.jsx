import _ from 'lodash';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from 'lib/components/BaseComponent';
import CommentFormStacked from './CommentFormStacked';
import CommentList, { commentPropTypes } from './CommentList';
import { defaultMessages, defaultLocale } from 'lib/i18n/default'; 
import SelectLanguage from 'lib/i18n/selectLanguage';
import css from './CommentBox.module.scss';

class CommentBoxSimple extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      setLocale: PropTypes.func,
      submitComment: PropTypes.func,
    }),
    data: PropTypes.shape({
      $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
      cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.object]).isRequired,
      fetchCommentError: PropTypes.string,
      isSaving: PropTypes.bool,
      locale: PropTypes.string,
      submitCommentError: PropTypes.string,
    }).isRequired,
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);
  }

  render = () => {
    const { actions, data, intl } = this.props;
    const { formatMessage } = intl;
    const locale = data.locale || defaultLocale;

    /* eslint-disable no-script-url */

    return (
      <div className="commentBox container">
        <h2>{formatMessage(defaultMessages.comments)}</h2>
        {SelectLanguage(actions.setLocale, locale)}
        <ul>
          <li>{formatMessage(defaultMessages.descriptionSupportMarkdown)}</li>
          <li>{formatMessage(defaultMessages.descriptionDeleteRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSubmitRule)}</li>
        </ul>
        <CommentFormStacked
          isSaving={data.isSaving}
          actions={{ submitComment: actions.submitComment}}
          error={data.submitCommentError}
          cssTransitionGroupClassNames={data.cssTransitionGroupClassNames}
          intl={intl}
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

export default injectIntl(CommentBoxSimple);
