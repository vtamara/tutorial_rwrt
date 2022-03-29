/* eslint-disable react/no-find-dom-node, react/no-string-refs */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { defaultMessages } from 'lib/i18n/default';
import BaseComponent from 'lib/components/BaseComponent';

import css from './CommentForm.module.scss';

const emptyComment = { author: '', text: '' };

function bsStyleFor(propName, error) {
  if (error) {
    const errorData = (error && error.response && error.response.data) || {};
    return propName in errorData ? 'error' : 'success';
  }

  return null;
}

class CommentFormStacked extends BaseComponent {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    actions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
    error: PropTypes.oneOfType([PropTypes.any]),
    cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.func, PropTypes.any]).isRequired,
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      comment: emptyComment,
    };

    _.bindAll(this, ['handleChange', 'handleSubmit', 'resetAndFocus']);
  }

  handleChange() {
    let comment;

    comment = {
      author: ReactDOM.findDOMNode(this.refs.stackedAuthorNode).value,
      text: ReactDOM.findDOMNode(this.refs.stackedTextNode).value,
    };

    this.setState({ comment });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions.submitComment(this.state.comment).then(this.resetAndFocus);
  }

  resetAndFocus() {
    // Don't reset a form that didn't submit, this results in data loss
    if (this.props.error) return;

    const comment = { author: this.state.comment.author, text: '' };
    this.setState({ comment });

    let ref;
    ref = ReactDOM.findDOMNode(this.refs.stackedTextNode);
    ref.focus();
  }

  formStacked() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <hr />
        <form className="commentForm form form-stacked" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicName" className={css.formGroup}>
            <FormLabel>{formatMessage(defaultMessages.inputNameLabel)}</FormLabel>
            <FormControl
              type="text"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              ref="stackedAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              className={bsStyleFor('author', this.props.error)}
            />
          </FormGroup>
          <FormGroup controlId="formBasicText" className={css.formGroup}>
            <FormLabel>{formatMessage(defaultMessages.inputTextLabel)}</FormLabel>
            <FormControl
              type="textarea"
              label="Text"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              ref="stackedTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              className={bsStyleFor('text', this.props.error)}
            />
          </FormGroup>
          <FormGroup controlId="formBasicSubmit" className={css.formGroup}>
            <Button type="submit" className="btn btn-primary" disabled={this.props.isSaving}>
              {this.props.isSaving
                ? `${formatMessage(defaultMessages.inputSaving)}...`
                : formatMessage(defaultMessages.inputPost)}
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }

  errorWarning() {
    const { error } = this.props;

    // If there is no error, there is nothing to add to the DOM
    if (!error) return null;

    const errorData = error.response && error.response.data;

    const errorElements = _.transform(
      errorData,
      (result, errorText, errorFor) => {
        result.push(
          <li key={errorFor}>
            <b>{_.upperFirst(errorFor)}:</b> {errorText}
          </li>,
        );
      },
      [],
    );

    return (
      <Alert className="danger" key="commentSubmissionError">
        <strong>Your comment was not saved!</strong>
        <ul>{errorElements}</ul>
      </Alert>
    );
  }

  render() {
    let inputForm;
    inputForm = this.formStacked();

    const { formatMessage } = this.props.intl;

    // For animation with ReactCSSTransitionGroup
    //   https://facebook.github.io/react/docs/animation.html
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/comments/components/CommentBox/CommentBox.module.scss:6
    return (
      <div>
        {inputForm}
      </div>
    );
  }
}

export default injectIntl(CommentFormStacked);
