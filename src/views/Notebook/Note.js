import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import ViewNote from './ViewNote';
import ToggleSwitch from '../../common/components/forms/ToggleSwitch';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .max(65),
  content: Yup.string().trim(),
});

class Note extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(Map),
    onSave: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  renderDisplay = () => {
    const { note } = this.props;
    const { editing } = this.state;

    if (editing) {
      return null;
    }
    return <ViewNote note={note} />;
  };

  toggleSwitch = submitForm => {
    const { editing } = this.state;
    if (editing) {
      submitForm();
    }
    this.setState({ editing: !editing });
  };

  renderForm = ({ handleSubmit }) => {
    const { editing } = this.state;

    return (
      <Form>
        <div className="note-header">
          <div className="note-header-toggle">
            <ToggleSwitch onToggle={() => this.toggleSwitch(handleSubmit)} />
            {editing ? 'Save' : 'Edit'}
          </div>
          <Field name="title" readOnly={!editing} className="note-header-title" />
        </div>
        {editing && <Field component="textarea" name="content" />}
      </Form>
    );
  };

  render() {
    const { note, onSave, onSuccess } = this.props;

    if (!note) {
      return null;
    }

    return (
      <div className="note">
        <Formik
          initialValues={{
            notebook_id: note.get('notebook_id'),
            title: note.get('title') || '',
            content: note.get('content') || '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            onSave(note.get('id'), values).then(action => {
              if (action.response.ok) {
                onSuccess(fromJS(action.json));
              }
              actions.setSubmitting(false);
            });
          }}
          render={this.renderForm}
        />
        {this.renderDisplay()}
      </div>
    );
  }
}

export default Note;
